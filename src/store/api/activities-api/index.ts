import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const activitiesApi = createApi({
  reducerPath: 'activitiesApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Activities'],
  endpoints: () => ({}),
});

export default activitiesApi;
