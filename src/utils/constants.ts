/* eslint-disable max-len */
export const NUMBER_PATTERN = /^-?\d+(\.\d+)?$/;
export const VELOCITY_RATE_PATTERN = /^(?:0\.[0-9][0-9]*|[1-9](?:\.[0-9]+)?|10(?:\.0+)?)$/;
export const INTENSITY_PATTERN = /^(?:0(?:\.[0-9]+)?|[1-9][0-9]?(?:\.[0-9]+)?|1[0-4][0-9](?:\.[0-9]+)?|150(?:\.0+)?)$/;
export const ZERO_TO_ONE_PATTERN = /^(?:0(?:\.[0-9]+)?|1(?:\.0+)?)$/;
// export const ZERO_TO_HUNDRED_PATTERN = /^(?:0*(?:[0-9]|[1-9][0-9]|100)(?:\.[0-9]+)?|100(?:\.0+)?)$/;
export const ZERO_TO_HUNDRED_PATTERN = /^(0|[1-9][0-9]?|100)$/;

// export const POSITIVE_NUMBER_PATTERN = /^[1-9]\d*(?:\.\d+)?$/;
export const POSITIVE_NUMBER_PATTERN = /^(?:0(?:\.\d*)?|[1-9]\d*(?:\.\d+)?)$/;

export const { VITE_API_URL = 'http://localhost:3000' } = import.meta.env;
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
  maxHotWaterPerHour: '$q_{hr}^h$',
  avgHotWaterPerHour: '$q_{T}^h$',
  hwPipelineHeatLoss: '$Q^{ht}$',
  meanHourlyHeatForHotWater: '$Q_h^{T}$',
  maxHourlyHeatForHotWater: '$Q_{hr}^{t}$',
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
  },
};
