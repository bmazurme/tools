import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const calculationMeterApi = createApi({
  reducerPath: 'calculationMeterApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['CalculationMeter'],
  endpoints: () => ({}),
});

export default calculationMeterApi;
