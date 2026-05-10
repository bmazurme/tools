/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput } from '@gravity-ui/uikit';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';
import Buttons from '../../components/buttons/buttons';
import fields from './project-add-page.fields';

import { useCreateProjectMutation } from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';
import useAppToaster from '../../hooks/use-app-toaster';

type FormPayload = Omit<Omit<ProjectType, 'id'>, 'participants'>;

export default function ProjectAddPage() {
  const { showError } = useAppToaster();
  const [createProject, { isLoading: isCreatingProject }] = useCreateProjectMutation();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      name: '', description: '', address: '',
    },
  });
  const onSubmit = async (data: FormPayload) => {
    try {
      const { data: project } = await createProject(data) as unknown as { data: ProjectType };
      navigate(`/project/${project.id}`);
    } catch (error) {
      showError(`${error}`, 'Ошибка при создании проекта');
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

        <Buttons
          isLoading={isCreatingProject}
          isDisabled={isCreatingProject}
        />
      </form>
    </Content>
  );
}
