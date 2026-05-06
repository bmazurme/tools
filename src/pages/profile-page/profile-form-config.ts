/* eslint-disable import/prefer-default-export */
export type FormPayload = { status: string; email: string };

export interface ProfileFormInput {
  name: keyof FormPayload;
  pattern?: RegExp;
  required?: boolean;
  [key: string]: unknown;
}

export const profileFormConfig = [
  {
    name: 'email',
    label: 'Email',
    disabled: true,
  },
  {
    name: 'status',
    label: 'Статус',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{0,50}$/,
      message: 'Name is invalid',
    },
  },
];
