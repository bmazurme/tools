/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { authApiEndpoints } from '../api/auth-api/endpoints';
import type { RootState } from '..';

type UsersState = {
  user: UserType | null;
  loading: boolean;
};

export const initialStateUsers: UsersState = {
  user: null,
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {
    toggleCompactOptimistic: (
      state,
      { payload }: PayloadAction<{ isCompact: boolean }>,
    ) => {
      if (state.user !== null) {
        state.user.isCompact = payload.isCompact;
      }
    },
    toggleThemeOptimistic: (
      state,
      { payload }: PayloadAction<{ isDark: boolean }>,
    ) => {
      if (state.user !== null) {
        state.user.isDark = payload.isDark;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApiEndpoints.endpoints.checkAuth.matchFulfilled,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (state, action) => ({ ...state, user: action.payload.user, loading: false }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.checkAuth.matchRejected,
        // eslint-disable-next-line no-console
        (_state, action) => console.log('rejected', action),
      )
      .addMatcher(
        authApiEndpoints.endpoints.checkAuth.matchPending,
        (state) => ({ ...state, loading: true }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchFulfilled,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (state, _action) => ({ ...state, user: null, loading: false }),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchRejected,
        // eslint-disable-next-line no-console
        (_state, action) => console.log('rejected', action),
      )
      .addMatcher(
        authApiEndpoints.endpoints.signOut.matchPending,
        (state) => ({ ...state, loading: true }),
      );
  },
});

export const { toggleCompactOptimistic, toggleThemeOptimistic } = usersSlice.actions;
export default usersSlice.reducer;
export const usersSelector = (state: RootState) => state.users.user;
export const usersLoadingSelector = (state: RootState) => state.users.loading;
