/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type CalculationMeterBlocksState = {
  data: [],
  calculationMeter: ItemType | null;
};

export const initialStateCalculationMeterBlock: CalculationMeterBlocksState = {
  data: [],
  calculationMeter: null,
};

const calculationMeterSlice = createSlice({
  name: 'calculation-meter',
  initialState: initialStateCalculationMeterBlock,
  reducers: {
    setCalculationMeter: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.calculationMeter = payload.item;
    },
  },
});

export const {
  setCalculationMeter,
} = calculationMeterSlice.actions;
export default calculationMeterSlice.reducer;
export const calculationMeterSelector = (state: RootState) => state.calculationMeter.data;
export const calculationMeterItemSelector = (state: RootState) => state.calculationMeter.calculationMeter;
