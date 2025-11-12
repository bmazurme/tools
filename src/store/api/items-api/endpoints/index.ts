import itemsApi from '../index';

const itemsApiEndpoints = itemsApi
  .enhanceEndpoints({
    addTagTypes: ['Items'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      updateItem: builder.mutation<ItemType[], ItemType>({
        query: ({
          block, id, index, name,
        }: ItemType) => ({
          url: `/items/${id}`,
          method: 'PATCH',
          body: {
            id, index, name, block: { id: block.id },
          },
        }),
        invalidatesTags: ['Items'],
      }),
      deleteItem: builder.mutation<ItemType[], number>({
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
    }),
  });

export const {
  useUpdateItemMutation,
  useDeleteItemMutation,
  useRefreshItemsMutation,
} = itemsApiEndpoints;
export { itemsApiEndpoints };
