import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { documentsApiEndpoints } from '../api/documents-api/endpoints/index';

import type { RootState } from '..';

export type DocumentType = {
  id: number;
  name: string;
  type: string;
  project: string;
};

type DocumentsState = {
  data: DocumentType[];
  total: number;
};

export const initialStateDocuments: DocumentsState = {
  data: [],
  total: 0,
};

const slice = createSlice({
  name: 'documents',
  initialState: initialStateDocuments,
  reducers: {
    updateDocument: (
      state,
      { payload: { data } }: PayloadAction<{ data: DocumentType }>,
    ) => ({
      ...state,
      data: state.data.map((x) => (x.id !== data.id ? data : x)),
    }),
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(
        documentsApiEndpoints.endpoints.getDocumentsByPage.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload.data, total: action.payload.total }),
      )
      .addMatcher(
        documentsApiEndpoints.endpoints.removeDocument.matchFulfilled,
        (state, action) => ({
          ...state,
          data: state.data.filter((x: DocumentType) => x.id !== action.meta.arg.originalArgs),
          total: action.payload.total,
        }),
      );
  },
});

// export const { removeDocument } = slice.actions;

export default slice.reducer;
export const documentsSelector = (state: RootState) => state.documents.data;
export const documentsTotalSelector = (state: RootState) => state.documents.total;
