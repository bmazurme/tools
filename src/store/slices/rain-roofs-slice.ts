import { createSlice } from '@reduxjs/toolkit';

import { rainRoofsApiEndpoints } from '../api/rain-roofs-api/endpoints/index';
import { type RootState } from '..';

export type RainRoofsBlocksState = {
  data: [],
  rainRoofs: ItemType | null;
};

export const initialStateRainRoofsBlock: RainRoofsBlocksState = {
  data: [],
  rainRoofs: null,
};

const slice = createSlice({
  name: 'rain-roofs',
  initialState: initialStateRainRoofsBlock,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        rainRoofsApiEndpoints.endpoints.getRainRoofsItem.matchFulfilled,
        (state, { payload }) => ({ ...state, data: state.data, rainRoofs: payload }),
      );
  },
});

export default slice.reducer;
export const rainRoofsSelector = (state: RootState) => state.rainRoofs.data;
export const rainRoofsItemSelector = (state: RootState) => state.rainRoofs.rainRoofs;
