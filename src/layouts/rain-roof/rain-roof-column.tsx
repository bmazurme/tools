/* eslint-disable consistent-return */
import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';
import { Label } from '@gravity-ui/uikit';
import Column from '../../components/column/column';

// import { useAppDispatch } from '../../hooks';
// import { addRainRoofItem } from '../../store';
import { TARGET_TYPE } from '../../config';
import { useCreateItemMutation } from '../../store';

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
          <Label theme="clear" className="field">#</Label>
          <Label theme="clear" className="field">Name</Label>
          <Label theme="clear" className="field">F</Label>
          <Label theme="clear" className="field">q5</Label>
          <Label theme="clear" className="field">q20</Label>
          <Label theme="clear" className="field">n</Label>
          <Label theme="clear" className="field">Slope</Label>
          <Label theme="clear" className="field">Q</Label>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
