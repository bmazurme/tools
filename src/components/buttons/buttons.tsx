import { useNavigate } from 'react-router-dom';
import { Button } from '@gravity-ui/uikit';

export default function Buttons() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="buttons">
      <Button
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
      >
        Отменить
      </Button>
    </div>
  );
}
