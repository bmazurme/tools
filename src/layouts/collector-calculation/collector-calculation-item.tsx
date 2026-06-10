/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import {
  memo, useCallback, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { TextInput, Text } from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';

import Item from '../../components/item/item';
import CollectorCalculationModal from './collector-calculation-modal';

import { TARGET_TYPE } from '../../config';
import {
  itemsSelector,
  useRefreshItemsMutation,
  useUpdateItemMutation,
} from '../../store';
import { useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { itemFieldsConfig } from '../../components/item/item-field-config';

import style from './collector-calculation-column.module.css';

type FormPayload = { name: string };
interface ICollectorCalculationItem {
  item: (ItemType);
  index: number;
}

const CollectorCalculationItem = memo(({ item, index }: ICollectorCalculationItem) => {
  const { showError } = useAppToaster();
  const navigate = useNavigate();
  const { items } = useAppSelector(itemsSelector) ?? { items: [] };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const linkToDetails = useCallback(() => navigate(`${item.id}`), [navigate, item.id]);
  const onEdit = useCallback(() => setIsModalOpen(true), []);

  const [updateItem] = useUpdateItemMutation();
  const [refreshItems] = useRefreshItemsMutation();
  const ref = useRef<HTMLLIElement>(null);

  const { control, getValues } = useForm<FormPayload>({
    defaultValues: { name: item.name },
  });

  const moveCardHandler = async (dragIndex: number, hoverIndex: number, it: ItemType) => {
    const blockItems = items.filter((x) => x.block.id === it.block.id);
    const dragItem = blockItems.find((x: ItemType) => x.id === it.id);

    if (dragItem) {
      const newItems = [...blockItems];
      const [movedItem] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, movedItem);

      await refreshItems(newItems.filter((t) => t).map((x, i) => ({ ...x, index: i })));
    }
  };

  const [, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
    async hover(_item: (ItemType & CollectorCalculation), monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = _item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
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

        moveCardHandler(dragIndex, hoverIndex, item);
        _item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TARGET_TYPE.ITEMS,
    item: { ...item, index },
    end: async (_item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { blockId: targetBlockId } = dropResult as { blockId: number };

        if (typeof targetBlockId === 'number') {
          if (_item.block.id !== targetBlockId) {
            const targetIndex = items.filter((x) => x.block.id === targetBlockId).length;
            await updateItem({ ...item, block: { id: targetBlockId }, index: targetIndex });
          }
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  const onSubmit = useCallback(async () => {
    try {
      const { name } = getValues();

      if (item.name !== name) {
        const { id, block } = item;
        await updateItem({
          id, name, index, block,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
      showError(message, 'Ошибка');
    }
  }, [getValues, item, index, updateItem, showError]);

  return (
    <li ref={ref} className="item" style={{ opacity }}>
      <Item
        itemId={item.id}
        editAction={onEdit}
        detailAction={linkToDetails}
      >
        <ul className="fields">
          <Text variant="code-1" className={style.id}>{item.index + 1}</Text>
          {itemFieldsConfig.map((input) => (
            <Controller
              key={input.name}
              name={input.name as keyof FormPayload}
              rules={{
                pattern: input.pattern,
                required: input.required,
              }}
              control={control}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  {...input}
                  size="m"
                  type="text"
                  error={fieldState.error?.message}
                  className={style.name}
                  onBlur={onSubmit}
                />
              )}
            />
          ))}
          <Text variant="code-1" className={style.d1}>{item.collectorCalculation?.d1}</Text>
          <Text variant="code-1" className={style.d2}>{item.collectorCalculation?.d2}</Text>
          <Text variant="code-1" className={style.d3}>{item.collectorCalculation?.d3}</Text>
          <Text variant="code-1" className={style.d4}>{item.collectorCalculation?.d4}</Text>
          <Text variant="code-1" className={style.d5}>{item.collectorCalculation?.d5}</Text>
          <Text variant="code-1" className={style.d6}>{item.collectorCalculation?.d6}</Text>
          <Text variant="code-1" className={style.d7}>{item.collectorCalculation?.d7}</Text>
          <Text variant="code-1" className={style.d8}>{item.collectorCalculation?.d8}</Text>
          <Text variant="code-1" className={style.d9}>{item.collectorCalculation?.d9}</Text>
          <Text variant="code-1" className={style.d10}>{item.collectorCalculation?.d10}</Text>
          <Text variant="code-1" className={style.diameter}>{item.collectorCalculation?.diameter}</Text>
        </ul>
      </Item>
      {isModalOpen
        && (
        <CollectorCalculationModal
          item={item}
          open={isModalOpen}
          setOpen={setIsModalOpen}
        />
        )}
    </li>
  );
});

export default CollectorCalculationItem;
