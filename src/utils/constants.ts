/* eslint-disable max-len */
export const NUMBER_PATTERN = /^-?\d+(\.\d+)?$/;
export const VELOCITY_RATE_PATTERN = /^(?:0\.[0-9][0-9]*|[1-9](?:\.[0-9]+)?|10(?:\.0+)?)$/;
export const INTENSITY_PATTERN = /^(?:0(?:\.[0-9]+)?|[1-9][0-9]?(?:\.[0-9]+)?|1[0-4][0-9](?:\.[0-9]+)?|150(?:\.0+)?)$/;
export const ZERO_TO_ONE_PATTERN = /^(?:0(?:\.[0-9]+)?|1(?:\.0+)?)$/;
// export const ZERO_TO_HUNDRED_PATTERN = /^(?:0*(?:[0-9]|[1-9][0-9]|100)(?:\.[0-9]+)?|100(?:\.0+)?)$/;
export const ZERO_TO_HUNDRED_PATTERN = /^(0|[1-9][0-9]?|100)$/;

// export const POSITIVE_NUMBER_PATTERN = /^[1-9]\d*(?:\.\d+)?$/;
export const POSITIVE_NUMBER_PATTERN = /^(?:0(?:\.\d*)?|[1-9]\d*(?:\.\d+)?)$/;

export const POSITIVE_1DP_PATTERN = /^(?:0(?:\.\d)?|[1-9]\d*(?:\.\d)?)$/;
export const POSITIVE_2DP_PATTERN = /^(?:0(?:\.\d{1,2})?|[1-9]\d*(?:\.\d{1,2})?)$/;
export const POSITIVE_3DP_PATTERN = /^(?:0(?:\.\d{1,3})?|[1-9]\d*(?:\.\d{1,3})?)$/;
export const POSITIVE_4DP_PATTERN = /^(?:0(?:\.\d{1,4})?|[1-9]\d*(?:\.\d{1,4})?)$/;
export const NUMBER_1DP_PATTERN = /^-?(?:0(?:\.\d)?|[1-9]\d*(?:\.\d)?)$/;

export const TEMPERATURE_PATTERN = /^(?:0(?:\.\d)?|[1-9]\d?(?:\.\d)?|100(?:\.0)?)$/;
export const STRICT_POSITIVE_1DP_PATTERN = /^(?!0*\.?0+$)(?:0(?:\.\d)?|[1-9]\d*(?:\.\d)?)$/;
export const STRICT_POSITIVE_2DP_PATTERN = /^(?!0*\.?0+$)(?:0(?:\.\d{1,2})?|[1-9]\d*(?:\.\d{1,2})?)$/;
export const STRICT_POSITIVE_3DP_PATTERN = /^(?!0*\.?0+$)(?:0(?:\.\d{1,3})?|[1-9]\d*(?:\.\d{1,3})?)$/;
export const STRICT_POSITIVE_4DP_PATTERN = /^(?!0*\.?0+$)(?:0(?:\.\d{1,4})?|[1-9]\d*(?:\.\d{1,4})?)$/;
export const STRICT_POSITIVE_NUMBER_PATTERN = /^(?!0*\.?0+$)(?:0(?:\.\d*)?|[1-9]\d*(?:\.\d+)?)$/;
export const OPTIONAL_STRICT_POSITIVE_6DP_PATTERN = /^$|^(?!0*\.?0+$)(?:0(?:\.\d{1,6})?|[1-9]\d*(?:\.\d{1,6})?)$/;
export const PRANDTL_PATTERN = /^(?:[1-9](?:\.\d{1,4})?|1[0-4](?:\.\d{1,4})?)$/;

export const { VITE_API_URL = 'http://localhost:3000/api/v1' } = import.meta.env;
export const { VITE_TOKEN = '2f47d503901842298d06b55c9ba625b4' } = import.meta.env;

