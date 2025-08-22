// import { useParams } from 'react-router-dom';
import { Text } from '@gravity-ui/uikit';
import Board from './rain-roof-board';

export default function RainRoofPage() {
  // const { projectId, id } = useParams();

  return (
    <div>
      <Text variant="subheader-2">Расчетный расход дождевых вод</Text>
      <Board />
    </div>
  );
}
