import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const heatConsumptionApi = createApi({
  reducerPath: 'heatConsumptionApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['HeatConsumption'],
  endpoints: () => ({}),
});

export default heatConsumptionApi;
