import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import baseQuery from './base-query';
import { logout, setCredentials } from './slices/auth-slice';
import type { RootState } from '../store';

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | null
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('Token expired, attempting to refresh...');

    const { isAuthenticated } = (api.getState() as RootState).auth;
    console.log('Is authenticated before refresh:', isAuthenticated);

    if (!isAuthenticated) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await baseQuery({
      url: 'auth/refresh', // эндпоинт для обновления токена
      method: 'POST',
      credentials: 'include',
    }, api, extraOptions);

    if (refreshResult.data) {
      const { accessToken: newAccessToken } = refreshResult.data as {
        accessToken: string;
      };

      api.dispatch(setCredentials({
        accessToken: newAccessToken,
      }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error('Failed to refresh accessToken:', refreshResult.error);
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;
