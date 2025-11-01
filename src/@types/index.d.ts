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

type ItemType = {
  id: number;
  name: string;
  column: number;
  index: number;
  rainRoof?: RainFlowRoof;
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
