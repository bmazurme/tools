import projectStatusApi from '../index';

const projectStatusApiEndpoints = projectStatusApi
  .enhanceEndpoints({
    addTagTypes: ['ProjectStatus'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProjectStatuses: builder.mutation<ProjectStatus[], void>({
        query: () => ({
          url: 'project-statuses',
          method: 'GET',
        }),
        invalidatesTags: ['ProjectStatus'],
      }),
    }),
  });

export const {
  useGetProjectStatusesMutation,
} = projectStatusApiEndpoints;
export { projectStatusApiEndpoints };
