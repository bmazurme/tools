import documentsApi from '../index';

import { type DocumentType } from '../../../slices';

type FormPayload = Omit<DocumentType, 'id'>;

const documentsApiEndpoints = documentsApi
  .enhanceEndpoints({
    addTagTypes: ['Documents'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      // eslint-disable-next-line max-len
      getDocumentsByPage: builder.mutation<{ data: DocumentType[], total: number }, { id: number, project: number }>({
        query: ({ id, project }: { id: number, project: number }) => ({
          url: `/documents/${project}/page/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Documents'],
      }),
      createDocument: builder.mutation<DocumentType, FormPayload>({
        query: ({ name, type, project }: FormPayload) => ({
          url: '/documents',
          method: 'POST',
          body: { name, type: { id: +type }, project: { id: +project } },
        }),
        invalidatesTags: ['Documents'],
      }),
      updateDocument: builder.mutation<DocumentType, { name: string; id: number }>({
        query: ({ name, id }) => ({
          url: `/documents/${id}`,
          method: 'PATCH',
          body: { name },
        }),
        invalidatesTags: ['Documents'],
      }),
      removeDocument: builder.mutation<{ total: number }, number>({
        query: (id: number) => ({
          url: `/documents/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Documents'],
      }),
      getDocument: builder.mutation<DocumentType, number>({
        query: (id: number) => ({
          url: `/documents/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Documents'],
      }),
    }),
  });

export const {
  useCreateDocumentMutation,
  useRemoveDocumentMutation,
  useGetDocumentsByPageMutation,
  useGetDocumentMutation,
  useUpdateDocumentMutation,
} = documentsApiEndpoints;
export { documentsApiEndpoints };
