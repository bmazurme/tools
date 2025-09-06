import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const rainRoofsApi = createApi({
  reducerPath: 'rainRoofsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['RainRoofs'],
  endpoints: () => ({}),
});

export default rainRoofsApi;
