import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const rainConditionsApi = createApi({
  reducerPath: 'rainConditionsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['RainConditions'],
  endpoints: () => ({}),
});

export default rainConditionsApi;
