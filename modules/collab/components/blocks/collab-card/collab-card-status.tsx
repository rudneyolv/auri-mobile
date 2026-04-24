import { Badge } from '@/common/components/ui/badge';
import { Text } from '@/common/components/ui/text';
import { CollabRequestStatus } from '@/modules/collab/types/collab-entity';

interface CollabCardStatusProps {
  status: CollabRequestStatus;
}

function getStatusLabel(status: CollabRequestStatus) {
  switch (status) {
    case 'accepted':
      return 'Aceita';
    case 'declined':
      return 'Recusada';
    default:
      return 'Pendente';
  }
}

function getStatusVariant(status: CollabRequestStatus): 'default' | 'secondary' | 'destructive' {
  switch (status) {
    case 'accepted':
      return 'default';
    case 'declined':
      return 'destructive';
    default:
      return 'secondary';
  }
}

export function CollabCardStatus({ status }: CollabCardStatusProps) {
  return (
    <Badge variant={getStatusVariant(status)}>
      <Text className="text-xs">{getStatusLabel(status)}</Text>
    </Badge>
  );
}

CollabCardStatus.displayName = 'CollabCardStatus';
