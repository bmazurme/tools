import { createSlice } from '@reduxjs/toolkit';

import { activitiesApiEndpoints } from '../api/activities-api/endpoints/index';
import type { RootState, Activity } from '..';

type ActivitiesState = {
  data: Activity[];
};

export const initialStateActivities: ActivitiesState = {
  data: [],
};

const slice = createSlice({
  name: 'activities',
  initialState: initialStateActivities,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        activitiesApiEndpoints.endpoints.getActivities.matchFulfilled,
        (state, { payload }) => ({ ...state, data: payload }),
      );
  },
});

export default slice.reducer;
export const activitiesSelector = (state: RootState) => state.activities.data;
