import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query-with-reauth';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Chats'],
  endpoints: () => ({}),
});

export default chatApi;
