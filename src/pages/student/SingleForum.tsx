import { Tab } from "@headlessui/react";
import {
  PaperClipIcon,
  CalendarIcon,
  UserCircleIcon,
  ChatBubbleLeftEllipsisIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import DOMPurify from "dompurify"; // Importing DOMPurify for sanitization
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetPostQuery,
} from "../../redux/features/Student Management/Forum";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SingleForum() {
  const { postId } = useParams();
  const author = useSelector(selectCurrentUser);
  const { data: SinglePostData, error, isLoading } = useGetPostQuery(postId);
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { register, handleSubmit, reset } = useForm();

  const onSubmitComment = async (data) => {
    try {
      const formData = new FormData();
      formData.append("content", data.comment);
      if (data.file[0]) {
        formData.append("file", data.file[0]);
      }
      await addComment({ postId, commentData: formData }).unwrap();
      reset();
      toast.success("Comment added successfully.");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment({ postId, commentId }).unwrap();
      toast.success("Comment deleted successfully.");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl mt-8">
        Error: {error.message}
      </div>
    );
  }

  const post = SinglePostData?.data || {};
  const postImage = post.fileUrl || "https://via.placeholder.com/500";

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Post Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-500 opacity-90"></div>
          <div className="relative z-10 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm space-x-6">
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-5 w-5" />
                <span className="font-medium">
                  {post.author?.name || "Unknown"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {post.tags && (
                <div className="flex items-center space-x-2">
                  <TagIcon className="h-5 w-5" />
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-medium">
                    {post.tags}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Post Image */}
        <div className="bg-gray-200">
          <img
            src={postImage}
            alt={post.title}
            className="w-full h-64 object-cover object-center"
          />
        </div>

        {/* Post Content */}
        <div className="p-6">
          <p
            className="text-gray-700 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content), // Sanitizing the post content
            }}
          />
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-200">
          <Tab.Group>
            <Tab.List className="flex p-2 bg-gray-50">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm font-medium leading-5 rounded-lg transition-all duration-200 ease-out",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white text-indigo-700 shadow"
                      : "text-gray-600 hover:bg-white/[0.12] hover:text-indigo-700"
                  )
                }>
                <div className="flex items-center justify-center">
                  <ChatBubbleLeftEllipsisIcon className="w-5 h-5 mr-2" />
                  Comments
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="p-6">
                {/* Display Comments */}
                <div className="space-y-6">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="flex space-x-3 bg-gray-50 p-4 rounded-lg transition-all duration-200 ease-in-out hover:shadow-md">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={author?.imageLink || "/default-avatar.png"}
                            alt={`${author?.name || "Anonymous"}'s avatar`}
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm font-medium text-gray-900">
                            {comment.CommentAuthorName || "Anonymous"}
                          </div>
                          <div className="mt-1 text-sm text-gray-700">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(comment.content), // Sanitizing the comment content
                              }}
                            />
                            <div className="flex justify-end">
                              {author &&
                                comment.author &&
                                author.id === comment.author && (
                                  <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="ml-4 text-red-600 hover:text-red-800 transition">
                                    Delete
                                  </button>
                                )}
                            </div>
                          </div>
                          {comment.fileUrl && (
                            <div className="mt-2">
                              {/* Check if the file is an image */}
                              {/\.(jpg|jpeg|png|gif)$/i.test(
                                comment.fileUrl
                              ) ? (
                                <a
                                  href={comment.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  <img
                                    src={comment.fileUrl}
                                    alt="Attached file"
                                    className="max-w-xs h-auto rounded-md shadow-sm hover:opacity-90 transition-opacity duration-200 ease-in-out"
                                  />
                                </a>
                              ) : (
                                <a
                                  href={comment.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-150 ease-in-out">
                                  <PaperClipIcon className="h-5 w-5 mr-1" />
                                  Attached File
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>

                {/* Comment Form */}
                <form onSubmit={handleSubmit(onSubmitComment)} className="mt-8">
                  <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-200 ease-in-out">
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                      rows={3}
                      {...register("comment", { required: true })}
                      className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm"
                      placeholder="Add your comment..."
                    />
                    <div className="py-2 bg-gray-50 flex items-center justify-between">
                      <div className="flex-shrink-0 pl-3">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none transition-colors duration-150 ease-in-out">
                          <span>Attach a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            {...register("file")}
                          />
                        </label>
                      </div>
                      <div className="flex-shrink-0 pr-3">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
