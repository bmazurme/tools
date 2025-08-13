import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';

import Column from './column/column';
import Item,  { type ItemType } from './item';

import { useAppSelector, useAppDispatch } from '../hooks';
import { rainRoofsSelector, movedRainRoofBlock } from '../store';

export type BlockType = {
  id: number;
  name: string;
  items: ItemType[];
}
export type BlocksType = BlockType[];

export default function Block({ block, index }: { block: BlockType; index: number }) {
  const dispatch = useAppDispatch();
  const { blocks } = useAppSelector(rainRoofsSelector);
  console.log(blocks);
  const ref = useRef<HTMLDivElement>(null);

  const moveBlockHandler = async (dragIndex: number, hoverIndex: number) => {
    const dragItem = blocks[dragIndex];

    if (dragItem) {
      dispatch(movedRainRoofBlock({ hoverIndex, dragIndex, dragItem }));
    }
  };

  const [, drop] = useDrop({
    accept: 'blocks',
    hover(itm: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = itm.index!;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveBlockHandler(dragIndex, hoverIndex);
      itm.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'blocks',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const returnItemsForColumn = (block: BlockType) => {
    return block.items
    .map((item: ItemType, idx: number) => (
      <Item
        key={uuidv4()}
        index={idx}
        item={item}
      />
    ));
  }

  const opacity = isDragging ? 0.4 : 1;
  const border = isDragging ? 'solid 1px var(--table-cell)' : 'none';

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity, border, borderRadius: '8px' }}
      className="block"
    >
      {`block_${block.id}`}
      <Column blockId={block.id}>
        {returnItemsForColumn(block)}
      </Column>
    </div>
  );
}
