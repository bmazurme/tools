/* eslint-disable import/prefer-default-export */
type ResultType = {
  key: string;
  hasContent: boolean;
  content?: string;
  value?: number;
}[];

export const getFieldsConfig = (sumAvg: number, sumMax: number): ResultType => [
  { key: 'id', hasContent: false },
  { key: 'name', hasContent: false },
  { key: 'tc', hasContent: false },
  { key: 'th', hasContent: false },
  { key: 'maxHotWaterPerHour', hasContent: false },
  { key: 'avgHotWaterPerHour', hasContent: false },
  {
    key: 'hwPipelineHeatLoss',
    hasContent: true,
    content: 'Итого:',
  },
  {
    key: 'meanHourlyHeatForHotWater',
    hasContent: true,
    value: sumAvg,
  },
  {
    key: 'maxHourlyHeatForHotWater',
    hasContent: true,
    value: sumMax,
  },
];
