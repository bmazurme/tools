/* eslint-disable no-return-await */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Modal, TextInput, Text, Select,
} from '@gravity-ui/uikit';

import {
  useUpdateRainRunoffsMutation, useGetRainPlaceMutation,
  rainPlacesSelector, useGetRainConditionsMutation, rainConditionsSelector,
} from '../../store';
import { useAppSelector } from '../../hooks';
import { NUMBER_PATTERN } from '../../utils/constants';

import style from './modal.module.css';

type FormPayload = ItemType
  & Omit<Omit<RainRunoff, 'condition'>, 'place'>
  & { place: string; condition: string };

const FIELD_CONFIG = [
  {
    name: 'roof',
    label: 'Кровля зданий и сооружений, асфальтобетонные покрытия дорог',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
  },
  {
    name: 'cobblestone',
    label: 'Брусчатые мостовые и чёрные щебёночные покрытия дорог',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
  },
  {
    name: 'lawns',
    label: 'Газоны',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
  },
  {
    name: 'pavements',
    label: 'Щебеночные покрытия, не обработанные вяжущими',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
  },
  {
    name: 'ground',
    label: 'Грунтовые поверхности (спланированные)',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
  },
  {
    name: 'tracks',
    label: 'Гравийные садово-парковые дорожки',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
  },
  {
    name: 'stone',
    label: 'Булыжные мостовые',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
  },
  {
    name: 'intensity',
    label: 'Интенсивность дождя, л/с',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'lengthPipe',
    label: 'Длина трубы, м',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'lengthTray',
    label: 'Длина лотка, м',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'velocityPipe',
    label: 'Скорость в трубе, м/с',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'velocityTray',
    label: 'Скорость в лотке, м/с',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
  {
    name: 'timeInit',
    label: 'timeInit',
    pattern: {
      value: NUMBER_PATTERN,
      message: 'Name is invalid',
    },
    required: 'Обязательно к заполнению',
  },
] as const;

export default function RainRunoffModal({ item, open, setOpen }:
  { item: (ItemType); open: boolean; setOpen: (val: boolean) => void }) {
  const [getPlaces] = useGetRainPlaceMutation();
  const [getConditions] = useGetRainConditionsMutation();
  const [updateRainRunoffs] = useUpdateRainRunoffsMutation();
  const places = useAppSelector(rainPlacesSelector);
  const conditions = useAppSelector(rainConditionsSelector);
  // console.log(item);
  const {
    control, handleSubmit, formState: { errors }, reset,
  } = useForm<FormPayload>({
    defaultValues: {
      roof: item.rainRunoff?.roof ?? 0,
      cobblestone: item.rainRunoff?.cobblestone ?? 0,
      ground: item.rainRunoff?.ground ?? 0,
      lawns: item.rainRunoff?.lawns ?? 0,
      tracks: item.rainRunoff?.tracks ?? 0,
      pavements: item.rainRunoff?.pavements ?? 0,
      stone: item.rainRunoff?.stone ?? 0,
      intensity: item.rainRunoff?.intensity ?? 0,
      lengthPipe: item.rainRunoff?.lengthPipe ?? 0,
      lengthTray: item.rainRunoff?.lengthTray ?? 0,
      velocityPipe: item.rainRunoff?.velocityPipe ?? 0,
      velocityTray: item.rainRunoff?.velocityTray ?? 0,
      timeInit: item.rainRunoff?.timeInit ?? 0,
      place: item.rainRunoff?.place?.name ?? '',
      condition: item.rainRunoff?.condition?.name ?? '',
    },
    shouldUnregister: false,
  });

  useEffect(() => {
    reset({
      roof: item.rainRunoff?.roof ?? 0,
      cobblestone: item.rainRunoff?.cobblestone ?? 0,
      ground: item.rainRunoff?.ground ?? 0,
      lawns: item.rainRunoff?.lawns ?? 0,
      tracks: item.rainRunoff?.tracks ?? 0,
      pavements: item.rainRunoff?.pavements ?? 0,
      stone: item.rainRunoff?.stone ?? 0,
      intensity: item.rainRunoff?.intensity ?? 0,
      lengthPipe: item.rainRunoff?.lengthPipe ?? 0,
      lengthTray: item.rainRunoff?.lengthTray ?? 0,
      velocityPipe: item.rainRunoff?.velocityPipe ?? 0,
      velocityTray: item.rainRunoff?.velocityTray ?? 0,
      timeInit: item.rainRunoff?.timeInit ?? 0,
      place: item.rainRunoff?.place?.name ?? '',
      condition: item.rainRunoff?.condition?.name ?? '',
    });
  }, [item]);

  const onSubmit = async (data: FormPayload) => {
    const placeId = (item.rainRunoff?.place?.id && item.rainRunoff?.place?.name === data.place)
      ? item.rainRunoff.place.id
      : +data.place[0];
    // eslint-disable-next-line max-len
    const conditionId = (item.rainRunoff?.condition?.id && item.rainRunoff?.condition?.name === data.condition)
      ? item.rainRunoff.condition.id
      : +data.condition[0];

    if (item.rainRunoff) {
      await updateRainRunoffs({
        ...data,
        id: item.rainRunoff.id,
        roof: data.roof || 0,
        cobblestone: data.cobblestone || 0,
        ground: data.ground || 0,
        lawns: data.lawns || 0,
        tracks: data.tracks || 0,
        pavements: data.pavements || 0,
        stone: data.stone || 0,
        place: { id: placeId, name: '' },
        condition: { id: conditionId, name: '' },
        flow: 0,
      });
    }

    setOpen(false);
  };

  const renderInput = (fieldConfig: (typeof FIELD_CONFIG)[number]) => (
    <Controller
      key={fieldConfig.name}
      name={fieldConfig.name as keyof FormPayload}
      rules={{
        pattern: fieldConfig.pattern,
        // required: fieldConfig.required,
      }}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          {...field}
          {...fieldConfig}
          value={`${field.value}`}
          size="l"
          type="text"
          error={fieldState.error?.message}
        />
      )}
    />
  );

  return (
    <Modal open={open} disableOutsideClick>
      <form className="dialog" onSubmit={handleSubmit(onSubmit)}>
        <Text variant="header-1">
          {item.name}
        </Text>
        <Text variant="subheader-1">
          Расчетный расход дождевых вод Q, л/с, с водосборной площади
        </Text>
        <Controller
          name="place"
          control={control}
          rules={{ required: 'Выберите географические условия' }}
          render={({ field, fieldState }) => (
            <Select
              label="Географические условия расположения объекта"
              size="l"
              width="max"
              onUpdate={field.onChange}
              defaultValue={[field.value]}
              errorMessage={fieldState.error?.message}
              validationState={errors?.place ? 'invalid' : undefined}
              onOpenChange={async () => await getPlaces()}
              options={places.map(({ id, name }) => ({ id, value: id.toString(), content: name }))}
            />
          )}
        />
        <Controller
          name="condition"
          control={control}
          rules={{ required: 'Выберите условия расположения' }}
          render={({ field, fieldState }) => (
            <Select
              label="Условия расположения"
              size="l"
              width="max"
              onUpdate={field.onChange}
              defaultValue={[field.value]}
              errorMessage={fieldState.error?.message}
              validationState={errors?.condition ? 'invalid' : undefined}
              onOpenChange={async () => await getConditions()}
              options={conditions.map(({ id, name }) => ({
                id, value: id.toString(), content: name,
              }))}
            />
          )}
        />
        <div className={style.grid}>
          {FIELD_CONFIG.map(renderInput)}
        </div>
        <div className="buttons">
          <Button view="action" size="l" type="submit">Сохранить</Button>
          <Button view="flat" size="l" onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      </form>
    </Modal>
  );
}
