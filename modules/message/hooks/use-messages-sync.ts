import { MessageNotificationPayload } from '@/modules/event/payloads';
import { useOnConnect, useOnEvent } from '@/modules/event/socket/use-on-event';
import { useOpenConversationStore } from '@/modules/message/state/open-conversation-store';
import { MessageNotificationToast } from '@/modules/message/toasts/message-notification-toast';
import { ConversationListItemEntity } from '@/modules/message/types/conversation-entity';
import {
  ConversationsListResponse,
  GetConversationResponse,
} from '@/modules/message/types/messages-api';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { toast } from 'sonner-native';

import { conversationsKeys } from './api/use-conversations';
import { messagesKeys } from './api/use-messages';

export function useMessagesSync() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const currentOpenIdRef = useRef<string | null>(useOpenConversationStore.getState().currentId);

  useEffect(() => {
    const unsub = useOpenConversationStore.subscribe((state) => {
      currentOpenIdRef.current = state.currentId;
    });
    return unsub;
  }, []);

  useOnEvent('notification:message', (payload) => {
    const isCurrentlyOpen = currentOpenIdRef.current === payload.conversation_id;

    if (!isCurrentlyOpen) {
      toast.custom(
        React.createElement(MessageNotificationToast, {
          payload,
          onPress: () =>
            routerRef.current.push(`/(tabs)/messages/${payload.conversation_id}` as any),
        }),
      );
    }

    queryClient.setQueryData<ConversationsListResponse>(conversationsKeys.all, (old) => {
      if (!old) return old;
      return updateConversationOnNotification({
        conversationsList: old,
        notification: payload,
        resetUnread: isCurrentlyOpen,
      });
    });

    queryClient.setQueryData<GetConversationResponse>(
      conversationsKeys.single(payload.conversation_id),
      (old) => {
        if (!old) return old;
        return applyNotificationToConversation({
          conversation: old,
          notification: payload,
          resetUnread: isCurrentlyOpen,
        });
      },
    );

    if (isCurrentlyOpen) {
      queryClient.invalidateQueries({
        queryKey: messagesKeys.single(payload.conversation_id),
      });
    }
  });

  useOnConnect(() => {
    // Prefix matching: invalida conversationsKeys.all (lista) + todos os
    // conversationsKeys.single(*) em uma chamada
    queryClient.invalidateQueries({ queryKey: conversationsKeys.all });

    if (currentOpenIdRef.current) {
      queryClient.invalidateQueries({
        queryKey: messagesKeys.single(currentOpenIdRef.current),
      });
    }
  });
}

function applyNotificationToConversation({
  conversation,
  notification,
  resetUnread,
}: {
  conversation: ConversationListItemEntity;
  notification: MessageNotificationPayload;
  resetUnread: boolean;
}): ConversationListItemEntity {
  return {
    ...conversation,
    last_message: {
      content: notification.preview,
      sender_id: notification.sender_id,
      created_at: notification.created_at,
    },
    last_message_at: notification.created_at,
    unread_count: resetUnread ? 0 : conversation.unread_count + 1,
  };
}

function updateConversationOnNotification({
  conversationsList,
  notification,
  resetUnread,
}: {
  conversationsList: ConversationsListResponse;
  notification: MessageNotificationPayload;
  resetUnread: boolean;
}): ConversationsListResponse {
  const target = conversationsList.conversations.find(
    (c) => c.conversation_id === notification.conversation_id,
  );

  if (!target) {
    // conversation não está no cache — confiar no refetchOnMount da próxima navegação
    return conversationsList;
  }

  const updated = applyNotificationToConversation({
    conversation: target,
    notification,
    resetUnread,
  });

  return {
    conversations: [
      updated,
      ...conversationsList.conversations.filter(
        (c) => c.conversation_id !== notification.conversation_id,
      ),
    ],
  };
}
