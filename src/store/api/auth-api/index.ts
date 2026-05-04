import { createApi, retry } from '@reduxjs/toolkit/query/react';

import oauthQuery from '../../base-query';

export const baseQueryWithRetry = retry(oauthQuery, { maxRetries: 0 });

// Define a service using a base URL and expected endpoints
const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['auth'],
  endpoints: () => ({}),
});

export default authApi;
