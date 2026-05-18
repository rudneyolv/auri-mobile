export interface ConversationOtherUser {
  user_id: string;
  name: string | null;
  profile_picture_url: string | null;
}

export interface ConversationLastMessage {
  content: string;
  sender_id: string;
  created_at: string;
}

export interface ConversationListItemEntity {
  conversation_id: string;
  other_user: ConversationOtherUser;
  last_message: ConversationLastMessage | null;
  unread_count: number;
  last_message_at: string | null;
}
