import projectsApi from '../index';

type FormPayload = Omit<ProjectType, 'id'>;

const projectsApiEndpoints = projectsApi
  .enhanceEndpoints({
    addTagTypes: ['Projects'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProjectsByPage: builder.mutation<{ data: ProjectType[], total: number }, number>({
        query: (id: number) => ({
          url: `/projects/page/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Projects'],
      }),
      getProject: builder.mutation<ProjectType, number>({
        query: (id: number) => ({
          url: `/projects/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Projects'],
      }),
      removeProject: builder.mutation<TotalType, number>({
        query: (id: number) => ({
          url: `/projects/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Projects'],
      }),
      createProject: builder.mutation<ProjectType, FormPayload>({
        query: (data: FormPayload) => ({
          url: '/projects',
          method: 'POST',
          body: data,
        }),
      }),
      updateProject: builder.mutation<ProjectType, ProjectType>({
        query: (data: ProjectType) => ({
          url: `/projects/${data.id}`,
          method: 'PATCH',
          body: data,
        }),
      }),
    }),
  });

export const {
  useCreateProjectMutation,
  useGetProjectsByPageMutation,
  useRemoveProjectMutation,
  useGetProjectMutation,
  useUpdateProjectMutation,
} = projectsApiEndpoints;
export { projectsApiEndpoints };
