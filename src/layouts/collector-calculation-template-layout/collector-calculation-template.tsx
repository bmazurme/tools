/* eslint-disable react/jsx-one-expression-per-line */
import { useMemo } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';

import style from './collector-calculation-template.module.css';

interface TemplateProps {
  data: CollectorCalculation;
  title: string;
}

export default function CollectorCalculationTemplate({ data, title }: TemplateProps) {
  const formula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, diameter,
    } = data;
    return `$D_{\\text{к}} = \\sqrt{${d1}^2 + ${d2}^2 + ${d3}^2 + ${d4}^2 + ${d5}^2 + ${d6}^2 + ${d7}^2 + ${d8}^2 + ${d9}^2 + ${d10}^2} = ${diameter}$`;
  }, [data]);

  return (
    <div className={style.details}>
      <Text variant="subheader-2" className={style.subtitle}>
        Расчёт диаметра коллектора
      </Text>
      <Text variant="code-1" className={style.block}>
        Расчёт диаметра коллектора основан на требовании, которое гласит,
        что площадь поперечного сечения корпуса распределительного коллектора
        должна быть не менее суммы площадей поперечных сечений отводящих
        трубопроводов, а сборного коллектора – не менее площадей подводящих
        трубопроводов.Следует помнить, что для коллекторов диаметром более
        чем 500 мм использование плоских накладных приварных заглушек - не
        допускается. В таких случаях используют эллиптические или плоские
        заглушки с приваренными рёбрами. Устанавливать коллектор следует с
        уклоном 0,002 в сторону спускного штуцера, а врезки подводящего
        трубопровода распределительного коллектора и отводящего трубопровода
        сборного коллектора следует предусматривать около неподвижной опоры.
        Также следует иметь ввиду, что нижняя врезка в коллектор
        не рекомендуется. ФОРМУЛА РАСЧЕТА: Dкол=2*√(D1^2/4+D2^2/4)
      </Text>
      <Text variant="code-1" className={style.block}>
        <Latex>{`${LATEX.formula.collectorCalculation}`}</Latex>
      </Text>
      <Text variant="code-1" className={style.block}>
        где <Latex>{'$d_1, d_2, \\ldots, d_{10}$'}</Latex> — диаметры присоединённых трубопроводов, мм
      </Text>
      <Text variant="subheader-2" className={style.subtitle}>
        {title}
      </Text>
      <div className={style.block}>
        <Latex>{formula}</Latex> мм
      </div>
    </div>
  );
}
