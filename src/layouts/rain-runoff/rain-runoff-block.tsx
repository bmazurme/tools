import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';
import { useParams } from 'react-router-dom';

import Block from '../../components/block/block';
import Column from './rain-runoff-column';
import Item from './rain-runoff-item';

import { useAppSelector } from '../../hooks';
import { blocksSelector, useDeleteBlockMutation, useRefreshBlocksMutation } from '../../store';
import { TARGET_TYPE } from '../../config';

export default function RainRunoffBlock({ block, index }: { block: BlockType; index: number }) {
  const { id } = useParams();
  const [refreshBlocks] = useRefreshBlocksMutation();
  const [deleteBlock] = useDeleteBlockMutation();
  const { blocks } = useAppSelector(blocksSelector) ?? { blocks: [] };
  const ref = useRef<HTMLDivElement>(null);

  const moveBlockHandler = async (dragIndex: number, hoverIndex: number) => {
    const dragItem = blocks[dragIndex];

    if (dragItem) {
      const coppiedStateArray = [...blocks];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

      await refreshBlocks({
        data: coppiedStateArray.map((item, i) => ({ ...item, index: i })),
        id: Number(id),
      });
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

  const returnItemsForColumn = (items: ItemType[]) => items.map((item: ItemType, idx: number) => (
    <Item
      key={uuidv4()}
      index={idx}
      item={item}
    />
  ));

  const opacity = isDragging ? 0.4 : 1;
  const border = isDragging ? 'solid 1px var(--table-cell)' : 'none';
  const onHandleRemoveRunoffBlock = async () => {
    await deleteBlock(block.id);
  };

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity, border, borderRadius: '8px' }}
      className="block"
    >
      <Block action={onHandleRemoveRunoffBlock} value={block} />
      <Column blockId={block.id}>
        {/* {returnItemsForColumn(block.items)} */}
        {returnItemsForColumn([])}
      </Column>
    </div>
  );
}
