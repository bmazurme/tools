/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, TextInput } from '@gravity-ui/uikit';

import { useUpdateHeatConsumptionMutation } from '../../store';
import { FIELD_CONFIG, type FieldConfig } from './field-config';
import { FormButtons } from '../../components/form-buttons/form-buttons';
import ModalHeader from '../../components/modal-header/modal-header';

type FormPayload = ItemType & HeatConsumption;
type ModalProps = { item: (ItemType); open: boolean; setOpen: (val: boolean) => void };

export default function HeatConsumptionModal({ item, open, setOpen }: ModalProps) {
  const [updateHeatConsumption] = useUpdateHeatConsumptionMutation();
  const {
    control, handleSubmit, reset,
  } = useForm<FormPayload>({
    defaultValues: {
      th: item.heatConsumption?.th,
      tc: item.heatConsumption?.tc,
      maxHotWaterPerHour: item.heatConsumption?.maxHotWaterPerHour,
      avgHotWaterPerHour: item.heatConsumption?.avgHotWaterPerHour,
      hwPipelineHeatLoss: item.heatConsumption?.hwPipelineHeatLoss,
      meanHourlyHeatForHotWater: item.heatConsumption?.meanHourlyHeatForHotWater,
      maxHourlyHeatForHotWater: item.heatConsumption?.maxHourlyHeatForHotWater,
    },
  });

  const onSubmit = useCallback(async (data: FormPayload) => {
    try {
      await updateHeatConsumption({ ...item.heatConsumption, ...data }).unwrap();
      setOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update heat consumption:', error);
    }
  }, [updateHeatConsumption, item.heatConsumption, setOpen]);

  const formFields = useMemo(
    () => FIELD_CONFIG.map((fieldConfig: FieldConfig) => (
      <Controller
        key={fieldConfig.name}
        name={fieldConfig.name}
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
            label={fieldConfig.label}
          />
        )}
      />
    )),
    [control],
  );

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Modal
      open={open}
      disableOutsideClick
    >
      <form
        className="dialog"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader
          itemName={item.name}
          itemSubName="Расчет тепла для нагрева горячей воды, кВт"
        />
        {formFields}
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
