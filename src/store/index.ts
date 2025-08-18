import { configureStore } from '@reduxjs/toolkit';

import documentsReducer from './slices/documents-slice';
import projectsReducer from './slices/projects-slice';
import themeReducer from './slices/theme-slice';

import rainRoofsReducer from './slices/rain-roofs-slice';
import rainRunoffsReducer from './slices/rain-runoffs-slice';

export * from './slices/index';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    projects: projectsReducer,
    rainRoofs: rainRoofsReducer,
    rainRunoffs: rainRunoffsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
