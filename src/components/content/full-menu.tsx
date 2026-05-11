/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon, DropdownMenu } from '@gravity-ui/uikit';
import { Pencil, Person, ArrowRightFromSquare } from '@gravity-ui/icons';

import useUser from '../../hooks/use-user';

import { useSignOutMutation } from '../../store';

const FullMenu = memo(() => {
  const { user } = useUser();
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className={`gn-composite-bar-item gn-footer-item ${!user?.isCompact && 'gn-footer-item_compact'}`}>
      <div className="gn-composite-bar-item__icon-place">
        <DropdownMenu
          popupProps={{
            placement: 'right',
          }}
          renderSwitcher={(props) => (
            <Button
              {...props}
              view={location.pathname.includes('profile') ? 'action' : 'flat'}
              size="l"
              aria-label="Профиль"
            >
              <Icon data={Person} size={18} />
            </Button>
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
      </div>
    </div>
  );
});

export default FullMenu;
