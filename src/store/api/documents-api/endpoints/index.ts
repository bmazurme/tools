import documentsApi from '../index';

import { type DocumentType } from '../../../slices';

type FormPayload = Omit<DocumentType, 'id'>;

const documentsApiEndpoints = documentsApi
  .enhanceEndpoints({
    addTagTypes: ['Documents'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createDocument: builder.mutation<DocumentType, FormPayload>({
        query: (data: FormPayload) => ({
          url: '/documents',
          method: 'POST',
          body: data,
        }),
      }),
      removeDocument: builder.mutation<void, number>({
        query: (id: number) => ({
          url: `/documents/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Documents'],
      }),
    }),
  });

export const {
  useCreateDocumentMutation,
  useRemoveDocumentMutation,
} = documentsApiEndpoints;
export { documentsApiEndpoints };
