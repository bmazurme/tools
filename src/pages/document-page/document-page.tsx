/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Outlet, useParams } from 'react-router-dom';
import { TextInput } from '@gravity-ui/uikit';

import { useGetDocumentMutation, useUpdateDocumentMutation } from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';

type FormPayload = { name: string };

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
];

export default function DocumentPage() {
  const { id } = useParams();
  const [getDocument] = useGetDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();

  const { control, reset } = useForm<FormPayload>({
    defaultValues: { name: '' },
  });

  const fetchData = async () => {
    if (id) {
      const result = await getDocument(Number(id));
      reset({ name: result.data?.name });
    }
  };

  const onSubmit = async () => {
    try {
      if (id) {
        // eslint-disable-next-line no-underscore-dangle
        const { name } = control._formValues;
        await updateDocument({ id: Number(id!), name });
      }
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form>
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
                {...TEXT_INPUT_PROPS}
                error={fieldState.error?.message}
                onBlur={onSubmit}
              />
            )}
          />
        ))}
      </form>

      <Outlet />
    </div>
  );
}
