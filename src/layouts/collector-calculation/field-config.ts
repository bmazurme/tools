/* eslint-disable import/prefer-default-export */
import { POSITIVE_1DP_PATTERN } from '../../utils/constants';

type FormPayload = ItemType & CollectorCalculation;

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

const D_PATTERN = {
  value: POSITIVE_1DP_PATTERN,
  message: 'Допустимое значение: неотрицательное число с 1 знаком',
};
const D_REQUIRED = 'Обязательно к заполнению';

export const FIELD_CONFIG: FieldConfig[] = [
  { name: 'd1', label: 'Диаметр d₁, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd2', label: 'Диаметр d₂, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd3', label: 'Диаметр d₃, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd4', label: 'Диаметр d₄, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd5', label: 'Диаметр d₅, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd6', label: 'Диаметр d₆, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd7', label: 'Диаметр d₇, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd8', label: 'Диаметр d₈, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd9', label: 'Диаметр d₉, мм', pattern: D_PATTERN, required: D_REQUIRED },
  { name: 'd10', label: 'Диаметр d₁₀, мм', pattern: D_PATTERN, required: D_REQUIRED },
];
