import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Icon } from '@/common/components/ui/icon';
import { Text } from '@/common/components/ui/text';
import { ConversationOtherUser } from '@/modules/message/types/conversation-entity';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatHeaderProps {
  partner: ConversationOtherUser;
}

export function ChatHeader({ partner }: ChatHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const name = partner.name ?? 'Usuário';
  const initial = name.charAt(0).toUpperCase();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="border-b border-border/40 bg-background">
      <View className="flex-row items-center gap-3 px-4 pb-3 pt-2">
        <Pressable onPress={() => router.back()} className="p-1 active:opacity-60">
          <Icon as={ChevronLeft} className="size-6" />
        </Pressable>

        <Avatar className="size-10" alt={name}>
          <AvatarImage src={partner.profile_picture_url ?? undefined} />
          <AvatarFallback>
            <Text className="text-sm font-semibold">{initial}</Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-1">
          <Text className="font-semibold" numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
}
