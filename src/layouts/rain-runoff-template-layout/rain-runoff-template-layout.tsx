import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RainRunoffDetail from './rain-runoff-template';
import NotFoundLayout from '../not-found-layout';
import { rainRunoffsItemSelector, useGetRainRunoffsItemMutation } from '../../store';
import { useAppSelector } from '../../hooks';

export default function RainRunoffDetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const [getRainRunoffsItem] = useGetRainRunoffsItemMutation();
  const item = useAppSelector(rainRunoffsItemSelector);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (itemId && !isNaN(+itemId) && +itemId > 0) {
      getRainRunoffsItem(+itemId);
    } else {
      // eslint-disable-next-line no-console
      console.error('Invalid itemId:', itemId);
    }
  }, []);

  return (
    item?.rainRunoff
      ? (
        <RainRunoffDetail
          data={item.rainRunoff}
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
