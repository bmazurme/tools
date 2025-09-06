import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from './rain-roof-board';
import { useGetBlocksMutation, useGetItemsMutation } from '../../store';

export default function RainRoofPage() {
  const { id } = useParams();
  const [getBlock] = useGetBlocksMutation();
  const [getItems] = useGetItemsMutation();

  useEffect(() => {
    if (id) {
      getBlock(Number(id));
      getItems(Number(id));
    }
  }, [getBlock, id]);

  return (
    <div className="gapb">
      <Board />
    </div>
  );
}
