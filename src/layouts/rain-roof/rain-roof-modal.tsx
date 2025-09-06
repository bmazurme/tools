/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Modal, TextInput, Text,
} from '@gravity-ui/uikit';

// import { updateRainRoofItem } from '../../store';

type FormPayload = ItemType & RainFlowRoof;

const fields = [
  {
    name: 'name',
    label: 'Название участка',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
    autoComplete: 'name',
  },
  {
    name: 'areaRoof',
    label: 'Водосборная площадь, F',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'q5',
    label: 'Интенсивность дождя q5, л/с',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'q20',
    label: 'q20 - интенсивность дождя, л/с',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'n',
    label: 'n - параметр, принимаемый согласно СП 32.13330',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'slope',
    label: 'Уклон',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
];

export default function RainRoofModal({ item, open, setOpen }:
  { item: (ItemType); open: boolean; setOpen: (val: boolean) => void }) {
  // const dispatch = useAppDispatch();

  const {
    control, handleSubmit,
  } = useForm<FormPayload>({
    defaultValues: {
      name: item.name,
      // areaRoof: item.areaRoof,
      // q5: item.q5,
      // q20: item.q20,
      // n: item.n,
      // slope: item.slope,
    },
  });

  const onSubmit = (data: FormPayload) => {
    // eslint-disable-next-line no-console
    console.log(data);
    // dispatch(updateRainRoofItem({
    //   ...item,
    //   name: data.name,
    //   areaRoof: Number(data.areaRoof),
    //   q5: Number(data.q5),
    //   q20: Number(data.q20),
    //   n: Number(data.n),
    //   slope: Number(data.slope),
    // }));
    setOpen(false);
  };

  return (
    <Modal open={open} disableOutsideClick>
      <form className="dialog" onSubmit={handleSubmit(onSubmit)}>
        <Text variant="header-1">
          Расчетный расход дождевых вод Q, л/с, с водосборной площади
        </Text>

        {fields.map((input) => (
          <Controller
            key={input.name}
            name={input.name as keyof FormPayload}
            rules={{
              pattern: input.pattern,
              required: input.required,
            }}
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                {...input}
                value={`${field.value}`}
                size="l"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />
        ))}

        <div className="buttons">
          <Button view="action" size="l" type="submit">Сохранить</Button>
          <Button view="flat" size="l" onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      </form>
    </Modal>
  );
}
