/** @format */

import { AuthError } from '@supabase/supabase-js';
import { ApiError } from '../types/api-error-types';
import { ApiErrorSchema } from '../schemas/api-error-schema';

interface HandleApiErrorProps {
  error: unknown;
  fallbackMessage: string;
}

const createApiError = (data: {
  messages: string[];
  error?: string;
  statusCode?: number;
}): ApiError => {
  const { messages, error = 'common.messages.error.unknown', statusCode } = data;

  return {
    messages,
    error,
    statusCode,
  };
};

const formatSupabaseError = (error: AuthError): ApiError => {
  return createApiError({
    messages: [error.message ?? 'common.messages.error.unknown'],
    statusCode: error.status ?? 500,
    error: error.code ?? 'supabase_error',
  });
};

const isApiError = (error: unknown): error is ApiError => {
  return ApiErrorSchema.safeParse(error).success;
};

const handleApiError = ({ error, fallbackMessage }: HandleApiErrorProps): never => {
  if (isApiError(error)) {
    throw error;
  }

  if (error instanceof Error) {
    throw createApiError({ messages: [error.message] });
  }

  throw createApiError({ messages: [fallbackMessage] });
};

export { createApiError, formatSupabaseError, handleApiError, isApiError };
