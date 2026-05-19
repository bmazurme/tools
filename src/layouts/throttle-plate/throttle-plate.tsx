import Wrapper from '../../components/wrapper';
import { useGetThrottlePlateItemsMutation } from '../../store';
import Board from './throttle-plate-board';

export default function ThrottlePlateLayout() {
  const [getItems] = useGetThrottlePlateItemsMutation();

  return (
    <Wrapper getItems={getItems}>
      <Board />
    </Wrapper>
  );
}
