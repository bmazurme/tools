import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetRainRoofsItemMutation } from '../../store';
import { rainRoofsItemSelector } from '../../store/slices/rain-roofs-slice';
import NotFoundLayout from '../not-found-layout';
import RainRoofTemplate from './rain-roof-template';

export default function RainRoofTemplateLayout() {
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getRainRoofItem] = useGetRainRoofsItemMutation();
  const item = useAppSelector(rainRoofsItemSelector);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (itemId && !isNaN(+itemId) && +itemId > 0) {
      getRainRoofItem(+itemId);
    } else {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
    }
  }, []);

  return (
    item?.rainRoof
      ? (
        <RainRoofTemplate
          data={item.rainRoof}
          title={item.name}
        />
      )
      : (
        <NotFoundLayout
          title="404 — Страница не найдена"
          description="К сожалению, запрошенный документ не существует."
          buttonLabel="Вернуться на главную"
        />
      )
  );
}
