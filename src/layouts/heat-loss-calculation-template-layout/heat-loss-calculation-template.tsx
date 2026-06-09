/* eslint-disable react/jsx-one-expression-per-line */
import { useMemo } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';

import style from './heat-loss-calculation-template.module.css';

interface TemplateProps {
  data: HeatLossCalculation;
  title: string;
}

const METHODOLOGY = (
  <>
    <Text
      variant="subheader-2"
      className={style.subtitle}
    >
      Расчёт тепловых потерь участка трубопровода
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Расчет термических сопротивлений слоев участка трубопроводной сети.
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Расчет термического сопротивления от жидкости к трубе, <Latex>{`${LATEX.res}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Тепловой расчет трубопроводов системы ГВС приведен согласно СП 61.13330.
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Критерий Рейнольдса, безразмерный коэффициент, который характеризует
      гидродинамический режим потока при вынужденном движении и является мерой
      соотношения сил инерции и вязкого трения:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.Re}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      где <Latex>{`${LATEX.nu}`}</Latex> – кинематическая вязкость жидкости при заданной температуре, <Latex>$м^2$</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Критерий Нуссельта, характеризующий подобие процессов теплопереноса на
      границе между стенкой и потоком жидкости:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.Nu}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      где Pr – критерий Прандтля, который характеризует физико-химические свойства
      теплоносителя и является мерой подобия температурных и скоростных полей в потоке.
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Коэффициент теплопередачи от жидкости к стенке трубы
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.heatLossCalculation}`}</Latex>
    </Text>

    <Text
      variant="code-1"
      className={style.block}
    >
      где
      <Latex>{` ${LATEX.nusselt} `}</Latex>
      - число Нуссельта,
      <Latex>{` ${LATEX.lambda} `}</Latex>
      - коэф. теплопроводности теплоносителя, Вт/(м·°C),
      <Latex>{` ${LATEX.innerPipeDiameter} `}</Latex>
      - внутренний диаметр трубопровода, мм
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Термическое сопротивление от жидкости к трубе:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.Rvn}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Термическое сопротивление трубопровода:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.Rcl}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      где: <Latex>{'$R_{сл}$'}</Latex> – сумма термических сопротивлений промежуточных слоев, <Latex>{'$м^2\\times^\\circ\\text{C}/Вт$'}</Latex>,
      (термическое сопротивление трубопровода, термическое сопротивление воздушной
      прослойки между трубой и изоляцией, принимается равным по СП 50.13330.2012,
      термическое сопротивление слоя изоляции);
    </Text>

    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{'$D_{сл}$'}</Latex> – наружный диаметр слоя, м;
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{'$d_{сл}$'}</Latex> – внутренний диаметр слоя, м;
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{'$\\lambda_{сл}$'}</Latex> – коэффициент теплопроводности слоя, <Latex>{'$Вт/(м^2\\times^\\circ\\text{C})$'}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Термическое сопротивление изоляционного слоя, <Latex>{'$м^2\\times^\\circ\\text{C}/Вт$'}</Latex>:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.Rcl}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Термическое сопротивление изоляционного слоя, <Latex>{'$м^2\\times^\\circ\\text{C}/Вт$'}</Latex>:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.Rnar}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{'$\\alpha_{нар}$'}</Latex> – коэффициент теплопроводности покровного слоя, <Latex>{'$Вт/(м^2\\times^\\circ\\text{C})$'}</Latex>,
      определяется по расчету или по СП 61.13330.
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Линейный коэффициент теплопередачи, <Latex>{'$Вт/(м^2\\times^\\circ\\text{C})$'}</Latex>:
    </Text>

    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.k}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Теплопотери расчетного участка трубопровода, Вт:
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.Qhttr}`}</Latex>
    </Text>

    <Text
      variant="code-1"
      className={style.block}
    >
      где <Latex>{'$t^{в}$'}</Latex> – температура воздуха в помещении расположения трубопровода, <Latex>{'$^\\circ\\text{C}$'}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Расчет потери температуры в трубопроводе. Температура в начальном участке трубы
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      <Latex>{`${LATEX.formula.T2}`}</Latex>
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Т1 – начальная температура расчетного участка трубопровода, <Latex>{'$^\\circ\\text{C}$'}</Latex>;
    </Text>
    <Text
      variant="code-1"
      className={style.block}
    >
      Т2 – температура расчетного участка трубопровода на выходе, <Latex>{'$^\\circ\\text{C}$'}</Latex>.
    </Text>
  </>
);

export default function HeatLossCalculationTemplate({ data, title }: TemplateProps) {
  const reynoldsFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      velocity, innerPipeDiameter, viscosity, re,
    } = data;
    return `$Re=\\cfrac{${velocity} \\cdot ${innerPipeDiameter}}{${viscosity}} = ${re}$`;
  }, [data]);

  const nusseltFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const { re, pr, nu } = data;
    return `$Nu=0{,}021 \\cdot ${re}^{0{,}8} \\cdot ${pr}^{0{,}43} = ${nu}$`;
  }, [data]);

  const alphaFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      nu, lambda, innerPipeDiameter, alpha,
    } = data;
    return `$\\alpha=${nu} \\cdot \\cfrac{${lambda}}{${innerPipeDiameter / 1000}} = ${alpha} \\ Вт/(м^2\\times^\\circ\\text{C})$`;
  }, [data]);

  const rvnFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const { innerPipeDiameter, alpha, resistance1 } = data;
    return `$R_{\\text{вн}} = \\frac{1}{3{.}1415 \\cdot ${innerPipeDiameter / 1000} \\cdot ${alpha}} = ${resistance1}\\ \\text{м}^{2} \\cdot {}^\\circ\\text{C/Вт}$`;
  }, [data]);

  const pipeResistanceFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      innerPipeDiameter, outerPipeDiameter, koefPipe, resistance2,
    } = data;
    return `$R_{сл} = \\cfrac{1}{2 \\cdot 3{.}1415 \\cdot ${koefPipe}} \\cdot \\ln{\\cfrac{ ${outerPipeDiameter / 1000} }{ ${innerPipeDiameter / 1000} }} = ${resistance2} \\ \\text{м}^{2} \\cdot {}^\\circ\\text{C/Вт}$`;
  }, [data]);

  const insulationResistanceFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      outerPipeDiameter, koefInsulation, thickness, resistanceInsulation2,
    } = data;
    const insulationOuterDiameter = (+outerPipeDiameter + 2 * thickness) / 1000;
    return `$ R_{сл}=\\cfrac{1}{2 \\cdot 3{.}1415 \\cdot ${koefInsulation}} \\cdot \\ln{\\cfrac{${insulationOuterDiameter}}{${outerPipeDiameter / 1000}}} = ${resistanceInsulation2} \\ \\text{м}^{2} \\cdot {}^\\circ\\text{C/Вт}$`;
  }, [data]);

  const rnarFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      alphaNar, outerPipeDiameter, thickness, resistanceInsulation1,
    } = data;
    const insulationOuterDiameter = (+outerPipeDiameter + 2 * thickness) / 1000;
    return `$\\R_{нар}=\\cfrac{1}{3{.}1415 \\cdot ${insulationOuterDiameter} \\cdot ${alphaNar}} = ${resistanceInsulation1} \\ \\text{м}^{2} \\cdot {}^\\circ\\text{C/Вт}$`;
  }, [data]);

  const heatTransferCoefFormula = useMemo(() => {
    if (!data) {
      return '';
    }
    const {
      resistance1, resistance2, resistanceInsulation2, resistanceInsulation1, k,
    } = data;

    return `$k=\\cfrac{1}{${resistance1} + ${resistance2} + ${resistanceInsulation2} + ${resistanceInsulation1}} = ${k} \\ \\text{Вт/м}^{2}{}^\\circ \\text{C}$`;
  }, [data]);

  const heatLossFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      tStart, tOut, length, k, heatLoss,
    } = data;
    return `$Q_{тр}^{ht}=${k} \\cdot (${tStart} - ${tOut}) \\cdot ${length} = ${heatLoss} \\ \\text{кВт}$`;
  }, [data]);

  const endTemperatureFormula = useMemo(() => {
    if (!data) {
      return '';
    }

    const {
      flowRate, tStart, heatLoss, tEnd,
    } = data;
    return `$T_2=\\cfrac{3{,}6 \\cdot ${flowRate} \\cdot ${tStart} - ${heatLoss} \\cdot 0{,}86}{3{,}6 \\cdot ${flowRate}} = ${tEnd} \\ \\text{°C}$`;
  }, [data]);

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
        Критерий Рейнольдса:
      </Text>
      <div className={style.block}>
        <Latex>{reynoldsFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Критерий Нуссельта:
      </Text>
      <div className={style.block}>
        <Latex>{nusseltFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Коэффициент теплопередачи от жидкости к стенке трубы:
      </Text>
      <div className={style.block}>
        <Latex>{alphaFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Термическое сопротивление от жидкости к трубе:
      </Text>
      <div className={style.block}>
        <Latex>{rvnFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Термическое сопротивление трубопровода:
      </Text>
      <div className={style.block}>
        <Latex>{pipeResistanceFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Термическое сопротивление изоляционного слоя:
      </Text>
      <div className={style.block}>
        <Latex>{insulationResistanceFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Термическое сопротивление от наружной поверхности изоляции к воздуху:
      </Text>
      <div className={style.block}>
        <Latex>{rnarFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Линейный коэффициент теплопередачи:
      </Text>
      <div className={style.block}>
        <Latex>{heatTransferCoefFormula}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        Теплопотери расчетного участка трубопровода:
      </Text>
      <div className={style.block}>
        <Latex>{heatLossFormula}</Latex>
      </div>

      <Text
        variant="code-1"
        className={style.block}
      >
        Температура теплоносителя в конце расчетного участка:
      </Text>
      <div className={style.block}>
        <Latex>{endTemperatureFormula}</Latex>
      </div>
    </div>
  );
}
