import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';

import Column from '../../components/column/column';

import { useAppDispatch } from '../../hooks';
import { addRainRoofItem } from '../../store';
import { TARGET_TYPE } from '../../config';

type ColumnType = {
  children: ReactNode;
  blockId: number;
};

export default function RainRoofColumn({ children, blockId }: ColumnType) {
  const dispatch = useAppDispatch();
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
  const onHandleAddItem = () => dispatch(addRainRoofItem({ blockId }));

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className="column"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <Column action={onHandleAddItem}>
        column-header
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
