import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Payments'],
  endpoints: () => ({}),
});

export default paymentsApi;
