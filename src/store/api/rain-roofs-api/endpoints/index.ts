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

      updateRainRoofs: builder.mutation<RainFlowRoof, RainFlowRoof>({
        query: (data: RainFlowRoof) => ({
          url: `/rain-roofs/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['RainRoofs'],
      }),
    }),
  });

export const { useGetRainRoofsMutation, useUpdateRainRoofsMutation } = rainRoofsApiEndpoints;
export { rainRoofsApiEndpoints };
