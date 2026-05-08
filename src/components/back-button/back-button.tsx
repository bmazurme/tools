/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Icon } from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import { BACK_BUTTON_PROPS } from '../../config';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const canGoBack = location.key !== 'default';
  const handleBack = useCallback(() => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate, canGoBack]);

  return (
    <Button
      {...BACK_BUTTON_PROPS}
      onClick={handleBack}
      aria-label="Вернуться на предыдущую страницу"
      title="Вернуться на предыдущую страницу"
      disabled={!canGoBack}
    >
      <Icon
        data={ArrowLeft}
        size={18}
        aria-hidden="true"
      />
      Назад
    </Button>
  );
}
