import { Text } from '@/common/components/ui/text';
import { CollabCard } from '@/modules/collab/components/blocks/collab-card';

interface CollabListEmptyStateProps {
  message: string;
}

export function CollabListEmptyState({ message }: CollabListEmptyStateProps) {
  return (
    <CollabCard.Root>
      <CollabCard.Content>
        <Text className="text-sm text-muted-foreground">{message}</Text>
      </CollabCard.Content>
    </CollabCard.Root>
  );
}
