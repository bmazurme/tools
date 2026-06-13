import type { PropsWithChildren } from 'react';
import { Loader } from '@gravity-ui/uikit';

import style from './layout-wrapper.module.css';

// eslint-disable-next-line react/require-default-props
interface PropsLayoutWrapper extends PropsWithChildren { isLoading?: boolean }

export default function LayoutWrapper({ children, isLoading = false }: PropsLayoutWrapper) {
  return (
    <div className={style.layout}>
      {isLoading
        ? (
          <Loader
            size="l"
            className="loader"
          />
        )
        : children}
    </div>
  );
}
