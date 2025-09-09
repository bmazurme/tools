// import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// import type { RootState } from '..';

// type BlocksState = {
//   data: {
//     blocks: BlockType[];
//   };
// };

// export const initialRainRunoffsStateBlock: BlocksState = {
//   data: {
//     blocks: [
//       {
//         id: 0,
//         name: 'Block_1',
//         // items: [],
//         index: 0,
//         // document: 0,
//       },
//     ],
//   },
// };

// const slice = createSlice({
//   name: 'rain-runoffs',
//   initialState: initialRainRunoffsStateBlock,
//   reducers: {
//     addRainRunoffBlock: (
//       state,
//       // eslint-disable-next-line no-empty-pattern
//       { },
//     ) => {
//       // Создаем новый блок с необходимыми полями
//       const newBlock: BlockType = {
//         id: state.data.blocks.length,
//         name: `Block_${state.data.blocks.length + 1}`,
//         // items: [],
//         index: state.data.blocks.length, // Добавляем обязательное поле index
//         // document: 0, // Добавляем обязательное поле document
//       };

//       // Модифицируем состояние напрямую через Immer
//       state.data.blocks.push(newBlock);
//     },
//     //   ({
//     //   ...state,
//     //   data: {
//     //     blocks: [
//     //       ...state.data.blocks,
//     //       {
//     //         id: state.data.blocks.length,
//     //         name: `Block_${state.data.blocks.length + 1}`,
//     //         items: [],
//     //       },
//     //     ],
//     //   },
//     // }),
//     addRainRunoffItem: (
//       state,
//       { payload: { blockId } }: PayloadAction<{ blockId: number }>,
//     ) => {
//       const nextId = state.data.blocks.reduce((a, x) => {
//         const m = x.items.length > 0 ? Math.max(...x.items.map((obj) => obj.id)) : 0;
//         return a > m ? a : m + 1;
//       }, 0);

//       return {
//         ...state,
//         data: {
//           blocks: state.data.blocks.map((block) => (blockId === block.id
//             ? {
//               ...block,
//               // items: [...block.items, {
//               //   id: nextId, name: 'item', column: blockId, index: block.items.length,
//               // }],
//             }
//             : block)),
//         },
//       };
//     },
//     refreshRainRunoffItems: (
//       state,
//       {
//         payload: { dragIndex, hoverIndex, item },
//       }: PayloadAction<{ dragIndex: number; hoverIndex: number; item: ItemType }>,
//     ) => {
//       const blocks = state.data.blocks.map((b) => {
//         if (b.id === item.column) {
//           const dragItem = b.items.find((x: ItemType) => x.id === item.id);
//           // eslint-disable-next-line no-param-reassign
//           dragIndex = b.items.findIndex((x: ItemType) => x.id === item.id);

//           if (dragItem) {
//             const newItems = [...b.items];
//             const [movedItem] = newItems.splice(dragIndex, 1);
//             newItems.splice(hoverIndex, 0, movedItem);

//             return { ...b, items: newItems.map((x, i) => ({ ...x, index: i })) };
//           }
//           return b;
//         }
//         return b;
//       });

//       return { ...state, data: { blocks } };
//     },
//     movedRainRunoffBlock: (
//       state,
//       { payload: { hoverIndex, dragIndex, dragItem } },
//     ) => {
//       const coppiedStateArray = [...state.data.blocks];
//       const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
//       coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

//       return {
//         ...state,
//         data: { blocks: coppiedStateArray.map((item, i) => ({ ...item, index: i })) },
//       };
//     },
//     removeRainRunoffBlock: (
//       state,
//       { payload: { blockId } },
//     ) => ({
//       ...state,
//       data: { blocks: state.data.blocks.filter((block) => block.id !== blockId) },
//     }),
//     removeRainRunoffItem: (
//       state,
//       { payload: { id, column } }: PayloadAction<ItemType>,
//     ) => ({
//       ...state,
//       data: {
//         blocks: state.data.blocks.map((block) => (column === block.id
//           ? {
//             ...block,
//             // items: block.items.filter((x) => x.id !== id)
//           }
//           : block)),
//       },
//     }),
//     changeRainRunoffItemColumn: (
//       state,
//       {
//         payload: { blockId, itemId, targetBlockId },
//       }: PayloadAction<{ blockId: number; itemId: number; targetBlockId: number }>,
//     ) => {
//       const current = [...state.data.blocks]
//         .find((b) => b.id === blockId)!.items.find((it) => it.id === itemId)!;

//       const blocks: BlockType[] = [...state.data.blocks].map((block) => {
//         if (block.id === blockId) {
//           return { ...block, items: block.items.filter((it) => it.id !== current.id) };
//         } if (block.id === targetBlockId) {
//           return { ...block, items: [...block.items, { ...current, column: block.id }] };
//         }
//         return block;
//       });

//       return { ...state, data: { blocks } };
//     },
//   },
// });

// export const {
//   addRainRunoffBlock,
//   refreshRainRunoffItems,
//   removeRainRunoffItem,
//   removeRainRunoffBlock,
//   addRainRunoffItem,
//   movedRainRunoffBlock,
//   changeRainRunoffItemColumn,
// } = slice.actions;

// export default slice.reducer;
// export const rainRunoffsSelector = (state: RootState) => state.rainRunoffs.data;
