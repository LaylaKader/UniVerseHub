import { useGetAllResourceQuery } from "../../redux/features/Admin Management/getAllResource";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { useApproveResourceMutation } from "../../redux/features/Admin Management/ApproveResource";
import { useFileDeleteMutation } from "../../redux/features/Admin Management/FileDelete";
import ResourseTop from "./ResourseTop";

export default function ResourceMange() {
  const { data, isLoading } = useGetAllResourceQuery(undefined);
  const [approveResource, { isLoading: isApproving, error: approveError }] =
    useApproveResourceMutation();
  const [deleteResource, { isLoading: isDeleting, error: deleteError }] =
    useFileDeleteMutation();

  if (isLoading) {
    return <Loader />;
  }

  const files = data?.data || [];

  const handleApprove = async (id: string, fileName: string) => {
    try {
      await approveResource(id).unwrap();
      toast.success(`Resource ${fileName} approved!`);
    } catch (error) {
      toast.error(
        `Failed to approve resource ${fileName}: ${
          approveError?.message || "Unknown error"
        }`
      );
    }
  };

  const handleDelete = async (id: string, fileName) => {
    try {
      await deleteResource(id).unwrap();
      toast.success(`Resource ${fileName} deleted!`);
    } catch (error) {
      toast.error(
        `Failed to delete resource with ID ${id}: ${
          deleteError?.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16 pb-24 rounded-lg">
        {" "}
        {/* Increased bottom padding */}
        {/* Background image */}
        <img
          src="https://img.freepik.com/premium-vector/diverse-team-collaborates-around-visual-data-representations-digital-tools-focusing-improving-organizational-strategies-business-efficiency_538213-123257.jpg?w=826"
          alt="Resource Management"
          className="absolute inset-0 -z-20 h-full w-full object-cover rounded-lg"
        />
        {/* Color overlay */}
        <div className="absolute inset-0 -z-10 bg-[#0a1244] opacity-70 rounded-lg"></div>
        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Resources
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Manage all the resources in your account, including their name,
              description, type, and status.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="sm:flex sm:items-center mb-6">
            <div className="sm:flex-auto"></div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-[#8dade6] rounded-lg">
                <thead className="bg-[#8dade6]">
                  <tr>
                    <th className="py-3 px-4 text-center text-base font-bold text-white border-r border-white">
                      Number
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      Uploaded By
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      File Name
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      Description
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      Type
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      Course Name
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      File Size
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      File Type
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      Download
                    </th>
                    <th className="py-3 px-4 text-left text-base font-bold text-white border-r border-white">
                      Approve
                    </th>
                    <th className="py-3 px-4 text-left text-lg font-bold text-white">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-[#fffff6]">
                  {files.map((file: any, index: number) => (
                    <tr key={file._id}>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {index + 1}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {file.uploadedBy}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {file.fileName}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {file.fileDescription}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {file.type}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {file.courseName}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {file.fileSize} KB
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900 border-r border-[#8dade6]">
                        {file.fileType}
                      </td>
                      <td className="py-4 px-4 text-sm border-r border-[#8dade6]">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            file.status === "Approved"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                          {file.status}
                        </span>
                      </td>
                      <td className="py-4 px-7 text-sm text-gray-900 border-r border-[#8dade6]">
                        <a
                          href={file.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer">
                          <img
                            src="https://i.ibb.co.com/6DtSWnR/download-465584.png"
                            alt="Download"
                            className="w-6 h-6"
                          />
                        </a>
                      </td>
                      <td className="py-4 px-4 text-sm border-r border-[#8dade6] h-5 w-5">
                        {file.status !== "Approved" && (
                          <button
                            onClick={() =>
                              handleApprove(file._id, file.fileName)
                            }
                            disabled={isApproving}
                            className={`flex items-center justify-center ${
                              isApproving ? "bg-green-500" : ""
                            } p-2 rounded`}>
                            <img
                              src="https://i.ibb.co.com/MgTGL8r/approved.png"
                              alt="Approve"
                              className="w-8 h-8"
                            />
                          </button>
                        )}
                      </td>
                      <td className="py-4 px-4 text-sm h-5 w-5">
                        <button
                          onClick={() => handleDelete(file._id, file.fileName)}
                          disabled={isDeleting}
                          className={`flex items-center justify-center ${
                            isDeleting ? "bg-red-500" : ""
                          } p-2 rounded`}>
                          <img
                            src="https://i.ibb.co.com/WfVq6M7/delete.png"
                            alt="Delete"
                            className="w-6 h-6"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
