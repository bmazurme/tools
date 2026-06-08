/* eslint-disable react/button-has-type */
import { useCallback, useMemo, type PropsWithChildren } from 'react';
import { Button, Icon } from '@gravity-ui/uikit';
import {
  CaretLeft, CaretRight, FolderOpen, Gear, Moon, Sparkles, SquareBars, Sun,
} from '@gravity-ui/icons';

import NavigationBreadcrumbs from '../navigation-breadcrumbs/navigation-breadcrumbs';
import { block, Logo } from '../logo/logo';
import ContentButton from './content-button';

import useUser from '../../hooks/use-user';
import { useAppDispatch } from '../../hooks';

import {
  useToggleCompactMutation, useToggleThemeMutation, toggleCompactOptimistic,
  toggleThemeOptimistic,
} from '../../store';
import CompactMenu from './compact-menu';
import FullMenu from './full-menu';

import style from './content.module.css';

import type { ContentProps } from './content-props.type';

const b = block('collapse-button');

export default function Content({ children, sidebar = false }: PropsWithChildren & ContentProps) {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const [toggleTheme] = useToggleThemeMutation();
  const [setCompact] = useToggleCompactMutation();

  const onToggleCompact = useCallback(() => {
    dispatch(toggleCompactOptimistic({ isCompact: !user?.isCompact }));
    setCompact({ isCompact: !user?.isCompact });
  }, [dispatch, setCompact, user?.isCompact]);

  const handleThemeToggle = useCallback((isDark: boolean) => {
    dispatch(toggleThemeOptimistic({ isDark }));
    toggleTheme({ isDark });
  }, [dispatch, toggleTheme]);

  const themeButtons = useMemo(() => (
    <>
      <Button
        view="normal"
        size="m"
        pin="round-clear"
        selected={!user?.isDark}
        aria-label="Светлая тема"
        onClick={() => handleThemeToggle(false)}
      >
        <Icon
          data={Sun}
          size={16}
        />
      </Button>
      <Button
        view="normal"
        size="m"
        pin="clear-round"
        selected={user?.isDark}
        aria-label="Темная тема"
        onClick={() => handleThemeToggle(true)}
      >
        <Icon data={Moon} size={16} />
      </Button>
    </>
  ), [user?.isDark, handleThemeToggle]);

  return (
    <div className={style.page}>
      {sidebar
        && (
        <div className={style.sidebar} style={{ width: user?.isCompact ? '56px' : '236px' }}>
          <div className="gn-aside-header__header">
            <Logo
              compact={user?.isCompact}
              icon={FolderOpen}
              text="EnTool"
              href="/projects"
              iconPlaceClassName="gn-aside-header__logo-icon-place"
              buttonClassName="gn-logo__btn-logo gn-aside-header__logo-button"
              aria-label="Главная"
            />
          </div>

          <div className="gn-aside-header__footer">
            <ContentButton
              isCompact={user!.isCompact}
              icon={SquareBars}
              link="/projects"
              type="project"
              label="Проекты"
            />
          </div>

          <div className="gn-composite-bar" />

          <div className="gn-aside-header__footer">
            <ContentButton
              isCompact={user!.isCompact}
              icon={Sparkles}
              link="/chat"
              type="chat"
              label="AI-ассистент"
              disabled
            />
            <ContentButton
              isCompact={user!.isCompact}
              icon={Gear}
              link="/settings"
              type="settings"
              label="Настройки"
            />
            {!user?.isCompact ? <CompactMenu /> : <FullMenu />}
          </div>

          <button
            onClick={onToggleCompact}
            className={b({ compact: user?.isCompact }, 'gn-collapse-button gn-collapse-button_compact')}
            aria-label="Компакт"
          >
            <Icon
              data={user?.isCompact ? CaretRight : CaretLeft}
              className={b('icon')}
              size={16}
            />
          </button>
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
              {themeButtons}
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
