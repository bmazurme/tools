/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/button-has-type */
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@gravity-ui/uikit';

import style from './content-button.module.css';

type SVGIconData = React.ComponentProps<typeof Icon>['data'];
interface ContentButtonProps {
  isCompact: boolean;
  icon: SVGIconData;
  link: string;
  type: 'project' | 'settings' | 'chat';
  label: string;
  disabled?: boolean;
}

const ContentButton = memo(({
  isCompact, icon, link, label, type, disabled,
}: ContentButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(() => navigate(link), [navigate, link]);

  const isActive = location.pathname.includes(type);

  return (
    <>
      {!isCompact ? (
        <button
          aria-label={label}
          onClick={handleClick}
          className={`gn-composite-bar-item gn-footer-item ${!isCompact && 'gn-footer-item_compact'} ${isActive && 'gn-composite-bar-item-active'} ${disabled && style.disabled}`}
          disabled={disabled}
        >
          <div className="gn-composite-bar-item__icon-place">
            <Icon data={icon} size={18} />
          </div>
          <div className="gn-composite-bar-item__title" title="User Settings">
            <div className="gn-composite-bar-item__title-text">
              {label}
            </div>
          </div>
        </button>
      ) : (
        <div className={`gn-composite-bar-item gn-footer-item ${!isCompact && 'gn-footer-item_compact'}`}>
          <div className="gn-composite-bar-item__icon-place">
            <Button
              view={isActive ? 'action' : 'flat'}
              size="l"
              onClick={handleClick}
              aria-label={label}
              disabled={disabled}
            >
              <Icon data={icon} size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
});

export default ContentButton;
