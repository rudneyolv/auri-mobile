import React from 'react';
import { View } from 'react-native';
import { Card, CardContent } from '@/common/components/ui/card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter } from 'expo-router';
import { CategoryMutationForm } from '@/modules/category/components/feature/forms/category-mutation-form';
import { useCreateCategory } from '@/modules/category/hooks/api/use-category-api';

export default function AddCategoryScreen() {
  const { mutate: createCategory, isPending, error } = useCreateCategory();
  const router = useRouter();

  return (
    <KeyboardAwareScrollView bottomOffset={10}>
      <View className="h-screen w-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent>
            <CategoryMutationForm
              onSubmit={(values) =>
                createCategory(values, {
                  onSuccess: () => {
                    router.push('/my-profile');
                  },
                })
              }
              isLoading={isPending}
              apiError={error ?? undefined}
            />
          </CardContent>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}
