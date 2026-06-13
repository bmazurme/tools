/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import calculationMeterApi from '../index';

const calculationMeterEndpoints = calculationMeterApi
  .enhanceEndpoints({
    addTagTypes: ['CalculationMeter'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCalculationMeterItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: 'calculation-meters',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['CalculationMeter'],
      }),
      getCalculationMeterItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `calculation-meters/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['CalculationMeter'],
      }),
      getCalculationMeter: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `calculation-meters/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['CalculationMeter'],
      }),
      updateCalculationMeter: builder.mutation<CalculationMeter, CalculationMeter>({
        query: (data: CalculationMeter) => ({
          url: `calculation-meters/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['CalculationMeter'],
      }),
      getCalculationMeterItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `calculation-meters/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['CalculationMeter'],
      }),
    }),
  });

export const {
  useCreateCalculationMeterItemMutation,
  useGetCalculationMeterItemMutation,
  useGetCalculationMeterItemsMutation,
  useGetCalculationMeterMutation,
  useUpdateCalculationMeterMutation,
} = calculationMeterEndpoints;
export { calculationMeterEndpoints };
