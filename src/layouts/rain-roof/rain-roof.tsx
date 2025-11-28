import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from './rain-roof-board';

import { useGetBlocksMutation, useGetRainRoofsItemsMutation } from '../../store';

export default function RainRoofLayout() {
  const { id } = useParams();
  const [getBlock] = useGetBlocksMutation();
  const [getItems, { isError }] = useGetRainRoofsItemsMutation();

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
