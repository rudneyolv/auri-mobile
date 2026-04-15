import { Badge } from '@/common/components/ui/badge';
import { Text } from '@/common/components/ui/text';

export function DiscoveryCardGenresItem({ children }: React.PropsWithChildren) {
  return (
    <Badge variant="outline">
      <Text className="text-xs">{children}</Text>
    </Badge>
  );
}

DiscoveryCardGenresItem.displayName = 'DiscoveryCardGenresItem';
