import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';

export default function Column({ children, action }:
  { children: string; action: () => void }) {
  return (
    <div className="column_header">
      {children}
      <Button
        view="outlined"
        size="s"
        onClick={action}
        title="Добавить строку"
      >
        <Icon
          data={Plus}
          size={18}
        />
      </Button>
    </div>
  );
}
