import { ApiError } from '@/api';
import {
  getMessages,
  markConversationAsRead,
  sendMessage,
} from '@/modules/message/api/messages-api';
import { UiMessage } from '@/modules/message/types/message-entity';
import {
  ConversationsListResponse,
  GetConversationResponse,
  MarkAsReadResponse,
  MessagesListResponse,
  SendMessageDto,
  SendMessageResponse,
} from '@/modules/message/types/messages-api';
import {
  addMessageToFirstPage,
  applyNewMessageToConversation,
  bumpConversationInList,
  markTempMessageAsFailed,
  replaceTempMessage,
} from '@/modules/message/utils/cache-updaters';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { conversationsKeys } from './use-conversations';

export const messagesKeys = {
  single: (conversationId: string) => ['messages', conversationId] as const,
};

type PaginatedMessages = InfiniteData<MessagesListResponse>;

interface SendMessageVars {
  dto: SendMessageDto;
  currentUserId: string;
}

interface SendMessageContext {
  tempId: string;
  previous: PaginatedMessages | undefined;
}

const MESSAGES_PAGE_LIMIT = 50;

export function useFetchMessages(conversationId: string) {
  return useInfiniteQuery<
    MessagesListResponse,
    ApiError,
    PaginatedMessages,
    ReturnType<typeof messagesKeys.single>,
    string | undefined
  >({
    queryKey: messagesKeys.single(conversationId),
    queryFn: ({ pageParam }) => {
      return getMessages({
        conversationId,
        limit: MESSAGES_PAGE_LIMIT,
        before: pageParam,
      });
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.has_more) return undefined;
      const oldest = lastPage.messages[lastPage.messages.length - 1];
      return oldest?.id;
    },
  });
}

export function useSendMessage(conversationId: string) {
  const qc = useQueryClient();
  const queryKey = messagesKeys.single(conversationId);

  return useMutation<SendMessageResponse, ApiError, SendMessageVars, SendMessageContext>({
    mutationFn: ({ dto }) => sendMessage({ conversationId, dto }),
    onMutate: async ({ dto, currentUserId }) => {
      await qc.cancelQueries({ queryKey });

      const previousData = qc.getQueryData<PaginatedMessages>(queryKey);

      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const tempMessage: UiMessage = {
        id: tempId,
        conversation_id: conversationId,
        sender_id: currentUserId,
        content_type: dto.content_type,
        content: dto.content,
        is_read: false,
        created_at: new Date().toISOString(),
        status: 'sending',
      };

      qc.setQueryData<PaginatedMessages>(queryKey, (old) =>
        addMessageToFirstPage({ data: old, message: tempMessage }),
      );

      return { tempId, previous: previousData };
    },
    onSuccess: (realMessage, _vars, ctx) => {
      if (!ctx) return;

      qc.setQueryData<PaginatedMessages>(queryKey, (old) =>
        replaceTempMessage({ data: old, tempId: ctx.tempId, realMessage }),
      );

      qc.setQueryData<ConversationsListResponse>(conversationsKeys.all, (old) =>
        bumpConversationInList({
          conversationsList: old,
          conversationId,
          message: realMessage,
        }),
      );

      qc.setQueryData<GetConversationResponse>(
        conversationsKeys.single(conversationId),
        (old) => {
          if (!old) return old;
          return applyNewMessageToConversation({ conversation: old, message: realMessage });
        },
      );
    },
    onError: (_err, _vars, ctx) => {
      if (!ctx) return;

      qc.setQueryData<PaginatedMessages>(queryKey, (old) =>
        markTempMessageAsFailed({ data: old, tempId: ctx.tempId }),
      );
    },
  });
}

export function useMarkAsRead(conversationId: string) {
  const qc = useQueryClient();

  return useMutation<MarkAsReadResponse, ApiError, void>({
    mutationFn: () => markConversationAsRead(conversationId),
    onSuccess: () => {
      qc.setQueryData<ConversationsListResponse>(conversationsKeys.all, (old) => {
        if (!old) return old;
        return {
          conversations: old.conversations.map((c) =>
            c.conversation_id === conversationId ? { ...c, unread_count: 0 } : c,
          ),
        };
      });

      qc.setQueryData<GetConversationResponse>(
        conversationsKeys.single(conversationId),
        (old) => {
          if (!old) return old;
          return { ...old, unread_count: 0 };
        },
      );
    },
  });
}
