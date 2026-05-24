/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import throttlePlateApi from '../index';

const throttlePlateEndpoints = throttlePlateApi
  .enhanceEndpoints({
    addTagTypes: ['ThrottlePlate'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createThrottlePlateItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: 'throttle-plates',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['ThrottlePlate'],
      }),
      getThrottlePlateItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `throttle-plates/document/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['ThrottlePlate'],
      }),
      getThrottlePlate: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `throttle-plates/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['ThrottlePlate'],
      }),
      updateThrottlePlate: builder.mutation<ThrottlePlate, ThrottlePlate>({
        query: (data: ThrottlePlate) => ({
          url: `throttle-plates/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['ThrottlePlate'],
      }),
      getThrottlePlateItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `throttle-plates/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['ThrottlePlate'],
      }),
    }),
  });

export const {
  useCreateThrottlePlateItemMutation,
  useGetThrottlePlateItemMutation,
  useGetThrottlePlateItemsMutation,
  useGetThrottlePlateMutation,
  useUpdateThrottlePlateMutation,
} = throttlePlateEndpoints;
export { throttlePlateEndpoints };
