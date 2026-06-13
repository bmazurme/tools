/* eslint-disable react/jsx-one-expression-per-line */
import { useMemo } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';
import { METER_TYPE_LABEL } from '../calculation-meter/field-config';

import style from './calculation-meter-template.module.css';

interface TemplateProps {
  data: CalculationMeter;
  title: string;
}

const METHODOLOGY = (
  <>
    <Text
      variant="subheader-2"
      className={style.subtitle}
    >
      Расчет потерь давления в счетчике по гидравлическому сопротивлению (СП 30.13330.2020)
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Потери давления в счетчике определяются по формуле:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.calculationMeterPressureLoss}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      где <Latex>{` ${LATEX.resistance} `}</Latex> – гидравлическое сопротивление счетчика,
      принимаемое по таблице в зависимости от типа и диаметра счетчика (или по паспортным
      данным счетчика, если они указаны), <Latex>{` ${LATEX.q} `}</Latex>{' '}
      – расчетный расход воды через счетчик, м³/ч, <Latex>{` ${LATEX.pressureLoss} `}</Latex>{' '}
      – потери давления в счетчике, м
    </Text>
  </>
);

export default function CalculationMeterTemplate({ data, title }: TemplateProps) {
  const resistance = useMemo(
    () => data?.resistanceManual ?? data?.resistance,
    [data],
  );

  const pressureLossFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const { flowRate, pressureLoss } = data;
    return `$\\Delta H=${resistance} \\cdot ${flowRate}^2 = ${pressureLoss} \\ \\text{м}$`;
  }, [data, resistance]);

  return (
    <div className={style.details}>
      {METHODOLOGY}

      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        {title}
      </Text>

      <Text
        variant="code-1"
        className={style.block}
      >
        Тип счетчика: {data && METER_TYPE_LABEL[data.meterType]},
        диаметр <Latex>{`${LATEX.meterDiameter}`}</Latex> = {data?.diameter} мм
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        Гидравлическое сопротивление счетчика <Latex>{`${LATEX.resistance}`}</Latex> = {resistance}
        {' '}
        {data?.resistanceManual ? '(указано по паспорту счетчика)' : '(принято по таблице)'}
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        Потери давления в счетчике:
      </Text>
      <div className={style.block}>
        <Latex>{pressureLossFormula}</Latex>
      </div>
    </div>
  );
}
