import { baseApi } from "../../api/baseApi";

const BookedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    EventBooked: builder.mutation({
      query: (id) => ({
        url: `Counseling/EventBooked/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["counselling"],
    }),
  }),
});

export const { useEventBookedMutation } = BookedApi;
