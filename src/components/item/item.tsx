import { Button, Icon } from '@gravity-ui/uikit';
import { Minus, Pencil } from '@gravity-ui/icons';

export default function Item({ children, action }:
  { children: string; action: () => void }) {
  return (
    <>
      { children }
      <div>
        <Button
          view="outlined"
          size="s"
          title="Редактировать строку"
        >
          <Icon
            data={Pencil}
            size={18}
          />
        </Button>
        <Button
          view="outlined"
          size="s"
          onClick={action}
          title="Удалить строку"
        >
          <Icon
            data={Minus}
            size={18}
          />
        </Button>
      </div>
    </>
  );
}
