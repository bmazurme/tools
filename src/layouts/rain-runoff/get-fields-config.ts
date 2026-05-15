/* eslint-disable import/prefer-default-export */
type ResultType = {
  key: string;
  hasContent: boolean;
  content?: string;
  value?: number;
}[];

export const getFieldsConfig = (sum: number): ResultType => [
  { key: 'id', hasContent: false },
  { key: 'name', hasContent: false },
  { key: 'area', hasContent: false },
  { key: 'intensity', hasContent: false },
  { key: 'lengthPipe', hasContent: false },
  { key: 'lengthTray', hasContent: false },
  { key: 'velocityPipe', hasContent: false },
  { key: 'velocityTray', hasContent: false },
  {
    key: 'timeInit',
    hasContent: true,
    content: 'Итого:',
  },
  {
    key: 'flow',
    hasContent: true,
    value: sum,
  },
];
