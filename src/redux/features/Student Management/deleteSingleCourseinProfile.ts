import { baseApi } from "../../api/baseApi";

const CourseDeleteAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteSingleCourseInProfile: builder.mutation({
      query: ({ id }) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useDeleteSingleCourseInProfileMutation } = CourseDeleteAPI;
