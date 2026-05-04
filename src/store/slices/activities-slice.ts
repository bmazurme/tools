/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState, Activity } from '..';

type ActivitiesState = {
  activities: Activity[];
};

export const initialStateActivities: ActivitiesState = {
  activities: [],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: initialStateActivities,
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload.activities;
    },
  },
});

export const { setActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;
export const activitiesSelector = (state: RootState) => state.activities.activities;
