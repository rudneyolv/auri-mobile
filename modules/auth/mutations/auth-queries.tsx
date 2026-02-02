import { ApiError } from '@/api';
import { signIn, signUp } from '@/modules/auth/api/auth-api';
import { SignInFormValues, SignUpFormValues } from '@/modules/auth/schemas/auth-schema';
import { useMutation } from '@tanstack/react-query';

export function useSignIn() {
  return useMutation<void, ApiError, SignInFormValues>({
    mutationFn: signIn,
  });
}

export function useSignUp() {
  return useMutation<void, ApiError, SignUpFormValues>({
    mutationFn: signUp,
  });
}
