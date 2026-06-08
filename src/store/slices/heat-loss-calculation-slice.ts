/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type HeatLossCalculationBlocksState = {
  data: [],
  heatLossCalculation: ItemType | null;
};

export const initialStateHeatLossCalculationBlock: HeatLossCalculationBlocksState = {
  data: [],
  heatLossCalculation: null,
};

const heatLossCalculationSlice = createSlice({
  name: 'heat-loss-calculation',
  initialState: initialStateHeatLossCalculationBlock,
  reducers: {
    setHeatLossCalculation: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.heatLossCalculation = payload.item;
    },
  },
});

export const {
  setHeatLossCalculation,
} = heatLossCalculationSlice.actions;
export default heatLossCalculationSlice.reducer;
export const heatLossCalculationSelector = (state: RootState) => state.heatLossCalculation.data;
export const heatLossCalculationItemSelector = (state: RootState) => state.heatLossCalculation.heatLossCalculation;
