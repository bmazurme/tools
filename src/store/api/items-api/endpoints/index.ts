import itemsApi from '../index';

const itemsApiEndpoints = itemsApi
  .enhanceEndpoints({
    addTagTypes: ['Items'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
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
  useUpdateItemMutation,
  useDeleteItemMutation,
  useRefreshItemsMutation,
  useGetItemsMutation,
} = itemsApiEndpoints;
export { itemsApiEndpoints };
