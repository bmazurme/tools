import rainRunoffsApi from '../index';

const rainRunoffsApiEndpoints = rainRunoffsApi
  .enhanceEndpoints({
    addTagTypes: ['RainRunoff'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createRainRunoffItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: '/rain-runoffs',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['RainRunoff'],
      }),
      updateRainRunoffs: builder.mutation<RainRunoff, RainRunoff>({
        query: (data: RainRunoff) => ({
          url: `/rain-runoffs/${data.id}`,
          method: 'PATCH',
          body: { ...data },
        }),
        invalidatesTags: ['RainRunoff'],
      }),
      getRainRunoffsItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `/rain-runoffs/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['RainRunoff'],
      }),
      getRainRunoffsItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `/rain-runoffs/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['RainRunoff'],
      }),
    }),
  });

export const {
  useCreateRainRunoffItemMutation,
  useUpdateRainRunoffsMutation,
  useGetRainRunoffsItemsMutation,
  useGetRainRunoffsItemMutation,
} = rainRunoffsApiEndpoints;
export { rainRunoffsApiEndpoints };
