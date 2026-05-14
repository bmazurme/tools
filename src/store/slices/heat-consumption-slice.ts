/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type HeatConsumptionBlocksState = {
  data: [],
  heatConsumption: ItemType | null;
};

export const initialStateRHeatConsumptionBlock: HeatConsumptionBlocksState = {
  data: [],
  heatConsumption: null,
};

const heatConsumptionSlice = createSlice({
  name: 'heat-consumption',
  initialState: initialStateRHeatConsumptionBlock,
  reducers: {
    setHeatConsumption: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.heatConsumption = payload.item;
    },
  },
});

export const {
  setHeatConsumption,
} = heatConsumptionSlice.actions;
export default heatConsumptionSlice.reducer;
export const heatConsumptionSelector = (state: RootState) => state.heatConsumption.data;
export const heatConsumptionItemSelector = (state: RootState) => state.heatConsumption.heatConsumption;
