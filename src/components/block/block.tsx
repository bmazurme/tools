/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Button, Icon, TextInput } from '@gravity-ui/uikit';
import { TrashBin } from '@gravity-ui/icons';
import { Controller, useForm } from 'react-hook-form';

import { TEXT_INPUT_PROPS } from '../../config';
import { useDeleteBlockMutation, useUpdateBlockMutation } from '../../store';
import ConfirmModal from '../confirm-modal/confirm-modal';

const fields = [
  {
    name: 'name',
    label: 'Название',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
    autoComplete: 'name',
  },
];

type FormPayload = { name: string };

export default function Block({ blockId, value }
  : { blockId: number; value: BlockType }) {
  const [updateBlock] = useUpdateBlockMutation();
  const [deleteBlock] = useDeleteBlockMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { control } = useForm<FormPayload>({
    defaultValues: { name: value.name },
  });
  const onSubmit = async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const { name } = control._formValues;

      if (value.id && value.name !== name) {
        await updateBlock({ ...value, name });
      }
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };
  const onHandleConfirmDelete = () => {
    setIsModalOpen(true);
  };
  const onHandleRemoveBlock = async () => {
    await deleteBlock(blockId);
  };

  return (
    <form className="block_header">
      {fields.map((input) => (
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
              {...TEXT_INPUT_PROPS}
              error={fieldState.error?.message}
              onBlur={onSubmit}
            />
          )}
        />
      ))}
      <Button
        view="flat"
        size="l"
        onClick={onHandleConfirmDelete}
        title="Удалить блок"
      >
        <Icon
          data={TrashBin}
          size={20}
        />
      </Button>
      {isModalOpen && (
        <ConfirmModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onDelete={onHandleRemoveBlock}
          title="Вы действительно хотите удалить блок?"
        />
      )}
    </form>
  );
}
