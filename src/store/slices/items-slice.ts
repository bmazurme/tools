/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { itemsApiEndpoints } from '../api/items-api/endpoints/index';
import { rainRoofsApiEndpoints } from '../api/rain-roofs-api/endpoints/index';
import { rainRunoffsApiEndpoints } from '../api/rain-runoffs-api/endpoints/index';
import { heatConsumptionEndpoints } from '../api/heat-consumption-api/endpoints/index';
import { throttlePlateEndpoints } from '../api/throttle-plate-api/endpoints/index';
import { pipeDiameterCalculationEndpoints } from '../api/pipe-diameter-calculation-api/endpoints/index';
import { heatLossCalculationEndpoints } from '../api/heat-loss-calculation-api/endpoints/index';
import { collectorCalculationEndpoints } from '../api/collector-calculation-api/endpoints/index';
import { calculationMeterEndpoints } from '../api/calculation-meter-api/endpoints/index';

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

const itemsSlice = createSlice({
  name: 'items',
  initialState: initialStateItems,
  reducers: {
    setItems: (
      state,
      { payload }: PayloadAction<{ items: ItemType[] }>,
    ) => {
      state.data.items = payload.items;
    },
    setItem: (
      state,
      { payload }: PayloadAction<{ item: ItemType }>,
    ) => {
      state.data.items.push(payload.item);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addMatcher(
      //   rainRunoffsApiEndpoints.endpoints.getRainRunoffsItems.matchFulfilled,
      //   (state, { payload }: PayloadAction<ItemType[]>) => ({
      //     ...state,
      //     data: { items: payload },
      //   }),
      // )
      // .addMatcher(
      //   rainRoofsApiEndpoints.endpoints.getRainRoofsItems.matchFulfilled,
      //   (state, { payload }: PayloadAction<ItemType[]>) => ({
      //     ...state,
      //     data: { items: payload },
      //   }),
      // )
      .addMatcher(
        itemsApiEndpoints.endpoints.updateItem.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => {
              const item = payload.find((p) => p.id === x.id);
              return {
                ...x,
                name: item?.name ?? x.name,
                index: item?.index ?? x.index,
                block: { id: item?.block.id ?? x.block.id },
              };
            }).sort((a, b) => a.index - b.index),
          },
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
        heatConsumptionEndpoints.endpoints.updateHeatConsumption.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.heatConsumption!.id === payload.id
              ? { ...x, heatConsumption: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        throttlePlateEndpoints.endpoints.updateThrottlePlate.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.throttlePlate!.id === payload.id
              ? { ...x, throttlePlate: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        pipeDiameterCalculationEndpoints.endpoints.updatePipeDiameterCalculation.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.pipeDiameterCalculation!.id === payload.id
              ? { ...x, pipeDiameterCalculation: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        heatLossCalculationEndpoints.endpoints.updateHeatLossCalculation.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.heatLossCalculation!.id === payload.id
              ? { ...x, heatLossCalculation: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        collectorCalculationEndpoints.endpoints.updateCollectorCalculation.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.collectorCalculation!.id === payload.id
              ? { ...x, collectorCalculation: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        calculationMeterEndpoints.endpoints.updateCalculationMeter.matchFulfilled,
        (state, { payload }) => ({
          ...state,
          data: {
            items: state.data.items.map((x) => (x.calculationMeter!.id === payload.id
              ? { ...x, calculationMeter: payload }
              : x)),
          },
        }),
      )
      .addMatcher(
        itemsApiEndpoints.endpoints.deleteItem.matchFulfilled,
        (state, { meta, payload }) => ({
          ...state,
          data: {
            items: state.data.items
              .filter((x) => x.id !== meta.arg.originalArgs)
              .map((x) => {
                const item = payload.find((p) => p.id === x.id);
                return item ? { ...x, index: item.index } : x;
              }),
          },
          // data: { items: state.data.items.map },
        }),
      )
      // .addMatcher(
      //   itemsApiEndpoints.endpoints.createItem.matchFulfilled,
      //   (state, { payload }: PayloadAction<ItemType>) => ({
      //     ...state,
      //     data: { items: [...state.data.items, payload] },
      //   }),
      // )
      // rainRoofsApiEndpoints
      .addMatcher(
        rainRoofsApiEndpoints.endpoints.createRainRoofItem.matchFulfilled,
        (state, { payload }: PayloadAction<ItemType>) => ({
          ...state,
          data: { items: [...state.data.items, payload] },
        }),
      )
      .addMatcher(
        rainRunoffsApiEndpoints.endpoints.createRainRunoffItem.matchFulfilled,
        (state, { payload }: PayloadAction<ItemType>) => ({
          ...state,
          data: { items: [...state.data.items, payload] },
        }),
      );
  },
});

export const {
  setItems, setItem,
} = itemsSlice.actions;
export default itemsSlice.reducer;
export const itemsSelector = (state: RootState) => state.items.data;
