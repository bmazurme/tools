/* eslint-disable consistent-return */
import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { useCreateRainRunoffItemMutation } from '../../store';
import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';

import style from './rain-runoff-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function RainRunoffColumn({ children, blockId, length }: ColumnType) {
  const [createItem] = useCreateRainRunoffItemMutation();
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
            title="Площадь, га"
            className={style.area}
          >
            <Latex>{LATEX.Fr}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Интенсивность дождя"
            className={style.intensity}
          >
            <Latex>{LATEX.q20}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Длина расчетных участков коллектора, м"
            className={style.lengthPipe}
          >
            <Latex>{LATEX.lp}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Длина участков лотков, м"
            className={style.lengthTray}
          >
            <Latex>{LATEX.lcan}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Расчетная скорость течения на участке, м/с"
            className={style.velocityPipe}
          >
            <Latex>{LATEX.vp}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Расчетная скорость течения на участке, м/с"
            className={style.velocityTray}
          >
            <Latex>{LATEX.vcan}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Продолжительность протекания, мин"
            className={style.timeInit}
          >
            <Latex>{LATEX.tcon}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Расход, л/с"
            className={style.flow}
          >
            <Latex>{LATEX.Qr}</Latex>
          </Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
