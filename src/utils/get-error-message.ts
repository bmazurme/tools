import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface ApiErrorData {
  message?: string | string[];
  error?: string;
}

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => (
  typeof error === 'object' && error !== null && 'status' in error
);

const getErrorMessage = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    const { data, status, error: fetchError } = error as FetchBaseQueryError & { error?: string };

    if (data && typeof data === 'object') {
      const { message, error: dataError } = data as ApiErrorData;

      if (Array.isArray(message)) return message.join(', ');
      if (typeof message === 'string') return message;
      if (typeof dataError === 'string') return dataError;
    }

    if (typeof fetchError === 'string') return fetchError;

    return `Ошибка запроса (${status})`;
  }

  if (error instanceof Error) return error.message;

  if (typeof error === 'string') return error;

  if (
    typeof error === 'object'
    && error !== null
    && 'message' in error
    && typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }

  return 'Неизвестная ошибка';
};

export default getErrorMessage;
