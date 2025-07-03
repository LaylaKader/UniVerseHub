import { baseApi } from "../../api/baseApi";

const ActiveAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ActiveUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/Active/${id}`, // Correct URL pattern with the ID
        method: "PUT",
      }),
      invalidatesTags: ["RoleUpdated"],
    }),
  }),
});

export const { useActiveUserMutation } = ActiveAPi;
