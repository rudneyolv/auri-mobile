import { Badge } from '@/common/components/ui/badge';
import { Text } from '@/common/components/ui/text';
import { RemoveGenre } from '@/modules/genre/components/feature/remove-genre-dialog';
import { UserGenre } from '@/modules/genre/types/genre-entity';
import { View } from 'react-native';

export function MyGenresList({ genres }: { genres: UserGenre[] }) {
  return (
    <View className="gap-256 grid grid-cols-2">
      {genres.map((data) => (
        <View key={data.id} className="relative rounded-xl border border-border bg-card p-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm font-medium">{data.name}</Text>
            <RemoveGenre id={data.id} name={data.name} />
          </View>

          {data.is_primary && (
            <View className="mt-2">
              <Badge>
                <Text className="text-xs">Principal</Text>
              </Badge>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
