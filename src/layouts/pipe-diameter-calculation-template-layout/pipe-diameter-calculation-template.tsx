/* eslint-disable react/jsx-one-expression-per-line */
import { useMemo } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';

import style from './pipe-diameter-calculation-template.module.css';

interface TemplateProps {
  data: PipeDiameterCalculation;
  title: string;
}

export default function PipeDiameterCalculationTemplate({ data, title }: TemplateProps) {
  const formula = useMemo(() => {
    if (!data) {
      return '';
    }

    const { flowRate, velocity, diameter } = data;
    return `$\\large d=\\sqrt{\\cfrac{4 \\cdot ${flowRate}}{\\pi \\cdot ${velocity}}} = ${diameter}$`;
  }, [data]);

  return (
    <div className={style.details}>
      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        Расчёт диаметра трубопровода
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{`${LATEX.formula.pipeDiameterCalculation}`}</Latex>
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        где
        <Latex>{` ${LATEX.q} `}</Latex>
        - расчётный расход, л/с,
        <Latex>{` ${LATEX.velocity} `}</Latex>
        - допустимая скорость движения воды, м/с
      </Text>
      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        {title}
      </Text>
      <div className={style.block}>
        <Latex>{formula}</Latex> мм
      </div>
    </div>
  );
}
