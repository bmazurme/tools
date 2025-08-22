/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Label } from '@gravity-ui/uikit';
import Item from '../../components/item/item';
import RainRoofModal from './rain-roof-modal';

import {
  changeRainRoofItemColumn, refreshRainRoofItems, removeRainRoofItem,
} from '../../store';
import { useAppDispatch } from '../../hooks';
import { TARGET_TYPE } from '../../config';

type FormPayload = ItemType & RainFlowRoof;

export default function RainRoofItem({ item, index }:
  { item: (ItemType & RainFlowRoof); index: number }) {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
    hover(_item: (ItemType & RainFlowRoof), monitor) {
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

        dispatch(refreshRainRoofItems({ dragIndex, hoverIndex, item: _item }));
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
            dispatch(changeRainRoofItemColumn({
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

  const onHandleRemoveItem = () => dispatch(removeRainRoofItem(item));
  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  const keys: (keyof FormPayload)[] = ['index', 'name', 'areaRoof', 'q5', 'q20', 'n', 'slope', 'flow'];

  return (
    <li ref={ref} className="item" style={{ opacity }}>
      <Item removeAction={onHandleRemoveItem} editAction={() => setOpen(true)}>
        <ul className="fields">
          {keys.map((key) => <Label key={uuidv4()} theme="clear" className="field">{item[key]}</Label>)}
        </ul>
      </Item>
      <RainRoofModal item={item} open={open} setOpen={setOpen} />
    </li>
  );
}
