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
    }),
  });

export const { useGetRainRoofsMutation } = rainRoofsApiEndpoints;
export { rainRoofsApiEndpoints };
