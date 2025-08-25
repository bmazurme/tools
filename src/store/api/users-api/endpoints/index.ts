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
    }),
  });

export const {
  useGetUserMeMutation,
} = usersApiEndpoints;
export { usersApiEndpoints };
