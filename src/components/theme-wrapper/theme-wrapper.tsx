import { ThemeProvider } from '@gravity-ui/uikit';

import { useAppSelector } from '../../hooks';
import { themeSelector } from '../../store';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const isDark = useAppSelector(themeSelector);

  return (
    <ThemeProvider theme={isDark ? 'dark' : 'light'}>
      {children}
    </ThemeProvider>
  );
}
