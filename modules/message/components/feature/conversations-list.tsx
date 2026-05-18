import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';
import { ConversationListItem } from '@/modules/message/components/blocks/conversation-list-item';
import { ConversationsEmptyState } from '@/modules/message/components/blocks/conversations-empty-state';
import { ConversationListItemEntity } from '@/modules/message/types/conversation-entity';

interface ConversationsListProps {
  items: ConversationListItemEntity[];
}

export function ConversationsList({ items }: ConversationsListProps) {
  const router = useRouter();

  if (items.length === 0) {
    return <ConversationsEmptyState />;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.conversation_id}
      renderItem={({ item }) => (
        <ConversationListItem
          item={item}
          onPress={() => router.push(`/(tabs)/messages/${item.conversation_id}` as any)}
        />
      )}
      contentContainerClassName="py-2"
      ItemSeparatorComponent={() => <View className="h-px bg-border/40" />}
    />
  );
}
