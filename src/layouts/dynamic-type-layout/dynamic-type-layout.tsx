import { useParams } from 'react-router-dom';

import RainRoofLayout from '../rain-roof/rain-roof';
import RainRunoffLayout from '../rain-runoff/rain-runoff';
import NotFoundLayout from '../not-found-layout';

export default function DynamicTypeLayout() {
  const { typeId } = useParams();

  const LayoutComponent = {
    'rain-runoff': RainRunoffLayout,
    'rain-roof': RainRoofLayout,
  }[typeId!] || NotFoundLayout;

  return <LayoutComponent />;
}
