/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput } from '@gravity-ui/uikit';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';
import Buttons from '../../components/buttons/buttons';
import fields from './project-edit-page.fields';

import { useGetProjectMutation, useUpdateProjectMutation } from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';

type FormPayload = Omit<ProjectType, 'id'>;

export default function ProjectEditPage() {
  const { projectId: projectIdString } = useParams();
  const projectId = parseInt(projectIdString || '', 10);
  const [getProject] = useGetProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm<FormPayload>({
    defaultValues: {
      name: '', description: '', address: '',
    },
  });

  const onSubmit = async (data: FormPayload) => {
    try {
      await updateProject({ id: projectId!, ...data });
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        const result = await getProject(projectId);
        const { name = '', description = '', address = '' } = result.data || {};
        reset({ name, description, address });
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <BackButton />
        <Text variant="header-1">Редактировать проект</Text>

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

        <Buttons />
      </form>
    </Content>
  );
}
