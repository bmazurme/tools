import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@gravity-ui/uikit';

import Board from './rain-runoff-board';

import { documentSelector, useGetBlocksMutation, useGetRainRunoffsItemsMutation } from '../../store';
import { useAppSelector } from '../../hooks';

import style from './rain-runoff.module.css';

export default function RainRunoffLayout() {
  const { id, typeId } = useParams();
  const document = useAppSelector(documentSelector);
  const [getBlock] = useGetBlocksMutation();
  const [getItems] = useGetRainRunoffsItemsMutation();

  useEffect(() => {
    if (id) {
      getBlock(Number(id));
      getItems(Number(id));
    }
  }, [getBlock, id]);

  return (
    <div className="gapb">
      {document?.type.link !== typeId ? <Skeleton className={style.loader} /> : <Board />}
    </div>
  );
}
