import { configureStore } from '@reduxjs/toolkit';

import {
  projectsApi, documentsApi, usersApi, typesApi,
} from './api/index';

import documentsReducer from './slices/documents-slice';
import projectsReducer from './slices/projects-slice';
import usersReducer from './slices/users-slice';
import typesReducer from './slices/types-slice';

import rainRoofsReducer from './slices/rain-roofs-slice';
import rainRunoffsReducer from './slices/rain-runoffs-slice';

export * from './api/projects-api/endpoints/index';
export * from './api/documents-api/endpoints/index';
export * from './api/users-api/endpoints/index';
export * from './api/types-api/endpoints/index';

export * from './slices/index';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    projects: projectsReducer,
    rainRoofs: rainRoofsReducer,
    rainRunoffs: rainRunoffsReducer,
    users: usersReducer,
    types: typesReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      projectsApi.middleware,
      documentsApi.middleware,
      usersApi.middleware,
      typesApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
