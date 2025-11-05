import rainRunoffsApi from '../index';

const rainRunoffsApiEndpoints = rainRunoffsApi
  .enhanceEndpoints({
    addTagTypes: ['RainRunoff'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
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

export const { useUpdateRainRunoffsMutation } = rainRunoffsApiEndpoints;
export { rainRunoffsApiEndpoints };
