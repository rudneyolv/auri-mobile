/** @format */

import { handleApiError, formatSupabaseError, createApiError } from './utils/api-errors';
import { ENV } from '@/config/env';
import { supabase } from '@/common/libs/supabase/supabase';

interface ApiRequestOptions {
  endpoint: string;
  defaultErrorMessage?: string;
  requestConfig?: RequestInit;
  requiresAuth?: boolean;
}

export async function apiRequest<T>(data: ApiRequestOptions): Promise<T> {
  const {
    endpoint,
    defaultErrorMessage = 'Erro desconhecido na requisição',
    requestConfig: initConfig,
    requiresAuth: requireAuth = false,
  } = data;

  try {
    const url = `${ENV.EXPO_PUBLIC_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    let headers: HeadersInit = {
      ...initConfig?.headers,
    };

    // Handle auth
    if (requireAuth) {
      const {
        data: { session },
        error: supabaseError,
      } = await supabase.auth.getSession();

      if (supabaseError) throw formatSupabaseError(supabaseError);

      if (!session) {
        throw createApiError({
          messages: ['Você precisa estar logado para acessar essa rota.'],
          error: 'not_logged_in',
        });
      }

      headers = {
        ...headers,
        Authorization: `Bearer ${session.access_token}`,
      };
    }

    const config: RequestInit = {
      ...initConfig,
      headers,
    };

    const response = await fetch(url, config);
    const isNoContent = response.status === 204;
    const contentType = response.headers.get('content-type');
    const hasJsonBody = !isNoContent && contentType?.includes('application/json');
    const result = hasJsonBody ? await response.json() : null;

    if (!response.ok) {
      handleApiError({ error: result, fallbackMessage: defaultErrorMessage });
    }

    return result as T;
  } catch (error: unknown) {
    console.log('🔴 - Erro na requisição', error);
    throw handleApiError({ error, fallbackMessage: defaultErrorMessage });
  }
}
