/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    toggleCompactOptimistic: (
      state,
      { payload }: PayloadAction<{ isCompact: boolean }>,
    ) => {
      if (state.data !== null) {
        state.data.isCompact = payload.isCompact;
      }
    },
    toggleThemeOptimistic: (
      state,
      { payload }: PayloadAction<{ isDark: boolean }>,
    ) => {
      if (state.data !== null) {
        state.data.isDark = payload.isDark;
      }
    },
  },
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
        usersApiEndpoints.endpoints.toggleTheme.matchRejected,
        (state, action) => {
          if (state.data !== null && action.meta.arg !== undefined) {
            state.data.isDark = !action.meta.arg;
          }
        },
      )
      .addMatcher(
        usersApiEndpoints.endpoints.toggleCompact.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      )
      .addMatcher(
        usersApiEndpoints.endpoints.toggleCompact.matchRejected,
        (state, action) => {
          if (state.data !== null && action.meta.arg !== undefined) {
            state.data.isCompact = !action.meta.arg;
          }
        },
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchFulfilled,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (state, _action) => ({ ...state, data: null }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchRejected,
        (_state, action) => console.log('rejected', action),
      );
  },
});

export const { toggleCompactOptimistic, toggleThemeOptimistic } = slice.actions;

export default slice.reducer;
export const usersSelector = (state: RootState) => state.users.data;
