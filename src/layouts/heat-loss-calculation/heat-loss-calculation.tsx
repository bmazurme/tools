import Wrapper from '../../components/wrapper';
import { useGetHeatLossCalculationItemsMutation } from '../../store';
import Board from './heat-loss-calculation-board';

export default function HeatLossCalculationLayout() {
  const [getItems] = useGetHeatLossCalculationItemsMutation();

  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
