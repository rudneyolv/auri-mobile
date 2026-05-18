import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Text } from '@/common/components/ui/text';
import { ConversationListItemEntity } from '@/modules/message/types/conversation-entity';
import { formatMessageTime } from '@/modules/message/utils/format-message-time';
import { Pressable, View } from 'react-native';

interface ConversationListItemProps {
  item: ConversationListItemEntity;
  onPress: () => void;
}

export function ConversationListItem({ item, onPress }: ConversationListItemProps) {
  const name = item.other_user.name ?? 'Usuário';
  const initial = name.charAt(0).toUpperCase();
  const preview = item.last_message?.content ?? 'Nenhuma mensagem ainda';
  const time = formatMessageTime(item.last_message_at);
  const hasUnread = item.unread_count > 0;

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-lg px-4 py-3 active:bg-muted">
      <Avatar className="size-14" alt={name}>
        <AvatarImage src={item.other_user.profile_picture_url ?? undefined} />
        <AvatarFallback>
          <Text className="text-base font-semibold">{initial}</Text>
        </AvatarFallback>
      </Avatar>

      <View className="flex-1 gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold" numberOfLines={1}>
            {name}
          </Text>
          {time ? (
            <Text
              className={`text-xs ${hasUnread ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
              {time}
            </Text>
          ) : null}
        </View>

        <View className="flex-row items-center justify-between gap-2">
          <Text
            numberOfLines={1}
            className={`flex-1 text-sm ${hasUnread ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
            {preview}
          </Text>

          {hasUnread && (
            <View className="h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5">
              <Text className="text-[11px] font-semibold text-primary-foreground">
                {item.unread_count > 99 ? '99+' : item.unread_count}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
