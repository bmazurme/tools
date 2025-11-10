import usersApi from '../index';

// type FormPayload = Omit<UserType, 'id'>;

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.mutation<UserType, void>({
        query: () => ({
          url: '/users/me',
          method: 'GET',
        }),
        invalidatesTags: ['Users'],
      }),
      updateUser: builder.mutation<UserType, UserType>({
        query: ({ id, status }: UserType) => ({
          url: `/users/${id}`,
          method: 'PATCH',
          body: { status },
        }),
        invalidatesTags: ['Users'],
      }),
      toggleTheme: builder.mutation<UserType, { isDark: boolean }>({
        query: (data: { isDark: boolean }) => ({
          url: '/users/theme',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Users'],
      }),
      toggleCompact: builder.mutation<UserType, { isCompact: boolean }>({
        query: (data: { isCompact: boolean }) => ({
          url: '/users/sidebar',
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Users'],
      }),
    }),
  });

export const {
  useGetUserMeMutation,
  useUpdateUserMutation,
  useToggleThemeMutation,
  useToggleCompactMutation,
} = usersApiEndpoints;
export { usersApiEndpoints };
