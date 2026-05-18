import { apiRequest } from '@/api';
import {
  MarkAsReadResponse,
  MessagesListResponse,
  SendMessageDto,
  SendMessageResponse,
} from '@/modules/message/types/messages-api';

interface GetMessagesParams {
  conversationId: string;
  limit?: number;
  before?: string;
}

export async function getMessages({ conversationId, limit, before }: GetMessagesParams) {
  const params = new URLSearchParams();
  if (limit) params.append('limit', String(limit));
  if (before) params.append('before', before);

  const query = params.toString();
  const endpoint = `conversations/${conversationId}/messages${query ? `?${query}` : ''}`;

  return await apiRequest<MessagesListResponse>({
    endpoint,
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function sendMessage({
  conversationId,
  dto,
}: {
  conversationId: string;
  dto: SendMessageDto;
}) {
  return await apiRequest<SendMessageResponse>({
    endpoint: `conversations/${conversationId}/messages`,
    requiresAuth: true,
    requestConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    },
  });
}

export async function markConversationAsRead(conversationId: string) {
  return await apiRequest<MarkAsReadResponse>({
    endpoint: `conversations/${conversationId}/read`,
    requiresAuth: true,
    requestConfig: {
      method: 'PATCH',
    },
  });
}
