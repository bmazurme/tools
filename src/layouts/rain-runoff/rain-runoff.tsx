import Wrapper from '../../components/wrapper';
import { useGetRainRunoffsItemsMutation } from '../../store';
import Board from './rain-runoff-board';

export default function RainRunoffLayout() {
  const [getItems] = useGetRainRunoffsItemsMutation();

  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
