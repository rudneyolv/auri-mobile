import React from 'react';
import { View } from 'react-native';
import { SkillMutationForm } from '@/modules/user/components/feature/forms/skill-mutation-form';
import { Text } from '@/common/components/ui/text';
import { Card, CardContent } from '@/common/components/ui/card';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { YearsOfExperience } from '@/common/types/common-enums';
import { CategoryMutationForm } from '@/modules/category/components/feature/forms/category-mutation-form';
import {
  useGetUserCategory,
  useUpdateCategory,
} from '@/modules/category/hooks/api/use-category-api';

export default function UpdateCategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { mutate: updateCategory, isPending } = useUpdateCategory();
  const { data, isLoading } = useGetUserCategory(id);

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
          <CategoryMutationForm
            onSubmit={(values) =>
              updateCategory(
                {
                  categoryId: id,
                  dto: {
                    proficiency_level: values.proficiency_level,
                    years_experience: values.years_experience,
                    is_primary: values.is_primary,
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
              category: {
                label: data.name,
                value: data.id,
              },
              is_primary: data.is_primary,
            }}
            capabilities={{
              category: {
                enabled: false,
                guidance: {
                  reason:
                    'Você não pode alterar a categoria. Se quiser, exclua a categoria e crie uma nova.',
                },
              },
            }}
          />
        </CardContent>
      </Card>
    </View>
  );
}
