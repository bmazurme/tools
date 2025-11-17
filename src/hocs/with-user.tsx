/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, type ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
// import { useErrorHandler } from 'react-error-boundary';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { Loader } from '@gravity-ui/uikit';

import useUser from '../hooks/use-user';
import { useAppLocation } from '../hooks/use-app-location';
import { useGetUserMeMutation } from '../store';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = true,
) {
  return function WithUser(props: P) {
    const location = useAppLocation();
    // const handleErrors = useErrorHandler();
    const userData = useUser();
    const [getUser, {
      isUninitialized, isLoading, isError, error, data,
    }] = useGetUserMeMutation();
    const userRef = useRef<UserType | null>(userData);

    useEffect(() => {
      // Загружаем данные пользователя только если он не инициализирован и нет данных
      if (isUninitialized && !userData) {
        getUser().then(() => {
          if (data && !isError) {
            // Обновляем состояние пользователя
            userRef.current = data;
          }
        });
      }
    }, [data, getUser, isError, isUninitialized, userData]);

    // Обработка состояний
    if (isLoading || (isUninitialized && !userData)) {
      return (
        <div className="page">
          <Loader />
        </div>
      );
    }

    // Если пользователь авторизован или авторизация не требуется
    if (userData || !shouldBeAuthorized) {
      return <Page {...props} user={userData} />;
    }

    // Обработка ошибок
    if (isError && (error as FetchBaseQueryError)?.status !== 401 && !shouldBeAuthorized) {
      // handleErrors(error);
      return <div>Something went wrong</div>;
    }

    // Перенаправление на страницу входа
    return <Navigate to="/signin" state={{ from: location.pathname }} />;
  };
}
