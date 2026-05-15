/* eslint-disable import/prefer-default-export */
import { POSITIVE_NUMBER_PATTERN, ZERO_TO_HUNDRED_PATTERN } from '../../utils/constants';

export const FIELD_CONFIG = [
  {
    name: 'th',
    label: 'Температура горячей воды, °С, в местах водоразбора',
    pattern: {
      value: ZERO_TO_HUNDRED_PATTERN,
      message: 'Допустимое значение от 0 до 100',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'tc',
    label: 'Температура холодной воды, °С, в сети водопровода',
    pattern: {
      value: ZERO_TO_HUNDRED_PATTERN,
      message: 'Допустимое значение от 0 до 100',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'avgHotWaterPerHour',
    label: 'Средний часовой расход горячей воды, м3',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'maxHotWaterPerHour',
    label: 'Максимальный часовой расход горячей воды, м3',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'hwPipelineHeatLoss',
    label: 'Потери тепла трубопроводами на расчетном участке, кВт',
    pattern: {
      value: POSITIVE_NUMBER_PATTERN,
      message: 'Допустимое значение положительное число',
    },
    required: 'Обязательно к заполнению',
  },
];
