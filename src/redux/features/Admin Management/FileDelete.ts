import { baseApi } from "../../api/baseApi";

const FileDeleteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fileDelete: builder.mutation({
      query: (id) => ({
        url: `/files-Upload/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resource"],
    }),
  }),
});

export const { useFileDeleteMutation } = FileDeleteApi;
