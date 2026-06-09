/* eslint-disable import/prefer-default-export */
import {
  NUMBER_1DP_PATTERN,
  POSITIVE_NUMBER_PATTERN,
  PRANDTL_PATTERN,
  STRICT_POSITIVE_1DP_PATTERN,
  STRICT_POSITIVE_2DP_PATTERN,
  STRICT_POSITIVE_3DP_PATTERN,
  STRICT_POSITIVE_4DP_PATTERN,
  STRICT_POSITIVE_NUMBER_PATTERN,
  TEMPERATURE_PATTERN,
} from '../../utils/constants';

type FormPayload = ItemType & HeatLossCalculation;

export type FormPayloadPaths = keyof FormPayload & string;
export type FieldConfig = {
  name: FormPayloadPaths;
  label: string;
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  placeholder?: string;
}

const REQUIRED = 'Обязательно к заполнению';
const POS_MSG = 'Допустимое значение положительное число';
const GT0_MSG = 'Допустимое значение больше 0';
const NUM_MSG = 'Допустимое значение число';
const TEMP_MSG = 'Допустимое значение от 0 до 100';

export const FIELD_CONFIG: FieldConfig[] = [
  {
    name: 'length',
    label: 'Длина участка, м',
    pattern: { value: STRICT_POSITIVE_1DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'innerPipeDiameter',
    label: 'Внутренний диаметр трубопровода, мм',
    pattern: { value: STRICT_POSITIVE_1DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'outerPipeDiameter',
    label: 'Наружный диаметр трубопровода, мм',
    pattern: { value: STRICT_POSITIVE_1DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'thickness',
    label: 'Толщина изоляции, мм',
    pattern: { value: STRICT_POSITIVE_1DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'viscosity',
    label: 'Кинематическая вязкость, м²/с',
    pattern: { value: STRICT_POSITIVE_NUMBER_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'pr',
    label: 'Число Прандтля',
    pattern: { value: PRANDTL_PATTERN, message: 'Допустимое значение от 1 до 14' },
    required: REQUIRED,
  },
  {
    name: 'lambda',
    label: 'Коэф. теплопроводности теплоносителя, Вт/(м·°C)',
    pattern: { value: POSITIVE_NUMBER_PATTERN, message: POS_MSG },
    required: REQUIRED,
  },
  {
    name: 'koefPipe',
    label: 'Коэф. теплопроводности трубы, Вт/(м·°C)',
    pattern: { value: STRICT_POSITIVE_3DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'koefInsulation',
    label: 'Коэф. теплопроводности изоляции, Вт/(м·°C)',
    pattern: { value: STRICT_POSITIVE_4DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'alphaNar',
    label: 'Коэф. теплоотдачи наружной поверхности, Вт/(м²·°C)',
    pattern: { value: STRICT_POSITIVE_2DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'tIn',
    label: 'Температура теплоносителя на входе, °C',
    pattern: { value: TEMPERATURE_PATTERN, message: TEMP_MSG },
    required: REQUIRED,
  },
  {
    name: 'tOut',
    label: 'Температура окружающей среды, °C',
    pattern: { value: NUMBER_1DP_PATTERN, message: NUM_MSG },
    required: REQUIRED,
  },
  {
    name: 'tStart',
    label: 'Температура теплоносителя в начале участка, °C',
    pattern: { value: TEMPERATURE_PATTERN, message: TEMP_MSG },
    required: REQUIRED,
  },
  {
    name: 'flowRate',
    label: 'Расход теплоносителя, м³/ч',
    pattern: { value: STRICT_POSITIVE_2DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
  {
    name: 'velocity',
    label: 'Скорость теплоносителя, м/с',
    pattern: { value: STRICT_POSITIVE_2DP_PATTERN, message: GT0_MSG },
    required: REQUIRED,
  },
];
