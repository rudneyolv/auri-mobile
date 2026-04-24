import { CollabListEmptyState } from '@/app-ui/tabs/likes/collab-list-empty-state';
import { SentCollabCard } from '@/app-ui/tabs/likes/sent-collab-card';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Spinner } from '@/common/components/ui/spinner';
import { Text } from '@/common/components/ui/text';
import { useSentCollabRequests } from '@/modules/collab/hooks/api/use-collab-api';
import { FlatList, View } from 'react-native';

export default function SentCollabsScreen() {
  const { data, isLoading, error } = useSentCollabRequests();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Spinner />
      </View>
    );
  }

  if (error) {
    return (
      <View className="gap-4 px-6 py-6">
        <ApiErrorMessages messages={error.messages} />
      </View>
    );
  }

  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(item) => item.request_id}
      renderItem={({ item }) => <SentCollabCard item={item} />}
      contentContainerClassName="gap-4 p-6"
      ListHeaderComponent={
        <Text className="text-sm text-muted-foreground">{`${data?.length ?? 0} collabs enviadas`}</Text>
      }
      ListEmptyComponent={
        <CollabListEmptyState message="Você ainda não enviou nenhuma solicitação de collab." />
      }
    />
  );
}
