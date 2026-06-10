/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, TextInput } from '@gravity-ui/uikit';

import { useUpdateCollectorCalculationMutation } from '../../store';
import { FIELD_CONFIG, type FieldConfig } from './field-config';
import { FormButtons } from '../../components/form-buttons/form-buttons';
import ModalHeader from '../../components/modal-header/modal-header';

import style from './collector-calculation-modal.module.css';

type FormPayload = ItemType & CollectorCalculation;
type ModalProps = { item: (ItemType); open: boolean; setOpen: (val: boolean) => void };

export default function CollectorCalculationModal({ item, open, setOpen }: ModalProps) {
  const [updateCollectorCalculation] = useUpdateCollectorCalculationMutation();
  const {
    control, handleSubmit, reset,
  } = useForm<FormPayload>({
    defaultValues: {
      d1: item.collectorCalculation?.d1,
      d2: item.collectorCalculation?.d2,
      d3: item.collectorCalculation?.d3,
      d4: item.collectorCalculation?.d4,
      d5: item.collectorCalculation?.d5,
      d6: item.collectorCalculation?.d6,
      d7: item.collectorCalculation?.d7,
      d8: item.collectorCalculation?.d8,
      d9: item.collectorCalculation?.d9,
      d10: item.collectorCalculation?.d10,
    },
  });

  const onSubmit = useCallback(async (data: FormPayload) => {
    try {
      await updateCollectorCalculation({ ...item.collectorCalculation, ...data }).unwrap();
      setOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update collector calculation:', error);
    }
  }, [updateCollectorCalculation, item.collectorCalculation, setOpen]);

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
          itemSubName="Расчёт диаметра коллектора"
        />
        <div className={style.grid}>
          {formFields}
        </div>
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
