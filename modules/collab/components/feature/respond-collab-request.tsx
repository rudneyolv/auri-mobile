import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import { useRespondToCollabRequest } from '@/modules/collab/hooks/api/use-collab-api';
import { Alert, View } from 'react-native';

interface RespondCollabRequestProps {
  requestId: string;
}

export function RespondCollabRequest({ requestId }: RespondCollabRequestProps) {
  const { mutate: respondToRequest, isPending, error } = useRespondToCollabRequest();

  const handleRespond = (action: 'accept' | 'decline') => {
    respondToRequest(
      {
        requestId,
        dto: { action },
      },
      {
        onSuccess: (_data, variables) => {
          if (variables.dto.action === 'accept') {
            Alert.alert('Collab aceita', 'Collab aceita. Agora vocês já podem conversar.');
          }
        },
      }
    );
  };

  return (
    <View className="gap-2">
      <View className="flex-row gap-2">
        <Button className="flex-1" onPress={() => handleRespond('accept')} disabled={isPending}>
          <Text>{isPending ? 'Salvando...' : 'Aceitar'}</Text>
        </Button>

        <Button
          className="flex-1"
          variant="secondary"
          onPress={() => handleRespond('decline')}
          disabled={isPending}>
          <Text>{isPending ? 'Salvando...' : 'Recusar'}</Text>
        </Button>
      </View>

      <ApiErrorMessages messages={error?.messages} />
    </View>
  );
}
