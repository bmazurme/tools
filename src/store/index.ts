import { configureStore } from '@reduxjs/toolkit';

import rainRoofsReducer from './slices/rain-roofs-slice';
import rainRunoffsReducer from './slices/rain-runoffs-slice';

export * from './slices/index';

export const store = configureStore({
  reducer: {
    rainRoofs: rainRoofsReducer,
    rainRunoffs: rainRunoffsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
