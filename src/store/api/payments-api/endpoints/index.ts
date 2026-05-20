import paymentsApi from '../index';

export type Subscriptions = {
  isActive: boolean;
  id: number | null;
};

const paymentsApiEndpoints = paymentsApi
  .enhanceEndpoints({
    addTagTypes: ['Payments'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      payments: builder.mutation<Subscriptions, void>({
        query: () => ({
          url: '/api/v1/payments',
          method: 'GET',
        }),
        invalidatesTags: ['Payments'],
      }),
    }),
  });

export const {
  usePaymentsMutation,
} = paymentsApiEndpoints;
export { paymentsApiEndpoints };
