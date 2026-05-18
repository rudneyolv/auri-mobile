import { ConversationListItemEntity } from '@/modules/message/types/conversation-entity';
import { MessageEntity, UiMessage } from '@/modules/message/types/message-entity';
import {
  ConversationsListResponse,
  MessagesListResponse,
} from '@/modules/message/types/messages-api';
import { InfiniteData } from '@tanstack/react-query';

export function addMessageToFirstPage({
  data,
  message,
}: {
  data: InfiniteData<MessagesListResponse> | undefined;
  message: UiMessage;
}): InfiniteData<MessagesListResponse> {
  if (!data || data.pages.length === 0) {
    return {
      pages: [{ messages: [message], has_more: false }],
      pageParams: [undefined],
    };
  }

  const [firstPage, ...rest] = data.pages;

  return {
    ...data,
    pages: [{ ...firstPage, messages: [message, ...firstPage.messages] }, ...rest],
  };
}

export function replaceTempMessage({
  data,
  tempId,
  realMessage,
}: {
  data: InfiniteData<MessagesListResponse> | undefined;
  tempId: string;
  realMessage: MessageEntity;
}): InfiniteData<MessagesListResponse> | undefined {
  if (!data) return data;

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      messages: page.messages.map((m) => (m.id === tempId ? realMessage : m)),
    })),
  };
}

export function markTempMessageAsFailed({
  data,
  tempId,
}: {
  data: InfiniteData<MessagesListResponse> | undefined;
  tempId: string;
}): InfiniteData<MessagesListResponse> | undefined {
  if (!data) return data;

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      messages: page.messages.map((m) =>
        m.id === tempId ? ({ ...m, status: 'failed' } as UiMessage) : m,
      ),
    })),
  };
}

export function applyNewMessageToConversation({
  conversation,
  message,
}: {
  conversation: ConversationListItemEntity;
  message: MessageEntity;
}): ConversationListItemEntity {
  return {
    ...conversation,
    last_message: {
      content: message.content.slice(0, 60),
      sender_id: message.sender_id,
      created_at: message.created_at,
    },
    last_message_at: message.created_at,
  };
}

export function bumpConversationInList({
  conversationsList,
  conversationId,
  message,
}: {
  conversationsList: ConversationsListResponse | undefined;
  conversationId: string;
  message: MessageEntity;
}): ConversationsListResponse | undefined {
  if (!conversationsList) return conversationsList;

  const target = conversationsList.conversations.find(
    (c) => c.conversation_id === conversationId,
  );
  if (!target) return conversationsList;

  const updated = applyNewMessageToConversation({ conversation: target, message });

  return {
    conversations: [
      updated,
      ...conversationsList.conversations.filter((c) => c.conversation_id !== conversationId),
    ],
  };
}
