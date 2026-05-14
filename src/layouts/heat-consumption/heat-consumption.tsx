import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@gravity-ui/uikit';

import Board from './heat-consumption-board';

import {
  useGetBlocksMutation, useGetHeatConsumptionItemsMutation, documentSelector, setItems,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './heat-consumption.module.css';

export default function HeatConsumptionLayout() {
  const dispatch = useAppDispatch();
  const { id, typeId } = useParams();
  const document = useAppSelector(documentSelector);
  const [getBlock] = useGetBlocksMutation();
  const [getItems] = useGetHeatConsumptionItemsMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        getBlock(Number(id));
        const items = await getItems(Number(id)).unwrap();
        dispatch(setItems({ items }));
      }
    };
    fetchData();
  }, [getBlock, id]);

  return (
    <div className="gapb">
      {document?.type.link !== typeId ? <Skeleton className={style.loader} /> : <Board />}
    </div>
  );
}
