/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type CollectorCalculationBlocksState = {
  data: [],
  collectorCalculation: ItemType | null;
};

export const initialStateCollectorCalculationBlock: CollectorCalculationBlocksState = {
  data: [],
  collectorCalculation: null,
};

const collectorCalculationSlice = createSlice({
  name: 'collector-calculation',
  initialState: initialStateCollectorCalculationBlock,
  reducers: {
    setCollectorCalculation: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.collectorCalculation = payload.item;
    },
  },
});

export const {
  setCollectorCalculation,
} = collectorCalculationSlice.actions;
export default collectorCalculationSlice.reducer;
export const collectorCalculationSelector = (state: RootState) => state.collectorCalculation.data;
export const collectorCalculationItemSelector = (state: RootState) => state.collectorCalculation.collectorCalculation;
