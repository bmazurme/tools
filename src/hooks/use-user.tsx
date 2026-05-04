import { useAppSelector } from './index';
import { usersSelector } from '../store/index';

export default function useUser() {
  const user = useAppSelector(usersSelector);
  const loading = useAppSelector((state) => state.users.loading);

  return { user, loading };
}
