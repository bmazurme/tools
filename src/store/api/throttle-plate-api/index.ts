import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const throttlePlateApi = createApi({
  reducerPath: 'throttlePlateApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['ThrottlePlate'],
  endpoints: () => ({}),
});

export default throttlePlateApi;
