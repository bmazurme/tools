type BlockType = {
  id: number;
  name: string;
  index: number;
}

type BlocksType = BlockType[];

type RainRoof = {
  id: number;
  areaRoof: number;
  areaFacade: number;
  n: number;
  q5: number;
  q20: number;
  sumRoofArea: number;
  flow: number;
};
type RainRunoff = {
  id: number;
  roof: number;
  stone: number;
  lawns: number;
  tracks: number;
  ground: number;
  pavements: number;
  cobblestone: number;
  area: number;
  intensity: number;
  lengthPipe: number;
  lengthTray: number;
  velocityPipe: number;
  velocityTray: number;
  timeInit: number;
  timePipe: number;
  timeTray: number;
  timeSum: number;
  flow: number;
  n: number;
  p: number;
  mr: number;
  gamma: number;
  a: number;
  zMid: number;
  place: { id: number; name: string; };
  condition: { id: number; name: string; };
};

type HeatConsumption = {
  id: number;
  th: number;
  tc: number;
  maxHotWaterPerHour: number;
  avgHotWaterPerHour: number;
  hwPipelineHeatLoss: number;
  meanHourlyHeatForHotWater: number;
  maxHourlyHeatForHotWater: number;
};

type ThrottlePlate = {
  id: number;
  flowRate: number;
  excessHead: number;
  diameter: number;
};

type PipeDiameterCalculation = {
  id: number;
  flowRate: number;
  velocity: number;
  diameter: number;
};

type HeatLossCalculation = {
  id: number;
  tIn: number;
  tOut: number;
  tStart: number;
  tEnd: number;
  flowRate: number;
  velocity: number;
  innerPipeDiameter: number;
  outerPipeDiameter: number;
  length: number;
  thickness: number;
  koefPipe: number;
  koefInsulation: number;
  viscosity: number;
  re: number;
  pr: number;
  nu: number;
  alpha: number;
  alphaNar: number;
  lambda: number;
  resistance1: number;
  resistance2: number;
  resistanceInsulation1: number;
  resistanceInsulation2: number;
  k: number;
  heatLoss: number;
};

type CollectorCalculation = {
  id: number;
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  d6: number;
  d7: number;
  d8: number;
  d9: number;
  d10: number;
  diameter: number;
};

type RainCondition = {
  id: number;
  name: string;
};

type RainPlace = {
  id: number;
  name: string;
  n: number;
  n1: number;
  mr: number;
  gamma: number;
};

type ItemType = {
  id: number;
  name: string;
  block: { id: number };
  index: number;
  rainRoof?: RainRoof;
  rainRunoff?: RainRunoff;
  heatConsumption?: HeatConsumption;
  throttlePlate?: ThrottlePlate;
  pipeDiameterCalculation?: PipeDiameterCalculation;
  heatLossCalculation?: HeatLossCalculation;
  collectorCalculation?: CollectorCalculation;
};
type RawBlockType = BlockType & { items: ItemType };

type UserType = {
  id: number;
  email: string;
  isActive: boolean;
  status: string;
  isDark: boolean;
  isCompact: boolean;
  subscription: number | null;
  roles: string[];
}

type TotalType = { total: number };

type ProjectStatus = {
  id: number;
  name: string;
  description?: string;
};

type ProjectType = {
  id: number;
  name: string;
  code: string;
  description: string;
  address: string;
  participants: UserType[];
  creator: { id: number };
  status?: ProjectStatus | null;
  updatedAt?: string;
  documents?: number;
};

type ModuleType = {
  id: number;
  name: string;
  description: string;
}
