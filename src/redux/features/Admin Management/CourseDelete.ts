import { baseApi } from "../../api/baseApi";

const DeleteCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    DeleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/CourseDeleteForAdmin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const { useDeleteCourseMutation } = DeleteCourseApi;
