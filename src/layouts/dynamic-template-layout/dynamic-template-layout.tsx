import { useParams } from 'react-router-dom';

import RainRunoffTemplate from '../rain-runoff-template-layout';
import RainRoofTemplateLayout from '../rain-roof-template-layout';
import NotFoundLayout from '../not-found-layout';

export default function DynamicTemplateLayout() {
  const { typeId } = useParams();

  const LayoutComponent = {
    'rain-runoff': RainRunoffTemplate,
    'rain-roof': RainRoofTemplateLayout,
  }[typeId!] || NotFoundLayout;

  return <LayoutComponent />;
}
