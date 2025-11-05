/* eslint-disable no-return-await */
/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Modal, TextInput, Text,
  Select,
} from '@gravity-ui/uikit';

import { useUpdateRainRunoffsMutation, useGetRainPlaceMutation, rainPlacesSelector } from '../../store';
import { useAppSelector } from '../../hooks';

type FormPayload = ItemType & RainRunoff;

const fields = [
  {
    name: 'place',
    label: 'Географические условия расположения объекта',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'roof',
    label: 'Кровля зданий и сооружений, асфальтобетонные покрытия дорог',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'cobblestone',
    label: 'Брусчатые мостовые и чёрные щебёночные покрытия дорог',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'lawns',
    label: 'Газоны',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'pavements',
    label: 'Гравийные садово-парковые дорожки',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'ground',
    label: 'Грунтовые поверхности (спланированные)',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'tracks',
    label: 'Гравийные садово-парковые дорожки',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'stone',
    label: 'Былыжные мостовые',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'condition',
    label: 'Условия расположения',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'intensity',
    label: 'Интенсивность дождя, л/с',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'lengthPipe',
    label: 'lengthPipe',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'lengthTray',
    label: 'lengthTray',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'velocityPipe',
    label: 'velocityPipe',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'velocityTray',
    label: 'velocityTray',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'timeInit',
    label: 'timeInit',
    pattern: {
      value: /^-?\d+(\.\d+)?$/,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
];

export default function RainRunoffModal({ item, open, setOpen }:
  { item: (ItemType); open: boolean; setOpen: (val: boolean) => void }) {
  const [getPlaces] = useGetRainPlaceMutation();
  const [updateRainRunoffs] = useUpdateRainRunoffsMutation();
  const places = useAppSelector(rainPlacesSelector);

  const {
    control, handleSubmit, register, formState: { errors },
  } = useForm<FormPayload>({
    defaultValues: {
      roof: item.rainRunoff?.roof || 0,
      cobblestone: item.rainRunoff?.cobblestone || 0,
      ground: item.rainRunoff?.ground || 0,
      lawns: item.rainRunoff?.lawns || 0,
      tracks: item.rainRunoff?.tracks || 0,
      pavements: item.rainRunoff?.pavements || 0,
      stone: item.rainRunoff?.stone || 0,
      place: item.rainRunoff?.place || 0,
      condition: item.rainRunoff?.condition || 0,
      intensity: item.rainRunoff?.intensity || 0,
      lengthPipe: item.rainRunoff?.lengthPipe || 0,
      lengthTray: item.rainRunoff?.lengthTray || 0,
      velocityPipe: item.rainRunoff?.velocityPipe || 0,
      velocityTray: item.rainRunoff?.velocityTray || 0,
      timeInit: item.rainRunoff?.timeInit || 0,
    },
  });

  const onSubmit = async (data: FormPayload) => {
    await updateRainRunoffs({ ...item.rainRunoff, ...data });
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
              field.name === 'place'
                ? (
                  <Select
                    label="Географические условия расположения объекта"
                    size="l"
                    width="max"
                    {...register}
                    onUpdate={field.onChange}
                    errorMessage={fieldState.error?.message}
                    validationState={errors?.place ? 'invalid' : undefined}
                    onOpenChange={async () => await getPlaces()}
                    // eslint-disable-next-line max-len
                    options={places.map(({ id, name }) => ({ id, value: id.toString(), content: name }))}
                  />
                )
                : (
                  <TextInput
                    {...field}
                    {...input}
                    value={`${field.value}`}
                    size="l"
                    type="text"
                    error={fieldState.error?.message}
                  />
                )
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
