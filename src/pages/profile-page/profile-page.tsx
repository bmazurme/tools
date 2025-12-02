/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Text, TextInput, Icon,
} from '@gravity-ui/uikit';
import { Circle } from '@gravity-ui/icons';

import Content from '../../components/content/content';
import BackButton from '../../components/back-button/back-button';
import { useUpdateUserMutation, useGetActivitiesMutation, activitiesSelector } from '../../store';
import useUser from '../../hooks/use-user';
import { TEXT_INPUT_PROPS } from '../../config';

import style from './profile.module.css';
import { useAppSelector } from '../../hooks';

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
  const [getActivities] = useGetActivitiesMutation();
  const activities = useAppSelector(activitiesSelector);

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

  const formatDate = (postgresStr: string, hoursOffset = 3) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      // timeZone: 'Europe/Moscow', // Укажите нужный IANA timezone ID
    };

    const date = new Date(postgresStr);
    date.setHours(date.getHours() + hoursOffset);

    return new Intl.DateTimeFormat('ru-RU', options)
      .format(date)
      .replace(/\./g, '.') // Гарантируем точку как разделитель
      .replace(',', ', '); // Добавляем пробел после запятой
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <Content sidebar>
      <form className="content" onSubmit={handleSubmit(onSubmit)}>
        <BackButton />

        <div className="project_main">
          <Text variant="header-1">
            Профиль
          </Text>
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
          <Button
            view="action"
            size="l"
            type="submit"
          >
            Сохранить
          </Button>
          <Button
            view="flat"
            size="l"
            onClick={handleBack}
          >
            Отменить
          </Button>
        </div>

      </form>
      <div className="content">
        <Text variant="header-1">
          Активность
        </Text>

        <ul className={style.activities}>
          {activities.map((x) => (
            <li key={x.id} className={style.activity}>
              <Icon data={Circle} />
              <div className={style.description}>
                {`${x.description} - ${formatDate(x.createdAt)}`}
              </div>
            </li>
          ))}
        </ul>

      </div>
    </Content>
  );
}
