import { UiMessage } from '@/modules/message/types/message-entity';
import { GiftedChat as GiftedChatRaw, IMessage } from 'react-native-gifted-chat';

// react-native-gifted-chat@3.3.2 importa membros inexistentes de
// react-native-gesture-handler (`Text`, `Pressable`, `ReanimatedSwipeable`),
// quebrando o type-check do TSX. O cast isola o problema sem desligar
// type-checking do nosso código.
// TODO: remover este cast se/quando o gifted-chat publicar tipos compatíveis.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GiftedChat = GiftedChatRaw as unknown as React.ComponentType<any>;

export function toGiftedMessage({
  message,
  currentUserId,
  partnerName,
  partnerAvatar,
}: {
  message: UiMessage;
  currentUserId: string;
  partnerName: string | null;
  partnerAvatar: string | null;
}): IMessage {
  const isMine = message.sender_id === currentUserId;

  return {
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.created_at),
    user: {
      _id: message.sender_id,
      name: isMine ? undefined : (partnerName ?? undefined),
      avatar: isMine ? undefined : (partnerAvatar ?? undefined),
    },
    pending: message.status === 'sending',
    sent: !message.status || message.status === 'sent',
    received: message.is_read,
  };
}
