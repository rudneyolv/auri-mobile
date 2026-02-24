import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Text } from '@/common/components/ui/text';
import { SignInForm } from '@/modules/auth/components/feature/forms/sign-in-form/sign-in-form';
import { SignUpForm } from '@/modules/auth/components/feature/forms/sign-up-form/sign-up-form';
import { useSignUp } from '@/modules/auth/mutations/auth-queries';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Sign In',
  headerTransparent: true,
  headerShown: false,
};

export default function SignUpScreen() {
  const { mutate, isPending, error } = useSignUp();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="h-full w-full sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive">
      <View>
        <Stack.Screen options={SCREEN_OPTIONS} />

        <SignUpForm onSubmit={mutate} isPending={isPending} apiError={error} />
      </View>
    </ScrollView>
  );
}
