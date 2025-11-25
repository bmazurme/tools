import { useParams } from 'react-router-dom';

import RainRunoffTemplate from '../rain-runoff-details-layout';
import RainRoofTemplate from '../rain-roof-details-layout';
import NotFoundLayout from '../not-found-layout';

export default function DynamicDetailLayout() {
  const { typeId } = useParams();

  const LayoutComponent = {
    'rain-runoff': RainRunoffTemplate,
    'rain-roof': RainRoofTemplate,
  }[typeId!] || NotFoundLayout;

  return <LayoutComponent />;
}
