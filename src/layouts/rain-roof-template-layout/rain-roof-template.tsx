import { useEffect, useState } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';

import style from './rain-roof-template.module.css';

interface TemplateProps {
  data: RainRoof;
  title: string;
}

export default function RainRoofTemplate({ data, title }: TemplateProps) {
  const [formulaQ, setFormulaQ] = useState('');
  const [formulaQ5, setFormulaQ5] = useState('');

  useEffect(() => {
    if (data) {
      const {
        flow, n, q5, q20, sumRoofArea,
      } = data;

      setFormulaQ(`$Q=\\cfrac{${sumRoofArea}\\cdot ${q5}}{10000}=${flow}\\space\\text{л/с}$`);
      setFormulaQ5(`$q_5=4^${n}\\cdot ${q20}=${q5}$`);
    }
  }, [data]);

  return (
    <div className={style.details}>
      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        Определение расчетных расходов дождевых (СП 30.13330.2020)
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        Расчетный расход дождевых вод
        <Latex>{` ${LATEX.Q}`}</Latex>
        , л/с, с водосборной площади следует определять по формуле,
      </Text>
      <div className={style.block}>
        <Latex>{LATEX.formula.Q}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        где
        <Latex>{` ${LATEX.F} `}</Latex>
        - водосборная площадь,
        <Latex>{` ${LATEX.m2} `}</Latex>
      </Text>
      <div className={style.block}>
        <Latex>{`${LATEX.q5} - `}</Latex>
        интенсивность дождя, л/с, с 1 га (для данной местности), продолжительностью 5 мин при
        периоде однократного превышения расчетной интенсивности, равной 1 году, определяемая по
        формуле
      </div>
      <div className={style.block}>
        <Latex>{LATEX.formula.q5}</Latex>
      </div>
      <div className={style.block}>
        здесь
        <Latex>{` ${LATEX.n} - `}</Latex>
        параметр, принимаемый согласно СП 32.13330
      </div>
      <div className={style.block}>
        <Latex>{`${LATEX.q20} - `}</Latex>
        интенсивность дождя, л/с, с 1 га (для данной местности), продолжительностью 20 мин
        при периоде однократного превышения расчетной интенсивности, равной 1 году, принимаемая
        согласно СП 32.13330
      </div>
      <div className={style.block}>
        <Latex>{`${LATEX.q20} - `}</Latex>
        При определении расчетной водосборной площади следует дополнительно учитывать
        30% суммарной площади вертикальных стен, примыкающих к кровле и возвышающихся над ней
      </div>
      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        {title}
      </Text>

      <div className={style.block}>
        <Latex>{formulaQ}</Latex>
      </div>

      <div className={style.block}>
        <Latex>{formulaQ5}</Latex>
      </div>

    </div>
  );
}
