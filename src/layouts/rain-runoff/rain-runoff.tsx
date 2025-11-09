import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from './rain-runoff-board';

import { useGetBlocksMutation, useGetRainRunoffsItemsMutation } from '../../store';

export default function RainRunoffPage() {
  const { id } = useParams();
  const [getRainRoofs] = useGetBlocksMutation();
  const [getItems] = useGetRainRunoffsItemsMutation();

  useEffect(() => {
    if (id) {
      getRainRoofs(Number(id));
      getItems(Number(id));
    }
  }, [getRainRoofs, id]);

  return (
    <div className="gapb">
      <Board />
    </div>
  );
}
