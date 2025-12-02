/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Outlet, useParams } from 'react-router-dom';
import { TextInput } from '@gravity-ui/uikit';

import {
  useGetDocumentMutation,
  useUpdateDocumentMutation,
  documentSelector,
} from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';
import fields from './document-page.fields';
import { useAppSelector } from '../../hooks';

type FormPayload = { name: string };

export default function DocumentPage() {
  const { id } = useParams();
  const [getDocument] = useGetDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();
  const document = useAppSelector(documentSelector);

  const { control, reset } = useForm<FormPayload>({
    defaultValues: { name: '' },
  });

  const onSubmit = async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const { name } = control._formValues;

      if (id && document && document.name !== name) {
        await updateDocument({ id: Number(id!), name });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Ошибка при обновлении проекта:', error);
    }
  };

  useEffect(() => {
    if (id) {
      getDocument(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (document) {
      reset({ name: document.name });
    }
  }, [document, reset]);

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
