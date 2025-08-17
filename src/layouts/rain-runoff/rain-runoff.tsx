import { useParams } from 'react-router-dom';

import Board from './rain-runoff-board';

export default function RainRunoffPage() {
  const { projectId, id } = useParams();
  
  return (
    <div>
      <div>
        RainRunoffPage
      </div>
      {`projectId ${projectId}, id ${id}`}
      <Board />
    </div>
  );
}
