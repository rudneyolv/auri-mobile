import { Badge } from '@/common/components/ui/badge';
import { Text } from '@/common/components/ui/text';
import { RemoveGenre } from '@/modules/genre/components/feature/remove-genre-dialog';
import { UserGenre } from '@/modules/genre/types/genre-entity';
import { View } from 'react-native';

export function MyGenresList({ genres }: { genres: UserGenre[] }) {
  if (genres.length === 0) {
    return (
      <Text className="text-sm font-medium text-muted-foreground">Nenhum gênero cadastrado</Text>
    );
  }

  return (
    <View className="flex flex-col gap-2">
      {genres.map((data) => (
        <View key={data.id} className="relative rounded-xl border border-border bg-card p-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm font-medium">{data.name}</Text>
            <RemoveGenre id={data.id} name={data.name} />
          </View>

          {data.is_primary && (
            <Badge variant="outline">
              <Text className="text-xs">Principal</Text>
            </Badge>
          )}
        </View>
      ))}
    </View>
  );
}
