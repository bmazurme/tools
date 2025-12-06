import { createSlice } from '@reduxjs/toolkit';

import { subscriptionsApiEndpoints } from '../api/subscriptions-api/endpoints/index';
import type { RootState } from '..';

type SubscriptionsState = {
  isActive: boolean;
};

export const initialStateSubscriptions: SubscriptionsState = {
  isActive: false,
};

const slice = createSlice({
  name: 'subscriptions',
  initialState: initialStateSubscriptions,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        subscriptionsApiEndpoints.endpoints.getStatus.matchFulfilled,
        (state, { payload }) => ({ ...state, isActive: payload.isActive }),
      );
  },
});

export default slice.reducer;
export const subscriptionsSelector = (state: RootState) => state.subscriptions.isActive;
