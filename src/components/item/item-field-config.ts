/* eslint-disable import/prefer-default-export */
export const itemFieldsConfig = [
  {
    name: 'name',
    // label: 'Название',
    placeholder: 'Название',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
    autoComplete: 'name',
  },
];
