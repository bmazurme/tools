import activitiesApi from '../index';

export type Activity = {
  id: number;
  description: string;
  createdAt: string;
};

const activitiesApiEndpoints = activitiesApi
  .enhanceEndpoints({
    addTagTypes: ['Activities'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getActivities: builder.mutation<Activity[], void>({
        query: () => ({
          url: '/activities/user',
          method: 'GET',
        }),
        invalidatesTags: ['Activities'],
      }),
    }),
  });

export const {
  useGetActivitiesMutation,
} = activitiesApiEndpoints;
export { activitiesApiEndpoints };
