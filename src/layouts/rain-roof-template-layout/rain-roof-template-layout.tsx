import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetRainRoofsItemMutation } from '../../store';
import { rainRoofsItemSelector, setRainRoofs } from '../../store/slices/rain-roofs-slice';
import RainRoofTemplate from './rain-roof-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

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
    <TemplateWrapper isLoading={!item?.rainRoof}>
      {() => (
        <RainRoofTemplate
          data={item.rainRoof}
          title={item.name}
        />
      )}
    </TemplateWrapper>
  );
}
