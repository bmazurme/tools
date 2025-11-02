/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Modal, TextInput, Text,
} from '@gravity-ui/uikit';

import { useUpdateRainRoofsMutation } from '../../store';

type FormPayload = ItemType & RainFlowRoof;

const fields = [
  {
    name: 'areaRoof',
    label: 'Водосборная площадь кровли, F',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'areaFacade',
    label: 'Водосборная площадь фасада, F',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'q20',
    label: 'q20 - интенсивность дождя, л/с',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'n',
    label: 'n - параметр, принимаемый согласно СП 32.13330',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'slope',
    label: 'Уклон',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
];

export default function RainRoofModal({ item, open, setOpen }:
  { item: (ItemType); open: boolean; setOpen: (val: boolean) => void }) {
  const [updateRainRoofs] = useUpdateRainRoofsMutation();
  const {
    control, handleSubmit,
  } = useForm<FormPayload>({
    defaultValues: {
      areaRoof: item.rainRoof?.areaRoof || 0,
      areaFacade: item.rainRoof?.areaFacade || 0,
      q20: item.rainRoof?.q20 || 0,
      n: item.rainRoof?.n || 0,
      slope: item.rainRoof?.slope || 0,
    },
  });

  const onSubmit = async (data: FormPayload) => {
    await updateRainRoofs({ ...item.rainRoof, ...data });
    setOpen(false);
  };

  return (
    <Modal open={open} disableOutsideClick>
      <form className="dialog" onSubmit={handleSubmit(onSubmit)}>
        <Text variant="header-1">
          Расчетный расход дождевых вод Q, л/с, с водосборной площади
        </Text>

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
                value={`${field.value}`}
                size="l"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />
        ))}

        <div className="buttons">
          <Button view="action" size="l" type="submit">Сохранить</Button>
          <Button view="flat" size="l" onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      </form>
    </Modal>
  );
}
