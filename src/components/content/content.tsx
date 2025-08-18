// import { Link } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
import { Button, Icon } from '@gravity-ui/uikit';
import { FolderOpen, Moon, Sun } from '@gravity-ui/icons';
import { type PropsWithChildren } from 'react';

import NavigationBreadcrumbs from '../navigation-breadcrumbs/navigation-breadcrumbs';
import { Logo } from '../logo/logo';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { themeSelector, toggleTheme } from '../../store';

import style from './content.module.css';

type ContentProps = {
  sidebar?: boolean;
};

export default function Content({ children, sidebar }: PropsWithChildren & ContentProps) {
  const isDark = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  return (
    <div className={style.page}>
      {sidebar
        && (
        <div className={style.sidebar}>
          <div className="gn-aside-header__header">
            <Logo
              icon={FolderOpen}
              text="EnTool"
              href="/projects"
              iconPlaceClassName="gn-aside-header__logo-icon-place"
              buttonClassName="gn-logo__btn-logo gn-aside-header__logo-button"
            />
          </div>
        </div>
        )}
      <div className="main">
        <div className={style.header}>
          <div className={style.bar}>
            <div className={style.bread}>
              <div className={style.bread_t}>
                <div className={style.bread_b}>
                  <NavigationBreadcrumbs />
                </div>
              </div>
            </div>
            <div>
              <Button
                view="normal"
                size="s"
                pin="round-clear"
                selected={!isDark}
                onClick={() => dispatch(toggleTheme({ data: false }))}
              >
                <Icon data={Sun} size={16} />
              </Button>
              <Button
                view="normal"
                size="s"
                pin="clear-round"
                selected={isDark}
                onClick={() => dispatch(toggleTheme({ data: true }))}
              >
                <Icon data={Moon} size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className={style.board}>
          {children}
        </div>
      </div>
    </div>
  );
}

Content.defaultProps = {
  sidebar: false, // Значение по умолчанию
};
