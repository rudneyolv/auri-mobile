import { apiRequest, formatSupabaseError, handleApiError } from '@/api';
import { supabase } from '@/common/libs/supabase/supabase';
import { SignInFormValues, SignUpFormValues } from '@/modules/auth/schemas/auth-schema';

export async function signIn(data: SignInFormValues) {
  try {
    const { error: supabaseError, data: session } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (supabaseError) {
      //TODO: Traduzir mensagens de erro
      throw formatSupabaseError(supabaseError);
    }
  } catch (error) {
    handleApiError({
      error,
      fallbackMessage: 'Erro desconhecido ao tentar fazer login. Tente novamente mais tarde.',
    });
  }
}

export async function signUp(data: SignUpFormValues): Promise<void> {
  await apiRequest({
    endpoint: '/users',
    requestConfig: {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}
