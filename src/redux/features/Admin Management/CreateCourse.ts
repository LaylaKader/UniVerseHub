import { baseApi } from "../../api/baseApi";

const CreateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (newCourse) => ({
        url: "/courses/create-course", // Endpoint for creating a course
        method: "POST",
        body: newCourse,
        }),
        invalidatesTags:["Course","Profile"]
    }),
  }),
});

export const { useCreateCourseMutation } = CreateApi;
