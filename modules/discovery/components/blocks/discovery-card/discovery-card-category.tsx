import { Badge } from '@/common/components/ui/badge';
import { Text } from '@/common/components/ui/text';
import { ProficiencyLevel } from '@/common/types/common-enums';
import { View } from 'react-native';

interface DiscoveryCardCategoryProps {
  name: string;
  level: ProficiencyLevel;
  years: number;
}

export function DiscoveryCardCategory({ name, level, years }: DiscoveryCardCategoryProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm text-muted-foreground">{name}</Text>

      <View className="flex-row flex-wrap gap-2">
        <Badge>
          <Text className="text-xs">{level}</Text>
        </Badge>

        <Badge variant="secondary">
          <Text className="text-xs">{years} anos</Text>
        </Badge>
      </View>
    </View>
  );
}

DiscoveryCardCategory.displayName = 'DiscoveryCardCategory';
