/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'checking';
  loading: boolean;
}

export const initialStateAuth: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  status: 'idle',
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setChecking: (state) => {
      state.status = 'checking';
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
  },
});

export const {
  setCredentials, logout, setChecking, setAuthLoading,
} = authSlice.actions;
export default authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
