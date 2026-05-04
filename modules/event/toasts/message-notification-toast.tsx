import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Text } from '@/common/components/ui/text';
import { MessageNotificationPayload } from '@/modules/event/payloads';
import { Pressable, View } from 'react-native';

interface MessageNotificationToastProps {
  payload: MessageNotificationPayload;
  onPress: () => void;
}

export function MessageNotificationToast({ payload, onPress }: MessageNotificationToastProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-4 flex-row items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-md">
      <Avatar className="size-10" alt={payload.sender_name}>
        <AvatarImage src={undefined} />
        <AvatarFallback>
          <Text className="text-base font-semibold">
            {payload.sender_name.charAt(0).toUpperCase()}
          </Text>
        </AvatarFallback>
      </Avatar>

      <View className="flex-1">
        <Text className="text-sm font-semibold" numberOfLines={1}>
          {payload.sender_name}
        </Text>
        <Text className="text-xs text-muted-foreground" numberOfLines={2}>
          {payload.preview}
        </Text>
      </View>
    </Pressable>
  );
}
