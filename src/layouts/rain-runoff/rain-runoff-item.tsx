import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { changeItemColumn, refreshRainRoofItems, removeRainRoofItem } from '../../store';
import { useAppDispatch } from '../../hooks';
import { TARGET_TYPE } from '../../config';

export default function Item({ item, index }: { item: ItemType; index: number }) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
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

      dispatch(refreshRainRoofItems({ dragIndex, hoverIndex, item }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TARGET_TYPE.ITEMS,
    item: { ...item, index },
    end: (_item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { blockId: targetBlockId } = dropResult as { blockId: number };

        if (typeof targetBlockId === 'number') { /// !!!
          if (_item.column !== targetBlockId) {
            dispatch(changeItemColumn({ blockId: _item.column, targetBlockId, itemId: _item.id }));
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
          onClick={() => dispatch(removeRainRoofItem({ itemId: item.id, blockId: item.column })) }
          title="Удалить строку"
        >
          Удалить строку
        </button>
    </div>
  );
}
