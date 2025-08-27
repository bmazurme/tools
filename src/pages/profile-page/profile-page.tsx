/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Icon, Text, TextInput,
} from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import { useUpdateUserMutation } from '../../store';
import useUser from '../../hooks/use-user';
import { BACK_BUTTON_PROPS, TEXT_INPUT_PROPS } from '../../config';

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
        <Button {...BACK_BUTTON_PROPS} onClick={handleBack}>
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
