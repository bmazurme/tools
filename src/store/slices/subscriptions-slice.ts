/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type SubscriptionsState = {
  isActive: boolean;
  id: number | null;
};

export const initialStateSubscriptions: SubscriptionsState = {
  isActive: false,
  id: null,
};

const sliceSubscriptions = createSlice({
  name: 'subscriptions',
  initialState: initialStateSubscriptions,
  reducers: {
    setStatus: (state, action) => {
      state.isActive = action.payload.isActive;
      state.id = action.payload.id;
    },
  },
});

export const { setStatus } = sliceSubscriptions.actions;
export default sliceSubscriptions.reducer;
export const subscriptionsSelector = (state: RootState) => state.subscriptions.isActive;
export const subscriptionIdSelector = (state: RootState) => state.subscriptions.id;
