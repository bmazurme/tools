/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, TextInput } from '@gravity-ui/uikit';

import { useUpdateHeatLossCalculationMutation } from '../../store';
import { FIELD_CONFIG, type FieldConfig } from './field-config';
import { FormButtons } from '../../components/form-buttons/form-buttons';
import ModalHeader from '../../components/modal-header/modal-header';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './heat-loss-calculation-modal.module.css';

type FormPayload = ItemType & HeatLossCalculation;
type ModalProps = { item: (ItemType); open: boolean; setOpen: (val: boolean) => void };

export default function HeatLossCalculationModal({ item, open, setOpen }: ModalProps) {
  const [updateHeatLossCalculation] = useUpdateHeatLossCalculationMutation();
  const { showError } = useAppToaster();
  const {
    control, handleSubmit, reset,
  } = useForm<FormPayload>({
    defaultValues: {
      length: item.heatLossCalculation?.length,
      innerPipeDiameter: item.heatLossCalculation?.innerPipeDiameter,
      outerPipeDiameter: item.heatLossCalculation?.outerPipeDiameter,
      thickness: item.heatLossCalculation?.thickness,
      viscosity: item.heatLossCalculation?.viscosity,
      pr: item.heatLossCalculation?.pr,
      lambda: item.heatLossCalculation?.lambda,
      koefPipe: item.heatLossCalculation?.koefPipe,
      koefInsulation: item.heatLossCalculation?.koefInsulation,
      alphaNar: item.heatLossCalculation?.alphaNar,
      tIn: item.heatLossCalculation?.tIn,
      tOut: item.heatLossCalculation?.tOut,
      tStart: item.heatLossCalculation?.tStart,
      flowRate: item.heatLossCalculation?.flowRate,
      velocity: item.heatLossCalculation?.velocity,
    },
  });

  const onSubmit = useCallback(async (data: FormPayload) => {
    try {
      await updateHeatLossCalculation({ ...item.heatLossCalculation, ...data }).unwrap();
      setOpen(false);
    } catch (error) {
      showError(error, 'Ошибка при обновлении расчета теплопотерь');
    }
  }, [updateHeatLossCalculation, item.heatLossCalculation, setOpen, showError]);

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
          itemSubName="Расчёт тепловых потерь"
        />
        <div className={style.grid}>
          {formFields}
        </div>
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
