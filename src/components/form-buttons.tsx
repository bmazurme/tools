/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
import { Button } from '@gravity-ui/uikit';

interface FormButtonsProps {
  onSubmit?: () => void;
  onCancel: () => void;
}

export function FormButtons({ onSubmit, onCancel }: FormButtonsProps) {
  return (
    <div className="buttons">
      <Button
        view="action"
        size="l"
        type="submit"
        onClick={onSubmit}
      >
        Сохранить
      </Button>
      <Button
        view="flat"
        size="l"
        onClick={onCancel}
      >
        Отмена
      </Button>
    </div>
  );
}
