/* eslint-disable react/require-default-props */
import { useNavigate } from 'react-router-dom';
import { Button } from '@gravity-ui/uikit';

interface ButtonsProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  formId?: string;
}

export default function Buttons({
  isLoading = false,
  isDisabled = false,
  size = 'l',
  formId,
}: ButtonsProps) {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="buttons">
      <Button
        view="flat"
        size={size}
        onClick={handleBack}
        disabled={isDisabled}
      >
        Отменить
      </Button>
      <Button
        loading={isLoading}
        disabled={isDisabled || isLoading}
        view="action"
        size={size}
        type="submit"
        form={formId}
      >
        Сохранить
      </Button>
    </div>
  );
}
