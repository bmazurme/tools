import projectsApi from '../index';

type FormPayload = {
  name: string;
  code: string;
  description: string;
  address: string;
  status?: { id: number };
};

type UpdateProjectUsers = {
  projectId: number;
  userId: number;
}

const projectsApiEndpoints = projectsApi
  .enhanceEndpoints({
    addTagTypes: ['Projects'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProjectsByPage: builder.mutation<{ data: ProjectType[], total: number }, number>({
        query: (id: number) => ({
          url: `projects/page/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Projects'],
      }),
      getProject: builder.mutation<ProjectType, number>({
        query: (id: number) => ({
          url: `projects/${id}`,
          method: 'GET',
        }),
        invalidatesTags: ['Projects'],
      }),
      removeProject: builder.mutation<TotalType, number>({
        query: (id: number) => ({
          url: `projects/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Projects'],
      }),
      createProject: builder.mutation<ProjectType, FormPayload>({
        query: (data: FormPayload) => ({
          url: 'projects',
          method: 'POST',
          body: data,
        }),
      }),
      updateProject: builder.mutation<ProjectType, FormPayload & { id: number }>({
        query: ({
          address, code, description, name, status, id,
        }) => ({
          url: `projects/${id}`,
          method: 'PATCH',
          body: {
            address, code, description, name, ...(status ? { status } : {}),
          },
        }),
      }),
      addUserToProject: builder.mutation<ProjectType, UpdateProjectUsers>({
        query: (data: UpdateProjectUsers) => ({
          url: 'projects/participants',
          method: 'PATCH',
          body: data,
        }),
      }),
      removeUserFromProject: builder.mutation<ProjectType, UpdateProjectUsers>({
        query: ({ projectId, userId }: UpdateProjectUsers) => ({
          url: 'projects/participants',
          method: 'DELETE',
          body: { projectId, userId },
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
  useAddUserToProjectMutation,
  useRemoveUserFromProjectMutation,
} = projectsApiEndpoints;
export { projectsApiEndpoints };
