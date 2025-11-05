import rainConditionsApi from '../index';

const rainConditionsApiEndpoints = rainConditionsApi
  .enhanceEndpoints({
    addTagTypes: ['RainConditions'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRainConditions: builder.mutation<RainCondition[], void>({
        query: () => ({
          url: '/rain-conditions',
          method: 'GET',
        }),
        invalidatesTags: ['RainConditions'],
      }),
    }),
  });

export const { useGetRainConditionsMutation } = rainConditionsApiEndpoints;
export { rainConditionsApiEndpoints };
