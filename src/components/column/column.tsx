import { memo, type ReactNode } from 'react';
import { Button, Icon } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';

interface ColumnProps {
  children: ReactNode;
  action: () => void;
}

const Column = memo(({ children, action }: ColumnProps) => (
  <div className="column_header">
    {children}
    <Button
      view="flat"
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
));

export default Column;
