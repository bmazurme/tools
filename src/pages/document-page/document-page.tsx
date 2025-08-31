/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Outlet, useParams } from 'react-router-dom';
import { TextInput } from '@gravity-ui/uikit';

import { useGetDocumentMutation } from '../../store';
// import { useAppSelector } from '../../hooks';
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
  // const document = useAppSelector(documentSelector);

  const { control, reset } = useForm<FormPayload>({
    defaultValues: { name: '' },
  });

  const fetchData = async () => {
    if (id) {
      const result = await getDocument(Number(id));
      reset({ name: result.data?.name });
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
              />
            )}
          />
        ))}
      </form>

      <Outlet />
    </div>
  );
}
