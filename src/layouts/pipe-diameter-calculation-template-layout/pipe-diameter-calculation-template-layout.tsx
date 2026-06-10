import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetPipeDiameterCalculationItemMutation } from '../../store';
import { pipeDiameterCalculationItemSelector, setPipeDiameterCalculation } from '../../store/slices/pipe-diameter-calculation-slice';
import PipeDiameterCalculationTemplate from './pipe-diameter-calculation-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function PipeDiameterCalculationTemplateLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getPipeDiameterCalculationItem] = useGetPipeDiameterCalculationItemMutation();
  const item = useAppSelector(pipeDiameterCalculationItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getPipeDiameterCalculationItem(+id).unwrap();
        dispatch(setPipeDiameterCalculation({ item: data }));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
        showError(message, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.pipeDiameterCalculation}>
      {() => (
        <PipeDiameterCalculationTemplate
          data={item.pipeDiameterCalculation}
          title={item.name}
        />
      )}
    </TemplateWrapper>
  );
}
