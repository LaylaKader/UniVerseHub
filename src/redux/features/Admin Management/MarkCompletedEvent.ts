
import { baseApi } from "../../api/baseApi";

const markCompletedAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markCompleted: builder.mutation({
      query: (id) => ({
        url: `/Counseling/markCompleted/${id}`, 
        method: "PUT",
        
      }),
      invalidatesTags: ["counselling"],
    }),
  }),
});

export const { useMarkCompletedMutation } = markCompletedAPI;
