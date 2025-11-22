type ProjectType = {
  id: number;
  name: string;
  description: string;
  address: string;
};

type BlockType = {
  id: number;
  name: string;
  index: number;
}

type BlocksType = BlockType[];

type RainFlowRoof = {
  id: number;
  areaRoof: number;
  areaFacade: number;
  n: number;
  q5: number;
  q20: number;
  slope: number;
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
  rainRoof?: RainFlowRoof;
  rainRunoff?: RainRunoff;
};
type RawBlockType = BlockType & { items: ItemType };

type UserType = {
  id: number;
  email: string;
  isActive: boolean;
  status: string;
  isDark: boolean;
  isCompact: boolean;
}

type TotalType = { total: number };
