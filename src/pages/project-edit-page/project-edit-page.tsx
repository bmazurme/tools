/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Icon, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import fields from './project-edit-page.fields';

import { useGetProjectMutation, useUpdateProjectMutation } from '../../store';
import { BACK_BUTTON_PROPS, TEXT_INPUT_PROPS } from '../../config';

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

  const handleBack = () => navigate(-1);
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

        reset({
          name: result.data?.name || '',
          description: result.data?.description || '',
          address: result.data?.address || '',
        });
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <Button {...BACK_BUTTON_PROPS} onClick={handleBack}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

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
