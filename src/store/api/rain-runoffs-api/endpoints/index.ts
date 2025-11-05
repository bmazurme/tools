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
    }),
  });

export const {
  useCreateRainRunoffItemMutation, useUpdateRainRunoffsMutation,
} = rainRunoffsApiEndpoints;
export { rainRunoffsApiEndpoints };
