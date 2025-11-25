import { useEffect, useState } from 'react';
import { Text } from '@gravity-ui/uikit';
import Latex from 'react-latex-next';

import { LATEX } from '../../utils/constants';

import style from './rain-runoff-template.module.css';

interface TemplateProps {
  data: RainRunoff;
  title: string;
}

export default function RainRunoffTemplate({ data, title }: TemplateProps) {
  const [sumArea, setSumArea] = useState('');
  const [formulaA, setFormulaA] = useState('');
  const [formulaTr, setFormulaTr] = useState('');
  const [formulaQr, setFormulaQr] = useState('');
  const [formulaTcan, setFormulaTcan] = useState('');
  const [formulaTcon, setFormulaTcon] = useState('');
  const [formulaZmid, setFormulaZmid] = useState('');

  useEffect(() => {
    if (data) {
      const {
        roof, stone, lawns, tracks, ground, pavements, cobblestone, area, zMid, flow,
        lengthPipe, velocityPipe, lengthTray, velocityTray,
        intensity, n, p, mr, gamma, a, timeInit, timePipe, timeTray, timeSum,
      } = data;

      // Форматирование суммы площадей
      setSumArea(`$F=${roof}+${stone}+${lawns}+${tracks}+${ground}+${pavements}+${cobblestone}=${area}\\space\\text{га}$`);

      // Формула для A
      setFormulaA(`$A=${intensity}\\cdot20^{${n}}\\left(1+\\cfrac{lg${p}}{lg${mr}}\\right)^{${gamma}}=${a}$`);

      // Формула для Qr
      setFormulaQr(`$Q_{r}=\\cfrac{${zMid}\\cdot ${a}^{1.2}\\cdot ${area}}{${timeSum}^{1.2\\cdot${n}-0.1}}=${flow}\\space\\text{л/с}$`);

      // Формула для tr
      setFormulaTr(`$t_r=${timeInit}+${timeTray}+${timePipe}=${timeSum}\\space\\text{мин}$`);

      // Формула для t_can
      setFormulaTcan(`$t_{can}=0,021\\sum\\frac{${lengthTray}}{${velocityTray}}=${timeTray}\\space\\text{мин}$`);

      // Формула для t_p
      setFormulaTcon(`$t_p=0,017\\sum\\frac{${lengthPipe}}{${velocityPipe}}=${timePipe}\\space\\text{мин}$`);

      // Формула для Z_mid
      setFormulaZmid(`$Z_{mid}=\\cfrac{0.224\\cdot${pavements}+0.145\\cdot${cobblestone}+0.125\\cdot${stone}+0.09\\cdot${tracks}+0.064\\cdot${ground}+0.038\\cdot${lawns}}{${area}}=${zMid}$`);

      // PAVEMENTS: 0.224, // брусчатые мостовые и чёрные щебёночные покрытия дорог
      // COBBLESTONE: 0.145, // Булыжные мостовые
      // STONE: 0.125, // Щебёночные покрытия, не обработанные вяжущими
      // TRACKS: 0.09, // Гравийные садово-парковые дорожки
      // GROUND: 0.064, // Грунтовые поверхности (спланированные)
      // LAWNS: 0.038, // Газоны
    }
  }, [data]);

  return (
    <div className={style.details}>
      <Text
        variant="subheader-2"
        className={style.title}
      >
        Определение расчетных расходов дождевых и талых вод в коллекторах сетей
        поверхностного водоотведения (СП 32.13330.2018)
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        При гидравлическом расчете сетей водоотведения поверхностных сточных вод расходы в
        сетях водоотведения, л/с, отводящих сточные воды с селитебных территорий
        и площадок предприятий, следует определять методом предельных интенсивностей по формуле
      </Text>
      <div className={style.block}>
        <Latex>{LATEX.formula.Qr}</Latex>
      </div>
      <Text
        variant="code-1"
        className={style.block}
      >
        где
        <Latex>
          {` ${LATEX.A}, ${LATEX.n} `}
        </Latex>
        — параметры, характеризующие соответственно интенсивность
        и продолжительность дождя для конкретной местности
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{`${LATEX.Zmid} `}</Latex>
        — среднее значение коэффициента покрова, характеризующего поверхность бассейна стока,
        определяемое как средневзвешенное значение в зависимости от значений коэффициентов
        <Latex>{` ${LATEX.Zi} `}</Latex>
        для различных видов поверхности водосбора, по таблицам 13 и 14
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{` ${LATEX.F} `}</Latex>
        — расчетная площадь стока, га
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{` ${LATEX.tr} `}</Latex>
        — расчетная продолжительность дождя, равная продолжительности протекания дождевых
        вод по поверхности и трубам до расчетного участка (определяется в соответствии с 7.4.5).
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        Параметры
        <Latex>{` ${LATEX.A} и ${LATEX.n} `}</Latex>
        определяются по результатам обработки многолетних записей самопишущих
        дождемеров местных метеорологических станций или по данным территориальных управлений
        Гидрометеослужбы. При отсутствии обработанных данных параметр А допускается определять
        по формуле
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{LATEX.formula.A}</Latex>
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        где
        <Latex>{` ${LATEX.q20} `}</Latex>
        — интенсивность дождя для данной местности продолжительностью 20 мин при Р = 1 год
        (определяют по рисунку А.1 приложения А);
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{`${LATEX.n} `}</Latex>
        — показатель степени, определяемый по таблице 8;
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{`${LATEX.mr} `}</Latex>
        — среднее количество дождей за год, принимаемое по таблице 8;
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{`${LATEX.P} `}</Latex>
        — период однократного превышения расчетной интенсивности дождя, годы;
      </Text>
      <Text
        variant="code-1"
        className={style.block}
      >
        <Latex>{`${LATEX.gamma} `}</Latex>
        — показатель степени, принимаемый по таблице 8.
      </Text>
      <Text
        variant="subheader-2"
        className={style.subtitle}
      >
        {title}
      </Text>
      <div className={style.block}>
        <Latex>{sumArea}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{formulaZmid}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{formulaA}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{LATEX.formula.tcon}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{formulaTcon}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{LATEX.formula.tcan}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{formulaTcan}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{LATEX.formula.tr}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{formulaTr}</Latex>
      </div>
      <div className={style.block}>
        <Latex>{formulaQr}</Latex>
      </div>
    </div>
  );
}
