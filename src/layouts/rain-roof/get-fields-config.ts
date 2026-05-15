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
  { key: 'roof', hasContent: false },
  { key: 'wall', hasContent: false },
  { key: 'q5', hasContent: false },
  { key: 'q20', hasContent: false },
  {
    key: 'n',
    hasContent: true,
    content: 'Итого:',
  },
  {
    key: 'flow',
    hasContent: true,
    value: sum,
  },
];
