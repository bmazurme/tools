import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const documentsApi = createApi({
  reducerPath: 'documentsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Documents'],
  endpoints: () => ({}),
});

export default documentsApi;
