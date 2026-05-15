import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@gravity-ui/uikit';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetRainRoofsItemMutation } from '../../store';
import { rainRoofsItemSelector, setRainRoofs } from '../../store/slices/rain-roofs-slice';
import RainRoofTemplate from './rain-roof-template';
import { isValidItemId } from '../is-valid-item-id';

export default function RainRoofTemplateLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getRainRoofItem] = useGetRainRoofsItemMutation();
  const item = useAppSelector(rainRoofsItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getRainRoofItem(+id).unwrap();
        dispatch(setRainRoofs({ item: data }));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        showError(message, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    item?.rainRoof
      ? (
        <RainRoofTemplate
          data={item.rainRoof}
          title={item.name}
        />
      )
      : (
        <Skeleton className="layout-loader" />
      )
  );
}
