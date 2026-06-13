/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Modal, Select, TextInput } from '@gravity-ui/uikit';

import { useUpdateCalculationMeterMutation } from '../../store';
import { FIELD_CONFIG, METER_DIAMETER_OPTIONS, type FieldConfig } from './field-config';
import { FormButtons } from '../../components/form-buttons/form-buttons';
import ModalHeader from '../../components/modal-header/modal-header';
import useAppToaster from '../../hooks/use-app-toaster';

import style from './calculation-meter-modal.module.css';

type FormPayload = ItemType & CalculationMeter;
type ModalProps = { item: (ItemType); open: boolean; setOpen: (val: boolean) => void };

const ROW_FIELD_NAMES = ['meterType', 'diameter', 'resistanceManual'];

export default function CalculationMeterModal({ item, open, setOpen }: ModalProps) {
  const [updateCalculationMeter] = useUpdateCalculationMeterMutation();
  const { showError } = useAppToaster();
  const {
    control, handleSubmit, reset, setValue, getValues,
  } = useForm<FormPayload>({
    defaultValues: {
      meterType: item.calculationMeter?.meterType ?? 'vane',
      diameter: item.calculationMeter?.diameter,
      flowRate: item.calculationMeter?.flowRate,
      resistanceManual: item.calculationMeter?.resistanceManual,
    },
  });

  const meterType = useWatch({ control, name: 'meterType' });
  const diameterOptions = useMemo(
    () => METER_DIAMETER_OPTIONS[meterType] ?? METER_DIAMETER_OPTIONS.vane,
    [meterType],
  );

  useEffect(() => {
    const allowedDiameters = diameterOptions.map(({ value }) => Number(value));

    if (!allowedDiameters.includes(getValues('diameter'))) {
      setValue('diameter', allowedDiameters[0], { shouldValidate: true });
    }
  }, [diameterOptions, setValue, getValues]);

  const onSubmit = useCallback(async (data: FormPayload) => {
    try {
      await updateCalculationMeter({
        ...item.calculationMeter,
        ...data,
        resistanceManual: data.resistanceManual || null,
      }).unwrap();
      setOpen(false);
    } catch (error) {
      showError(error, 'Ошибка при обновлении расчета счетчика');
    }
  }, [updateCalculationMeter, item.calculationMeter, setOpen, showError]);

  const renderField = useCallback((fieldConfig: FieldConfig) => (
    <Controller
      key={fieldConfig.name}
      name={fieldConfig.name}
      rules={{
        pattern: fieldConfig.pattern,
        required: fieldConfig.required,
      }}
      control={control}
      render={({ field, fieldState }) => (
        fieldConfig.type === 'select'
          ? (
            <Select
              label={fieldConfig.label}
              size="l"
              width="max"
              value={[`${field.value}`]}
              onUpdate={([value]) => field.onChange(
                fieldConfig.name === 'diameter' ? Number(value) : value,
              )}
              errorMessage={fieldState.error?.message}
              validationState={fieldState.error ? 'invalid' : undefined}
              options={fieldConfig.name === 'diameter' ? diameterOptions : fieldConfig.options}
            />
          )
          : (
            <TextInput
              {...field}
              {...fieldConfig}
              value={field.value === null || field.value === undefined ? '' : `${field.value}`}
              size="l"
              type="text"
              error={fieldState.error?.message}
              label={fieldConfig.label}
            />
          )
      )}
    />
  ), [control, diameterOptions]);

  const rowFields = useMemo(
    () => FIELD_CONFIG.filter((fieldConfig) => ROW_FIELD_NAMES.includes(fieldConfig.name)),
    [],
  );
  const otherFields = useMemo(
    () => FIELD_CONFIG.filter((fieldConfig) => !ROW_FIELD_NAMES.includes(fieldConfig.name)),
    [],
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
          itemSubName="Расчет потерь давления в счетчике по гидравлическому сопротивлению"
        />
        <div className={style.row}>
          {rowFields.map(renderField)}
        </div>
        {otherFields.map(renderField)}
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
