import { useDrop } from 'react-dnd';
import { useCallback, useMemo, type ReactNode } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import Column from '../../components/column/column';

import { TARGET_TYPE } from '../../config';
import { LATEX } from '../../utils/constants';
import { setItem, useCreateCollectorCalculationItemMutation } from '../../store';

import { useAppDispatch } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './collector-calculation-column.module.css';

type ColumnType = {
  children: ReactNode;
  blockId: number;
  length: number;
};

export default function CollectorCalculationColumn({ children, blockId, length }: ColumnType) {
  const { showError } = useAppToaster();
  const dispatch = useAppDispatch();
  const [createItem] = useCreateCollectorCalculationItemMutation();
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

      return typeof item.block.id === 'number';
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
          <Text variant="code-1" className={style.id}>#</Text>
          <Text variant="code-1" className={style.name}>Наименование участка</Text>
          <Text variant="code-1" title="Диаметр трубопровода 1, мм" className={style.d1}>
            <Latex>{LATEX.collectorD1}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 2, мм" className={style.d2}>
            <Latex>{LATEX.collectorD2}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 3, мм" className={style.d3}>
            <Latex>{LATEX.collectorD3}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 4, мм" className={style.d4}>
            <Latex>{LATEX.collectorD4}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 5, мм" className={style.d5}>
            <Latex>{LATEX.collectorD5}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 6, мм" className={style.d6}>
            <Latex>{LATEX.collectorD6}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 7, мм" className={style.d7}>
            <Latex>{LATEX.collectorD7}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 8, мм" className={style.d8}>
            <Latex>{LATEX.collectorD8}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 9, мм" className={style.d9}>
            <Latex>{LATEX.collectorD9}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр трубопровода 10, мм" className={style.d10}>
            <Latex>{LATEX.collectorD10}</Latex>
          </Text>
          <Text variant="code-1" title="Диаметр коллектора, мм" className={style.diameter}>
            <Latex>{LATEX.collectorDiameter}</Latex>
          </Text>
        </div>
      </Column>
      <ul className="column_list">
        {children}
      </ul>
    </div>
  );
}
