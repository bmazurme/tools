import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type BlocksState = {
  data: {
    blocks: BlockType[];
  };
};

export const initialStateRainRoofsBlock: BlocksState = {
  data: {
    blocks: [
      {
        id: 0,
        name: 'Block_1',
        items: [
          {
            id: 0,
            name: 'item',
            column: 0,
            index: 0,
          },
        ],
      },
      {
        id: 1,
        name: 'Block_2',
        items: [],
      },
    ],
  },
};

const slice = createSlice({
  name: 'rain-roofs',
  initialState: initialStateRainRoofsBlock,
  reducers: {
    addRainRoofBlock: (
      state,
      // eslint-disable-next-line no-empty-pattern
      { },
    ) => ({
      ...state,
      data: {
        blocks: [
          ...state.data.blocks,
          {
            id: state.data.blocks.length,
            name: `Block_${state.data.blocks.length + 1}`,
            items: [],
          },
        ],
      },
    }),
    addRainRoofItem: (
      state,
      { payload: { blockId } }: PayloadAction<{ blockId: number }>,
    ) => {
      const nextId = state.data.blocks.reduce((a, x) => {
        const m = x.items.length > 0 ? Math.max(...x.items.map((obj) => obj.id)) : 0;
        return a > m ? a : m + 1;
      }, 0);

      return {
        ...state,
        data: {
          blocks: state.data.blocks.map((block) => (blockId === block.id
            ? {
              ...block,
              items: [...block.items, {
                id: nextId, name: 'item', column: blockId, index: block.items.length,
              }],
            }
            : block)),
        },
      };
    },
    removeRainRoofItem: (
      state,
      { payload: { id, column } }: PayloadAction<ItemType>,
    ) => ({
      ...state,
      data: {
        blocks: state.data.blocks.map((block) => (column === block.id
          ? { ...block, items: block.items.filter((x) => x.id !== id) }
          : block)),
      },
    }),
    refreshRainRoofItems: (
      state,
      {
        payload: { dragIndex, hoverIndex, item },
      }: PayloadAction<{ dragIndex: number; hoverIndex: number; item: ItemType }>,
    ) => {
      const blocks = state.data.blocks.map((b) => {
        if (b.id === item.column) {
          const dragItem = b.items.find((x: ItemType) => x.id === item.id);
          // eslint-disable-next-line no-param-reassign
          dragIndex = b.items.findIndex((x: ItemType) => x.id === item.id);

          if (dragItem) {
            const newItems = [...b.items];
            const [movedItem] = newItems.splice(dragIndex, 1);
            newItems.splice(hoverIndex, 0, movedItem);

            return { ...b, items: newItems.map((x, i) => ({ ...x, index: i })) };
          }
          return b;
        }
        return b;
      });

      return { ...state, data: { blocks } };
    },
    movedRainRoofBlock: (
      state,
      { payload: { hoverIndex, dragIndex, dragItem } },
    ) => {
      const coppiedStateArray = [...state.data.blocks];
      const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
      coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

      return {
        ...state,
        data: { blocks: coppiedStateArray.map((item, i) => ({ ...item, index: i })) },
      };
    },
    removeRainRoofBlock: (
      state,
      { payload: { blockId } },
    ) => ({
      ...state, data: { blocks: state.data.blocks.filter((block) => block.id !== blockId) },
    }),
    changeRainRoofItemColumn: (
      state,
      {
        payload: { blockId, itemId, targetBlockId },
      }: PayloadAction<{ blockId: number; itemId: number; targetBlockId: number }>,
    ) => {
      const current = [...state.data.blocks]
        .find((b) => b.id === blockId)!.items.find((it) => it.id === itemId)!;

      const blocks: BlockType[] = [...state.data.blocks].map((block) => {
        if (block.id === blockId) {
          return { ...block, items: block.items.filter((it) => it.id !== current.id) };
        } if (block.id === targetBlockId) {
          return { ...block, items: [...block.items, { ...current, column: block.id }] };
        }
        return block;
      });

      return { ...state, data: { blocks } };
    },
  },
});

export const {
  addRainRoofBlock,
  movedRainRoofBlock,
  changeRainRoofItemColumn,
  removeRainRoofBlock,
  addRainRoofItem,
  removeRainRoofItem,
  refreshRainRoofItems,
} = slice.actions;

export default slice.reducer;
export const rainRoofsSelector = (state: RootState) => state.rainRoofs.data;
