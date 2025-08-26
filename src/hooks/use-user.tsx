import { useAppSelector } from './index';
import { usersSelector } from '../store/index';

export default function useUser() {
  return useAppSelector(usersSelector);
}
