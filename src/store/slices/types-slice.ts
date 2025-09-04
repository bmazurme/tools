import { createSlice } from '@reduxjs/toolkit';

import { typesApiEndpoints } from '../api/types-api/endpoints/index';
import type { RootState, Type } from '..';

type TypesState = {
  data: Type[];
};

export const initialStateTypes: TypesState = {
  data: [],
};

const slice = createSlice({
  name: 'types',
  initialState: initialStateTypes,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        typesApiEndpoints.endpoints.getTypes.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      );
  },
});

export default slice.reducer;
export const typesSelector = (state: RootState) => state.types.data;
