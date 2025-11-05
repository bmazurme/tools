import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const rainRunoffsApi = createApi({
  reducerPath: 'rainRunoffsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['RainRunoffs'],
  endpoints: () => ({}),
});

export default rainRunoffsApi;
