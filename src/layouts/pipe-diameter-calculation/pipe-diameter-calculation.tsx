import Wrapper from '../../components/wrapper';
import { useGetPipeDiameterCalculationItemsMutation } from '../../store';
import Board from './pipe-diameter-calculation-board';

export default function PipeDiameterCalculationLayout() {
  const [getItems] = useGetPipeDiameterCalculationItemsMutation();

  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
