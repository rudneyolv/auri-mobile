import { SignInForm } from '@/modules/auth/components/feature/forms/sign-in-form/sign-in-form';
import { useSignIn } from '@/modules/auth/mutations/auth-queries';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Sign In',
  headerTransparent: true,
  headerShown: false,
};

export default function SignInScreen() {
  const { mutate, isPending, error } = useSignIn();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="h-full w-full sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive">
      <View>
        <Stack.Screen options={SCREEN_OPTIONS} />

        <SignInForm onSubmit={mutate} isPending={isPending} apiError={error} />
      </View>
    </ScrollView>
  );
}
