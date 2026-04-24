import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import { useSendCollabRequest } from '@/modules/collab/hooks/api/use-collab-api';
import { DiscoveryCollabStatus } from '@/modules/collab/types/collab-entity';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

interface SendCollabRequestCtaProps {
  targetUserId: string;
  initialStatus?: DiscoveryCollabStatus;
}

function getCollabLabel({
  status,
  isPending,
}: {
  status: DiscoveryCollabStatus | null;
  isPending: boolean;
}) {
  if (isPending) {
    return 'Enviando...';
  }

  switch (status) {
    case 'accepted':
      return 'Conversar';
    case 'pending':
      return 'Enviado';
    default:
      return 'Solicitar collab';
  }
}

export function SendCollabRequestCta({
  targetUserId,
  initialStatus = null,
}: SendCollabRequestCtaProps) {
  const [localStatus, setLocalStatus] = useState<DiscoveryCollabStatus>(initialStatus);
  const { mutate: sendRequest, isPending, error } = useSendCollabRequest();

  const status = initialStatus ?? localStatus;

  const handlePress = () => {
    if (isPending) {
      return;
    }

    if (status === 'accepted') {
      router.push('/chat');
      return;
    }

    if (status === 'pending') {
      return;
    }

    sendRequest(
      { to_user_id: targetUserId },
      {
        onSuccess: (data) => {
          setLocalStatus(data.status);
        },
      }
    );
  };

  const label = getCollabLabel({ status, isPending });

  return (
    <View className="gap-2">
      <Button
        onPress={handlePress}
        disabled={isPending || status === 'pending'}
        variant={status === null ? 'default' : 'secondary'}>
        <Text>{label}</Text>
      </Button>

      <ApiErrorMessages messages={error?.messages} />
    </View>
  );
}
