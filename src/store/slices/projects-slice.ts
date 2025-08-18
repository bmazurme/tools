import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';

type ProjectType = {
  id: number;
  name: string;
  description: string;
};

type ProjectsState = {
  data: ProjectType[];
};

export const initialStateProjects: ProjectsState = {
  data: [
    { id: 1, name: 'Проект 1', description: '' },
    { id: 2, name: 'Проект 2', description: '' },
    { id: 3, name: 'Проект 3', description: '' },
  ],
};

const slice = createSlice({
  name: 'projects',
  initialState: initialStateProjects,
  reducers: {
    addProject: (
      state,
      { payload }: PayloadAction<{ data: ProjectType }>,
    ) => ({
      ...state,
      data: [...state.data, payload.data],
    }),
  },
});

export const { addProject } = slice.actions;

export default slice.reducer;
export const projectsSelector = (state: RootState) => state.projects.data;
