import { baseApi } from "../../api/baseApi";

const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to create a new message
    createMessage: builder.mutation({
      query: (messageData) => ({
        url: "/Message/sendMessage",
        method: "POST",
        body: messageData,
      }),
     
    }),

    // Endpoint to get all messages between two users
    getMessages: builder.query({
      query: ({ sender, receiver }) => ({
        url: `/Message/getAllMessages?sender=${sender}&receiver=${receiver}`,
        method: "GET",
      }),
    }),

    // Endpoint to delete a message by its ID
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `/Message/deleteMessage/${messageId}`,
        method: "DELETE",
      }),
    }),

    // Endpoint to get all messages between two users
    getReceiver: builder.query({
      query: ({ sender }) => ({
        url: `/Message/getSideBarReceiver?sender=${sender}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useCreateMessageMutation,
  useGetMessagesQuery,
  useDeleteMessageMutation,
  useGetReceiverQuery,
} = messagesApi;

