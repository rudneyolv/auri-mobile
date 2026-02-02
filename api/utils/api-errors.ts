/** @format */

import { AuthError } from '@supabase/supabase-js';

class ApiError extends Error {
  messages: string[];
  error?: string;
  statusCode?: number;

  constructor(data: { messages: string[]; error?: string; statusCode?: number }) {
    super(data.messages.join(' | ')); // mensagem principal para o stack trace
    this.messages = data.messages;
    this.error = data.error ?? 'common.messages.error.unknown';
    this.statusCode = data.statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const formatSupabaseError = (error: AuthError): ApiError => {
  return new ApiError({
    messages: [error.message ?? 'Erro desconhecido'],
    statusCode: error.status ?? 500,
    error: error.code ?? 'supabase_error',
  });
};

const handleApiError = ({
  error,
  fallbackMessage = 'Erro desconhecido na requisição',
}: {
  error: unknown;
  fallbackMessage?: string;
}): never => {
  if (error instanceof ApiError) throw error;

  // Se for um Error normal do JS
  if (error instanceof Error) {
    throw new ApiError({ messages: [error.message] });
  }

  // Se for um objeto com message do backend
  if (typeof error === 'object' && error !== null) {
    const errObj = error as { message?: string | string[]; error?: string; statusCode?: number };

    // Se vier um array de mensagens ou string
    const messages = Array.isArray(errObj.message)
      ? errObj.message
      : [errObj.message ?? fallbackMessage];

    throw new ApiError({
      messages,
      error: errObj.error,
      statusCode: errObj.statusCode,
    });
  }

  // fallback genérico
  throw new ApiError({ messages: [fallbackMessage] });
};

export { ApiError, formatSupabaseError, handleApiError };
