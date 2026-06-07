/* eslint-disable react/jsx-one-expression-per-line */
import { useMemo } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';

import style from './throttle-plate-template.module.css';

interface TemplateProps {
  data: ThrottlePlate;
  title: string;
}

export default function ThrottlePlateTemplate({ data, title }: TemplateProps) {
  const formula = useMemo(() => {
    if (!data) {
      return '';
    }

    const { flowRate, excessHead, diameter } = data;
    return `$\\large d_0=\\sqrt[4]{\\frac{(3,6 \\cdot ${flowRate})^2} {${excessHead}}} = ${diameter}$`;
  }, [data]);

  return (
    <div className={style.details}>
      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        Расчёт диаметра отверстия дроссельной шайбы
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{`${LATEX.formula.throttlePlate}`}</Latex>
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        где
        <Latex>{` ${LATEX.q} `}</Latex>
        - расход в л/с,
        <Latex>{` ${LATEX.excessHead} `}</Latex>
        - избыточный напор, который следует погасить диафрагмой, МПа
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
