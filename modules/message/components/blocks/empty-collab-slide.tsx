import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Text } from '@/common/components/ui/text';
import { ConversationOtherUser } from '@/modules/message/types/conversation-entity';
import { Pressable, View } from 'react-native';

interface EmptyCollabSlideProps {
  otherUser: ConversationOtherUser;
  onPress: () => void;
}

export function EmptyCollabSlide({ otherUser, onPress }: EmptyCollabSlideProps) {
  const name = otherUser.name ?? 'Usuário';
  const initial = name.charAt(0).toUpperCase();

  return (
    <Pressable onPress={onPress} className="w-20 items-center gap-2 active:opacity-70">
      <Avatar className="size-16" alt={name}>
        <AvatarImage src={otherUser.profile_picture_url ?? undefined} />
        <AvatarFallback>
          <Text className="text-lg font-semibold">{initial}</Text>
        </AvatarFallback>
      </Avatar>
      <Text numberOfLines={1} className="text-center text-xs">
        {name}
      </Text>
    </Pressable>
  );
}
