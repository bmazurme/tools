import { useParams } from 'react-router';

import Board from './rain-roof-board';

export default function RainRoofPage() {
  const { projectId, id } = useParams();

  return (
    <div>
      <div>
        RainRoofPage
      </div>
      {`projectId ${projectId}, id ${id}`}
      <Board />
    </div>
  );
}
