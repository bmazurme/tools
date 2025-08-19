/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  Button, Icon, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import fields from './project-add-page.fields';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { addProject, projectsSelector } from '../../store';

type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectAddPage() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(projectsSelector);
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
    },
  });

  const onSubmit = (data: FormPayload) => {
    dispatch(addProject({
      data: {
        id: projects.length,
        name: `Проект ${data.name}`,
        address: `Проект ${data.address}`,
        description: uuidv4(),
      },
    }));
    navigate(`/project/${projects.length}/document/1/rain-roof`);
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
          <Button view="flat" size="l" onClick={() => navigate('/projects')}>
            Отменить
          </Button>
        </div>
      </form>
    </Content>
  );
}
