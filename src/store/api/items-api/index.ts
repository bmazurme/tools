import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Items'],
  endpoints: () => ({}),
});

export default itemsApi;
