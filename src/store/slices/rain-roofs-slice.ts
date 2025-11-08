import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from '..';

export type BlocksState = {
  data: {
    blocks: BlockType[];
  };
};

export const initialStateRainRoofsBlock: BlocksState = {
  data: {
    blocks: [],
  },
};

const slice = createSlice({
  name: 'RainRoofs',
  initialState: initialStateRainRoofsBlock,
  reducers: {},
});

export default slice.reducer;
export const rainRoofsSelector = (state: RootState) => state.rainRoofs.data;
