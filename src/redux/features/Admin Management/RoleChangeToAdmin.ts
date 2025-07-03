import { baseApi } from "../../api/baseApi";

const RoleChangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    roleChangeToAdmin: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/roleChange/${id}`, // URL parameter for user ID
        method: "PUT",
      }),
      invalidatesTags: ["RoleUpdated"],
    }),
  }),
});

export const { useRoleChangeToAdminMutation } = RoleChangeApi;
