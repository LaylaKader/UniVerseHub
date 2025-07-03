import { baseApi } from "../../api/baseApi";

const forumApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all posts
    getAllPosts: builder.query({
      query: () => ({
        url: "/forum/posts",
        method: "GET",
      }),
      providesTags: ["Forum"],
    }),

    // Get a single post
    getPost: builder.query({
      query: (postId) => ({
        url: `/forum/posts/${postId}`,
        method: "GET",
      }),
      providesTags: ["comments", "Forum"],
    }),

    // Create a new post
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/forum/posts",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Forum"],
    }),

    // Update a post
    updatePost: builder.mutation({
      query: ({ postId, ...postData }) => ({
        url: `/forum/posts/${postId}`,
        method: "PUT",
        body: postData,
      }),
    }),

    // Delete a post
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/forum/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Forum"],
    }),

    // Add a comment to a post
    addComment: builder.mutation({
      query: ({ postId, commentData }) => ({
        url: `/forum/posts/${postId}/comments`,
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["comments"],
    }),

    // Delete a comment
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/forum/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = forumApi;
