import paymentsApi from '../index';

// export type Subscriptions = {
//   isActive: boolean;
// };

const paymentsApiEndpoints = paymentsApi
  .enhanceEndpoints({
    addTagTypes: ['Payments'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      payments: builder.mutation<void, void>({
        query: () => ({
          url: '/payments',
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
