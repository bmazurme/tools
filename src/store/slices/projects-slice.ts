import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { RootState } from '..';

type ProjectType = {
  id: number;
  name: string;
  description: string;
  address: string;
};

type ProjectsState = {
  data: ProjectType[];
};

export const initialStateProjects: ProjectsState = {
  data: Array.from({ length: 201 }, (_x, i) => ({
    id: i, name: `Проект ${i}`, description: uuidv4(), address: '',
  })),
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
    removeProject: (
      state,
      { payload }: PayloadAction<{ id: number }>,
    ) => ({
      ...state,
      data: state.data.filter((x) => x.id !== payload.id),
    }),
    updateProject: (
      state,
      { payload: { data } }: PayloadAction<{ data: ProjectType }>,
    ) => ({
      ...state,
      data: state.data.map((x) => (x.id !== data.id ? data : x)),
    }),
  },
});

export const { addProject, removeProject } = slice.actions;

export default slice.reducer;
export const projectsSelector = (state: RootState) => state.projects.data;
