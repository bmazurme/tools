/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type PipeDiameterCalculationBlocksState = {
  data: [],
  pipeDiameterCalculation: ItemType | null;
};

export const initialStatePipeDiameterCalculationBlock: PipeDiameterCalculationBlocksState = {
  data: [],
  pipeDiameterCalculation: null,
};

const pipeDiameterCalculationSlice = createSlice({
  name: 'pipe-diameter-calculation',
  initialState: initialStatePipeDiameterCalculationBlock,
  reducers: {
    setPipeDiameterCalculation: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.pipeDiameterCalculation = payload.item;
    },
  },
});

export const {
  setPipeDiameterCalculation,
} = pipeDiameterCalculationSlice.actions;
export default pipeDiameterCalculationSlice.reducer;
export const pipeDiameterCalculationSelector = (state: RootState) => state.pipeDiameterCalculation.data;
export const pipeDiameterCalculationItemSelector = (state: RootState) => state.pipeDiameterCalculation.pipeDiameterCalculation;
