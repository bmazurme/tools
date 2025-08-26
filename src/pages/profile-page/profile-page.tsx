/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Icon, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import { useGetUserMeMutation, useUpdateUserMutation } from '../../store';
import useUser from '../../hooks/use-user';

type FormPayload = { status: string };

const fields = [
  {
    name: 'status',
    label: 'Статус',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{3,50}$/,
      message: 'Name is invalid',
    },
    autoComplete: 'status',
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useUser();
  const [getUser] = useGetUserMeMutation();
  const [updateUser] = useUpdateUserMutation();

  const { control, handleSubmit, reset } = useForm<FormPayload>({
    defaultValues: {
      status: user?.status,
    },
  });

  const onSubmit = async (data: FormPayload) => {
    try {
      await updateUser({ ...user!, status: data.status });
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    reset({ status: user?.status });
  }, [user?.status]);

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <Button view="flat" size="m" onClick={() => navigate(-1)}>
          <Icon data={ArrowLeft} size={18} />
          Назад
        </Button>

        <div className="project_main">
          <Text variant="header-1">Профиль</Text>
        </div>
        {fields.map((input) => (
          <Controller
            key={input.name}
            name={input.name as keyof FormPayload}
            rules={{
              pattern: input.pattern,
              // required: input.required,
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
