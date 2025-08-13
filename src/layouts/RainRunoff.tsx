import { useParams } from 'react-router';

import Board from '../components/board';

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
