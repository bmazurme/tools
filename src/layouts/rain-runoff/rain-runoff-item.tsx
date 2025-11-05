/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Text } from '@gravity-ui/uikit';

import Item from '../../components/item/item';
import RainRunoffModal from './rain-runoff-modal';

import { TARGET_TYPE } from '../../config';
import { useAppSelector } from '../../hooks';
import {
  itemsSelector,
  useDeleteItemMutation,
  useRefreshItemsMutation,
  useUpdateItemMutation,
} from '../../store';

import style from './rain-runoff-column.module.css';

type FormPayload = { name: string };

const FIELD_CONFIG = [
  {
    name: 'name' as const,
    placeholder: 'Название',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Название должно содержать от 3 до 50 символов (буквы, цифры, пробелы, точки, запятые, дефисы)',
    },
    required: 'Обязательно к заполнению',
    autoComplete: 'name',
  },
] as const;

export default function RainRunoffItem({ item, index }: { item: ItemType; index: number }) {
  const { items } = useAppSelector(itemsSelector) ?? { items: [] };
  const [open, setOpen] = useState(false);
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [refreshItems] = useRefreshItemsMutation();
  const ref = useRef<HTMLLIElement>(null);

  const { control } = useForm<FormPayload>({
    defaultValues: { name: item.name },
  });

  const moveCardHandler = async (dragIndex: number, hoverIndex: number, it: ItemType) => {
    const blockItems = items.filter((x) => x.column === it.column);
    const dragItem = blockItems.find((x: ItemType) => x.id === it.id);
    // dragIndex = blockItems.findIndex((x: ItemType) => x.id === it.id);

    if (dragItem) {
      const newItems = [...blockItems];
      const [movedItem] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, movedItem);
      await refreshItems(newItems.map((x, i) => ({ ...x, index: i })));
    }
  };

  const [, drop] = useDrop({
    accept: TARGET_TYPE.ITEMS,
    hover(_item: ItemType, monitor) {
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
        // eslint-disable-next-line no-param-reassign
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

        if (typeof targetBlockId === 'number') { /// !!!
          if (_item.column !== targetBlockId) {
            const targetIndex = items.filter((x) => x.column === targetBlockId).length;
            await updateItem({ ...item, column: targetBlockId, index: targetIndex });
          }
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const onHandleRemoveItem = async () => {
    await deleteItem(item.id);
  };
  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  const onSubmit = async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const { name } = control._formValues;

      if (item.name !== name) {
        await updateItem({ ...item, name });
      }
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };

  return (
    <li ref={ref} className="item" style={{ opacity }}>
      <Item removeAction={onHandleRemoveItem} editAction={() => setOpen(true)}>
        <ul className="fields">
          <Text variant="code-1" className={style.id}>{item.index + 1}</Text>
          {FIELD_CONFIG.map((input) => (
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
          <Text variant="code-1" className={style.area}>{item.rainRunoff?.area}</Text>
          <Text variant="code-1" className={style.intensity}>{item.rainRunoff?.intensity}</Text>
          <Text variant="code-1" className={style.lengthPipe}>{item.rainRunoff?.lengthPipe}</Text>
          <Text variant="code-1" className={style.lengthTray}>{item.rainRunoff?.lengthTray}</Text>
          <Text variant="code-1" className={style.velocityPipe}>{item.rainRunoff?.velocityPipe}</Text>
          <Text variant="code-1" className={style.velocityTray}>{item.rainRunoff?.velocityTray}</Text>
          <Text variant="code-1" className={style.timeInit}>{item.rainRunoff?.timeInit}</Text>
          <Text variant="code-1" className={style.flow}>{item.rainRunoff?.flow}</Text>
        </ul>
      </Item>
      <RainRunoffModal item={item} open={open} setOpen={setOpen} />
    </li>
  );
}
