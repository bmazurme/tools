/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import heatConsumptionApi from '../index';

const heatConsumptionEndpoints = heatConsumptionApi
  .enhanceEndpoints({
    addTagTypes: ['HeatConsumption'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createHeatConsumptionItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: '/api/v1/heat-consumptions',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['HeatConsumption'],
      }),
      getHeatConsumptionItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `/api/v1/heat-consumptions/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['HeatConsumption'],
      }),
      getHeatConsumption: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `/api/v1/heat-consumptions/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['HeatConsumption'],
      }),
      updateHeatConsumption: builder.mutation<HeatConsumption, HeatConsumption>({
        query: (data: HeatConsumption) => ({
          url: `/api/v1/heat-consumptions/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['HeatConsumption'],
      }),
      getHeatConsumptionItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `/api/v1/heat-consumptions/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['HeatConsumption'],
      }),
    }),
  });

export const {
  useCreateHeatConsumptionItemMutation,
  useGetHeatConsumptionItemsMutation,
  useGetHeatConsumptionItemMutation,
  useGetHeatConsumptionMutation,
  useUpdateHeatConsumptionMutation,
} = heatConsumptionEndpoints;
export { heatConsumptionEndpoints };
