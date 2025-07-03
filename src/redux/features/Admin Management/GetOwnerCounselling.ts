import { baseApi } from "../../api/baseApi";

const getCounsellingAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOwnerCounselling: builder.query({
      query: () => ({
        url: "/Counseling/whoCounselling", // Endpoint for creating a course
        method: "GET",
      }),
      providesTags: ["counselling"],
    }),
  }),
});

export const { useGetOwnerCounsellingQuery } = getCounsellingAPI;
