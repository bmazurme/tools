import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const collectorCalculationApi = createApi({
  reducerPath: 'collectorCalculationApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['CollectorCalculation'],
  endpoints: () => ({}),
});

export default collectorCalculationApi;
