import rainRoofsApi from '../index';

const rainRoofsApiEndpoints = rainRoofsApi
  .enhanceEndpoints({
    addTagTypes: ['RainRoofs'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRainRoofs: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `/rain-roofs/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['RainRoofs'],
      }),
      createRainRoofItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: '/rain-roofs',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['RainRoofs'],
      }),
      updateRainRoofs: builder.mutation<RainFlowRoof, RainFlowRoof>({
        query: (data: RainFlowRoof) => ({
          url: `/rain-roofs/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['RainRoofs'],
      }),

      getRainRoofItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `/rain-roofs/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['RainRoofs'],
      }),
    }),
  });

export const {
  useCreateRainRoofItemMutation, useGetRainRoofsMutation, useUpdateRainRoofsMutation,
  useGetRainRoofItemsMutation,
} = rainRoofsApiEndpoints;
export { rainRoofsApiEndpoints };
