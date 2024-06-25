import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: {
    mutation: (arg0: {
      query:
        | ((data: any) => { url: string; method: string; body: any })
        | (() => { url: string; method: string })
        | ((data: any) => { url: string; method: string; body: any })
        | ((data: any) => { url: string; method: string; body: any });
    }) => any;
  }) => ({
    login: builder.mutation({
      query: (data: any) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data: any) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data: any) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;

