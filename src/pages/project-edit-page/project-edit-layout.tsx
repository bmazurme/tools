/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { PersonPlus, Minus } from '@gravity-ui/icons';
import {
  Button, Icon, TextInput, Text,
  User,
} from '@gravity-ui/uikit';

import AddUserModal from '../../components/add-user-modal/add-user-modal';
import BackButton from '../../components/back-button/back-button';
import Buttons from '../../components/buttons/buttons';
import fields from './project-edit-page.fields';

import {
  projectSelector,
  setProject, useAddUserToProjectMutation, useGetProjectMutation,
  useUpdateProjectMutation, useRemoveUserFromProjectMutation,
} from '../../store';
import { TEXT_INPUT_PROPS } from '../../config';
import useAppToaster from '../../hooks/use-app-toaster';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './project-edit-layout.module.css';

type FormPayload = Omit<ProjectType, 'id'>;

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
  const project = useAppSelector(projectSelector);
  const navigate = useNavigate();

  const onHandleOpenModal = () => {
    setIsOpen(true);
  };

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
      showError(`${error}`, 'Ошибка при обновлении проекта');
    }
  };

  const onAddUserToProject = async (userId: number) => {
    try {
      await addUserToProject({ projectId, userId });
    } catch (error) {
      showError(`${error}`, 'Ошибка при обновлении проекта');
    }
  };
  const onRemoveUserFromProject = async (userId: number) => {
    try {
      await removeUserFromProject({ projectId, userId });
    } catch (error) {
      showError(`${error}`, 'Ошибка при обновлении проекта');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        const result = await getProject(projectId).unwrap();
        const { name = '', description = '', address = '' } = result || {};
        reset({ name, description, address });
        dispatch(setProject({ project: result }));
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div className="content">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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

        <Buttons
          isLoading={isUpdatingProject}
          isDisabled={isUpdatingProject}
        />
      </form>
      <Button
        view="flat"
        size="l"
        onClick={onHandleOpenModal}
        title="Добавить пользователя к документу"
      >
        <Icon
          data={PersonPlus}
          size={20}
        />
      </Button>
      {isOpen && (
        <AddUserModal
          open={isOpen}
          setOpen={setIsOpen}
          onAddUserToProject={onAddUserToProject}
          title="Добавить пользователя к документу"
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
          >
            <Icon
              data={Minus}
              size={16}
            />
          </Button>
        </div>
      ))}
    </div>
  );
}
