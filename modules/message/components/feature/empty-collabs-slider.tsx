import { Text } from '@/common/components/ui/text';
import { EmptyCollabSlide } from '@/modules/message/components/blocks/empty-collab-slide';
import { ConversationListItemEntity } from '@/modules/message/types/conversation-entity';
import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';

interface EmptyCollabsSliderProps {
  items: ConversationListItemEntity[];
}

export function EmptyCollabsSlider({ items }: EmptyCollabsSliderProps) {
  const router = useRouter();

  if (items.length === 0) return null;

  return (
    <View className="gap-3 border-b border-border/40 px-4 pb-4 pt-2">
      <Text className="px-2 text-sm font-semibold text-muted-foreground">
        Novos collabs
      </Text>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.conversation_id}
        renderItem={({ item }) => (
          <EmptyCollabSlide
            otherUser={item.other_user}
            onPress={() => router.push(`/(tabs)/messages/${item.conversation_id}` as any)}
          />
        )}
        contentContainerClassName="gap-4 px-2"
      />
    </View>
  );
}
