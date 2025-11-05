import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { itemsApiEndpoints } from '../api/items-api/endpoints/index';
import { rainRoofsApiEndpoints } from '../api/rain-roofs-api/endpoints/index';
import { rainRunoffsApiEndpoints } from '../api/rain-runoffs-api/endpoints/index';
import { type RootState } from '..';

export type ItemsState = {
  data: {
    items: ItemType[];
  };
};

export const initialStateItems: ItemsState = {
  data: {
    items: [],
  },
};

const slice = createSlice({
  name: 'items',
  initialState: initialStateItems,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        itemsApiEndpoints.endpoints.getItems.matchFulfilled,
        (state, { payload }: PayloadAction<ItemType[]>) => ({
          ...state,
          data: { items: payload },
        }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.refreshItems.matchFulfilled,
        (state, { meta }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => {
              if (meta.arg.originalArgs.some((it) => it.id === x.id)) {
                const { index } = meta.arg.originalArgs.find((it) => it.id === x.id)!;
                return { ...x, index };
              }
              return x;
            }).sort((a, b) => a.index - b.index),
          },
        }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.updateItem.matchFulfilled,
        (state, { meta }) => ({
          ...state,
          data: {
            items: state.data.items
              .map((x) => (x.id === meta.arg.originalArgs.id ? { ...meta.arg.originalArgs } : x))
              .sort((a, b) => a.index - b.index),
          },
        }),
      )
      .addMatcher(
        rainRoofsApiEndpoints.endpoints.updateRainRoofs.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.rainRoof!.id === payload.id
              ? { ...x, rainRoof: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        rainRunoffsApiEndpoints.endpoints.updateRainRunoffs.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.rainRunoff!.id === payload.id
              ? { ...x, rainRunoff: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.deleteItem.matchFulfilled,
        (state, { meta }) => ({
          ...state,
          data: { items: state.data.items.filter((x) => x.id !== meta.arg.originalArgs) },
        }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.createItem.matchFulfilled,
        (state, { payload }: PayloadAction<ItemType>) => ({
          ...state,
          data: { items: [...state.data.items, payload] },
        }),
      );
  },
});

export default slice.reducer;
export const itemsSelector = (state: RootState) => state.items.data;
