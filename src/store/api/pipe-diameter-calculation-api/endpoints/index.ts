/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import pipeDiameterCalculationApi from '../index';

const pipeDiameterCalculationEndpoints = pipeDiameterCalculationApi
  .enhanceEndpoints({
    addTagTypes: ['PipeDiameterCalculation'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createPipeDiameterCalculationItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: 'pipe-diameter-calculations',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['PipeDiameterCalculation'],
      }),
      getPipeDiameterCalculationItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `pipe-diameter-calculations/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['PipeDiameterCalculation'],
      }),
      getPipeDiameterCalculation: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `pipe-diameter-calculations/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['PipeDiameterCalculation'],
      }),
      updatePipeDiameterCalculation: builder.mutation<PipeDiameterCalculation, PipeDiameterCalculation>({
        query: (data: PipeDiameterCalculation) => ({
          url: `pipe-diameter-calculations/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['PipeDiameterCalculation'],
      }),
      getPipeDiameterCalculationItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `pipe-diameter-calculations/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['PipeDiameterCalculation'],
      }),
    }),
  });

export const {
  useCreatePipeDiameterCalculationItemMutation,
  useGetPipeDiameterCalculationItemMutation,
  useGetPipeDiameterCalculationItemsMutation,
  useGetPipeDiameterCalculationMutation,
  useUpdatePipeDiameterCalculationMutation,
} = pipeDiameterCalculationEndpoints;
export { pipeDiameterCalculationEndpoints };
