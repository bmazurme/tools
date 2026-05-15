/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, TextInput } from '@gravity-ui/uikit';

import { useUpdateRainRoofsMutation } from '../../store';
import { FIELD_CONFIG } from './field-config';
import { FormButtons } from '../../components/form-buttons';
import ModalHeader from '../../components/modal-header';
// import FormField from '../../components/form-field';

type FormPayload = ItemType & RainRoof;
type ModalProps = { item: (ItemType); open: boolean; setOpen: (val: boolean) => void };

export default function RainRoofModal({ item, open, setOpen }: ModalProps) {
  const [updateRainRoofs] = useUpdateRainRoofsMutation();
  const { control, handleSubmit, reset } = useForm<FormPayload>({
    defaultValues: {
      areaRoof: item.rainRoof?.areaRoof,
      areaFacade: item.rainRoof?.areaFacade,
      q20: item.rainRoof?.q20,
      n: item.rainRoof?.n,
    },
  });

  const onSubmit = async (data: FormPayload) => {
    await updateRainRoofs({ ...item.rainRoof, ...data });
    setOpen(false);
  };

  const formFields = useMemo(
    () => FIELD_CONFIG.map((fieldConfig) => (
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
          itemSubName="Расчетный расход дождевых вод Q, л/с, с водосборной площади"
        />
        {formFields}
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
