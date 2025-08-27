/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, TextInput } from '@gravity-ui/uikit';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';
import { useUpdateUserMutation } from '../../store';
import useUser from '../../hooks/use-user';
import { TEXT_INPUT_PROPS } from '../../config';

type FormPayload = { status: string; email: string };

const fields = [
  {
    name: 'email',
    label: 'Email',
    disabled: true,
  },
  {
    name: 'status',
    label: 'Статус',
    pattern: {
      value: /^[A-Za-zА-Яа-я0-9., -]{0,50}$/,
      message: 'Name is invalid',
    },
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useUser();
  const [updateUser] = useUpdateUserMutation();

  const handleBack = () => navigate(-1);
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      status: user?.status || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data: FormPayload) => {
    try {
      await updateUser({ ...user!, status: data.status });
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
  };

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <BackButton />

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
