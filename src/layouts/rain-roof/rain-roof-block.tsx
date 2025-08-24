/* eslint-disable max-len */
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';

import Block from '../../components/block/block';
import Column from './rain-roof-column';
import Item from './rain-roof-item';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { movedRainRoofBlock, rainRoofsSelector, removeRainRoofBlock } from '../../store';
import { TARGET_TYPE } from '../../config';

type ExtendedBlockType = Omit<BlockType, 'items'> & {
  items: (ItemType & RainFlowRoof)[];
}

export default function RainRoofBlock({ block, index }
  : { block: ExtendedBlockType; index: number }) {
  const dispatch = useAppDispatch();
  const { blocks } = useAppSelector(rainRoofsSelector);
  const ref = useRef<HTMLDivElement>(null);

  const moveBlockHandler = async (dragIndex: number, hoverIndex: number) => {
    const dragItem = blocks[dragIndex];

    if (dragItem) {
      dispatch(movedRainRoofBlock({ hoverIndex, dragIndex, dragItem }));
    }
  };

  const [, drop] = useDrop({
    accept: TARGET_TYPE.BLOCKS,
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
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

        moveBlockHandler(dragIndex, hoverIndex);
        // eslint-disable-next-line no-param-reassign
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TARGET_TYPE.BLOCKS,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const returnItemsForColumn = (items: (ItemType & RainFlowRoof)[]) => items.map((item: ItemType & RainFlowRoof, idx: number) => (
    <Item
      key={uuidv4()}
      index={idx}
      item={item}
    />
  ));

  const opacity = isDragging ? 0.4 : 1;
  const border = isDragging ? 'solid 1px var(--table-cell)' : 'none';
  const onHandleRemoveBlock = () => dispatch(removeRainRoofBlock({ blockId: block.id }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity, border, borderRadius: '8px' }}
      className="block"
    >
      <Block action={onHandleRemoveBlock} value={`block_${block.id}`} />
      <Column blockId={block.id}>
        {returnItemsForColumn(block.items)}
      </Column>
    </div>
  );
}
