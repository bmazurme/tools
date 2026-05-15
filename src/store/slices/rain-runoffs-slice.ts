/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '..';

type RainRunoffsState = {
  data: [];
  rainRunoffs: ItemType | null;
};

export const initialRainRunoffsState: RainRunoffsState = {
  data: [],
  rainRunoffs: null,
};

const rainRunOffsSlice = createSlice({
  name: 'rain-runoffs',
  initialState: initialRainRunoffsState,
  reducers: {
    setRainRunOffs: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.rainRunoffs = payload.item;
    },
  },
});

export const {
  setRainRunOffs,
} = rainRunOffsSlice.actions;
export default rainRunOffsSlice.reducer;
export const rainRunoffsSelector = (state: RootState) => state.rainRunoffs.data;
export const rainRunoffsItemSelector = (state: RootState) => state.rainRunoffs.rainRunoffs;
