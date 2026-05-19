/* eslint-disable consistent-return */
import { useDrop } from 'react-dnd';
import type { ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';
import { setItem, useCreateThrottlePlateItemMutation } from '../../store';

import { useAppDispatch } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './throttle-plate-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function ThrottlePlateColumn({ children, blockId, length }: ColumnType) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [createItem] = useCreateThrottlePlateItemMutation();
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

  const onHandleAddItem = async () => {
    try {
      const item = await createItem({ block: { id: blockId }, index: length }).unwrap();
      dispatch(setItem({ item }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      showError(message, 'Ошибка при обновлении статуса');
    }
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
            title="Расчетный расход, л/с"
            className={style.flowRate}
          >
            <Latex>{LATEX.q}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Избыточный напор, который следует погасить диафрагмой, МПа"
            className={style.excessHead}
          >
            <Latex>{LATEX.excessHead}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Диаметр, мм"
            className={style.diameter}
          >
            <Latex>{LATEX.diameter}</Latex>
          </Text>
          {/* <Text
            variant="code-1"
            title="Максимальный часовой расход горячей воды, м3"
            className={style.maxHotWaterPerHour}
          >
            <Latex>{LATEX.maxHotWaterPerHour}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Средний часовой расход горячей воды, м3"
            className={style.avgHotWaterPerHour}
          >
            <Latex>{LATEX.avgHotWaterPerHour}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Потери тепла трубопроводами на расчетном участке, кВт"
            className={style.hwPipelineHeatLoss}
          >
            <Latex>{LATEX.hwPipelineHeatLoss}</Latex>
          </Text>
          <Text
            variant="code-1"
            title=""
            className={style.meanHourlyHeatForHotWater}
          >
            <Latex>{LATEX.meanHourlyHeatForHotWater}</Latex>
          </Text>
          <Text
            variant="code-1"
            title=""
            className={style.maxHourlyHeatForHotWater}
          >
            <Latex>{LATEX.maxHourlyHeatForHotWater}</Latex>
          </Text> */}
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
