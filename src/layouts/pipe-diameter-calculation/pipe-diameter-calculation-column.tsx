import { useDrop } from 'react-dnd';
import { useCallback, useMemo, type ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';
import { setItem, useCreatePipeDiameterCalculationItemMutation } from '../../store';

import { useAppDispatch } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './pipe-diameter-calculation-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function PipeDiameterCalculationColumn({ children, blockId, length }: ColumnType) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [createItem] = useCreatePipeDiameterCalculationItemMutation();
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
            title="Расчетный расход, л/с"
            className={style.flowRate}
          >
            <Latex>{LATEX.q}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Допустимая скорость движения воды, м/с"
            className={style.velocity}
          >
            <Latex>{LATEX.velocity}</Latex>
          </Text>
          <Text
            variant="code-1"
            title="Расчетный диаметр, мм"
            className={style.diameter}
          >
            <Latex>{LATEX.pipeDiameter}</Latex>
          </Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
