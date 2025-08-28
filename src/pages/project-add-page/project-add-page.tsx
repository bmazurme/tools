/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput } from '@gravity-ui/uikit';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';
import fields from './project-add-page.fields';

import { useCreateProjectMutation } from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';

type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectAddPage() {
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      name: '', description: '', address: '',
    },
  });
  const handleBack = () => navigate(-1);
  const onSubmit = async (data: FormPayload) => {
    try {
      const { data: project } = await createProject(data) as unknown as { data: ProjectType };
      navigate(`/project/${project.id}`);
    } catch (error) {
      console.error('Ошибка при создании проекта:', error);
    }
  };

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <BackButton />

        <Text variant="header-1">Добавить проект</Text>
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
