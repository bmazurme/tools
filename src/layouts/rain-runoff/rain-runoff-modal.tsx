/* eslint-disable no-return-await */
/* eslint-disable react/jsx-props-no-spreading */
import { Controller, useForm } from 'react-hook-form';
import { Modal, TextInput, Select } from '@gravity-ui/uikit';

import {
  useUpdateRainRunoffsMutation, useGetRainPlaceMutation,
  rainPlacesSelector, useGetRainConditionsMutation, rainConditionsSelector,
} from '../../store';
import { useAppSelector } from '../../hooks';
import { FormButtons } from '../../components/form-buttons';
import ModalHeader from '../../components/modal-header';

import { FIELD_CONFIG } from './field-config';

import style from './modal.module.css';

type FormPayload = ItemType
  & Omit<Omit<RainRunoff, 'condition'>, 'place'>
  & { place: string; condition: string };

interface IRainRunoffModal {
  item: (ItemType);
  open: boolean;
  setOpen: (val: boolean) => void;
}

export default function RainRunoffModal({ item, open, setOpen }: IRainRunoffModal) {
  const [getPlaces] = useGetRainPlaceMutation();
  const [getConditions] = useGetRainConditionsMutation();
  const [updateRainRunoffs] = useUpdateRainRunoffsMutation();
  const places = useAppSelector(rainPlacesSelector);
  const conditions = useAppSelector(rainConditionsSelector);

  const {
    control, handleSubmit, formState: { errors },
  } = useForm<FormPayload>({
    defaultValues: {
      roof: item.rainRunoff?.roof,
      cobblestone: item.rainRunoff?.cobblestone,
      ground: item.rainRunoff?.ground,
      lawns: item.rainRunoff?.lawns,
      tracks: item.rainRunoff?.tracks,
      pavements: item.rainRunoff?.pavements,
      stone: item.rainRunoff?.stone,
      intensity: item.rainRunoff?.intensity,
      lengthPipe: item.rainRunoff?.lengthPipe,
      lengthTray: item.rainRunoff?.lengthTray,
      velocityPipe: item.rainRunoff?.velocityPipe,
      velocityTray: item.rainRunoff?.velocityTray,
      timeInit: item.rainRunoff?.timeInit,
      place: item.rainRunoff?.place?.name,
      condition: item.rainRunoff?.condition?.name,
    },
    shouldUnregister: false,
  });

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
          className={fieldConfig?.column === 1 ? style.first : ''}
        />
      )}
    />
  );

  return (
    <Modal open={open} disableOutsideClick>
      <form className="dialog" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader
          itemName={item.name}
          itemSubName="Расчетный расход дождевых вод Q, л/с, с водосборной площади"
        />

        <Controller
          name="place"
          control={control}
          rules={{ required: 'Выберите географические условия расположения объекта' }}
          render={({ field, fieldState }) => (
            <Select
              label="Географические условия расположения объекта"
              size="l"
              width="max"
              onUpdate={field.onChange}
              defaultValue={field.value ? [field.value] : []}
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
              defaultValue={field.value ? [field.value] : []}
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
        <FormButtons onCancel={() => setOpen(false)} />
      </form>
    </Modal>
  );
}
