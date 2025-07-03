import {
  ArrowLeftIcon,
  ArrowRightIcon,
  
} from "@heroicons/react/20/solid";
import {  MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { Link } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { useCreateCourseMutation } from "../../redux/features/Admin Management/CreateCourse";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllCoursesQuery } from "../../redux/features/Student Management/getAllCourseAPI";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDeleteCourseMutation } from "../../redux/features/Admin Management/CourseDelete";

export interface ICourse {
  Description: string;
  _id: string;
  courseName: string;
  files: string[];
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
 
}

export default function AllCourse() {
 

  const user = useSelector(selectCurrentUser);

  const [page, setPage] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [Description, setDescription] = useState("");

  const limit = 8;

  const { data, isLoading, isError } = useGetAllCoursesQuery({
    searchKeyWord,
    page,
    limit,
  });

  const [addCourse] = useCreateCourseMutation();

  const handleAddCourse = async () => {
    try {
      await addCourse({ courseName, imageUrl, Description }).unwrap();
      toast.success("Course added successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setIsModalOpen(false);
      setCourseName(""); // Reset form fields
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to add course", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourse(id).unwrap(); // Call the mutation correctly

      toast.success("Course deleted successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      toast.error("Failed to delete course", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  // Mutation hook from your API service
  const [deleteCourse] = useDeleteCourseMutation();

  const handleNextPage = () => {
    if (page < data.data.length) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading courses</div>;
  }

  return (
    <>
      {/* Show Add Course button only if the user is an admin */}
      {user?.role === "admin" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md">
          Add Course
        </button>
      )}

      <div className="mb-6 w-2/5">
        <label
          htmlFor="search"
          className="block text-xl font-extrabold leading-6 text-black">
          Search Course:
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter search keyword"
              value={searchKeyWord}
              onChange={(e) => setSearchKeyWord(e.target.value)}
            />
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.data.map((course: ICourse) => (
          <li
            key={course._id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div className="flex flex-1 flex-col  bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <TrashIcon
                onClick={() => handleDeleteCourse(course._id)}
                className="text-red-600 h-6 w-6 m-2 ms-64"></TrashIcon>

              <img
                className="mx-auto h-64 w-96"
                src={
                  course.imageUrl ||
                  "https://img.freepik.com/free-vector/students-watching-webinar-computer-studying-online_74855-15522.jpg?t=st=1725497751~exp=1725501351~hmac=6011ac615b935914772d908f044e02c61f229a341354afa4f47609de6c3d8e81&w=996"
                }
                alt={course.courseName}
              />

              <dl className="mt-4 flex flex-grow flex-col justify-between">
                <dd className="text-center">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-green-600/20">
                    {course.courseName}
                  </span>
                </dd>

                <dd className="mt-3 text-sm text-gray-600 text-center">
                  {course.Description || "No description available"}
                </dd>
              </dl>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="-ml-px flex w-0 flex-1">
                    <Link
                      to={`/${user?.role}/course/${course._id}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <EyeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-4">
        <div className="-mt-px flex w-0 flex-1">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-xl font-bold text-black hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
            <ArrowLeftIcon
              className="mr-3 h-5 w-5 text-black font-extrabold"
              aria-hidden="true"
            />
            Previous
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {[...Array(data.data.length).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber + 1)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                pageNumber + 1 === page
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-black hover:border-gray-300 hover:text-gray-700"
              }`}
              aria-current={pageNumber + 1 === page ? "page" : undefined}>
              {pageNumber + 1}
            </button>
          ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <button
            onClick={handleNextPage}
            disabled={page === data.data.length}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-xl font-bold text-black hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
            <ArrowRightIcon
              className="ml-3 h-5 w-5 text-black font-extrabold"
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddCourse();
              }}>
              <div className="mb-4">
                <label
                  htmlFor="courseName"
                  className="block text-sm font-medium text-gray-700">
                  Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  placeholder=" eg: Software Engineering"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Description"
                  className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="Description"
                  placeholder="Short Description  "
                  id="Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="Optional"
                  name="imageUrl"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
