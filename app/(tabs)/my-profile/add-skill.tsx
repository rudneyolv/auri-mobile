import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/common/components/ui/button';
import { SkillMutationForm } from '@/modules/user/components/feature/forms/skill-mutation-form';
import { Text } from '@/common/components/ui/text';
import { X } from 'lucide-react-native';
import { Icon } from '@/common/components/ui/icon';
import { Card, CardContent } from '@/common/components/ui/card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function AddSkill() {
  return (
    <KeyboardAwareScrollView bottomOffset={10}>
      <View className="h-screen w-screen items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent>
            <SkillMutationForm
              onSubmit={(values) => {
                console.log('submit', values);
              }}
              isLoading={false}
            />
          </CardContent>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}
