import Wrapper from '../../components/wrapper';
import { useGetCalculationMeterItemsMutation } from '../../store';
import Board from './calculation-meter-board';

export default function CalculationMeterLayout() {
  const [getItems] = useGetCalculationMeterItemsMutation();

  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
