/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type RainRoofsBlocksState = {
  data: [],
  rainRoofs: ItemType | null;
};

export const initialStateRainRoofsBlock: RainRoofsBlocksState = {
  data: [],
  rainRoofs: null,
};

const rainRoofsSlice = createSlice({
  name: 'rain-roofs',
  initialState: initialStateRainRoofsBlock,
  reducers: {
    setRainRoofs: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.rainRoofs = payload.item;
    },
  },
});

export const {
  setRainRoofs,
} = rainRoofsSlice.actions;
export default rainRoofsSlice.reducer;
export const rainRoofsSelector = (state: RootState) => state.rainRoofs.data;
export const rainRoofsItemSelector = (state: RootState) => state.rainRoofs.rainRoofs;
