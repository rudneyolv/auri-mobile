import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/common/components/ui/button';
import { SkillMutationForm } from '@/modules/user/components/feature/forms/skill-mutation-form';
import { Text } from '@/common/components/ui/text';
import { X } from 'lucide-react-native';
import { Icon } from '@/common/components/ui/icon';
import { Card, CardContent } from '@/common/components/ui/card';
import { Skill } from '@/data/mock';
import { useGetUserSkill, useUpdateSkill } from '@/modules/skills/hooks/api/use-skills-api';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { YearsOfExperience } from '@/common/types/common-enums';

export default function UpdateSkill() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { mutate: updateSkill, isPending } = useUpdateSkill();
  const { data, isLoading } = useGetUserSkill(id!);

  if (!id) {
    return <Text>ID inválido</Text>;
  }

  if (isLoading || !data) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View className="h-full w-full items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent>
          <SkillMutationForm
            onSubmit={(values) =>
              updateSkill(
                {
                  skillId: id,
                  dto: {
                    proficiency_level: values.proficiency_level,
                    years_experience: values.years_experience,
                  },
                },
                {
                  onSuccess: () => {
                    router.push('/(tabs)/my-profile');
                  },
                }
              )
            }
            isLoading={isPending}
            defaultValues={{
              proficiency_level: {
                label: data.proficiency_level,
                value: data.proficiency_level,
              },
              years_experience: {
                label: data.years_experience.toString(),
                value: data.years_experience.toString() as YearsOfExperience,
              },
              skill: {
                label: data.name,
                value: data.id,
              },
            }}
          />
        </CardContent>
      </Card>
    </View>
  );
}
