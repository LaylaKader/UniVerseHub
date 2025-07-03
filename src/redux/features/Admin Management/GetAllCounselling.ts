import { baseApi } from "../../api/baseApi";

const getCounsellingAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCounselling: builder.query({
      query: () => ({
        url: "/Counseling", // Endpoint for creating a course
        method: "GET",
      }),
      providesTags: ["counselling"],
    }),
  }),
});

export const { useGetAllCounsellingQuery } = getCounsellingAPI;
