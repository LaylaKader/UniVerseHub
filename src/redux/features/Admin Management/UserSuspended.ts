import { baseApi } from "../../api/baseApi";

const SuspendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    suspendUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/Suspended/${id}`, // Correct URL pattern with the ID
        method: "PUT",
        }),
        invalidatesTags:["RoleUpdated"]
    }),
  }),
});

export const { useSuspendUserMutation } = SuspendedApi;
