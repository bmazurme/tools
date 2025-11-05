import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

const rainPlacesApi = createApi({
  reducerPath: 'rainPlacesApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['RainPlaces'],
  endpoints: () => ({}),
});

export default rainPlacesApi;
