import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { VITE_API_URL } from '../utils/constants';
import type { RootState } from '.';

const BASE_PROJECT_API_URL = VITE_API_URL;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_PROJECT_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;
    // console.log('Preparing headers with accessToken:', accessToken);

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
  credentials: 'include',
});

export default baseQuery;
