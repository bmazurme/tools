import { useParams } from 'react-router-dom';

import RainRoofLayout from '../rain-roof/rain-roof';
import RainRunoffLayout from '../rain-runoff/rain-runoff';
import HeatConsumptionLayout from '../heat-consumption/heat-consumption';
import ThrottlePlateLayout from '../throttle-plate/throttle-plate';

import NotFoundLayout from '../not-found-layout';

export default function DynamicTypeLayout() {
  const { typeId } = useParams();

  const LayoutComponent = {
    'rain-runoff': RainRunoffLayout,
    'rain-roof': RainRoofLayout,
    'heat-consumption': HeatConsumptionLayout,
    'throttle-plate': ThrottlePlateLayout,
  }[typeId!] || NotFoundLayout;

  return (
    <LayoutComponent
      title="404 — Страница не найдена"
      description="К сожалению, запрошенный документ не существует."
      buttonLabel="Вернуться на главную"
    />
  );
}
