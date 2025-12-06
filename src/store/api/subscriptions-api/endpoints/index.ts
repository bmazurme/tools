import subscriptionsApi from '../index';

export type Subscriptions = {
  isActive: boolean;
};

const subscriptionsApiEndpoints = subscriptionsApi
  .enhanceEndpoints({
    addTagTypes: ['Subscriptions'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getStatus: builder.mutation<Subscriptions, void>({
        query: () => ({
          url: '/subscriptions/status',
          method: 'GET',
        }),
        invalidatesTags: ['Subscriptions'],
      }),
    }),
  });

export const {
  useGetStatusMutation,
} = subscriptionsApiEndpoints;
export { subscriptionsApiEndpoints };
