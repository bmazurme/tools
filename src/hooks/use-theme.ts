import { useState, useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from './index';
import { useToggleThemeMutation, toggleThemeOptimistic } from '../store';
import useUser from './use-user';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'app:theme-change';

export default function useTheme() {
  const { user } = useUser();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const [toggleThemeMutation] = useToggleThemeMutation();

  const [localIsDark, setLocalIsDark] = useState<boolean>(() => localStorage.getItem(THEME_STORAGE_KEY) === 'dark');

  useEffect(() => {
    if (user) {
      localStorage.setItem(THEME_STORAGE_KEY, user.isDark ? 'dark' : 'light');
    }
  }, [user, user?.isDark]);

  useEffect(() => {
    const handler = () => setLocalIsDark(localStorage.getItem(THEME_STORAGE_KEY) === 'dark');
    window.addEventListener(THEME_CHANGE_EVENT, handler);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handler);
  }, []);

  const isDark = user ? user.isDark : localIsDark;

  const toggle = useCallback(() => {
    const newIsDark = !isDark;
    localStorage.setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light');

    if (isAuthenticated && user) {
      dispatch(toggleThemeOptimistic({ isDark: newIsDark }));
      toggleThemeMutation({ isDark: newIsDark });
    } else {
      setLocalIsDark(newIsDark);
      window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }
  }, [isDark, isAuthenticated, user, dispatch, toggleThemeMutation]);

  return { isDark, toggle };
}
