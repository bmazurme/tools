/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@gravity-ui/uikit';

import { useUpdateHeatConsumptionMutation } from '../../store';
import { FIELD_CONFIG } from './field-config';
import FormField from '../../components/form-field';
import { FormButtons } from '../../components/form-buttons';
import ModalHeader from '../../components/modal-header';

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

  const onSubmit = async (data: FormPayload) => {
    try {
      await updateHeatConsumption({ ...item.heatConsumption, ...data }).unwrap();
      setOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update heat consumption:', error);
    }
  };

  const formFields = useMemo(
    () => FIELD_CONFIG.map((fieldConfig) => (
      <FormField
        key={fieldConfig.name}
        fieldConfig={fieldConfig}
        control={control}
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
