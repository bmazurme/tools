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
  data: [
    {
      id: 1,
      name: 'Документ 1',
      type: {
        id: 0,
        name: 'WS',
        link: 'rain-roof',
      },
    },
    {
      id: 2,
      name: 'Документ 2',
      type: {
        id: 0,
        name: 'WS',
        link: 'rain-roof',
      },
    },
    {
      id: 3,
      name: 'Документ 3',
      type: {
        id: 1,
        name: 'WS',
        link: 'rain-runoff',
      },
    },
  ],
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
  },
});

export const { addDocument } = slice.actions;

export default slice.reducer;
export const documentsSelector = (state: RootState) => state.documents.data;
