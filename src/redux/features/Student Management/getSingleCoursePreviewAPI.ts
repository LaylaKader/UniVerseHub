import { baseApi } from "../../api/baseApi";

const getSingleCoursePreviewAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCourse: builder.query({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
     
    }),
  }),
});

export const { useGetSingleCourseQuery } = getSingleCoursePreviewAPI;
