/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, DropdownMenu } from '@gravity-ui/uikit';
import { Pencil, Person, ArrowRightFromSquare } from '@gravity-ui/icons';

import useUser from '../../hooks/use-user';
import { useSignOutMutation } from '../../store';

const CompactMenu = memo(() => {
  const { user } = useUser();
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <DropdownMenu
      popupProps={{
        placement: 'right',
      }}
      renderSwitcher={(props) => (
        <button
          {...props}
          aria-label="Профиль"
          className={`gn-composite-bar-item gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'} ${location.pathname.includes('profile') && 'gn-composite-bar-item-active'}`}
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
      )}
      items={[
        {
          iconStart: <Icon size={16} data={Pencil} />,
          action: () => navigate('/profile'),
          text: 'Профиль',
        },
        {
          iconStart: <Icon size={16} data={ArrowRightFromSquare} />,
          action: onSignOut,
          text: 'Выйти',
          theme: 'danger',
        },
      ]}
    />
  );
});

export default CompactMenu;
