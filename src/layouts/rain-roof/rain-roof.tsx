import Wrapper from '../../components/wrapper';
import { useGetRainRoofsItemsMutation } from '../../store';
import Board from './rain-roof-board';

export default function RainRoofLayout() {
  const [getItems] = useGetRainRoofsItemsMutation();

  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
