import { useFetchConversations } from '@/modules/message/hooks/api/use-conversations';
import { ConversationListItemEntity } from '@/modules/message/types/conversation-entity';

/**
 * Soma o número total de mensagens não lidas em todas as conversas do usuário.
 * Usado, por exemplo, para mostrar o badge da bottom tab.
 */
export function useTotalUnreadCount(): number {
  const { data } = useFetchConversations();
  if (!data) return 0;

  return sumUnreadCounts(data.conversations);
}

function sumUnreadCounts(conversations: ConversationListItemEntity[]): number {
  let total = 0;

  for (const conversation of conversations) {
    total += conversation.unread_count ?? 0;
  }

  return total;
}
