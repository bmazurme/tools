import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from './rain-runoff-board';
import { useGetBlocksMutation } from '../../store';

export default function RainRunoffPage() {
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
