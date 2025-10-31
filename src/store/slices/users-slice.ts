import { createSlice } from '@reduxjs/toolkit';

import { usersApiEndpoints } from '../api/users-api/endpoints/index';
import { authApiEndpoints } from '../api/auth-api/endpoints';
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
        (state, { payload }) => ({ ...state, data: payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.updateUser.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.toggleTheme.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.toggleCompact.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchFulfilled,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (state, action) => ({ ...state, data: null }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchRejected,
        (state, action) => console.log('rejected', action),
      );
  },
});

export default slice.reducer;
export const usersSelector = (state: RootState) => state.users.data;
