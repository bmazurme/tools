import Wrapper from '../../components/wrapper';
import { useGetCollectorCalculationItemsMutation } from '../../store';
import Board from './collector-calculation-board';

export default function CollectorCalculationLayout() {
  const [getItems] = useGetCollectorCalculationItemsMutation();

  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
