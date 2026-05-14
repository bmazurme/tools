/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';

import style from './heat-consumption-template-layout.module.css';

interface TemplateProps {
  data: HeatConsumption;
  title: string;
}

export default function HeatConsumptionTemplate({ data, title }: TemplateProps) {
  const [formulaAvg, setFormulaAvg] = useState('');
  const [formulaMax, setFormulaMax] = useState('');

  useEffect(() => {
    if (data) {
      const {
        th, tc, maxHotWaterPerHour,
        avgHotWaterPerHour, hwPipelineHeatLoss,
        meanHourlyHeatForHotWater, maxHourlyHeatForHotWater,
      } = data;

      setFormulaAvg(`$Q_{T}^{h}=1,16\\cdot ${avgHotWaterPerHour}\\cdot\\left(${th}-${tc}\\right)+${hwPipelineHeatLoss}=${meanHourlyHeatForHotWater}$`);
      setFormulaMax(`$Q_{hr}^{h}=1,16\\cdot ${maxHotWaterPerHour}\\cdot\\left(${th}-${tc}\\right)+${hwPipelineHeatLoss}=${maxHourlyHeatForHotWater}$`);
    }
  }, [data]);

  return (
    <div className={style.details}>
      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        Расчёт расхода тепла для нагрева горячей воды СП 30.13330.2020
      </Text>

      <Text
        variant="code-1"
        className={style.block}
      >
        Расход тепла для нагрева горячей воды, кВт:
      </Text>

      <div className={style.block}>
        в течение среднего часа
      </div>
      <div className={style.block}>
        <Latex>{`${LATEX.formula.QhT}`}</Latex>
      </div>

      <div className={style.block}>
        в течение часа максимального потребления горячей воды
      </div>
      <div className={style.block}>
        <Latex>{`${LATEX.formula.Qhhr}`}</Latex>
      </div>
      <div className={style.block}>
        где <Latex>{`${LATEX.th}`}</Latex> - температура горячей воды, <Latex>{`${LATEX.tc}`}</Latex> - температура холодной воды
      </div>
      <div className={style.block}>
        <Latex>{`${LATEX.avgHotWaterPerHour}`}</Latex> - средний часовой расход воды горячей
      </div>
      <div className={style.block}>
        <Latex>{`${LATEX.maxHotWaterPerHour}`}</Latex> - максимальный часовой расход воды горячей
      </div>
      <div className={style.block}>
        <Latex>{`${LATEX.hwPipelineHeatLoss}`}</Latex> - тепловые потери трубопроводами системы ГВС
      </div>

      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        {title}
      </Text>

      <div className={style.block}>
        в течение среднего часа
      </div>
      <div className={style.block}>
        <Latex>{formulaAvg}</Latex> кВт
      </div>

      <div className={style.block}>
        в течение часа максимального потребления горячей воды
      </div>
      <div className={style.block}>
        <Latex>{formulaMax}</Latex> кВт
      </div>
    </div>
  );
}
