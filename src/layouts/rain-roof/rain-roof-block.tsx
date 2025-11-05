import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';
import { useParams } from 'react-router-dom';

import { Text } from '@gravity-ui/uikit';

import Block from '../../components/block/block';
import Column from './rain-roof-column';
import Item from './rain-roof-item';

import { useAppSelector } from '../../hooks';
import {
  blocksSelector,
  itemsSelector,
  useDeleteBlockMutation,
  useRefreshBlocksMutation,
} from '../../store';
import { TARGET_TYPE } from '../../config';
import ColumnFooter from '../../components/column/column-footer';

import style from './rain-roof-column.module.css';

type RainRoofBlockProps = { block: BlockType; index: number };

export default function RainRoofBlock({ block, index }: RainRoofBlockProps) {
  const { id } = useParams();
  const [refreshBlocks] = useRefreshBlocksMutation();
  const [deleteBlock] = useDeleteBlockMutation();
  const { blocks } = useAppSelector(blocksSelector) ?? { blocks: [] };
  const { items } = useAppSelector(itemsSelector) ?? { items: [] };
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

  const returnItemsForColumn = (itms: ItemType[]) => itms.map((item: ItemType, idx: number) => (
    <Item
      key={uuidv4()}
      index={idx}
      item={item}
    />
  ));

  const opacity = isDragging ? 0.4 : 1;
  const border = isDragging ? 'solid 1px var(--table-cell)' : 'none';
  const onHandleRemoveBlock = async () => {
    await deleteBlock(block.id);
  };

  drag(drop(ref));

  const blockItems = items.filter((x) => x.column === block.id);
  const sum = blockItems.reduce((a: number, x: ItemType) => a + Number(x.rainRoof?.flow || 0), 0);

  return (
    <div
      ref={ref}
      style={{ opacity, border, borderRadius: '8px' }}
      className="block"
    >
      <Block action={onHandleRemoveBlock} value={block} />

      <Column blockId={block.id} length={blockItems.length}>
        {returnItemsForColumn(blockItems)}
        {blockItems.length > 0
        && (
        <ColumnFooter>
          <div className="fields">
            <Text variant="code-1" className={style.id} />
            <Text variant="code-1" className={style.name} />
            <Text variant="code-1" className={style.roof} />
            <Text variant="code-1" className={style.wall} />
            <Text variant="code-1" className={style.q5} />
            <Text variant="code-1" className={style.q20} />
            <Text variant="code-1" className={style.n} />
            <Text variant="code-1" className={style.slope}>
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
