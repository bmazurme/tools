/* eslint-disable import/prefer-default-export */
import { OPTIONAL_STRICT_POSITIVE_6DP_PATTERN, STRICT_POSITIVE_3DP_PATTERN } from '../../utils/constants';

type FormPayload = ItemType & CalculationMeter;

export type FormPayloadPaths = keyof FormPayload & string;

export type SelectOption = {
  value: string;
  content: string;
};

export type FieldConfig = {
  name: FormPayloadPaths;
  label: string;
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  placeholder?: string;
  type?: 'select';
  options?: SelectOption[];
}

const REQUIRED = 'Обязательно к заполнению';
const GT0_MSG = 'Допустимое значение больше 0';

export const METER_TYPE_OPTIONS: SelectOption[] = [
  { value: 'vane', content: 'Крыльчатый' },
  { value: 'turbine', content: 'Турбинный' },
];

export const METER_TYPE_LABEL: Record<MeterType, string> = {
  vane: 'Крыльчатый',
  turbine: 'Турбинный',
};

export const METER_DIAMETER_OPTIONS: Record<MeterType, SelectOption[]> = {
  vane: [15, 20, 25, 32, 40, 50].map((value) => ({ value: `${value}`, content: `${value}` })),
  turbine: [65, 80, 100, 150, 200].map((value) => ({ value: `${value}`, content: `${value}` })),
};

export const FIELD_CONFIG: FieldConfig[] = [
  {
    name: 'meterType',
    label: 'Тип счетчика',
    type: 'select',
    options: METER_TYPE_OPTIONS,
    required: REQUIRED,
  },
  {
    name: 'diameter',
    label: 'Диаметр счетчика Dy, мм',
    type: 'select',
    required: REQUIRED,
  },
  {
    name: 'flowRate',
    label: 'Расчетный расход воды через счетчик, м³/ч',
    pattern: { value: STRICT_POSITIVE_3DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'resistanceManual',
    label: 'Сопротивление счетчика (по паспорту), если отличается от табличного',
    pattern: { value: OPTIONAL_STRICT_POSITIVE_6DP_PATTERN, message: GT0_MSG },
  },
];
