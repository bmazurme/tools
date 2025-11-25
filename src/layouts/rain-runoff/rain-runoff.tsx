import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from './rain-runoff-board';

import { useGetBlocksMutation, useGetRainRunoffsItemsMutation } from '../../store';

export default function RainRunoffLayout() {
  const { id } = useParams();
  const [getBlock] = useGetBlocksMutation();
  const [getItems, { isError }] = useGetRainRunoffsItemsMutation();

  useEffect(() => {
    if (id) {
      getBlock(Number(id));
      getItems(Number(id));
    }
  }, [getBlock, id]);

  return (
    <div className="gapb">
      {isError ? <>error</> : <Board />}
    </div>
  );
}
