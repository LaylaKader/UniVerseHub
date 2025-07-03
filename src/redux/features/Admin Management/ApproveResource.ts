import { baseApi } from "../../api/baseApi";

const ApproveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ApproveResource: builder.mutation<void, string>({
      query: (id) => ({
        url: `/files-Upload/approve/${id}`, // Correct URL pattern with the ID
        method: "PUT",
      }),
      invalidatesTags: ["Resource"],
    }),
  }),
});

export const { useApproveResourceMutation } = ApproveApi;
