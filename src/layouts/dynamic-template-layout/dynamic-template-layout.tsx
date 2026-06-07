import { useParams } from 'react-router-dom';

import RainRunoffTemplate from '../rain-runoff-template-layout';
import RainRoofTemplateLayout from '../rain-roof-template-layout';
import NotFoundLayout from '../not-found-layout';
import HeatConsumptionLayout from '../heat-consumption-template-layout';
import ThrottlePlateLayout from '../throttle-plate-template-layout';
import PipeDiameterCalculationLayout from '../pipe-diameter-calculation-template-layout';

export default function DynamicTemplateLayout() {
  const { typeId } = useParams();

  const LayoutComponent = {
    'rain-runoff': RainRunoffTemplate,
    'rain-roof': RainRoofTemplateLayout,
    'heat-consumption': HeatConsumptionLayout,
    'throttle-plate': ThrottlePlateLayout,
    'pipe-diameter-calculation': PipeDiameterCalculationLayout,
  }[typeId!] || NotFoundLayout;

  return (
    <LayoutComponent
      title="404 — Страница не найдена"
      description="К сожалению, запрошенный документ не существует."
      buttonLabel="Вернуться на главную"
    />
  );
}
