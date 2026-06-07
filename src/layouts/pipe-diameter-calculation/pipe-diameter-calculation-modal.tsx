/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, TextInput } from '@gravity-ui/uikit';

import { useUpdatePipeDiameterCalculationMutation } from '../../store';
import { FIELD_CONFIG, type FieldConfig } from './field-config';
import { FormButtons } from '../../components/form-buttons/form-buttons';
import ModalHeader from '../../components/modal-header/modal-header';

type FormPayload = ItemType & PipeDiameterCalculation;
type ModalProps = { item: (ItemType); open: boolean; setOpen: (val: boolean) => void };

export default function PipeDiameterCalculationModal({ item, open, setOpen }: ModalProps) {
  const [updatePipeDiameterCalculation] = useUpdatePipeDiameterCalculationMutation();
  const {
    control, handleSubmit, reset,
  } = useForm<FormPayload>({
    defaultValues: {
      flowRate: item.pipeDiameterCalculation?.flowRate,
      velocity: item.pipeDiameterCalculation?.velocity,
    },
  });

  const onSubmit = useCallback(async (data: FormPayload) => {
    try {
      await updatePipeDiameterCalculation({ ...item.pipeDiameterCalculation, ...data }).unwrap();
      setOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update pipe diameter calculation:', error);
    }
  }, [updatePipeDiameterCalculation, item.pipeDiameterCalculation, setOpen]);

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
          itemSubName="Расчет диаметра трубопровода"
        />
        {formFields}
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
