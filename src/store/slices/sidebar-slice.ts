import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type SidebarState = {
  data: boolean;
};

export const initialStateSidebar: SidebarState = {
  data: false,
};

const slice = createSlice({
  name: 'compact',
  initialState: initialStateSidebar,
  reducers: {
    toggleCompact: (
      state,
      { payload }: PayloadAction<{ data: boolean }>,
    ) => ({
      ...state,
      data: payload.data,
    }),
  },
});

export const { toggleCompact } = slice.actions;

export default slice.reducer;
export const sidebarSelector = (state: RootState) => state.sidebar.data;
