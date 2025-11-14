import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { toaster } from '../main';
import { VITE_API_URL } from '../utils/constants';

const BASE_PROJECT_API_URL = VITE_API_URL;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_PROJECT_API_URL,
  prepareHeaders: (headers) => headers,
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | null
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 400) {
    toaster.add({
      title: '400',
      name: '400',
      theme: 'danger',
    });
  } else if (result.error && result.error.status === 401) {
    toaster.add({
      title: '401',
      name: '401',
      theme: 'danger',
    });
  } else if (result.error && result.error.status === 404) {
    toaster.add({
      title: 'Not fount 404',
      name: '404',
      theme: 'danger',
    });
  } else if (result.error && result.error.status === 500) {
    toaster.add({
      title: '500',
      name: '500',
      theme: 'danger',
    });
  }

  return result;
};

export default baseQueryWithReauth;
