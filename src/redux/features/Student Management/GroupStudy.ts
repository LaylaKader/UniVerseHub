import { baseApi } from "../../api/baseApi";

const GroupStudyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroupStudy: builder.query({
      query: () => ({
        url: `/GroupCounselling`,
        method: "GET",
      }),
      providesTags: ["GroupStudy"],
    }),
    createGroupStudy: builder.mutation({
      query: (newGroupStudy) => ({
        url: `/GroupCounselling/createGroupCounselling`,
        method: "POST",
        body: newGroupStudy,
      }),
      invalidatesTags: ["GroupStudy"],
    }),
    updateGroupStudy: builder.mutation({
      query: (id) => ({
        url: `/GroupCounselling/${id}`, // Correctly using the ID from the parameter
        method: "PUT",
        // No body needed, as your backend does not expect it
      }),
      invalidatesTags: ["GroupStudy"],
    }),

    deleteGroupStudy: builder.mutation({
      query: (id) => ({
        url: `/GroupCounselling/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GroupStudy"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for the created endpoints
export const {
  useGetAllGroupStudyQuery,
  useCreateGroupStudyMutation,
  useUpdateGroupStudyMutation, // New hook for updating group study
  useDeleteGroupStudyMutation,
} = GroupStudyApi;
