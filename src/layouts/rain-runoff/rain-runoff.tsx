import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@gravity-ui/uikit';

import Board from './rain-runoff-board';

import {
  documentSelector, setItems, useGetBlocksMutation, useGetRainRunoffsItemsMutation,
} from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';

export default function RainRunoffLayout() {
  const { showError } = useAppToaster();
  const { id, typeId } = useParams();
  const dispatch = useAppDispatch();
  const document = useAppSelector(documentSelector);
  const [getBlock] = useGetBlocksMutation();
  const [getItems] = useGetRainRunoffsItemsMutation();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          getBlock(Number(id));
          const items = await getItems(Number(id)).unwrap();
          dispatch(setItems({ items }));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
          showError(message, 'Ошибка');
        }
      }
    };

    fetchData();
  }, [getBlock, getItems, dispatch, id]);

  return (
    <div className="gapb">
      {document?.type.link !== typeId ? <Skeleton className="layout-loader" /> : <Board />}
    </div>
  );
}
