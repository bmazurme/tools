import { Button, Icon } from '@gravity-ui/uikit';
import { Minus, Pencil } from '@gravity-ui/icons';

export default function Item({ children, removeAction, editAction }:
  { children: string; removeAction: () => void; editAction: () => void; }) {
  return (
    <>
      { children }
      <div className="item_tools">
        <Button
          view="outlined"
          size="s"
          title="Редактировать строку"
          onClick={editAction}
        >
          <Icon
            data={Pencil}
            size={18}
          />
        </Button>
        <Button
          view="outlined"
          size="s"
          onClick={removeAction}
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
