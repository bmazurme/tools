/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Icon, Select, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import { addDocument, documentsSelector, type DocumentType } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import fields from './document-add-page.fields';
import { BACK_BUTTON_PROPS, TEXT_INPUT_PROPS } from '../../config';

type FormPayload = Omit<DocumentType, 'id'>;

export default function DocumentAddPage() {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(documentsSelector);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    control, handleSubmit, register, formState: { errors },
  } = useForm<FormPayload>({
    defaultValues: {
      name: '',
      type: '',
    },
  });

  const handleBack = () => navigate(-1);
  const onSubmit = ({ name, type: [selectedType] }: FormPayload) => {
    dispatch(addDocument({
      data: {
        id: documents.length,
        name,
        type: selectedType,
      },
    }));
    navigate(`/project/${projectId}/document/${documents.length}/rain-roof`);
  };

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <Button {...BACK_BUTTON_PROPS} onClick={handleBack}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

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
                  >
                    <Select.Option value="val_1">
                      rain-roof
                    </Select.Option>
                    <Select.Option value="val_2">
                      rain-runoff
                    </Select.Option>
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
