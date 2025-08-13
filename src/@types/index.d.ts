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
}

type BlocksType = BlockType[];
