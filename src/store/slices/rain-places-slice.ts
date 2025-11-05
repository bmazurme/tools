import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

import { rainPlacesApiEndpoints } from '../api/rain-places-api/endpoints/index';

type RainPlacesState = {
  data: RainPlace[];
};

export const initialRainPlacesState: RainPlacesState = {
  data: [],
};

const slice = createSlice({
  name: 'rain-places',
  initialState: initialRainPlacesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        rainPlacesApiEndpoints.endpoints.getRainPlace.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      );
  },
});

export default slice.reducer;
export const rainPlacesSelector = (state: RootState) => state.rainPlaces.data;
