import React from 'react';
import { View } from 'react-native';
import { Text } from '@/common/components/ui/text';
import { Card, CardContent } from '@/common/components/ui/card';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { YearsOfExperience } from '@/common/types/common-enums';
import { useGetUserSkill, useUpdateSkill } from '@/modules/skill/hooks/api/use-skill-api';
import { SkillMutationForm } from '@/modules/skill/components/feature/forms/skill-mutation-form';
import { UpdateBio } from '@/modules/profiles/components/feature/forms/update-bio';

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
          <UpdateBio
            currentBio={myProfile.bio || ''}
            onSubmit={(newBio) => updateBio(newBio)}
            isLoading={isUpdatingBio}
            apiError={bioUpdateError}
          />{' '}
        </CardContent>
      </Card>
    </View>
  );
}
