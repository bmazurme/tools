import { createSlice } from '@reduxjs/toolkit';

import { rainRunoffsApiEndpoints } from '../api/rain-runoffs-api/endpoints/index';

import type { RootState } from '..';

type RainRunoffsState = {
  data: [];
  rainRunoffs: ItemType | null;
};

export const initialRainRunoffsState: RainRunoffsState = {
  data: [],
  rainRunoffs: null,
};

const slice = createSlice({
  name: 'rain-runoffs',
  initialState: initialRainRunoffsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        rainRunoffsApiEndpoints.endpoints.getRainRunoffsItem.matchFulfilled,
        (state, { payload }) => ({ ...state, data: state.data, rainRunoffs: payload }),
      );
  },
});

export default slice.reducer;
export const rainRunoffsSelector = (state: RootState) => state.rainRunoffs.data;
export const rainRunoffsItemSelector = (state: RootState) => state.rainRunoffs.rainRunoffs;
