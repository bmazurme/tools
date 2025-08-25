import { createSlice } from '@reduxjs/toolkit';

import { usersApiEndpoints } from '../api/users-api/endpoints/index';

import type { RootState } from '..';

type UsersState = {
  data: UserType | null;
};

export const initialStateUsers: UsersState = {
  data: null,
};

const slice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: { },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        usersApiEndpoints.endpoints.getUserMe.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      );
  },
});

export default slice.reducer;
export const usersSelector = (state: RootState) => state.users.data;
