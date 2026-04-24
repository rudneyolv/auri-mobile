import { Badge } from '@/common/components/ui/badge';
import { Text } from '@/common/components/ui/text';
import { ProficiencyLevel } from '@/common/types/common-enums';
import { View } from 'react-native';

interface CollabCardCategoryProps {
  name: string | null;
  level: ProficiencyLevel | null;
  years: number | null;
}

export function CollabCardCategory({ name, level, years }: CollabCardCategoryProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm text-muted-foreground">{name ?? 'Categoria principal não informada'}</Text>

      <View className="flex-row flex-wrap gap-2">
        {level ? (
          <Badge>
            <Text className="text-xs">{level}</Text>
          </Badge>
        ) : null}

        {years !== null ? (
          <Badge variant="secondary">
            <Text className="text-xs">{years} anos</Text>
          </Badge>
        ) : null}
      </View>
    </View>
  );
}

CollabCardCategory.displayName = 'CollabCardCategory';
