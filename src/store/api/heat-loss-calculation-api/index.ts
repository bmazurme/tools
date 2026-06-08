import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const heatLossCalculationApi = createApi({
  reducerPath: 'heatLossCalculationApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['HeatLossCalculation'],
  endpoints: () => ({}),
});

export default heatLossCalculationApi;
