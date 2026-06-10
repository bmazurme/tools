import { useCallback, useEffect, useState } from 'react';
import { Card, Switch, Text } from '@gravity-ui/uikit';

import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';
import {
  setTypes, typesSelector, useAddTypeToUserMutation, useGetTypesMutation, useGetUserSettingsQuery,
  useRemoveTypeFromUserMutation, usersAvailableTypesSelector, setAvailableTypes,
} from '../../store';
import useAppToaster from '../../hooks/use-app-toaster';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import BrokenComponent from '../../components/broken-component/broken-component';

import style from './settings.module.css';

export default function SettingsLayout() {
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();

  const { types } = useAppSelector(typesSelector);
  const availableTypes = useAppSelector(usersAvailableTypesSelector);

  const { showError } = useAppToaster();
  const [getTypes] = useGetTypesMutation();
  const [addTypeToUser] = useAddTypeToUserMutation();
  const [removeTypeFromUser] = useRemoveTypeFromUserMutation();
  const { data } = useGetUserSettingsQuery();

  const toggleType = useCallback(async (typeId: number) => {
    if (isUpdating) return;

    setIsUpdating(true);

    const added = availableTypes.some((type) => type.id === typeId);

    try {
      let result;

      if (added) {
        result = await removeTypeFromUser(typeId).unwrap();
      } else {
        result = await addTypeToUser(typeId).unwrap();
      }

      dispatch(setAvailableTypes({
        availableTypes: result,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка при изменении типа';
      showError(message, 'Не удалось обновить настройки');
    } finally {
      setIsUpdating(false);
    }
  }, [isUpdating, availableTypes, removeTypeFromUser, addTypeToUser, dispatch, showError]);

  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(setAvailableTypes({
        availableTypes: data,
      }));
    }
  }, [data]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await getTypes().unwrap();
        dispatch(setTypes(result));
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Неизвестная ошибка';
        showError(message, 'Ошибка при обновлении статуса');
      }
    };
    fetchOptions();
  }, [getTypes]);

  return (
    <LayoutWrapper>
      <div className="content">
        <Text variant="header-1">
          Настройки
        </Text>
        <Card view="outlined" className={style.card}>
          <Text variant="subheader-2">
            Модули
          </Text>
          <Text variant="body-2" color="secondary" className={style.description}>
            Выберите модули, доступные в вашем рабочем пространстве.
          </Text>
          {types.map((x) => {
            const isConnected = availableTypes?.some((type) => type.id === x.id);

            return (
              <div key={x.id} className={style.row}>
                <div className={style.rowText}>
                  <Text variant="body-2">{x.name}</Text>
                  <Text variant="caption-2" color="hint">
                    {isConnected ? 'Подключён' : 'Не подключён'}
                  </Text>
                </div>
                <Switch
                  size="m"
                  disabled={isUpdating}
                  checked={isConnected}
                  onUpdate={() => toggleType(x.id)}
                />
              </div>
            );
          })}
        </Card>
        {/* <BrokenComponent /> */}
      </div>
    </LayoutWrapper>
  );
}
