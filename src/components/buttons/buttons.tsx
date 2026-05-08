/* eslint-disable react/require-default-props */
import { useNavigate } from 'react-router-dom';
import { Button } from '@gravity-ui/uikit';

interface ButtonsProps {
  isLoading?: boolean;
  isDisabled?: boolean;
}

export default function Buttons({
  isLoading = false,
  isDisabled = false,
}: ButtonsProps) {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="buttons">
      <Button
        loading={isLoading}
        disabled={isDisabled || isLoading}
        view="action"
        size="l"
        type="submit"
      >
        Сохранить
      </Button>
      <Button
        view="flat"
        size="l"
        onClick={handleBack}
        disabled={isDisabled}
      >
        Отменить
      </Button>
    </div>
  );
}
