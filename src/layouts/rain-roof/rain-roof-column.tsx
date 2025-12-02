/* eslint-disable consistent-return */
import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';
import { useCreateRainRoofItemMutation } from '../../store';

import style from './rain-roof-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function RainRoofColumn({ children, blockId, length }: ColumnType) {
  const [createItem] = useCreateRainRoofItemMutation();
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
    drop: () => ({ blockId }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item: ItemType) => {
      if (typeof item !== 'object' || item === null) {
        return false;
      }

      return typeof item.block.id === 'number'; /// !!!
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return 'var(--g-color-base-selection)';
      } if (!canDrop) {
        return 'rgb(255,188,188)';
      }
    } else {
      return '';
    }
  };

  const onHandleAddItem = () => {
    createItem({ block: { id: blockId }, index: length });
  };

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className="column"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <Column action={onHandleAddItem}>
        <div className="fields">
          <Text
            variant="code-1"
            className={style.id}
          >
            #
          </Text>
          <Text
            variant="code-1"
            className={style.name}
          >
            Наименование участка
          </Text>
          <Text
            variant="code-1"
            title="Площадь кровли"
            className={style.roof}
          >
            <Latex>{LATEX.Fh}</Latex>
          </Text>
          <Text
            variant="code-1"
            className={style.wall}
          >
            <Latex>{LATEX.Fv}</Latex>
          </Text>
          <Text
            variant="code-1"
            className={style.q5}
          >
            <Latex>{LATEX.q5}</Latex>
          </Text>
          <Text
            variant="code-1"
            className={style.q20}
          >
            <Latex>{LATEX.q20}</Latex>
          </Text>
          <Text
            variant="code-1"
            className={style.n}
          >
            <Latex>{LATEX.n}</Latex>
          </Text>
          <Text
            variant="code-1"
            className={style.slope}
          >
            Уклон, %
          </Text>
          <Text
            variant="code-1"
            title="Расход, л/с"
            className={style.flow}
          >
            <Latex>{LATEX.Q}</Latex>
          </Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
