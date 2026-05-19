/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type ThrottlePlateBlocksState = {
  data: [],
  throttlePlate: ItemType | null;
};

export const initialStateThrottlePlateBlock: ThrottlePlateBlocksState = {
  data: [],
  throttlePlate: null,
};

const throttlePlateSlice = createSlice({
  name: 'throttle-plate',
  initialState: initialStateThrottlePlateBlock,
  reducers: {
    setThrottlePlate: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.throttlePlate = payload.item;
    },
  },
});

export const {
  setThrottlePlate,
} = throttlePlateSlice.actions;
export default throttlePlateSlice.reducer;
export const throttlePlateSelector = (state: RootState) => state.throttlePlate.data;
export const throttlePlateItemSelector = (state: RootState) => state.throttlePlate.throttlePlate;
