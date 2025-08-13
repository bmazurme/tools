import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { changeItemColumn, refreshRainRoofItems, removeRainRoofItem } from '../store';
import { useAppDispatch } from '../hooks';

export type ItemType = {
  id: number;
  name: string;
  column: string;
  index: number;
};

export default function Item({ item, index }:{ item: ItemType; index: number }) {
  const dispatch = useAppDispatch();

  const moveCardHandler = async (dragIndex: number, hoverIndex: number, item: ItemType & { currentColumnName: string }) => {
    dispatch(refreshRainRoofItems({ dragIndex, hoverIndex, item: {
      id: item.id, name: item.name, column: item.currentColumnName,
      index: item.index,
    } }));
  };

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'items',
    hover(item: ItemType, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index!;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCardHandler(dragIndex, hoverIndex, item);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'items',
    item: {
      index, name: item.name, currentColumnName: item.column, id: item.id,
    },
    end: (_item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult as { name: string };

        if (name && name.split('_')[0] === 'block') {
          const blockId = Number(_item.currentColumnName!.split('_')[1]);
          const targetBlockId = Number(name!.split('_')[1]);

          if (blockId !== targetBlockId) {
            dispatch(changeItemColumn({ blockId, targetBlockId, itemId: _item.id }));
          }
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} className="item" style={{ opacity }}>
      {`${item.id} - item - ${item.name}`}
        <button
          onClick={() => dispatch(removeRainRoofItem({ itemId: item.id, blockId: Number(item.column?.split('_')[1]) }))
          }
          title="Удалить строку"
        >
          Удалить строку
        </button>
    </div>
  );
}
