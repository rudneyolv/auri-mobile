import {
  MessageContentType,
  MessageEntity,
} from '@/modules/message/types/message-entity';
import { ConversationListItemEntity } from '@/modules/message/types/conversation-entity';

export interface ConversationsListResponse {
  conversations: ConversationListItemEntity[];
}

export type GetConversationResponse = ConversationListItemEntity;

export interface MessagesListResponse {
  messages: MessageEntity[];
  has_more: boolean;
}

export interface SendMessageDto {
  content_type: MessageContentType;
  content: string;
}

export type SendMessageResponse = MessageEntity;

export interface MarkAsReadResponse {
  updated: number;
}
