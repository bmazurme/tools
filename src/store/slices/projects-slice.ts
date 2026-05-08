import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { projectsApiEndpoints, type RootState } from '..';

type ProjectsState = {
  data: ProjectType[];
  total: number;
};

export const initialStateProjects: ProjectsState = {
  data: [],
  total: 0,
};

const projectsSlice = createSlice({
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
    setProjects: (
      state,
      { payload }: PayloadAction<{ data: ProjectType[] }>,
    ) => ({
      ...state,
      data: payload.data,
    }),
  },
  extraReducers: (builder) => {
    builder
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

export const { addProject, removeProject, setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
export const projectsSelector = (state: RootState) => state.projects.data;
export const projectsTotalSelector = (state: RootState) => state.projects.total;
