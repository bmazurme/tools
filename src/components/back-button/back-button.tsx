/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import { BACK_BUTTON_PROPS } from '../../config';

export default function BackButton() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <Button {...BACK_BUTTON_PROPS} onClick={handleBack}>
      <Icon data={ArrowLeft} size={18} />
      Назад
    </Button>
  );
}
