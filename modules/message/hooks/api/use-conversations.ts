import { ApiError } from '@/api';
import {
  archiveConversation,
  getConversation,
  getConversations,
} from '@/modules/message/api/conversations-api';
import {
  ConversationsListResponse,
  GetConversationResponse,
} from '@/modules/message/types/messages-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const conversationsKeys = {
  all: ['conversations'] as const,
  single: (conversationId: string) => ['conversations', conversationId] as const,
};

export function useFetchConversations() {
  return useQuery<ConversationsListResponse, ApiError>({
    queryKey: conversationsKeys.all,
    queryFn: getConversations,
    refetchOnMount: 'always',
  });
}

export function useFetchConversation(conversationId: string) {
  const qc = useQueryClient();

  return useQuery<GetConversationResponse, ApiError>({
    queryKey: conversationsKeys.single(conversationId),
    queryFn: () => getConversation(conversationId),
    staleTime: 30_000,
    initialData: () => {
      const list = qc.getQueryData<ConversationsListResponse>(conversationsKeys.all);
      return list?.conversations.find((c) => c.conversation_id === conversationId);
    },
    initialDataUpdatedAt: () =>
      qc.getQueryState(conversationsKeys.all)?.dataUpdatedAt,
  });
}

export function useArchiveConversation() {
  const qc = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: archiveConversation,
    onSuccess: (_data, conversationId) => {
      qc.setQueryData<ConversationsListResponse>(conversationsKeys.all, (old) => {
        if (!old) return old;
        return {
          conversations: old.conversations.filter((c) => c.conversation_id !== conversationId),
        };
      });

      qc.removeQueries({ queryKey: conversationsKeys.single(conversationId) });
    },
  });
}
