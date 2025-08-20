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
    name: 'type',
    label: 'Описание',
    required: 'Обязательно к заполнению',
  },
];

export default fields;
