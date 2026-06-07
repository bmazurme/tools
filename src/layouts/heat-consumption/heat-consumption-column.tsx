import { useDrop } from 'react-dnd';
import { useCallback, useMemo, type ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';
import { setItem, useCreateHeatConsumptionItemMutation } from '../../store';

import { useAppDispatch } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './heat-consumption-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function HeatConsumptionColumn({ children, blockId, length }: ColumnType) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [createItem] = useCreateHeatConsumptionItemMutation();
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

  const backgroundColor = useMemo(() => {
    if (!isOver) {
      return '';
    }

    return canDrop ? 'var(--g-color-base-selection)' : 'rgb(255,188,188)';
  }, [isOver, canDrop]);

  const onHandleAddItem = useCallback(async () => {
    try {
      const item = await createItem({ block: { id: blockId }, index: length }).unwrap();
      dispatch(setItem({ item }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      showError(message, 'Ошибка при обновлении статуса');
    }
  }, [createItem, blockId, length, dispatch, showError]);

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className="column"
      style={{ backgroundColor }}
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
            title="Температура холодной воды, °С, в сети водопровода"
            className={style.tc}
          >
            <Latex>{LATEX.tc}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Температура горячей воды, °С, в местах водоразбора"
            className={style.th}
          >
            <Latex>{LATEX.th}</Latex>
          </Text>
          <Text
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
          </Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
