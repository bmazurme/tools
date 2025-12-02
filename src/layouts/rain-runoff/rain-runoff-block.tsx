import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useParams } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';

import Block from '../../components/block/block';
import Column from './rain-runoff-column';
import Item from './rain-runoff-item';

import { useAppSelector } from '../../hooks';
import {
  blocksSelector, itemsSelector, useRefreshBlocksMutation,
} from '../../store';
import { TARGET_TYPE } from '../../config';
import ColumnFooter from '../../components/column/column-footer';

import style from './rain-runoff-column.module.css';

export default function RainRunoffBlock({ block, index }: { block: BlockType; index: number }) {
  const { id } = useParams();
  const [refreshBlocks] = useRefreshBlocksMutation();
  const { blocks } = useAppSelector(blocksSelector) ?? { blocks: [] };
  const { items } = useAppSelector(itemsSelector) ?? { items: [] };

  const ref = useRef<HTMLDivElement>(null);

  const moveBlockHandler = async (dragIndex: number, hoverIndex: number) => {
    const dragItem = blocks[dragIndex];

    if (dragItem) {
      const copiedStateArray = [...blocks];
      const prevItem = copiedStateArray.splice(hoverIndex, 1, dragItem);
      copiedStateArray.splice(dragIndex, 1, prevItem[0]);

      await refreshBlocks({
        data: copiedStateArray.map((item, i) => ({ ...item, index: i })),
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

  const returnItemsForColumn = (itms: ItemType[]) => itms.map((item: ItemType, idx: number) => (
    <Item
      key={item.id}
      index={idx}
      item={item}
    />
  ));

  const opacity = isDragging ? 0.4 : 1;
  const border = isDragging ? 'solid 1px var(--table-cell)' : 'none';

  drag(drop(ref));

  const blockItems = items.filter((x) => x.block.id === block.id);
  const sum = blockItems.reduce((a: number, x: ItemType) => a + Number(x.rainRunoff?.flow || 0), 0);

  return (
    <div
      ref={ref}
      style={{ opacity, border, borderRadius: '8px' }}
      className="block"
    >
      <Block blockId={block.id} value={block} />

      <Column blockId={block.id} length={blockItems.length}>
        {returnItemsForColumn(blockItems)}
        {blockItems.length > 0
        && (
          <ColumnFooter>
            <div className="fields">
              <Text variant="code-1" className={style.id} />
              <Text variant="code-1" className={style.name} />
              <Text variant="code-1" className={style.area} />
              <Text variant="code-1" className={style.intensity} />
              <Text variant="code-1" className={style.lengthPipe} />
              <Text variant="code-1" className={style.lengthTray} />
              <Text variant="code-1" className={style.velocityPipe} />
              <Text variant="code-1" className={style.velocityTray} />
              <Text variant="code-1" className={style.timeInit}>
                Итого:
              </Text>
              <Text variant="code-1" className={style.flow}>
                {sum.toFixed(2)}
              </Text>
            </div>
          </ColumnFooter>
        )}
      </Column>
    </div>
  );
}
