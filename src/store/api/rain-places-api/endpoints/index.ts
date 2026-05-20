import rainPlacesApi from '../index';

const rainPlacesApiEndpoints = rainPlacesApi
  .enhanceEndpoints({
    addTagTypes: ['RainPlaces'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRainPlace: builder.mutation<RainPlace[], void>({
        query: () => ({
          url: '/api/v1/rain-places',
          method: 'GET',
        }),
        invalidatesTags: ['RainPlaces'],
      }),
    }),
  });

export const { useGetRainPlaceMutation } = rainPlacesApiEndpoints;
export { rainPlacesApiEndpoints };
