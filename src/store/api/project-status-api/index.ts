import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const projectStatusApi = createApi({
  reducerPath: 'projectStatusApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['ProjectStatus'],
  endpoints: () => ({}),
});

export default projectStatusApi;
