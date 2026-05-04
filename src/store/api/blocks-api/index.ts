import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const blocksApi = createApi({
  reducerPath: 'blocksApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Blocks'],
  endpoints: () => ({}),
});

export default blocksApi;
