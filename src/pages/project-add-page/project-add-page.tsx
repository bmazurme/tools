/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Select, Text, TextInput } from '@gravity-ui/uikit';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';
import Buttons from '../../components/buttons/buttons';
import fields from './project-add-page.fields';

import { useCreateProjectMutation, useGetProjectStatusesMutation } from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';
import useAppToaster from '../../hooks/use-app-toaster';

type FormPayload = {
  name: string;
  code: string;
  description: string;
  address: string;
  status: string[];
};

export default function ProjectAddPage() {
  const { showError } = useAppToaster();
  const [createProject, { isLoading: isCreatingProject }] = useCreateProjectMutation();
  const [getProjectStatuses] = useGetProjectStatusesMutation();
  const [statuses, setStatuses] = useState<ProjectStatus[]>([]);
  const navigate = useNavigate();

  const statusOptions = statuses.map(({ id, name }) => ({ value: id.toString(), content: name }));

  useEffect(() => {
    const fetchStatuses = async () => {
      const projectStatuses = await getProjectStatuses().unwrap();
      setStatuses(projectStatuses);
    };

    fetchStatuses();
  }, []);

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      name: '', code: '', description: '', address: '', status: [],
    },
  });
  const onSubmit = async (data: FormPayload) => {
    const { status, ...rest } = data;

    try {
      const { data: project } = await createProject({
        ...rest,
        ...(status?.length ? { status: { id: Number(status[0]) } } : {}),
      }) as unknown as { data: ProjectType };
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
            name={input.name as Exclude<keyof FormPayload, 'status'>}
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

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Выберите статус"
              label="Статус"
              size="l"
              width="max"
              onUpdate={field.onChange}
              value={field.value}
              options={statusOptions}
            />
          )}
        />

        <Buttons
          isLoading={isCreatingProject}
          isDisabled={isCreatingProject}
        />
      </form>
    </Content>
  );
}
