/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Modal, TextInput, Text,
} from '@gravity-ui/uikit';

import { useUpdateHeatConsumptionMutation } from '../../store';
import { FIELD_CONFIG } from './field-config';

type FormPayload = ItemType & HeatConsumption;

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
    try {
      await updateHeatConsumption({ ...item.heatConsumption, ...data }).unwrap();
      setOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update heat consumption:', error);
    }
  };

  const renderInput = useCallback((fieldConfig: (typeof FIELD_CONFIG)[number]) => (
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
  ), [control]);

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
