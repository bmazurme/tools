import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetHeatConsumptionItemMutation } from '../../store';
import { heatConsumptionItemSelector, setHeatConsumption } from '../../store/slices/heat-consumption-slice';
import NotFoundLayout from '../not-found-layout';
import HeatConsumptionTemplate from './heat-consumption-template';

export default function HeatConsumptionLayout() {
  const dispatch = useAppDispatch();
  const { itemId } = useParams<{ itemId: string }>();
  const [getHeatConsumptionItem] = useGetHeatConsumptionItemMutation();
  const item = useAppSelector(heatConsumptionItemSelector);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const data = await getHeatConsumptionItem(+id).unwrap();
        dispatch(setHeatConsumption({ item: data }));
      } catch (error) {
        console.log(error);
      }
    };
    // eslint-disable-next-line no-restricted-globals
    if (itemId && !isNaN(+itemId) && +itemId > 0) {
      fetchData(itemId);
    } else {
      // eslint-disable-next-line no-console
      console.error('Invalid itemId:', itemId);
    }
  }, []);

  return (
    item?.heatConsumption
      ? (
        <HeatConsumptionTemplate
          data={item.heatConsumption}
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
