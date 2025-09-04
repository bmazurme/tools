import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { blocksApiEndpoints } from '../api/blocks-api/endpoints/index';
import { type RootState } from '..';

export type BlocksState = {
  data: {
    blocks: BlockType[];
  };
};

export const initialStateBlocks: BlocksState = {
  data: {
    blocks: [],
  },
};

const slice = createSlice({
  name: 'blocks',
  initialState: initialStateBlocks,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        blocksApiEndpoints.endpoints.getBlocks.matchFulfilled,
        (state, { payload }: PayloadAction<{ blocks: BlockType[] }>) => ({
          ...state,
          data: { blocks: payload.blocks },
        }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.refreshBlocks.matchFulfilled,
        (state, { meta }) => ({
          ...state,
          data: { blocks: meta.arg.originalArgs.data },
        }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.updateBlock.matchFulfilled,
        (state, { meta }) => ({
          ...state,
          data: {
            blocks: state.data.blocks.map((x) => (x.id === meta.arg.originalArgs.id
              ? { ...meta.arg.originalArgs }
              : x)),
          },
        }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.deleteBlock.matchFulfilled,
        (state, { meta }) => ({
          ...state,
          data: { blocks: state.data.blocks.filter((x) => x.id !== meta.arg.originalArgs) },
        }),
      )
      .addMatcher(
        blocksApiEndpoints.endpoints.createBlock.matchFulfilled,
        (state, { payload }: PayloadAction<BlockType>) => ({
          ...state,
          data: { blocks: state.data.blocks.concat({ ...payload }) },
        }),
      );
  },
});

export default slice.reducer;
export const blocksSelector = (state: RootState) => state.blocks.data;
