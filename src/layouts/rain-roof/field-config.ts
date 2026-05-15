/* eslint-disable import/prefer-default-export */
import { INTENSITY_PATTERN, POSITIVE_NUMBER_PATTERN, ZERO_TO_ONE_PATTERN } from '../../utils/constants';

type FormPayload = ItemType & RainRoof;

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

export const FIELD_CONFIG: FieldConfig[] = [
  {
    name: 'areaRoof',
    label: 'Водосборная площадь кровли, F',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'areaFacade',
    label: 'Водосборная площадь фасада, F',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'q20',
    label: 'q₂₀ - интенсивность дождя, л/с',
    pattern: {
      value: INTENSITY_PATTERN,
      message: 'Допустимое значение от 0 до 150',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'n',
    label: 'n - параметр, принимаемый согласно СП 32.13330',
    pattern: {
      value: ZERO_TO_ONE_PATTERN,
      message: 'Допустимое значение от 0 до 1',
    },
    required: 'Обязательно к заполнению',
  },
];
