import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

import { rainConditionsApiEndpoints } from '../api/rain-conditions-api/endpoints/index';

type RainConditionsState = {
  data: RainCondition[];
};

export const initialRainConditionsState: RainConditionsState = {
  data: [],
};

const slice = createSlice({
  name: 'rain-conditions',
  initialState: initialRainConditionsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        rainConditionsApiEndpoints.endpoints.getRainConditions.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      );
  },
});

export default slice.reducer;
export const rainConditionsSelector = (state: RootState) => state.rainConditions.data;
