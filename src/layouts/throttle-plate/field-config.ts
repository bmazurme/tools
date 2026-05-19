/* eslint-disable import/prefer-default-export */
import { POSITIVE_NUMBER_PATTERN } from '../../utils/constants';

type FormPayload = ItemType & ThrottlePlate;

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
    name: 'flowRate',
    label: 'Расчетный расход, л/с',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'excessHead',
    label: 'Избыточный напор, который следует погасить диафрагмой, МПа',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    required: 'Обязательно к заполнению',
  },
];
