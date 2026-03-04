import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, CardContent } from '@/common/components/ui/card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRouter } from 'expo-router';
import { useCreateSkill } from '@/modules/skill/hooks/api/use-skill-api';
import { SkillMutationForm } from '@/modules/skill/components/feature/forms/skill-mutation-form';

export default function AddSkillScreen() {
  const { mutate: createSkill, isPending, error } = useCreateSkill();
  const router = useRouter();

  return (
    <KeyboardAwareScrollView bottomOffset={10}>
      <View className="h-screen w-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent>
            <SkillMutationForm
              onSubmit={(values) =>
                createSkill(values, {
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
