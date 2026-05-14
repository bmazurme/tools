/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Modal, TextInput, Text,
} from '@gravity-ui/uikit';

import { useUpdateHeatConsumptionMutation } from '../../store';
import {
  NUMBER_PATTERN,
  ZERO_TO_HUNDRED_PATTERN,
} from '../../utils/constants';

type FormPayload = ItemType & HeatConsumption;

const FIELD_CONFIG = [
  {
    name: 'th',
    label: 'Температура горячей воды, °С, в местах водоразбора',
    pattern: {
      value: ZERO_TO_HUNDRED_PATTERN,
      message: 'Укажите значение от 0 до 100',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'tc',
    label: 'Температура холодной воды, °С, в сети водопровода',
    pattern: {
      value: ZERO_TO_HUNDRED_PATTERN,
      message: 'Укажите значение от 0 до 100',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'avgHotWaterPerHour',
    label: 'Средний часовой расход горячей воды, м3',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'maxHotWaterPerHour',
    label: 'Максимальный часовой расход горячей воды, м3',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'hwPipelineHeatLoss',
    label: 'Потери тепла трубопроводами на расчетном участке, кВт',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
];

export default function HeatConsumptionModal({ item, open, setOpen }:
  { item: (ItemType); open: boolean; setOpen: (val: boolean) => void }) {
  const [updateHeatConsumption] = useUpdateHeatConsumptionMutation();
  const {
    control, handleSubmit,
  } = useForm<FormPayload>({
    defaultValues: {
      th: item.heatConsumption?.th || 0,
      tc: item.heatConsumption?.tc || 5,
      maxHotWaterPerHour: item.heatConsumption?.maxHotWaterPerHour || 0,
      avgHotWaterPerHour: item.heatConsumption?.avgHotWaterPerHour || 0,
      hwPipelineHeatLoss: item.heatConsumption?.hwPipelineHeatLoss || 0,
      meanHourlyHeatForHotWater: item.heatConsumption?.meanHourlyHeatForHotWater || 0,
      maxHourlyHeatForHotWater: item.heatConsumption?.maxHourlyHeatForHotWater || 0,
    },
  });

  const onSubmit = async (data: FormPayload) => {
    await updateHeatConsumption({ ...item.heatConsumption, ...data });
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
          Расчет тепла для нагрева горячей воды, кВт
        </Text>

        {FIELD_CONFIG.map(renderInput)}

        <div className="buttons">
          <Button
            view="action"
            size="l"
            type="submit"
          >
            Сохранить
          </Button>
          <Button
            view="flat"
            size="l"
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </form>
    </Modal>
  );
}
