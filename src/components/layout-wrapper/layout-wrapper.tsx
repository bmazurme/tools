import type { PropsWithChildren } from 'react';
import { Loader } from '@gravity-ui/uikit';

import style from './layout-wrapper.module.css';

interface PropsLayoutWrapper extends PropsWithChildren { isLoading: boolean }

export default function LayoutWrapper({ children, isLoading = false }: PropsLayoutWrapper) {
  return (
    <div className={style.layout}>
      {isLoading
        ? (
          <Loader
            size="l"
            className={style.loader}
          />
        )
        : children}
    </div>
  );
}
