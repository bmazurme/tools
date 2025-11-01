/* eslint-disable consistent-return */
import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { useCreateItemMutation } from '../../store';

import style from './rain-roof-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function RainRoofColumn({ children, blockId, length }: ColumnType) {
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
          <Text variant="code-1" className={style.roof}>F, кровли</Text>
          <Text variant="code-1" className={style.wall}>F, фасада</Text>
          <Text variant="code-1" className={style.q5}>q5</Text>
          <Text variant="code-1" className={style.q20}>q20</Text>
          <Text variant="code-1" className={style.n}>n</Text>
          <Text variant="code-1" className={style.slope}>Уклон, %</Text>
          <Text variant="code-1" className={style.flow}>Расход, л/с</Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
