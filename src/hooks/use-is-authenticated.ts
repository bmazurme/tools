/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import {
  logout, setAuthLoading, setChecking, setCredentials, useCheckAuthQuery, type RootState,
} from '../store';

interface UseIsAuthenticatedResult {
  isAuthenticated: boolean;
  isChecking: boolean;
  isLoading: boolean;
}

export const useIsAuthenticated = (): UseIsAuthenticatedResult => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const status = useAppSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    if (isLoading) {
      dispatch(setChecking());
    } else if (error) {
      dispatch(logout());
    } else if (data?.isAuthenticated) {
      if (data.accessToken) {
        dispatch(setCredentials({ accessToken: data.accessToken }));
      }
    } else {
      dispatch(logout());
    }

    dispatch(setAuthLoading(isLoading));
  }, [data, isLoading, dispatch, error]);

  return {
    isAuthenticated,
    isChecking: status === 'checking',
    isLoading,
  };
};
