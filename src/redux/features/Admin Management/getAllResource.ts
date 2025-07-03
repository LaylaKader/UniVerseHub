import { baseApi } from "../../api/baseApi";

const getAllResourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllResource: builder.query({
      query: () => ({
        url: "/files-Upload/AllFile", // Endpoint for creating a course
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
  }),
});

export const { useGetAllResourceQuery } = getAllResourceApi;
