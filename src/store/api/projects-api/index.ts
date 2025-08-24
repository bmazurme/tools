import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Projects'],
  endpoints: () => ({}),
});

export default projectsApi;
