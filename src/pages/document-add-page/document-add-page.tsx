/* eslint-disable no-return-await */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  Button, Select, Text, TextInput,
} from '@gravity-ui/uikit';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';
import {
  documentsSelector,
  typesSelector,
  useCreateDocumentMutation,
  useGetTypesMutation,
  type DocumentType,
} from '../../store';
import { useAppSelector } from '../../hooks';
import fields from './document-add-page.fields';
import { TEXT_INPUT_PROPS } from '../../config';

type FormPayload = Omit<DocumentType, 'id'>;

export default function DocumentAddPage() {
  const documents = useAppSelector(documentsSelector);
  const types = useAppSelector(typesSelector);
  const [createDocument] = useCreateDocumentMutation();
  const [getTypes] = useGetTypesMutation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    control, handleSubmit, register, formState: { errors },
  } = useForm<FormPayload>({
    defaultValues: {
      name: '', type: '',
    },
  });
  // console.log(types);

  const handleBack = () => navigate(-1);
  const onSubmit = async ({ name, type }: FormPayload) => {
    const result = await createDocument({
      name, type, project: projectId!,
    });
    console.log(result);
    navigate(`/project/${projectId}/document/${result?.data.id}/${result.data?.type.link}`);
  };

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
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
                    error={fieldState.error?.message}
                  />
                )
                : (
                  <Select
                    label="Тип документа"
                    // placeholder="Тип документа"
                    size="l"
                    width="max"
                    {...register}
                    onUpdate={field.onChange}
                    errorMessage={fieldState.error?.message}
                    validationState={errors?.type ? 'invalid' : undefined}
                    onOpenChange={async () => await getTypes()}
                    // onChange={handleChange}
                    // eslint-disable-next-line max-len
                    options={types.map(({ id, name }) => ({ id, value: id.toString(), content: name }))}
                  >
                    {/* {types.map((item) => (
                      <Select.Option value={item.link} key={uuidv4()}>
                        {item.name}
                      </Select.Option>
                    ))} */}
                  </Select>
                )
            )}
          />
        ))}

        <div className="buttons">
          <Button view="action" size="l" type="submit">
            Сохранить
          </Button>
          <Button view="flat" size="l" onClick={handleBack}>
            Отменить
          </Button>
        </div>

      </form>
    </Content>
  );
}
