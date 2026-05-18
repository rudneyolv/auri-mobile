import { Spinner } from '@/common/components/ui/spinner';
import { Text } from '@/common/components/ui/text';
import { ConversationsList } from '@/modules/message/components/feature/conversations-list';
import { EmptyCollabsSlider } from '@/modules/message/components/feature/empty-collabs-slider';
import { useFetchConversations } from '@/modules/message/hooks/api/use-conversations';
import { useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagesScreen() {
  const { data, isLoading } = useFetchConversations();

  const emptyCollabs = useMemo(
    () =>
      data?.conversations.filter((c) => !c.last_message).slice(0, 10) ?? [],
    [data],
  );

  const conversationsWithMessages = useMemo(
    () => data?.conversations.filter((c) => c.last_message) ?? [],
    [data],
  );

  const isEmpty =
    !isLoading &&
    emptyCollabs.length === 0 &&
    conversationsWithMessages.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="px-6 pb-3 pt-6">
        <Text className="text-2xl font-semibold">Mensagens</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner />
        </View>
      ) : (
        <>
          <EmptyCollabsSlider items={emptyCollabs} />
          {isEmpty ? (
            <View className="flex-1">
              <ConversationsList items={[]} />
            </View>
          ) : (
            <ConversationsList items={conversationsWithMessages} />
          )}
        </>
      )}
    </SafeAreaView>
  );
}
