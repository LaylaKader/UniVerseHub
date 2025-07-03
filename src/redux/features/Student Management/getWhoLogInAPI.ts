import { baseApi } from "../../api/baseApi";

const getWhoLogInAPI = baseApi.injectEndpoints({


  endpoints: (builder) => ({

  getWhoLogIn: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
     providesTags:["Profile"]
    }),
  }),
});

export const { useGetWhoLogInQuery } = getWhoLogInAPI; 