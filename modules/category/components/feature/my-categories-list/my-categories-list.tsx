import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Icon } from '@/common/components/ui/icon';
import { Text } from '@/common/components/ui/text';
import { RemoveCategory } from '@/modules/category/components/feature/remove-category-dialog';
import { UserCategory } from '@/modules/category/types/category-entity';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { View } from 'react-native';

export function MyCategoriesList({ categories }: { categories: UserCategory[] }) {
  const router = useRouter();
  const haveOnlyOne = categories.length === 1;

  return (
    <View className="flex-col gap-2">
      {categories.map((data) => (
        <View key={data.id} className="relative rounded-xl border border-border bg-card p-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm font-medium">{data.slug}</Text>

            <View className="flex flex-row items-center gap-1">
              <Button
                variant="ghost"
                className="size-7"
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/my-profile/update-category/[id]',
                    params: { id: data.id },
                  })
                }>
                <Icon as={Pencil} />
              </Button>

              {!haveOnlyOne && <RemoveCategory id={data.id} name={data.slug} />}
            </View>
          </View>

          <View className="mt-2 flex flex-row gap-3">
            {data.is_primary && (
              <Badge>
                <Text className="text-xs">Principal</Text>
              </Badge>
            )}

            <Badge variant="secondary">
              <Text className="text-xs">{data.proficiency_level}</Text>
            </Badge>

            <Badge variant="secondary">
              <Text className="text-xs">{data.years_experience} anos</Text>
            </Badge>
          </View>
        </View>
      ))}
    </View>
  );
}
