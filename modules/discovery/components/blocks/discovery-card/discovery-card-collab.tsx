import { Separator } from '@/common/components/ui/separator';
import { Text } from '@/common/components/ui/text';
import { formatCollabPrice } from '@/modules/discovery/utils/format-collab-price';
import { View } from 'react-native';

interface DiscoveryCardCollabProps {
  min: number | null;
  max: number | null;
}

export function DiscoveryCardCollab({ min, max }: DiscoveryCardCollabProps) {
  return (
    <View className="gap-4">
      <Text className="text-sm text-muted-foreground">
        {formatCollabPrice({
          collab_price_min: min,
          collab_price_max: max,
        })}
      </Text>

      <Separator />
    </View>
  );
}

DiscoveryCardCollab.displayName = 'DiscoveryCardCollab';
