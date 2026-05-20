import subscriptionsApi from '../index';

type Subscriptions = {
  isActive: boolean;
  id: number;
};

const subscriptionsApiEndpoints = subscriptionsApi
  .enhanceEndpoints({
    addTagTypes: ['Subscriptions'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getStatus: builder.mutation<Subscriptions, void>({
        query: () => ({
          url: '/api/v1/subscriptions/status',
          method: 'GET',
        }),
        invalidatesTags: ['Subscriptions'],
      }),
      renew: builder.mutation<void, { id: number }>({
        query: ({ id }) => ({
          url: `/api/v1/subscriptions/${id}/renew`,
          method: 'POST',
        }),
        invalidatesTags: ['Subscriptions'],
      }),
    }),
  });

export const {
  useGetStatusMutation,
  useRenewMutation,
} = subscriptionsApiEndpoints;
export { subscriptionsApiEndpoints };
