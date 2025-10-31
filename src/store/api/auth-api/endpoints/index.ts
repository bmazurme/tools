import oauthApi from '..';

const authApiEndpoints = oauthApi
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signOut: builder.mutation<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'POST',
        }),
      }),
    }),
  });

export const { useSignOutMutation } = authApiEndpoints;
export { authApiEndpoints };