export const LATEX = {
  q: '$q$',
  q5: '$q_{5}$',
  diameter: '$d_{0}$',
  q20: '$q_{20}$',
  n: '$n$',
  Qr: '$Q_{r}$',
  Q: '$Q$',
  A: '$A$',
  F: '$F$',
  P: '$P$',
  nu: '$\\nu$',
  Fh: '$F_{\\text{г}}$',
  Fv: '$F_{\\text{в}}$',
  tr: '$t_{r}$',
  Fr: '$F_{r}$',
  lcan: '$l_{can}$',
  lp: '$l_{p}$',
  vcan: '$v_{can}$',
  vp: '$v_{p}$',
  tcon: '$t_{con}$',
  Zmid: '$Z_{mid}$',
  Zi: '$Z_{i}$',
  mr: '$m_{r}$',
  gamma: '$\\gamma$',
  m2: '$\\text{м}^{2}$',
  tc: '$t^{c}$',
  th: '$t^{h}$',
  excessHead: '$h_{др}$',
  velocity: '$v$',
  pipeLength: '$l$',
  pipeDiameter: '$d$',
  innerPipeDiameter: '$d_{вн}$',
  outerPipeDiameter: '$d_{нар}$',
  tIn: '$t_{вх}$',
  tOut: '$t_{нар}$',
  tStart: '$t_{нач}$',
  tEnd: '$t_{кон}$',
  thickness: '$\\delta$',
  koefPipe: '$\\lambda_{тр}$',
  koefInsulation: '$\\lambda_{из}$',
  viscosity: '$\\nu$',
  lambda: '$\\lambda$',
  reynolds: '$Re$',
  prandtl: '$Pr$',
  nusselt: '$Nu$',
  alpha: '$\\alpha$',
  thermalResistance: '$R$',
  maxHotWaterPerHour: '$q_{hr}^h$',
  avgHotWaterPerHour: '$q_{T}^h$',
  hwPipelineHeatLoss: '$Q^{ht}$',
  meanHourlyHeatForHotWater: '$Q_h^{T}$',
  maxHourlyHeatForHotWater: '$Q_{hr}^{t}$',
  res: '$\\text{м}^{2}\\cdot ^\\circ\\text{C}/\\text{Вт}$',
  vtm2cvt: '$\\text{Вт}/(м^2\\cdot°C)',
  formula: {
    Qr: '$Q_{r}=\\cfrac{Z_{mid}\\cdot A^{1.2}\\cdot F}{t_r^{1.2n-0.1}}$',
    A: '$A=q_{20}\\cdot20^n\\left(1+\\cfrac{lgP}{lgm_r}\\right)^\\gamma$',
    tcon: '$t_p=0,017\\sum\\frac{l_p}{v_p}$',
    tcan: '$t_{can}=0,021\\sum\\frac{l_{can}}{v_{can}}$',
    tr: '$t_r=t_{con}+t_{can}+t_{p}$',
    Q: '$Q=\\cfrac{F\\cdot q_{5}}{10000}$',
    q5: '$q_5=4^n\\cdot q_{20}$',
    QhT: '$Q_{T}^{h}=1,16\\cdot q_{T}^h\\cdot\\left(t^h-t^c\\right)+Q^{ht}$',
    Qhhr: '$Q_{hr}^{h}=1,16\\cdot q_{hr}^h\\cdot\\left(t^h-t^c\\right)+Q^{ht}$',
    throttlePlate: '$\\Large d_0=\\sqrt[4]{\\frac{3,6q^2}{d_{др}}}$',
    pipeDiameterCalculation: '$\\Large d=\\sqrt{\\cfrac{4q}{\\pi \\cdot v}}$',
    heatLossCalculation: '$\\alpha = Nu \\cdot \\cfrac{\\lambda}{d}$',
    thermalResistance: '$\\Large R = \\cfrac{1}{\\alpha}$',
    Re: '$\\ Re = \\cfrac{v \\cdot d_{tr}}{\\nu}$',
    Nu: '$Nu= 0{,}021\\cdot\\text{Re}^{0{,}8}\\cdot\\text{Pr}^{0{,}43}$',
    T2: '$T_2=\\cfrac{3.6\\cdot q\\cdot T_1 - Q_{тр}^{ht}\\cdot0.86}{3.6\\cdot q}$',
    Qhttr: '$Q_{тр}^{ht}=k\\cdot(t^h - t^в)\\cdot l$',
    Rnar: '$R_{нар}=\\cfrac{1}{\\pi\\cdot D_{сл}\\cdot \\alpha_{др}}$',
    Rcl: '$R_{сл}=\\cfrac{1}{2\\cdot\\pi\\cdot \\lambda_{сл}} \\cdot ln(\\cfrac{D_{сл}}{d_{сл}})$',
    Rvn: '$R_{вн}=\\cfrac{1}{\\pi\\cdot d_{тр}\\cdot \\alpha_{вн}}$',
    k: '$k=\\cfrac{1}{R_{вн} + \\Sigma R_{сл} + R_{нар}}$',
    collectorCalculation: '$D_{\\text{к}} = \\sqrt{d_1^2 + d_2^2 + d_3^2 + d_4^2 + d_5^2 + d_6^2 + d_7^2 + d_8^2 + d_9^2 + d_{10}^2}$',
    calculationMeterPressureLoss: '$\\Delta H=S \\cdot q^2$',
  },
  collectorD1: '$d_1$',
  collectorD2: '$d_2$',
  collectorD3: '$d_3$',
  collectorD4: '$d_4$',
  collectorD5: '$d_5$',
  collectorD6: '$d_6$',
  collectorD7: '$d_7$',
  collectorD8: '$d_8$',
  collectorD9: '$d_9$',
  collectorD10: '$d_{10}$',
  collectorDiameter: '$D_{\\text{к}}$',
  meterDiameter: '$D_y$',
  resistance: '$S$',
  pressureLoss: '$\\Delta H$',
};
