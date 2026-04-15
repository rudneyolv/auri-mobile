import { Badge } from '@/common/components/ui/badge';
import { Text } from '@/common/components/ui/text';
import { View } from 'react-native';

interface DiscoveryCardSkillsItemProps {
  name: string;
  level: string;
  years: number | null;
}

export function DiscoveryCardSkillsItem({ name, level, years }: DiscoveryCardSkillsItemProps) {
  return (
    <View className="rounded-xl border border-border bg-card p-3">
      <Text className="text-sm font-medium">{name}</Text>

      <View className="mt-2 flex-row gap-2">
        <Badge variant="secondary">
          <Text className="text-xs">{level}</Text>
        </Badge>

        {years !== null && (
          <Badge variant="secondary">
            <Text className="text-xs">{years} anos</Text>
          </Badge>
        )}
      </View>
    </View>
  );
}

DiscoveryCardSkillsItem.displayName = 'DiscoveryCardSkillsItem';
