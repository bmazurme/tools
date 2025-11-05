import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type RainRunoffsState = {
  data: [];
};

export const initialRainRunoffsState: RainRunoffsState = {
  data: [],
};

const slice = createSlice({
  name: 'rain-runoffs',
  initialState: initialRainRunoffsState,
  reducers: {},
});

export default slice.reducer;
export const rainRunoffsSelector = (state: RootState) => state.rainRunoffs.data;
