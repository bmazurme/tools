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
      updateRainRoofs: builder.mutation<RainRoof, RainRoof>({
        query: (data: RainRoof) => ({
          url: `/rain-roofs/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['RainRoofs'],
      }),

      getRainRoofsItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `/rain-roofs/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['RainRoofs'],
      }),
      getRainRoofsItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `/rain-roofs/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['RainRoofs'],
      }),
    }),
  });

export const {
  useCreateRainRoofItemMutation,
  useGetRainRoofsMutation,
  useUpdateRainRoofsMutation,
  useGetRainRoofsItemsMutation,
  useGetRainRoofsItemMutation,
} = rainRoofsApiEndpoints;
export { rainRoofsApiEndpoints };
