
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  useDeletePostMutation,
  useGetAllPostsQuery,
} from "../../redux/features/Student Management/Forum";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import deleteIcon from "../../assets/delete.svg";

const AllForum = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data: postData, isLoading, isError } = useGetAllPostsQuery(undefined);
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (postId: any) => {
    try {
      await deletePost(postId).unwrap();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading posts. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 -mx-5 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          
          <div className="mt-12 space-y-10 sm:space-y-16">
            {postData &&
              postData.data.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      {post.fileUrl ? (
                        <img
                          src={post.fileUrl}
                          alt="Post"
                          className="h-48 w-full object-cover md:h-full md:w-48"
                        />
                      ) : (
                        <div className="h-48 w-full md:h-full md:w-48 bg-gray-200 flex items-center justify-center">
                          <svg
                            className="h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex-grow">
                      <Link to={`posts/${post._id}`} className="block mt-1">
                        <div className="flex items-center gap-x-4 text-xs mb-4">
                          <time
                            dateTime={post.createdAt}
                            className="text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </time>
                          {post.tags && post.tags.length > 0 && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold">
                              {post.tags}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                          {post.title}
                        </h3>

                        <div
                          className="mt-3 text-gray-600 leading-relaxed line-clamp-3 quill-content"
                          dangerouslySetInnerHTML={createMarkup(post.content)}
                        />
                      </Link>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {post.author && post.author.imageUrl ? (
                              <img
                                src={post.author.imageUrl}
                                alt="Author"
                                className="h-10 w-10 rounded-full"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-800 font-semibold text-sm">
                                  {post.author
                                    ? post.author.name.charAt(0)
                                    : "?"}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {post.author
                                ? post.author.name
                                : "Unknown Author"}
                            </p>
                            <p className="text-xs text-gray-500">Author</p>
                          </div>
                        </div>
                        {currentUser &&
                          post.author &&
                          currentUser.id === post.author._id && (
                            <button onClick={() => handleDelete(post._id)}>
                              <img
                                src={deleteIcon}
                                alt="delete"
                                className="w-6 h-6" // You may want to specify width/height
                              />
                            </button>
                          )}
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                        {post.comments ? post.comments.length : 0} comments
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllForum;
