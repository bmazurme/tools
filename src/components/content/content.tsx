/* eslint-disable react/button-has-type */
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@gravity-ui/uikit';
import {
  CaretLeft,
  CaretRight,
  FolderOpen, Gear, Moon, Person, SquareBars, Sun,
} from '@gravity-ui/icons';
import {
  type PropsWithChildren,
} from 'react';

import NavigationBreadcrumbs from '../navigation-breadcrumbs/navigation-breadcrumbs';
import { block, Logo } from '../logo/logo';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  sidebarSelector, themeSelector, toggleTheme, toggleCompact,
} from '../../store';

import style from './content.module.css';

type ContentProps = {
  sidebar?: boolean;
};

const b = block('collapse-button');

export default function Content({ children, sidebar }: PropsWithChildren & ContentProps) {
  const isDark = useAppSelector(themeSelector);
  const compact = useAppSelector(sidebarSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={style.page}>
      {sidebar
        && (
        <div className={style.sidebar} style={{ width: compact ? '56px' : '236px' }}>
          <div className="gn-aside-header__header">
            <Logo
              compact={compact}
              icon={FolderOpen}
              text="EnTool"
              href="/projects"
              iconPlaceClassName="gn-aside-header__logo-icon-place"
              buttonClassName="gn-logo__btn-logo gn-aside-header__logo-button"
            />
          </div>

          <div className="gn-aside-header__footer">
            {!compact ? (
              <button
                onClick={() => navigate('/projects')}
                className={`gn-composite-bar-item gn-footer-item ${!compact && 'gn-footer-item_compact'} ${location.pathname.includes('projects') && 'gn-composite-bar-item-active'}`}
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
              <div className={`gn-composite-bar-item  gn-footer-item ${!compact && 'gn-footer-item_compact'}`}>
                <div className="gn-composite-bar-item__icon-place">
                  <Button view={location.pathname.includes('projects') ? 'action' : 'flat'} size="l" onClick={() => navigate('/projects')}>
                    <Icon data={SquareBars} size={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="gn-composite-bar" />

          <div className="gn-aside-header__footer">
            {!compact ? (
              <button className={`gn-composite-bar-item  gn-footer-item ${!compact && 'gn-footer-item_compact'}`}>
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
              <div className={`gn-composite-bar-item  gn-footer-item ${!compact && 'gn-footer-item_compact'}`}>
                <div className="gn-composite-bar-item__icon-place">
                  <Button view="flat" size="l">
                    <Icon data={Gear} size={18} />
                  </Button>
                </div>
              </div>
            )}

            {!compact ? (
              <button
                onClick={() => navigate('/profile')}
                className={`gn-composite-bar-item  gn-footer-item ${!compact && 'gn-footer-item_compact'} ${location.pathname.includes('profile') && 'gn-composite-bar-item-active'}`}
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
              <div className={`gn-composite-bar-item gn-footer-item ${!compact && 'gn-footer-item_compact'}`}>
                <div className="gn-composite-bar-item__icon-place">
                  <Button view={location.pathname.includes('profile') ? 'action' : 'flat'} size="l" onClick={() => navigate('/profile')}>
                    <Icon data={Person} size={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => dispatch(toggleCompact({ data: !compact }))}
            // className="gn-collapse-button"
            className={b({ compact }, 'gn-collapse-button gn-collapse-button_compact')}
          >
            <Icon data={compact ? CaretRight : CaretLeft} className={b('icon')} size={16} />
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
              <Button
                view="normal"
                size="m"
                pin="round-clear"
                selected={!isDark}
                onClick={() => dispatch(toggleTheme({ data: false }))}
              >
                <Icon data={Sun} size={16} />
              </Button>
              <Button
                view="normal"
                size="m"
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
