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

type ProjectType = {
  id: number;
  name: string;
  description: string;
  address: string;
  participants: UserType[];
  creator: { id: number };
};
