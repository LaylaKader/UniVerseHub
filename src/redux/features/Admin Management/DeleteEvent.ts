import { baseApi } from "../../api/baseApi";

const DeleteEventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    DeleteEvent: builder.mutation({
      query: (id) => ({
        url: `/Counseling/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["counselling"],
    }),
  }),
});

export const { useDeleteEventMutation } = DeleteEventApi;
