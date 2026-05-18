export type MessageContentType = 'text' | 'link';

export interface MessageEntity {
  id: string;
  conversation_id: string;
  sender_id: string;
  content_type: MessageContentType;
  content: string;
  is_read: boolean;
  created_at: string;
}

export type MessageStatus = 'sent' | 'sending' | 'failed';

export interface UiMessage extends MessageEntity {
  status?: MessageStatus;
}
