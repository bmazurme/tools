/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@gravity-ui/uikit';

import style from './content-button.module.css';
import sidebarItemStyle from './sidebar-item.module.css';

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
    <button
      aria-label={label}
      onClick={handleClick}
      className={`gn-composite-bar-item gn-footer-item gn-footer-item_compact ${isActive ? 'gn-composite-bar-item-active' : ''} ${disabled ? style.disabled : ''}`}
      disabled={disabled}
    >
      <div className="gn-composite-bar-item__icon-place">
        <Icon data={icon} size={18} />
      </div>
      <div className={`gn-composite-bar-item__title ${sidebarItemStyle.title} ${isCompact ? sidebarItemStyle.titleHidden : ''}`}>
        <div className="gn-composite-bar-item__title-text">
          {label}
        </div>
      </div>
    </button>
  );
});

export default ContentButton;
