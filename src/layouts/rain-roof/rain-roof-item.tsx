/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { Label } from '@gravity-ui/uikit';

import Item from '../../components/item/item';
import RainRoofModal from './rain-roof-modal';

import { TARGET_TYPE } from '../../config';
import {
  itemsSelector,
  useDeleteItemMutation,
  useRefreshItemsMutation,
  useUpdateItemMutation,
} from '../../store';
import { useAppSelector } from '../../hooks';

type FormPayload = ItemType;

export default function RainRoofItem({ item, index }:
  { item: (ItemType); index: number }) {
  const { items } = useAppSelector(itemsSelector) ?? { items: [] };
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [refreshItems] = useRefreshItemsMutation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const moveCardHandler = async (dragIndex: number, hoverIndex: number, it: ItemType) => {
    const blockItems = items.filter((x) => x.column === it.column);
    const dragItem = blockItems.find((x: ItemType) => x.id === it.id);
    // dragIndex = blockItems.findIndex((x: ItemType) => x.id === it.id);

    if (dragItem) {
      const newItems = [...blockItems];
      const [movedItem] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, movedItem);
      await refreshItems(newItems.map((x, i) => ({ ...x, index: i })));
    }
  };

  const [, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
    async hover(_item: (ItemType & RainFlowRoof), monitor) {
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

        moveCardHandler(dragIndex, hoverIndex, item);
        _item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TARGET_TYPE.ITEMS,
    item: { ...item, index },
    end: async (_item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { blockId: targetBlockId } = dropResult as { blockId: number };

        if (typeof targetBlockId === 'number') { /// !!!
          if (_item.column !== targetBlockId) {
            const targetIndex = items.filter((x) => x.column === targetBlockId).length;
            await updateItem({ ...item, column: targetBlockId, index: targetIndex });
          }
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onHandleRemoveItem = async () => {
    await deleteItem(item.id);
  };
  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  // eslint-disable-next-line max-len
  // const keys: (keyof FormPayload)[] = ['index', 'name', 'areaRoof', 'q5', 'q20', 'n', 'slope', 'flow'];
  const keys: (keyof FormPayload)[] = ['index', 'name'];

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
