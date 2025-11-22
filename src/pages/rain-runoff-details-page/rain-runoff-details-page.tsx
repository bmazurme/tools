import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Loader } from '@gravity-ui/uikit';

import RainRunoffDetail from './rain-runoff-template';
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
        <Modal open disableOutsideClick>
          <RainRunoffDetail rainRunoff={item.rainRunoff} title={item.name} />
        </Modal>
      )
      : <Loader />
  );
}
