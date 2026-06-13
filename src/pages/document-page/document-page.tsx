/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Outlet, useParams } from 'react-router-dom';
import { TextInput } from '@gravity-ui/uikit';

import {
  useGetDocumentMutation,
  useUpdateDocumentMutation,
  documentSelector,
  setDocument,
} from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';
import fields from './document-page.fields';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

type FormPayload = { name: string };

export default function DocumentPage() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { id } = useParams();
  const [getDocument] = useGetDocumentMutation();
  const [updateDocument] = useUpdateDocumentMutation();
  const document = useAppSelector(documentSelector);

  const { control, reset, getValues } = useForm<FormPayload>({
    defaultValues: { name: '' },
  });

  const onSubmit = useCallback(async () => {
    try {
      const { name } = getValues();

      if (id && document && document.name !== name) {
        await updateDocument({ id: Number(id!), name });
      }
    } catch (error) {
      showError(error, 'Ошибка при обновлении проекта');
    }
  }, [getValues, id, document, updateDocument, showError]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await getDocument(Number(id)).unwrap();

        if (!isMounted) return;

        dispatch(setDocument({ document: result }));
      } catch (error) {
        showError(error, 'Ошибка при загрузке документа');
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getDocument, dispatch, id]);

  useEffect(() => {
    if (document) {
      reset({ name: document.name });
    }
  }, [document, reset]);

  return (
    <div>
      <form className="block_header">
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
