type ProjectType = {
  id: number;
  name: string;
  description: string;
  address: string;
};

type ItemType = {
  id: number;
  name: string;
  column: number;
  index: number;
};

type BlockType = {
  id: number;
  name: string;
  items: ItemType[];
  index: number;
  document: number;
}

type BlocksType = BlockType[];

type RainFlowRoof = {
  areaRoof: number;
  areaFacade: number;
  n: number;
  q5: number;
  q20: number;
  slope: number;
  sumRoofArea: number;
  flow: number;
};

type UserType = {
  id: number;
  email: string;
  isActive: boolean;
  status: string;
  isDark: boolean;
  isCompact: boolean;
}
