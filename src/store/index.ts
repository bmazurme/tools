import { configureStore } from '@reduxjs/toolkit';

import { projectsApi } from './api/index';

import documentsReducer from './slices/documents-slice';
import projectsReducer from './slices/projects-slice';
import themeReducer from './slices/theme-slice';
import sidebarReducer from './slices/sidebar-slice';

import rainRoofsReducer from './slices/rain-roofs-slice';
import rainRunoffsReducer from './slices/rain-runoffs-slice';

export * from './api/projects-api/endpoints/index';

export * from './slices/index';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    projects: projectsReducer,
    rainRoofs: rainRoofsReducer,
    rainRunoffs: rainRunoffsReducer,
    theme: themeReducer,
    sidebar: sidebarReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      projectsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
