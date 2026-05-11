/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import {
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@gravity-ui/uikit';
import {
  CaretLeft, CaretRight, FolderOpen, Gear, Moon, SquareBars, Sun,
} from '@gravity-ui/icons';

import NavigationBreadcrumbs from '../navigation-breadcrumbs/navigation-breadcrumbs';
import { block, Logo } from '../logo/logo';

import useUser from '../../hooks/use-user';
import { useAppDispatch } from '../../hooks';

import {
  useToggleCompactMutation, useToggleThemeMutation, toggleCompactOptimistic,
  toggleThemeOptimistic,
} from '../../store';
import CompactMenu from './compact-menu';
import FullMenu from './full-menu';

import style from './content.module.css';

type ContentProps = {
  sidebar?: boolean;
};

const b = block('collapse-button');

function Content({ children, sidebar = false }: PropsWithChildren & ContentProps) {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const [toggleTheme] = useToggleThemeMutation();
  const [setCompact] = useToggleCompactMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onToggleCompact = () => {
    dispatch(toggleCompactOptimistic({ isCompact: !user?.isCompact }));
    setCompact({ isCompact: !user?.isCompact });
  };

  const handleThemeToggle = (isDark: boolean) => {
    dispatch(toggleThemeOptimistic({ isDark }));
    toggleTheme({ isDark });
  };

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
        <Icon data={Sun} size={16} />
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
            {!user?.isCompact ? (
              <button
                aria-label="Проекты"
                onClick={() => navigate('/projects')}
                className={`gn-composite-bar-item gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'} ${location.pathname.includes('project') && 'gn-composite-bar-item-active'}`}
              >
                <div className="gn-composite-bar-item__icon-place">
                  <Icon data={SquareBars} size={18} />
                </div>
                <div className="gn-composite-bar-item__title" title="User Settings">
                  <div className="gn-composite-bar-item__title-text">
                    Проекты
                  </div>
                </div>
              </button>
            ) : (
              <div className={`gn-composite-bar-item gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'}`}>
                <div className="gn-composite-bar-item__icon-place">
                  <Button
                    view={location.pathname.includes('project') ? 'action' : 'flat'}
                    size="l"
                    onClick={() => navigate('/projects')}
                    aria-label="Проекты"
                  >
                    <Icon data={SquareBars} size={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="gn-composite-bar" />

          <div className="gn-aside-header__footer">
            {!user?.isCompact ? (
              <button
                aria-label="Настройки"
                className={`gn-composite-bar-item  gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'}`}
                onClick={() => navigate('/settings')}
              >
                <div className="gn-composite-bar-item__icon-place">
                  <Icon data={Gear} size={18} />
                </div>
                <div className="gn-composite-bar-item__title" title="Settings">
                  <div className="gn-composite-bar-item__title-text">
                    Настройки
                  </div>
                </div>
              </button>
            ) : (
              <div className={`gn-composite-bar-item gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'}`}>
                <div className="gn-composite-bar-item__icon-place">
                  <Button
                    view="flat"
                    size="l"
                    aria-label="Настройки"
                    onClick={() => navigate('/settings')}
                  >
                    <Icon data={Gear} size={18} />
                  </Button>
                </div>
              </div>
            )}

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
          <>{children}</>
        </div>
      </div>
    </div>
  );
}

export default Content;
