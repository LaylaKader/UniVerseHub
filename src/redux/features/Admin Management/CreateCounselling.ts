import { CounselingFormData } from "../../../Types/FileType";
import { baseApi } from "../../api/baseApi";


const createCounselingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCounseling: builder.mutation({
      query: (counselingInfo: CounselingFormData) => ({
        url: "/Counseling/createEvent", // Ensure this URL matches your backend endpoint
        method: "POST",
        body: counselingInfo,
      }),
      invalidatesTags: ["counselling"],
    }),
  }),
});

export const { useCreateCounselingMutation } = createCounselingApi;
