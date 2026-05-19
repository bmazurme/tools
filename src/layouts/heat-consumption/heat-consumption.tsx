import Wrapper from '../../components/wrapper';
import { useGetHeatConsumptionItemsMutation } from '../../store';
import Board from './heat-consumption-board';

export default function HeatConsumptionLayout() {
  const [getItems] = useGetHeatConsumptionItemsMutation();
  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
