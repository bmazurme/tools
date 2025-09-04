/* eslint-disable react/jsx-props-no-spreading */
import { Button, Icon, TextInput } from '@gravity-ui/uikit';
import { TrashBin } from '@gravity-ui/icons';
import { Controller, useForm } from 'react-hook-form';
import { TEXT_INPUT_PROPS } from '../../config';
import { useUpdateBlockMutation } from '../../store';

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

export default function Block({ action, value }
  : { action: () => void; value: BlockType }) {
  const [updateBlock] = useUpdateBlockMutation();
  const { control } = useForm<FormPayload>({
    defaultValues: { name: value.name },
  });
  const onSubmit = async () => {
    try {
      if (value.id) {
        // eslint-disable-next-line no-underscore-dangle
        const { name } = control._formValues;
        await updateBlock({ ...value, name });
      }
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
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
        onClick={action}
        title="Удалить блок"
      >
        <Icon
          data={TrashBin}
          size={20}
        />
      </Button>
    </form>
  );
}
