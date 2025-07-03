import { baseApi } from "../../api/baseApi";

const getAllUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/users/AllUser", // Endpoint for creating a course
        method: "GET",
      }),
      providesTags: ["RoleUpdated"],
    }),
    getAllUserWithSearch: builder.query({
      query: (searchKeyWord) => ({
        url: `/users/AllUser?searchTerm=${searchKeyWord}`, // Endpoint for creating a course
        method: "GET",
      }),
      providesTags: ["RoleUpdated"],
    }),
  }),
});

export const { useGetAllUserQuery, useGetAllUserWithSearchQuery } =
  getAllUserApi;
