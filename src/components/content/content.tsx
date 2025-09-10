/* eslint-disable react/button-has-type */
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@gravity-ui/uikit';
import {
  CaretLeft,
  CaretRight,
  FolderOpen, Gear, Moon, Person, SquareBars, Sun,
} from '@gravity-ui/icons';
import {
  useCallback,
  useMemo,
  type PropsWithChildren,
} from 'react';

import NavigationBreadcrumbs from '../navigation-breadcrumbs/navigation-breadcrumbs';
import { block, Logo } from '../logo/logo';

import useUser from '../../hooks/use-user';
import { useToggleCompactMutation, useToggleThemeMutation } from '../../store';

import style from './content.module.css';

type ContentProps = {
  sidebar?: boolean;
};

const b = block('collapse-button');

export default function Content({ children, sidebar }: PropsWithChildren & ContentProps) {
  const user = useUser();
  const [toggleTheme] = useToggleThemeMutation();
  const [toggleCompact] = useToggleCompactMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleThemeToggle = useCallback(
    (isDark: boolean) => () => toggleTheme({ isDark }),
    [toggleTheme],
  );

  const themeButtons = useMemo(() => (
    <>
      <Button
        view="normal"
        size="m"
        pin="round-clear"
        selected={!user?.isDark}
        aria-label="Светлая тема"
        onClick={handleThemeToggle(false)}
      >
        <Icon data={Sun} size={16} />
      </Button>
      <Button
        view="normal"
        size="m"
        pin="clear-round"
        selected={user?.isDark}
        aria-label="Темная тема"
        onClick={handleThemeToggle(true)}
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
              <div className={`gn-composite-bar-item  gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'}`}>
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
              <div className={`gn-composite-bar-item  gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'}`}>
                <div className="gn-composite-bar-item__icon-place">
                  <Button
                    view="flat"
                    size="l"
                    aria-label="Настройки"
                  >
                    <Icon data={Gear} size={18} />
                  </Button>
                </div>
              </div>
            )}

            {!user?.isCompact ? (
              <button
                aria-label="Профиль"
                onClick={() => navigate('/profile')}
                className={`gn-composite-bar-item  gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'} ${location.pathname.includes('profile') && 'gn-composite-bar-item-active'}`}
              >
                <div className="gn-composite-bar-item__icon-place">
                  <Icon data={Person} size={18} />
                </div>
                <div className="gn-composite-bar-item__title" title="User profile">
                  <div className="gn-composite-bar-item__title-text">
                    Профиль
                  </div>
                </div>
              </button>
            ) : (
              <div className={`gn-composite-bar-item gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'}`}>
                <div className="gn-composite-bar-item__icon-place">
                  <Button
                    view={location.pathname.includes('profile') ? 'action' : 'flat'}
                    size="l"
                    onClick={() => navigate('/profile')}
                    aria-label="Профиль"
                  >
                    <Icon data={Person} size={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => toggleCompact({ isCompact: !user?.isCompact })}
            className={b({ compact: user?.isCompact }, 'gn-collapse-button gn-collapse-button_compact')}
            aria-label="Компакт"
          >
            <Icon data={user?.isCompact ? CaretRight : CaretLeft} className={b('icon')} size={16} />
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

Content.defaultProps = {
  sidebar: false,
};
