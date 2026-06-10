/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { PersonPlus, Minus } from '@gravity-ui/icons';
import {
  Button, Icon, Select, TextInput, Text, User,
} from '@gravity-ui/uikit';

import AddUserModal from '../../components/add-user-modal/add-user-modal';
import BackButton from '../../components/back-button/back-button';
import Buttons from '../../components/buttons/buttons';
import fields from './project-edit-page.fields';

import {
  projectSelector,
  setProject, useAddUserToProjectMutation, useGetProjectMutation,
  useUpdateProjectMutation, useRemoveUserFromProjectMutation,
  useGetProjectStatusesMutation,
} from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';
import useAppToaster from '../../hooks/use-app-toaster';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './project-edit-layout.module.css';
import useUser from '../../hooks/use-user';

type FormPayload = {
  name: string;
  code: string;
  description: string;
  address: string;
  status: string[];
};

export default function ProjectEditLayout() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { showError } = useAppToaster();
  const { projectId: projectIdString } = useParams();
  const projectId = parseInt(projectIdString || '', 10);
  const [getProject] = useGetProjectMutation();
  const [updateProject, { isLoading: isUpdatingProject }] = useUpdateProjectMutation();
  const [addUserToProject] = useAddUserToProjectMutation();
  const [removeUserFromProject] = useRemoveUserFromProjectMutation();
  const [getProjectStatuses] = useGetProjectStatusesMutation();
  const [statuses, setStatuses] = useState<ProjectStatus[]>([]);
  const project = useAppSelector(projectSelector);
  const navigate = useNavigate();
  const { user } = useUser();

  const statusOptions = statuses.map(({ id, name }) => ({ value: id.toString(), content: name }));

  const onHandleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const { control, handleSubmit, reset } = useForm<FormPayload>({
    defaultValues: {
      name: '', code: '', description: '', address: '', status: [],
    },
  });

  const onSubmit = useCallback(async (data: FormPayload) => {
    const { status, ...rest } = data;

    try {
      await updateProject({
        id: projectId!,
        ...rest,
        ...(status?.length ? { status: { id: Number(status[0]) } } : {}),
      });
      navigate(`/project/${projectId}`);
    } catch (error) {
      showError(`${error}`, 'Ошибка при обновлении проекта');
    }
  }, [updateProject, projectId, navigate, showError]);

  const onAddUserToProject = useCallback(async (userId: number) => {
    try {
      await addUserToProject({ projectId, userId });
    } catch (error) {
      showError(`${error}`, 'Ошибка при обновлении проекта');
    }
  }, [addUserToProject, projectId, showError]);

  const onRemoveUserFromProject = useCallback(async (userId: number) => {
    try {
      await removeUserFromProject({ projectId, userId });
    } catch (error) {
      showError(`${error}`, 'Ошибка при обновлении проекта');
    }
  }, [removeUserFromProject, projectId, showError]);

  useEffect(() => {
    const fetchData = async () => {
      const projectStatuses = await getProjectStatuses().unwrap();
      setStatuses(projectStatuses);

      if (projectId) {
        const result = await getProject(projectId).unwrap();
        const {
          name = '', code = '', description = '', address = '', status,
        } = result || {};
        reset({
          name, code, description, address, status: status ? [status.id.toString()] : [],
        });
        dispatch(setProject({ project: result }));
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div className="content">
      <form
        className="form mb"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BackButton />
        <Text variant="header-1">Редактировать проект</Text>

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
          isLoading={isUpdatingProject}
          isDisabled={isUpdatingProject}
        />
      </form>

      <div className="form">
        <div className={style.header}>
          <Text variant="header-1">Участники</Text>
          <Button
            view="flat"
            size="l"
            onClick={onHandleOpenModal}
            title="Добавить пользователя к проекту"
          >
            <Icon
              data={PersonPlus}
              size={20}
            />
          </Button>
        </div>

        {isOpen && (
          <AddUserModal
            open={isOpen}
            setOpen={setIsOpen}
            onAddUserToProject={onAddUserToProject}
            title="Добавить пользователя к документу"
            project={project!}
          />
        )}
        {project?.participants.map((worker) => (
          <div
            className={style.item}
            key={worker.id}
          >
            <User
              avatar={{ text: worker.email, theme: 'brand' }}
              name={worker.email}
              description={worker.email}
              size="xs"
            />
            <Button
              view="flat"
              size="l"
              onClick={() => onRemoveUserFromProject(worker.id)}
              disabled={project.creator.id !== user?.id}
            >
              <Icon
                data={Minus}
                size={16}
              />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
