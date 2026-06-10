const fields = [
  {
    name: 'name',
    label: 'Название',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
    autoComplete: 'name',
  },
  {
    name: 'code',
    label: 'Шифр',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{1,50}$/,
      message: 'Code is invalid',
    },
    // autoComplete: 'code',
  },
  {
    name: 'description',
    label: 'Описание',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Details is invalid',
    },
    // autoComplete: 'description',
  },
  {
    name: 'address',
    label: 'Адрес',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Address is invalid',
    },
    // autoComplete: 'address',
  },
];

export default fields;
