/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, Text, TextInput, Icon, Checkbox,
} from '@gravity-ui/uikit';
import { Calendar } from '@gravity-ui/icons';

import {
  activitiesSelector, setActivities, useGetActivitiesMutation,
  useGetStatusMutation, useUpdateUserMutation,
} from '../../store';
import useUser from '../../hooks/use-user';
import useAppToaster from '../../hooks/use-app-toaster';
import { TEXT_INPUT_PROPS } from '../../config';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setStatus } from '../../store/slices/subscriptions-slice';
import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';
import { profileFormConfig, type FormPayload } from './profile-form-config';

import style from './profile.module.css';

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

export default function ProfileLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const activities = useAppSelector(activitiesSelector);
  const { showSuccess, showError } = useAppToaster();

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [getActivities, { isLoading: isLoadingActivities }] = useGetActivitiesMutation();
  const [getStatus, { isLoading: isLoadingStatus }] = useGetStatusMutation();

  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: {
      status: user?.status || '',
      email: user?.email || '',
    },
  });

  const onSubmit = useCallback(async (data: FormPayload) => {
    try {
      await updateUser({ ...user!, status: data.status });
      showSuccess('Статус успешно обновлен', data.status);
    } catch (error) {
      showError(error, 'Ошибка при обновлении статуса');
    }
  }, [updateUser, user, showSuccess, showError]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data1 = await getActivities();
        const data2 = await getStatus();
        // const [data1, data2] = await Promise.all([
        //   getActivities(),
        //   getStatus(),
        // ]);

        if (!isMounted) return;

        dispatch(setActivities({ activities: data1.data }));
        dispatch(setStatus(data2.data));
      } catch (error) {
        showError(error, 'Ошибка при загрузке профиля');
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [getActivities, getStatus, dispatch]);

  return (
    <LayoutWrapper isLoading={isLoadingActivities || isLoadingStatus}>
      <div className="content">
        <form className={style.block} onSubmit={handleSubmit(onSubmit)}>
          <div className="project_main">
            <Text variant="header-1">
              Профиль
            </Text>
          </div>
          {profileFormConfig.map((input) => (
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
              loading={isUpdating}
            >
              Сохранить
            </Button>
          </div>
        </form>

        <div className={style.block}>
          <Text variant="subheader-2">
            Подписка
          </Text>
          <Checkbox
            size="l"
            disabled
            checked={!!user?.subscription}
          >
            Статус
          </Checkbox>
          <div className="buttons">
            <Button
              view="outlined-action"
              size="l"
              onClick={() => navigate('/subscriptions')}
            >
              Продлить
            </Button>
          </div>
        </div>

        <div className={style.block}>
          <Text variant="subheader-2">
            Активность
          </Text>

          <ul className={style.activities}>
            {activities?.map((x) => (
              <li key={x.id} className={style.activity}>
                <Icon data={Calendar} size={16} className={style.activityIcon} />
                <div className={style.description}>
                  <Text variant="body-2">{x.description}</Text>
                  <Text variant="caption-2" color="hint">{formatDate(x.createdAt)}</Text>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </LayoutWrapper>
  );
}
