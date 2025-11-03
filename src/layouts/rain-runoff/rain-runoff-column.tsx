/* eslint-disable consistent-return */
import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';

import Column from '../../components/column/column';

import { useCreateItemMutation } from '../../store';
import { TARGET_TYPE } from '../../config';

import style from './rain-runoff-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function RainRunoffColumn({ children, blockId, length }: ColumnType) {
  const [createItem] = useCreateItemMutation();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
    drop: () => ({ blockId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item: ItemType) => {
      if (typeof item !== 'object' || item === null) {
        return false;
      }

      return typeof item.column === 'number'; /// !!!
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'var(--table-cell)';
      } if (!canDrop) {
        return 'rgb(255,188,188)';
      }
    } else {
      return '';
    }
  };
  const onHandleAddItem = () => {
    createItem({ block: { id: blockId }, index: length });
  };

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className="column"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <Column action={onHandleAddItem}>
        <div className="fields">
          <Text variant="code-1" className={style.id}>#</Text>
          <Text variant="code-1" className={style.name}>Наименование участка</Text>
          <Text variant="code-1" className={style.pavements}>Площадь</Text>
          <Text variant="code-1" className={style.pavements}>place</Text>
          <Text variant="code-1" className={style.pavements}>condition</Text>
          <Text variant="code-1" className={style.pavements}>intensity</Text>
          <Text variant="code-1" className={style.pavements}>lengthPipe</Text>
          <Text variant="code-1" className={style.pavements}>lengthTray</Text>
          <Text variant="code-1" className={style.pavements}>velocityPipe</Text>
          <Text variant="code-1" className={style.pavements}>velocityTray</Text>
          <Text variant="code-1" className={style.pavements}>timeInit</Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
