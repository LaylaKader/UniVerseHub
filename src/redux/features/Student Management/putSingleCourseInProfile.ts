import { baseApi } from "../../api/baseApi";

const CourseAddedAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    putSingleCourseInProfile: builder.mutation({
      query: ({ id }) => ({
        url: `courses/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { usePutSingleCourseInProfileMutation } = CourseAddedAPI;
