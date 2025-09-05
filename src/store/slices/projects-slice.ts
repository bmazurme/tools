import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { projectsApiEndpoints } from '../api/projects-api/endpoints/index';
import type { RootState } from '..';

type ProjectsState = {
  data: ProjectType[];
  total: number;
};

export const initialStateProjects: ProjectsState = {
  data: [],
  total: 0,
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        projectsApiEndpoints.endpoints.getProjectsByPage.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload.data, total: action.payload.total }),
      )
      .addMatcher(
        projectsApiEndpoints.endpoints.removeProject.matchFulfilled,
        (state, action) => ({
          ...state,
          data: state.data.filter((x: ProjectType) => x.id !== action.meta.arg.originalArgs),
          total: action.payload.total,
        }),
      );
  },
});

export const { addProject, removeProject } = slice.actions;

export default slice.reducer;
export const projectsSelector = (state: RootState) => state.projects.data;
export const projectsTotalSelector = (state: RootState) => state.projects.total;
