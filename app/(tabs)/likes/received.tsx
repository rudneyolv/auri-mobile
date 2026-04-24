import { CollabListEmptyState } from '@/app-ui/tabs/likes/collab-list-empty-state';
import { ReceivedCollabCard } from '@/app-ui/tabs/likes/received-collab-card';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Spinner } from '@/common/components/ui/spinner';
import { Text } from '@/common/components/ui/text';
import { useReceivedCollabRequests } from '@/modules/collab/hooks/api/use-collab-api';
import { FlatList, View } from 'react-native';

export default function ReceivedCollabsScreen() {
  const { data, isLoading, error } = useReceivedCollabRequests();

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
      renderItem={({ item }) => <ReceivedCollabCard item={item} />}
      contentContainerClassName="gap-4 p-6"
      ListHeaderComponent={
        <Text className="text-sm text-muted-foreground">
          {`${data?.length ?? 0} solicitações pendentes`}
        </Text>
      }
      ListEmptyComponent={
        <CollabListEmptyState message="Nenhuma solicitação recebida por enquanto." />
      }
    />
  );
}
