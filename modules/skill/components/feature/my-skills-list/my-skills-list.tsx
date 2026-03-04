import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Icon } from '@/common/components/ui/icon';
import { Text } from '@/common/components/ui/text';
import { RemoveSkill } from '@/modules/skill/components/feature/remove-skill-dialog';
import { UserSkill } from '@/modules/skill/types/skill-entity';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { View } from 'react-native';

export function MySkillsList({ skills }: { skills: UserSkill[] }) {
  const router = useRouter();

  if (skills.length === 0) {
    return (
      <Text className="text-sm font-medium text-muted-foreground">
        Nenhuma habilidade cadastrada
      </Text>
    );
  }

  return (
    <View className="flex-col gap-2">
      {skills.map((data) => (
        <View key={data.id} className="relative rounded-xl border border-border bg-card p-3">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm font-medium">{data.name}</Text>

            <View className="flex flex-row items-center gap-1">
              <Button
                variant="ghost"
                className="size-7"
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/my-profile/update-skill/[id]',
                    params: { id: data.id },
                  })
                }>
                <Icon as={Pencil} />
              </Button>

              <RemoveSkill id={data.id} name={data.name} />
            </View>
          </View>

          <View className="mt-2 flex flex-row gap-3">
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
