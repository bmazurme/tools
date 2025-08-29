import React, { type ReactNode } from 'react';
import { ThemeProvider } from '@gravity-ui/uikit';

import useUser from '../../hooks/use-user';

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const user = useUser();
  const theme = React.useMemo(() => (user?.isDark ? 'dark' : 'light'), [user?.isDark]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
