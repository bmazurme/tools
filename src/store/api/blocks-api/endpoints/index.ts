import blocksApi from '../index';

const blocksApiEndpoints = blocksApi
  .enhanceEndpoints({
    addTagTypes: ['Blocks'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createBlock: builder.mutation<BlockType, { document: { id: number }, index: number }>({
        query: (data: { document: { id: number }, index: number }) => ({
          url: 'api/v1/blocks',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Blocks'],
      }),
      updateBlock: builder.mutation<BlockType, BlockType>({
        query: ({ id, index, name }: BlockType) => ({
          url: `/api/v1/blocks/${id}`,
          method: 'PATCH',
          body: { index, name },
        }),
        invalidatesTags: ['Blocks'],
      }),
      deleteBlock: builder.mutation<BlockType, number>({
        query: (id: number) => ({
          url: `/api/v1/blocks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Blocks'],
      }),
      refreshBlocks: builder.mutation<BlockType[], { id: number, data: BlockType[] }>({
        query: ({ id, data }: { id: number, data: BlockType[] }) => ({
          url: `/api/v1/blocks/document/${id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Blocks'],
      }),
      getBlocks: builder.mutation<{ blocks: BlockType[] }, number>({
        query: (id: number) => ({
          url: `/api/v1/blocks/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Blocks'],
      }),
    }),
  });

export const {
  useCreateBlockMutation,
  useUpdateBlockMutation,
  useDeleteBlockMutation,
  useRefreshBlocksMutation,
  useGetBlocksMutation,
} = blocksApiEndpoints;
export { blocksApiEndpoints };
