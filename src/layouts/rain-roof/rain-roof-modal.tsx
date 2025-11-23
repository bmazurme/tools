/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Modal, TextInput, Text,
} from '@gravity-ui/uikit';

import { useUpdateRainRoofsMutation } from '../../store';
import { NUMBER_PATTERN, INTENSITY_PATTERN, ZERO_TO_ONE_PATTERN } from '../../utils/constants';

type FormPayload = ItemType & RainRoof;

const FIELD_CONFIG = [
  {
    name: 'areaRoof',
    label: 'Водосборная площадь кровли, F',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'areaFacade',
    label: 'Водосборная площадь фасада, F',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'q20',
    label: 'q₂₀ - интенсивность дождя, л/с',
    pattern: {
      value: INTENSITY_PATTERN,
      message: 'Допустимое значение от 0 до 150',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'n',
    label: 'n - параметр, принимаемый согласно СП 32.13330',
    pattern: {
      value: ZERO_TO_ONE_PATTERN,
      message: 'Допустимое значение от 0 до 1',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'slope',
    label: 'Уклон',
    pattern: {
      value: NUMBER_PATTERN,
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
      areaRoof: item.rainRoof?.areaRoof ?? 0,
      areaFacade: item.rainRoof?.areaFacade ?? 0,
      q20: item.rainRoof?.q20 ?? 0,
      n: item.rainRoof?.n ?? 0,
      slope: item.rainRoof?.slope ?? 0,
    },
  });

  const onSubmit = async (data: FormPayload) => {
    await updateRainRoofs({ ...item.rainRoof, ...data });
    setOpen(false);
  };

  const renderInput = (fieldConfig: (typeof FIELD_CONFIG)[number]) => (
    <Controller
      key={fieldConfig.name}
      name={fieldConfig.name as keyof FormPayload}
      rules={{
        pattern: fieldConfig.pattern,
        required: fieldConfig.required,
      }}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          {...field}
          {...fieldConfig}
          value={`${field.value}`}
          size="l"
          type="text"
          error={fieldState.error?.message}
        />
      )}
    />
  );

  return (
    <Modal open={open} disableOutsideClick>
      <form className="dialog" onSubmit={handleSubmit(onSubmit)}>
        <Text variant="header-1">
          {item.name}
        </Text>
        <Text variant="subheader-1">
          Расчетный расход дождевых вод Q, л/с, с водосборной площади
        </Text>

        {FIELD_CONFIG.map(renderInput)}

        <div className="buttons">
          <Button view="action" size="l" type="submit">Сохранить</Button>
          <Button view="flat" size="l" onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      </form>
    </Modal>
  );
}
