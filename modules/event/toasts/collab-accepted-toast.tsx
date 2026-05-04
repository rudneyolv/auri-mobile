import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Text } from '@/common/components/ui/text';
import { CollabAcceptedPayload } from '@/modules/event/payloads';
import { Pressable, View } from 'react-native';

interface CollabAcceptedToastProps {
  payload: CollabAcceptedPayload;
  onPress: () => void;
}

export function CollabAcceptedToast({ payload, onPress }: CollabAcceptedToastProps) {
  const { from_user } = payload;

  return (
    <Pressable
      onPress={onPress}
      className="mx-4 flex-row items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-md">
      <Avatar className="size-10" alt={from_user.name}>
        <AvatarImage src={from_user.profile_picture_url ?? undefined} />
        <AvatarFallback>
          <Text className="text-base font-semibold">
            {from_user.name.charAt(0).toUpperCase()}
          </Text>
        </AvatarFallback>
      </Avatar>

      <View className="flex-1">
        <Text className="text-sm font-semibold" numberOfLines={1}>
          {from_user.name}
        </Text>
        <Text className="text-xs text-muted-foreground" numberOfLines={2}>
          aceitou seu collab
        </Text>
      </View>
    </Pressable>
  );
}
