import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type BlocksState = {
  data: {
    blocks: BlockType[],
  },
};

export const initialRainRunoffsStateBlock: BlocksState = {
  data: {
    blocks: [
      {
        id: 0,
        name: 'Block_1',
        items: [],
      },
    ],
  },
};

const slice = createSlice({
  name: 'rain-runoffs',
  initialState: initialRainRunoffsStateBlock,
  reducers: {
    addRainRunoffBlock: (
      state,
      // eslint-disable-next-line no-empty-pattern
      { },
    ) => ({
      ...state,
      data: {
        blocks: [
          ...state.data.blocks,
          {
            id: state.data.blocks.length - 1,
            name: `Block_${state.data.blocks.length}`,
            items: [],
          },
        ],
      },
    }),
  },
});

export const { addRainRunoffBlock } = slice.actions;

export default slice.reducer;
export const rainRunoffsSelector = (state: RootState) => state.rainRunoffs.data;
