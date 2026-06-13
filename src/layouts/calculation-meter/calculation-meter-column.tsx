import { useDrop } from 'react-dnd';
import { useCallback, useMemo, type ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';
import { setItem, useCreateCalculationMeterItemMutation } from '../../store';

import { useAppDispatch } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './calculation-meter-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function CalculationMeterColumn({ children, blockId, length }: ColumnType) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [createItem] = useCreateCalculationMeterItemMutation();
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
      showError(error, 'Ошибка при обновлении статуса');
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
            title="Тип счетчика"
            className={style.meterType}
          >
            Тип счетчика
          </Text>
          <Text
            variant="code-1"
            title="Диаметр счетчика, мм"
            className={style.diameter}
          >
            <Latex>{LATEX.meterDiameter}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Расчетный расход воды через счетчик, м³/ч"
            className={style.flowRate}
          >
            <Latex>{LATEX.q}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Гидравлическое сопротивление счетчика"
            className={style.resistance}
          >
            <Latex>{LATEX.resistance}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Потери давления в счетчике, м"
            className={style.pressureLoss}
          >
            <Latex>{LATEX.pressureLoss}</Latex>
          </Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
