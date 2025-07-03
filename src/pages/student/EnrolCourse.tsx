import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetWhoLogInQuery } from "../../redux/features/Student Management/getWhoLogInAPI";
import { EyeIcon } from "@heroicons/react/24/solid";

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

const defaultImageUrl =
  "https://img.freepik.com/free-vector/students-watching-webinar-computer-studying-online_74855-15522.jpg?t=st=1725497751~exp=1725501351~hmac=6011ac615b935914772d908f044e02c61f229a341354afa4f47609de6c3d8e81&w=996";

export default function EnrolCourse() {
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetWhoLogInQuery(undefined);

  // Show a loading message while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading courses...</p>
      </div>
    );
  }

  // Handle the error state
  if (isError || !data) {
    toast.error("Failed to fetch courses");
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error loading courses. Please try again later.</p>
      </div>
    );
  }

  // Profile data
  const profile = {
    courses: data.data.courses,
  };

  return (
    <>
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

      {/* Light blue container for course cards with custom color */}
      <div
        className="rounded-lg p-6 mx-4 shadow-lg"
        style={{ backgroundColor: "#aed6f1" }}>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-14">
          {profile.courses && profile.courses.length > 0 ? (
            profile.courses.map((course: ICourse) => (
              <li
                key={course._id}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-lg transform hover:scale-105 transition duration-300">
                <div className="flex flex-1 flex-col p-8">
                  <img
                    className="mx-auto flex-shrink-0 rounded-full h-32 w-32 border-2 border-blue-100"
                    src={course.imageUrl || defaultImageUrl}
                    alt={course.courseName}
                  />
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {course.courseName}
                    </span>
                  </dd>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-gray-500 mt-2">
                      {course.Description || "No description available"}
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="-ml-px flex w-0 flex-1">
                      <Link
                        to={`/${user?.role}/course/${course._id}`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-blue-50 transition duration-300">
                        <EyeIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center h-screen">
              <p>No courses available</p>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
