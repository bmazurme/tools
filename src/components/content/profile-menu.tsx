/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { memo, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, DropdownMenu } from '@gravity-ui/uikit';
import { Pencil, Person, ArrowRightFromSquare } from '@gravity-ui/icons';

import useUser from '../../hooks/use-user';
import { useSignOutMutation } from '../../store';

import sidebarItemStyle from './sidebar-item.module.css';

const ProfileMenu = memo(() => {
  const { user } = useUser();
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onSignOut = useCallback(async () => {
    await signOut();
    navigate('/');
  }, [signOut, navigate]);

  const isActive = location.pathname.includes('profile');

  const items = useMemo(() => [
    {
      iconStart: <Icon size={16} data={Pencil} />,
      action: () => navigate('/profile'),
      text: 'Профиль',
    },
    {
      iconStart: <Icon size={16} data={ArrowRightFromSquare} />,
      action: onSignOut,
      text: 'Выйти',
      theme: 'danger' as const,
    },
  ], [navigate, onSignOut]);

  return (
    <DropdownMenu
      popupProps={{
        placement: 'right',
      }}
      renderSwitcher={(props) => (
        <button
          {...props}
          aria-label="Профиль"
          className={`gn-composite-bar-item gn-footer-item gn-footer-item_compact ${isActive ? 'gn-composite-bar-item-active' : ''}`}
        >
          <div className="gn-composite-bar-item__icon-place">
            <Icon data={Person} size={18} />
          </div>
          <div className={`gn-composite-bar-item__title ${sidebarItemStyle.title} ${user?.isCompact ? sidebarItemStyle.titleHidden : ''}`}>
            <div className="gn-composite-bar-item__title-text">
              Профиль
            </div>
          </div>
        </button>
      )}
      items={items}
    />
  );
});

export default ProfileMenu;
