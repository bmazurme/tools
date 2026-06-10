/* eslint-disable react/button-has-type */
import { useCallback, type PropsWithChildren } from 'react';
import { Button, Icon } from '@gravity-ui/uikit';
import {
  CaretLeft, CaretRight, Droplet, Gear, Moon, /* Sparkles, */ SquareBars, Sun,
} from '@gravity-ui/icons';

import NavigationBreadcrumbs from '../navigation-breadcrumbs/navigation-breadcrumbs';
import { block, Logo } from '../logo/logo';
import ContentButton from './content-button';

import useUser from '../../hooks/use-user';
import { useAppDispatch } from '../../hooks';
import useTheme from '../../hooks/use-theme';

import {
  useToggleCompactMutation, toggleCompactOptimistic,
} from '../../store';
import ProfileMenu from './profile-menu';

import style from './content.module.css';

import type { ContentProps } from './content-props.type';

const b = block('collapse-button');

function LogoText() {
  return (
    <div className={style.logoText}>
      <span className={style.logoTitle}>
        tools
        <span className={style.logoBrand}>.ntlstl</span>
      </span>
      <span className={style.logoSubtitle}>Инженерные расчеты</span>
    </div>
  );
}

export default function Content({ children, sidebar = false }: PropsWithChildren & ContentProps) {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const [setCompact] = useToggleCompactMutation();
  const { isDark, toggle } = useTheme();

  const onToggleCompact = useCallback(() => {
    dispatch(toggleCompactOptimistic({ isCompact: !user?.isCompact }));
    setCompact({ isCompact: !user?.isCompact });
  }, [dispatch, setCompact, user?.isCompact]);

  return (
    <div className={style.page}>
      {sidebar
        && (
        <div className={`${style.sidebar} ${user?.isCompact ? style.sidebarCompact : ''}`}>
          <div className="gn-aside-header__header">
            <Logo
              compact={user?.isCompact}
              icon={Droplet}
              iconSize={18}
              text={LogoText}
              href="/projects"
              iconPlaceClassName="gn-aside-header__logo-icon-place"
              iconClassName={style.logoIcon}
              buttonClassName={`gn-logo__btn-logo gn-aside-header__logo-button ${style.logoButton}`}
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
            {/* <ContentButton
              isCompact={user!.isCompact}
              icon={Sparkles}
              link="/chat"
              type="chat"
              label="AI-ассистент"
              disabled
            /> */}
            <ContentButton
              isCompact={user!.isCompact}
              icon={Gear}
              link="/settings"
              type="settings"
              label="Настройки"
            />
            <ProfileMenu />
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
      <main className="main">
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
              <Button view="flat" size="m" onClick={toggle} aria-label="Переключить тему">
                <Icon data={isDark ? Sun : Moon} size={18} />
              </Button>
            </div>
          </div>
        </div>
        <div className={style.board}>
          {children}
        </div>
      </main>
    </div>
  );
}
