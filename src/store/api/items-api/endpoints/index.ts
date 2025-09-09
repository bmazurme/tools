import itemsApi from '../index';

const itemsApiEndpoints = itemsApi
  .enhanceEndpoints({
    addTagTypes: ['Items'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createItem: builder.mutation<ItemType, { block: { id: number }, index: number }>({
        query: (data: { block: { id: number }, index: number }) => ({
          url: '/items',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Items'],
      }),
      updateItem: builder.mutation<ItemType, ItemType>({
        query: ({ column, ...data }: ItemType) => ({
          url: `/items/${data.id}`,
          method: 'PATCH',
          body: { ...data, block: { id: column } },
        }),
        invalidatesTags: ['Items'],
      }),
      deleteItem: builder.mutation<ItemType, number>({
        query: (id: number) => ({
          url: `/items/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Items'],
      }),
      refreshItems: builder.mutation<ItemType[], ItemType[]>({
        query: (data: ItemType[]) => ({
          url: '/items',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Items'],
      }),
      getItems: builder.mutation<ItemType[], number>({
        query: (id: number) => ({
          url: `/items/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Items'],
      }),
    }),
  });

export const {
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useRefreshItemsMutation,
  useGetItemsMutation,
} = itemsApiEndpoints;
export { itemsApiEndpoints };
