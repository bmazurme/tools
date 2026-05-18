import { useEffect, useState } from 'react';
import { Checkbox, Text } from '@gravity-ui/uikit';

import LayoutWrapper from '../../components/layout-wrapper/layout-wrapper';
import {
  setTypes, typesSelector, useAddTypeToUserMutation, useGetTypesMutation, useGetUserSettingsQuery,
  useRemoveTypeFromUserMutation, usersAvailableTypesSelector, setAvailableTypes,
} from '../../store';
import useAppToaster from '../../hooks/use-app-toaster';
import { useAppDispatch, useAppSelector } from '../../hooks';
// import BrokenComponent from '../../components/broken-component/broken-component';

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

  const toggleType = async (typeId: number) => {
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
  };

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
    <LayoutWrapper isLoading={false}>
      <div className="content">
        <Text variant="header-1">
          Настройки
        </Text>
        <Text variant="subheader-2">
          Модули
        </Text>
        {types.map((x) => (
          <Checkbox
            key={x.id}
            content={x.name}
            size="m"
            disabled={isUpdating}
            checked={availableTypes?.some((type) => type.id === x.id)}
            onChange={() => toggleType(x.id)}
          />
        ))}
        {/* <BrokenComponent /> */}
      </div>
    </LayoutWrapper>
  );
}
