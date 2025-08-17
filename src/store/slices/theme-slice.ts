import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type ThemeState = {
  data: boolean;
};

export const initialStateTheme: ThemeState = {
  data: false,
};

const slice = createSlice({
  name: 'documents',
  initialState: initialStateTheme,
  reducers: {
    toggleTheme: (
      state,
      { payload }: PayloadAction<{ data: boolean }>,
    ) => ({
      ...state,
      data: payload.data,
    }),
  },
});

export const { toggleTheme } = slice.actions;

export default slice.reducer;
export const themeSelector = (state: RootState) => state.theme.data;
