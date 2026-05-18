import { apiRequest } from '@/api';
import {
  ConversationsListResponse,
  GetConversationResponse,
} from '@/modules/message/types/messages-api';

export async function getConversations() {
  return await apiRequest<ConversationsListResponse>({
    endpoint: 'conversations',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function getConversation(conversationId: string) {
  return await apiRequest<GetConversationResponse>({
    endpoint: `conversations/${conversationId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function archiveConversation(conversationId: string) {
  return await apiRequest<void>({
    endpoint: `conversations/${conversationId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'DELETE',
    },
  });
}
