/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import heatLossCalculationApi from '../index';

const heatLossCalculationEndpoints = heatLossCalculationApi
  .enhanceEndpoints({
    addTagTypes: ['HeatLossCalculation'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createHeatLossCalculationItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: 'heat-loss-calculations',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['HeatLossCalculation'],
      }),
      getHeatLossCalculationItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `heat-loss-calculations/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['HeatLossCalculation'],
      }),
      getHeatLossCalculation: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `heat-loss-calculations/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['HeatLossCalculation'],
      }),
      updateHeatLossCalculation: builder.mutation<HeatLossCalculation, HeatLossCalculation>({
        query: (data: HeatLossCalculation) => ({
          url: `heat-loss-calculations/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['HeatLossCalculation'],
      }),
      getHeatLossCalculationItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `heat-loss-calculations/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['HeatLossCalculation'],
      }),
    }),
  });

export const {
  useCreateHeatLossCalculationItemMutation,
  useGetHeatLossCalculationItemMutation,
  useGetHeatLossCalculationItemsMutation,
  useGetHeatLossCalculationMutation,
  useUpdateHeatLossCalculationMutation,
} = heatLossCalculationEndpoints;
export { heatLossCalculationEndpoints };
