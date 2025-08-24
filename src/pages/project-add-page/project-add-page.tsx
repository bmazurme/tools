/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Icon, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import fields from './project-add-page.fields';

import { useCreateProjectMutation } from '../../store';

type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectAddPage() {
  const [createProject] = useCreateProjectMutation();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      name: '', description: '', address: '',
    },
  });

  const onSubmit = async (data: FormPayload) => {
    const { data: project } = await createProject(data) as unknown as { data: ProjectType };
    navigate(`/project/${project.id}`);
  };

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <Button view="flat" size="m" onClick={() => navigate(-1)}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

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
                size="l"
                type="text"
                error={fieldState.error?.message}
              />
            )}
          />
        ))}

        <div className="buttons">
          <Button view="action" size="l" type="submit">
            Сохранить
          </Button>
          <Button view="flat" size="l" onClick={() => navigate(-1)}>
            Отменить
          </Button>
        </div>

      </form>
    </Content>
  );
}
