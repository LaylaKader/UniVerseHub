import { baseApi } from "../../api/baseApi";

const fileUploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (formData,) => ({
        url: "/files-Upload/file", // Replace with your actual upload endpoint
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Resource"],
    }),
  }),
  overrideExisting: false,
});

export const { useUploadFileMutation } = fileUploadApi;
