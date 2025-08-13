import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';

import { useAppDispatch } from '../../hooks';
import { addRainRoofItem, removeRainRoofBlock } from '../../store';

type ColumnType = {
  children: ReactNode;
  blockId: number;
};

export default function Column({ children, blockId }: ColumnType) {
  const dispatch = useAppDispatch();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'items',
    drop: () => ({ name: `block_${blockId}` }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item: unknown) => {
      if (typeof item !== 'object' || item === null) {
        return false;
      }

      if (!('currentColumnName' in item)) {
        return false;
      }

      const currentColumnName = item.currentColumnName as string;

      return currentColumnName.split('_')[0] === 'block';
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

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className="column"
      style={{ backgroundColor: getBackgroundColor() }}
    >
       <div>
        column
        <button
          onClick={() => dispatch(addRainRoofItem({ blockId }))}
          title="Добавить строку"
        >
          Добавить строку
        </button>
       </div>
        <button
          onClick={() => dispatch(removeRainRoofBlock({ blockId }))}
          title="Удалить блок"
        >
          -
        </button>
      {children}
    </div>
  );
}
