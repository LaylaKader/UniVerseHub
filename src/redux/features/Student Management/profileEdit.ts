import { baseApi } from "../../api/baseApi";

const profileAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatedProfile: builder.mutation({
      query: (updatedProfile) => ({
        url: "/users/me",
        method: "PUT",
        body: updatedProfile,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useUpdatedProfileMutation } = profileAPI;
