import usersApi from '../index';

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      // getUserMe: builder.mutation<UserType, void>({
      //   query: () => ({
      //     url: '/users/me',
      //     method: 'GET',
      //   }),
      //   invalidatesTags: ['Users'],
      // }),
      getUserSettings: builder.query<ModuleType[], void>({
        query: () => ({
          url: '/api/v1/users/settings',
          method: 'GET',
        }),
        // providesTags: ['Users'],
      }),
      getUserByEmail: builder.mutation<UserType, string>({
        query: (email: string) => ({
          url: `/api/v1/users/email/${email}`,
          method: 'GET',
        }),
        // invalidatesTags: ['Users'],
      }),
      updateUser: builder.mutation<UserType, UserType>({
        query: ({ id, status }: UserType) => ({
          url: `/api/v1/users/${id}`,
          method: 'PATCH',
          body: { status },
        }),
        invalidatesTags: ['Users'],
      }),
      toggleTheme: builder.mutation<UserType, { isDark: boolean }>({
        query: (data: { isDark: boolean }) => ({
          url: '/api/v1/users/theme',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Users'],
      }),

      addTypeToUser: builder.mutation<ModuleType[], number>({
        query: (typeId: number) => ({
          url: '/api/v1/users/settings',
          method: 'PUT',
          body: { typeId },
        }),
        invalidatesTags: ['Users'],
      }),
      removeTypeFromUser: builder.mutation<ModuleType[], number>({
        query: (typeId: number) => ({
          url: '/api/v1/users/settings',
          method: 'DELETE',
          body: { typeId },
        }),
        invalidatesTags: ['Users'],
      }),

      toggleCompact: builder.mutation<UserType, { isCompact: boolean }>({
        query: (data: { isCompact: boolean }) => ({
          url: '/api/v1/users/sidebar',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const {
  // useGetUserMeMutation,
  useGetUserByEmailMutation,
  useUpdateUserMutation,
  useToggleThemeMutation,
  useToggleCompactMutation,
  useGetUserSettingsQuery,

  useAddTypeToUserMutation,
  useRemoveTypeFromUserMutation,
} = usersApiEndpoints;
export { usersApiEndpoints };
