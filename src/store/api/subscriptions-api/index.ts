import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Subscriptions'],
  endpoints: () => ({}),
});

export default subscriptionsApi;
