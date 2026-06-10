import { type ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

import useUser from '../../hooks/use-user';
import { THEME_STORAGE_KEY, THEME_CHANGE_EVENT } from '../../hooks/use-theme';

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { user } = useUser();

  const [localIsDark, setLocalIsDark] = useState<boolean>(() =>
    localStorage.getItem(THEME_STORAGE_KEY) === 'dark');

  useEffect(() => {
    if (user) {
      localStorage.setItem(THEME_STORAGE_KEY, user.isDark ? 'dark' : 'light');
      setLocalIsDark(user.isDark);
    }
  }, [user, user?.isDark]);

  useEffect(() => {
    const handler = () => setLocalIsDark(localStorage.getItem(THEME_STORAGE_KEY) === 'dark');
    window.addEventListener(THEME_CHANGE_EVENT, handler);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handler);
  }, []);

  const theme = (user ? user.isDark : localIsDark) ? 'dark' : 'light';

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
