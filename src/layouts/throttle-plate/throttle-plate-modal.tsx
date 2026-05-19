/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, TextInput } from '@gravity-ui/uikit';

import { useUpdateThrottlePlateMutation } from '../../store';
import { FIELD_CONFIG, type FieldConfig } from './field-config';
import { FormButtons } from '../../components/form-buttons/form-buttons';
import ModalHeader from '../../components/modal-header/modal-header';

type FormPayload = ItemType & ThrottlePlate;
type ModalProps = { item: (ItemType); open: boolean; setOpen: (val: boolean) => void };

export default function ThrottlePlateModal({ item, open, setOpen }: ModalProps) {
  const [updateThrottlePlate] = useUpdateThrottlePlateMutation();
  const {
    control, handleSubmit, reset,
  } = useForm<FormPayload>({
    defaultValues: {
      flowRate: item.throttlePlate?.flowRate || 0,
      excessHead: item.throttlePlate?.excessHead || 0,
    },
  });

  const onSubmit = async (data: FormPayload) => {
    try {
      await updateThrottlePlate({ ...item.throttlePlate, ...data }).unwrap();
      setOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to update throttle plate:', error);
    }
  };

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
          itemSubName="Расчет диаметра отверстия дроссельной шайбы"
        />
        {formFields}
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
