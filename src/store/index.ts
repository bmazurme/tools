import { configureStore } from '@reduxjs/toolkit';

import {
  projectsApi, documentsApi, usersApi, typesApi, blocksApi,
  rainRoofsApi, rainRunoffsApi, rainPlacesApi, rainConditionsApi,
  itemsApi, activitiesApi, subscriptionsApi, // authApi,
} from './api/index';

import documentsReducer from './slices/documents-slice';
import projectsReducer from './slices/projects-slice';
import usersReducer from './slices/users-slice';
import typesReducer from './slices/types-slice';
import blocksReducer from './slices/blocks-slice';
import itemsReducer from './slices/items-slice';
import activitiesReducer from './slices/activities-slice';

import rainRoofsReducer from './slices/rain-roofs-slice';
import rainRunoffsReducer from './slices/rain-runoffs-slice';
import rainPlacesReducer from './slices/rain-places-slice';
import rainConditionsReducer from './slices/rain-conditions-slice';
import subscriptionsReducer from './slices/subscriptions-slice';

export * from './api/projects-api/endpoints/index';
export * from './api/documents-api/endpoints/index';
export * from './api/users-api/endpoints/index';
export * from './api/types-api/endpoints/index';
export * from './api/blocks-api/endpoints/index';
export * from './api/items-api/endpoints/index';
export * from './api/rain-roofs-api/endpoints/index';
export * from './api/rain-runoffs-api/endpoints/index';
export * from './api/rain-places-api/endpoints/index';
export * from './api/rain-conditions-api/endpoints/index';
export * from './api/auth-api/endpoints/index';
export * from './api/activities-api/endpoints/index';
export * from './api/subscriptions-api/endpoints/index';

export * from './slices/index';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    projects: projectsReducer,
    rainRoofs: rainRoofsReducer,
    rainRunoffs: rainRunoffsReducer,
    rainPlaces: rainPlacesReducer,
    rainConditions: rainConditionsReducer,
    users: usersReducer,
    types: typesReducer,
    blocks: blocksReducer,
    items: itemsReducer,
    activities: activitiesReducer,
    subscriptions: subscriptionsReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [typesApi.reducerPath]: typesApi.reducer,
    [blocksApi.reducerPath]: blocksApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [rainRoofsApi.reducerPath]: rainRoofsApi.reducer,
    [rainRunoffsApi.reducerPath]: rainRunoffsApi.reducer,
    [rainPlacesApi.reducerPath]: rainPlacesApi.reducer,
    [rainConditionsApi.reducerPath]: rainConditionsApi.reducer,
    [activitiesApi.reducerPath]: activitiesApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      projectsApi.middleware,
      documentsApi.middleware,
      usersApi.middleware,
      typesApi.middleware,
      blocksApi.middleware,
      itemsApi.middleware,
      rainRoofsApi.middleware,
      rainRunoffsApi.middleware,
      rainPlacesApi.middleware,
      rainConditionsApi.middleware,
      activitiesApi.middleware,
      subscriptionsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
