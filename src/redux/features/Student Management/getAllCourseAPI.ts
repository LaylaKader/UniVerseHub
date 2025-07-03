import { baseApi } from "../../api/baseApi";

const getAllCourseAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: ({ searchKeyWord, page, limit }) => ({
        url: `/courses?searchTerm=${searchKeyWord}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCoursesQuery } = getAllCourseAPI;
