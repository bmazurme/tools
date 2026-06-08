import { useDrop } from 'react-dnd';
import { useCallback, useMemo, type ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';
import { setItem, useCreateHeatLossCalculationItemMutation } from '../../store';

import { useAppDispatch } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './heat-loss-calculation-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function HeatLossCalculationColumn({ children, blockId, length }: ColumnType) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [createItem] = useCreateHeatLossCalculationItemMutation();
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
            title="Длина участка, м"
            className={style.length}
          >
            <Latex>{LATEX.pipeLength}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Внутренний диаметр трубопровода, мм"
            className={style.innerPipeDiameter}
          >
            <Latex>{LATEX.innerPipeDiameter}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Наружный диаметр трубопровода, мм"
            className={style.outerPipeDiameter}
          >
            <Latex>{LATEX.outerPipeDiameter}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Толщина изоляции, мм"
            className={style.thickness}
          >
            <Latex>{LATEX.thickness}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Температура теплоносителя на входе, °C"
            className={style.tIn}
          >
            <Latex>{LATEX.tIn}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Температура окружающей среды, °C"
            className={style.tOut}
          >
            <Latex>{LATEX.tOut}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Температура теплоносителя в начале участка, °C"
            className={style.tStart}
          >
            <Latex>{LATEX.tStart}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Температура теплоносителя в конце участка, °C"
            className={style.tEnd}
          >
            <Latex>{LATEX.tEnd}</Latex>
          </Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
