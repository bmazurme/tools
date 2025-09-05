import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Board from './rain-roof-board';
import { useGetBlocksMutation } from '../../store';

export default function RainRoofPage() {
  const { id } = useParams();
  const [getRainRoofs] = useGetBlocksMutation();

  useEffect(() => {
    if (id) {
      getRainRoofs(Number(id));
    }
  }, [getRainRoofs, id]);

  return (
    <div className="gapb">
      <Board />
    </div>
  );
}
