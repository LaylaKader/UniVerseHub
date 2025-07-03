import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useDeleteSingleCourseInProfileMutation } from "../../redux/features/Student Management/deleteSingleCourseinProfile";
import { useGetSingleCourseQuery } from "../../redux/features/Student Management/getSingleCoursePreviewAPI";
import { useGetFilesForCourseQuery } from "../../redux/features/Student Management/getFileDetailsForOneCourse";
import { Bounce, toast } from "react-toastify";
import { IFile } from "../../Types/FileType";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";


export default function SingleCoursePreview() {
  const user = useSelector(selectCurrentUser);
  const { id } = useParams();

  const { data: courseData, isLoading: isCourseLoading } = useGetSingleCourseQuery(id);
  const [
    deleteCourse,
    { isLoading: isDeleting, isError: isDeleteError, isSuccess: isDeleteSuccess },
  ] = useDeleteSingleCourseInProfileMutation();

  const {
    data: fileData,
    isLoading: isFilesLoading,
    isError: isFilesError,
  } = useGetFilesForCourseQuery(id);

  const handleDelete = async () => {
    try {
      await deleteCourse({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete course:", error);
      toast.error("Failed to delete course. Please try again.");
    }
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isCourseLoading || isFilesLoading || isDeleting) {
    return <Loader />;
  }

  if (isDeleteError || isFilesError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">An error occurred. Please try again later.</p>
      </div>
    );
  }

  if (!courseData || !fileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        No data available
      </div>
    );
  }

  if (isDeleteSuccess) {
    toast.success("Course deleted successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  const files = fileData.data;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900 mb-2">
            Files
          </h1>
          <p className="mt-2 text-sm text-gray-700 mb-5">
            A list of all the files associated with this course, including their
            name, description, type, and size.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleDelete}
            type="button"
            className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Unenroll
          </button>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to={`/${user?.role}/fileUpload/${id}`}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Resource
          </Link>
        </div>
      </div>

      {/* Section for file table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full">
                <thead style={{ backgroundColor: "#8FBAD9" }}>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-3">
                      File Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Description
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Type
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      File Type
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Size
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                      Uploaded By
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-3 text-sm font-semibold text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {files.map((file: IFile) => (
                    <Fragment key={file._id}>
                      <tr className="border-t border-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {file.fileName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {file.fileDescription}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {file.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {file.fileType}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {file.fileSize} KB
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                          {file.uploadedBy}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pr-4 text-center text-sm font-medium sm:pr-3">
                          <a
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-900">
                            Download
                          </a>
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
