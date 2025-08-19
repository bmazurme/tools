import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type DocumentType = {
  id: number;
  name: string;
  type: {
    id: number;
    name: string;
    link: string;
  };
};

type DocumentsState = {
  data: DocumentType[];
};

export const initialStateDocuments: DocumentsState = {
  data: Array.from({ length: 21 }, (_x, i) => ({
    id: i,
    name: `Документ ${i}`,
    type: {
      id: i % 2 ? 1 : 0,
      name: i % 2 ? 'WS' : 'S',
      link: i % 2 ? 'rain-roof' : 'rain-runoff',
    },
  })),
};

const slice = createSlice({
  name: 'documents',
  initialState: initialStateDocuments,
  reducers: {
    addDocument: (
      state,
      { payload }: PayloadAction<{ data: DocumentType }>,
    ) => ({
      ...state,
      data: [...state.data, payload.data],
    }),
    removeDocument: (
      state,
      { payload: { id } }: PayloadAction<{ id: number }>,
    ) => ({
      ...state,
      data: state.data.filter((x) => x.id !== id),
    }),
    updateDocument: (
      state,
      { payload: { data } }: PayloadAction<{ data: DocumentType }>,
    ) => ({
      ...state,
      data: state.data.map((x) => (x.id !== data.id ? data : x)),
    }),
  },
});

export const { addDocument, removeDocument } = slice.actions;

export default slice.reducer;
export const documentsSelector = (state: RootState) => state.documents.data;
