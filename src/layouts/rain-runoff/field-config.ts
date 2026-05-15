/* eslint-disable import/prefer-default-export */
import { INTENSITY_PATTERN, POSITIVE_NUMBER_PATTERN, VELOCITY_RATE_PATTERN } from '../../utils/constants';

export const FIELD_CONFIG = [
  {
    name: 'roof',
    label: 'Кровля зданий и сооружений, асфальтобетонные покрытия дорог',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 1,
  },
  {
    name: 'cobblestone',
    label: 'Брусчатые мостовые и чёрные щебёночные покрытия дорог',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 2,
  },
  {
    name: 'lawns',
    label: 'Газоны',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 1,
  },
  {
    name: 'pavements',
    label: 'Щебеночные покрытия, не обработанные вяжущими',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 2,
  },
  {
    name: 'ground',
    label: 'Грунтовые поверхности (спланированные)',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 1,
  },
  {
    name: 'tracks',
    label: 'Гравийные садово-парковые дорожки',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 2,
  },
  {
    name: 'stone',
    label: 'Булыжные мостовые',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 1,
  },
  {
    name: 'lengthPipe',
    label: 'Длина трубы, м',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 1,
    required: 'Обязательно к заполнению',
  },
  {
    name: 'lengthTray',
    label: 'Длина лотка, м',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 2,
    required: 'Обязательно к заполнению',
  },
  {
    name: 'velocityPipe',
    label: 'Скорость в трубе, м/с',
    pattern: {
      value: VELOCITY_RATE_PATTERN,
      message: 'Допустимое значение от 0 до 10',
    },
    column: 1,
    required: 'Обязательно к заполнению',
  },
  {
    name: 'velocityTray',
    label: 'Скорость в лотке, м/с',
    pattern: {
      value: VELOCITY_RATE_PATTERN,
      message: 'Допустимое значение от 0 до 10',
    },
    column: 2,
    required: 'Обязательно к заполнению',
  },
  {
    name: 'intensity',
    label: 'Интенсивность дождя, л/с',
    pattern: {
      value: INTENSITY_PATTERN,
      message: 'Допустимое значение от 0 до 150',
    },
    column: 1,
    required: 'Обязательно к заполнению',
  },
  {
    name: 'timeInit',
    label: 'Время',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    column: 2,
    required: 'Обязательно к заполнению',
  },
] as const;
