import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { useGetAllCoursesQuery } from "../../redux/features/Student Management/getAllCourseAPI";
import { usePutSingleCourseInProfileMutation } from "../../redux/features/Student Management/putSingleCourseInProfile";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";


export interface ICourse {
  Description: string;
  _id: string;
  courseName: string;
  files: string[];
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  description?: string;
}

export default function AllCourse() {
  const [page, setPage] = useState(1);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const limit = 8;

  const { data, isLoading, isError } = useGetAllCoursesQuery({
    searchKeyWord,
    page,
    limit,
  });

  const [putSingleCourseInProfile] = usePutSingleCourseInProfileMutation();

  const handleEnrol = async (id: string) => {
    try {
      const response = await putSingleCourseInProfile({ id }).unwrap();
      toast.success(`${response.message}`, {
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
      toast.error("Failed to enrol in course", {
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
      <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16 rounded-lg">
        {" "}
        {/* Reduced padding */}
        {/* Background image */}
        <img
          src="https://img.freepik.com/premium-vector/male-student-cartoon-style-studying-online-education-vector-illustration_1138841-28728.jpg?w=1060"
          alt="Student Studying"
          className="absolute inset-0 -z-20 h-full w-full object-cover rounded-lg"
        />
        {/* Color overlay */}
        <div className="absolute inset-0 -z-10 bg-[#0a1244] opacity-70 rounded-lg"></div>
        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Course Resources
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Explore various courses and enhance your learning experience by
              adding resources such as PDFs, slides, and more.
            </p>
          </div>
        </div>
      </div>
      <div className="mb-6  bg-[#eabe3d] p-4 rounded-md shadow-lg mt-4">
        {" "}
        {/* Changed to w-full */}
        <label
          htmlFor="search"
          className="block text-xl font-extrabold leading-6 text-black mb-2">
          Search Course:
        </label>
        <div className="flex rounded-md shadow-sm">
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
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto flex-shrink-0 rounded-full"
                src={
                  course.imageUrl ||
                  "https://img.freepik.com/free-vector/students-watching-webinar-computer-studying-online_74855-15522.jpg?t=st=1725497751~exp=1725501351~hmac=6011ac615b935914772d908f044e02c61f229a341354afa4f47609de6c3d8e81&w=996"
                }
                alt={course.courseName}
              />

              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {course.courseName}
                  </span>
                </dd>

                <dd className="text-sm text-gray-500 mt-4">
                  {course.Description || "No description available"}
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    onClick={() => handleEnrol(course._id)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                    <ArrowRightEndOnRectangleIcon
                      className="h-5 w-5 text-black"
                      aria-hidden="true"
                    />
                    Enrol
                  </button>
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
    </>
  );
}
