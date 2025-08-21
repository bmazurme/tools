import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Item from '../../components/item/item';

import { changeRainRunoffItemColumn, refreshRainRunoffItems, removeRainRunoffItem } from '../../store';
import { useAppDispatch } from '../../hooks';
import { TARGET_TYPE } from '../../config';

export default function RainRunoffItem({ item, index }: { item: ItemType; index: number }) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
    hover(_item: ItemType, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = _item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (clientOffset?.y) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        dispatch(refreshRainRunoffItems({ dragIndex, hoverIndex, item: _item }));
        // eslint-disable-next-line no-param-reassign
        _item.index = hoverIndex;
      }
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
            dispatch(changeRainRunoffItemColumn({
              blockId: _item.column,
              targetBlockId,
              itemId: _item.id,
            }));
          }
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onHandleRemoveItem = () => dispatch(removeRainRunoffItem(item));
  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <li ref={ref} className="item" style={{ opacity }}>
      <Item removeAction={onHandleRemoveItem} editAction={() => {}}>
        {`${item.id} - item - ${item.name}`}
      </Item>
    </li>
  );
}
