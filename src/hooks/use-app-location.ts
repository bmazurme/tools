import { useLocation } from 'react-router-dom';

type LocationProps = { pathname?: string; from?: string; }
export interface LocationWithState extends Location { state: LocationProps }
// eslint-disable-next-line max-len
export const useAppLocation = (): LocationWithState => useLocation() as unknown as LocationWithState;
