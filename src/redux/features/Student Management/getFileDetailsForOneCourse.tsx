import { baseApi } from "../../api/baseApi"; // Adjust the import path as needed

const courseFilesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFilesForCourse: builder.query({
      query: (id) => ({
        url: `/files-Upload/CourseFile/${id}`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
  }),
});

export const { useGetFilesForCourseQuery } = courseFilesApi;
