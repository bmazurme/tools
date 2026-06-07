import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const pipeDiameterCalculationApi = createApi({
  reducerPath: 'pipeDiameterCalculationApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['PipeDiameterCalculation'],
  endpoints: () => ({}),
});

export default pipeDiameterCalculationApi;
