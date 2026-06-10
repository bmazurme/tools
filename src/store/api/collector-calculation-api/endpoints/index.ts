/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import collectorCalculationApi from '../index';

const collectorCalculationEndpoints = collectorCalculationApi
  .enhanceEndpoints({
    addTagTypes: ['CollectorCalculation'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCollectorCalculationItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: 'collector-calculations',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['CollectorCalculation'],
      }),
      getCollectorCalculationItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `collector-calculations/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['CollectorCalculation'],
      }),
      getCollectorCalculation: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `collector-calculations/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['CollectorCalculation'],
      }),
      updateCollectorCalculation: builder.mutation<CollectorCalculation, CollectorCalculation>({
        query: (data: CollectorCalculation) => ({
          url: `collector-calculations/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['CollectorCalculation'],
      }),
      getCollectorCalculationItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `collector-calculations/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['CollectorCalculation'],
      }),
    }),
  });

export const {
  useCreateCollectorCalculationItemMutation,
  useGetCollectorCalculationItemMutation,
  useGetCollectorCalculationItemsMutation,
  useGetCollectorCalculationMutation,
  useUpdateCollectorCalculationMutation,
} = collectorCalculationEndpoints;
export { collectorCalculationEndpoints };
