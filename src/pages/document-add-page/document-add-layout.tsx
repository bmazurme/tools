/* eslint-disable no-return-await */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Select, Text, TextInput } from '@gravity-ui/uikit';

// import useAppToaster from '../../hooks/use-app-toaster';
import Buttons from '../../components/buttons/buttons';
import BackButton from '../../components/back-button/back-button';
import {
  setAvailableTypes, useCreateDocumentMutation,
  useGetUserSettingsQuery, usersAvailableTypesSelector,
  type DocumentType,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import fields from './document-add-page.fields';
import { TEXT_INPUT_PROPS } from '../../config';

type FormPayload = Omit<DocumentType, 'id'>;

export default function DocumentAddLayout() {
  const dispatch = useAppDispatch();
  // const { showError } = useAppToaster();
  const { data, isLoading } = useGetUserSettingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const availableTypes = useAppSelector(usersAvailableTypesSelector);

  const [createDocument] = useCreateDocumentMutation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    control, handleSubmit, register, formState: { errors },
  } = useForm<FormPayload>({
    defaultValues: { name: '', type: '' },
  });

  const onSubmit = async ({ name, type }: FormPayload) => {
    const result = await createDocument({
      name,
      type,
      project: projectId!,
    });
    navigate(`/project/${projectId}/document/${result?.data?.id}/${result.data?.type.link}`);
  };

  useEffect(() => {
    if (data) {
      dispatch(setAvailableTypes({
        availableTypes: data,
      }));
    }
  }, [data, dispatch]);

  return (
    <form
      className="content"
      onSubmit={handleSubmit(onSubmit)}
    >
      <BackButton />
      <Text variant="header-1">Добавить документ</Text>

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
            field.name !== 'type'
              ? (
                <TextInput
                  {...field}
                  {...input}
                  {...TEXT_INPUT_PROPS}
                  value={typeof field.value === 'string' ? field.value : ''}
                  error={fieldState.error?.message}
                />
              )
              : (
                <Select
                  label="Тип документа"
                  size="l"
                  width="max"
                  {...register}
                  onUpdate={field.onChange}
                  errorMessage={fieldState.error?.message}
                  validationState={errors?.type ? 'invalid' : undefined}
                  placeholder={isLoading ? 'Загрузка...' : 'Выберите вариант'}
                  disabled={isLoading}
                    // eslint-disable-next-line max-len
                  options={availableTypes.map(({ id, name }) => ({ id, value: id.toString(), content: name }))}
                />
              )
          )}
        />
      ))}

      <Buttons />
    </form>
  );
}
