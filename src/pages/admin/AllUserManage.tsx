import { Menu, Transition } from "@headlessui/react";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { Fragment, useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { useActiveUserMutation } from "../../redux/features/Admin Management/ActiveUser";
import { useGetAllUserQuery } from "../../redux/features/Admin Management/getAllUser";
import { useRoleChangeToAdminMutation } from "../../redux/features/Admin Management/RoleChangeToAdmin";
import { useSuspendUserMutation } from "../../redux/features/Admin Management/UserSuspended";
import { TUser } from "../../redux/features/auth/authSlice";


export default function AllUserManage() {
  const { data, isLoading, error } = useGetAllUserQuery(undefined);
  const [roleChangeToAdmin] = useRoleChangeToAdminMutation();
  const [suspendUser] = useSuspendUserMutation();
  const [activateUser] = useActiveUserMutation();

  const [users, setUsers] = useState<TUser[]>([]);

  // Update users only when data changes
  useEffect(() => {
    if (data?.data && JSON.stringify(data.data) !== JSON.stringify(users)) {
      setUsers(data.data);
    }
  }, [data, users]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast.error("Error fetching users", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Slide,
    });
  }

  const handleRoleChange = async (userId: string) => {
    try {
      await roleChangeToAdmin(userId).unwrap();
      toast.success("User role updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    } catch (error: any) {
      toastError(error, "An error occurred while updating user role.");
    }
  };

  const handleSuspendUser = async (userId: string) => {
    try {
      await suspendUser(userId).unwrap();
      toast.success("User has been suspended", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    } catch (error: any) {
      toastError(error, "An error occurred while suspending the user.");
    }
  };

  const handleActivateUser = async (userId: string) => {
    try {
      await activateUser(userId).unwrap();
      toast.success("User has been activated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    } catch (error: any) {
      toastError(error, "An error occurred while activating the user.");
    }
  };

  const toastError = (error: any, defaultMessage: string) => {
    const errorMessage =
      error?.data?.message || error?.message || defaultMessage;
    toast.error(`Error: ${errorMessage}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Slide,
    });
  };

  

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16 pb-24 rounded-lg">
        {" "}
        {/* Increased bottom padding */}
        {/* Background image */}
        <img
          src="https://img.freepik.com/free-vector/people-with-smartphones-huge-monitor-background_81522-1706.jpg?t=st=1727762689~exp=1727766289~hmac=39f7dfe4564fe59aca7094efd9a94444ca031c9d6a5038b6cbfd0af73c3ee264&w=826"
          alt="User Management"
          className="absolute inset-0 -z-20 h-full w-full object-cover rounded-lg"
        />
        {/* Color overlay */}
        <div className="absolute inset-0 -z-10 bg-[#0a1244] opacity-70 rounded-lg"></div>
        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Users
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Manage all the users in your account, including their name, email,
              role, and status.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen p-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="sm:flex sm:items-center mb-6">
            <div className="sm:flex-auto"></div>
          </div>

          <div className="bg-white border-4 border-[#8dade6] shadow-md rounded-lg pb-6">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-[#8dade6]">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-bold text-white">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-white">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-white">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-white">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-white">
                    Role
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-white">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-bold text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user: TUser) => (
                  <tr key={user._id}>
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {user.id}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {user.phone}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {user.role}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700 ring-green-600/20"
                            : "bg-red-50 text-red-700 ring-red-600/20"
                        }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm ">
                      <Menu
                        as="div"
                        className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Action
                            <ChevronDownIcon
                              className="h-5 w-5 text-gray-400 ml-2"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <div>
                          <Transition as={Fragment}>
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 rounded-md focus:outline-none">
                              <div className="py-1">
                                {user.status === "Suspended" ? (
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() =>
                                          handleActivateUser(user._id)
                                        }
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700"
                                        }`}>
                                        Activate User
                                      </button>
                                    )}
                                  </Menu.Item>
                                ) : (
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() =>
                                          handleSuspendUser(user._id)
                                        }
                                        className={`block px-4 py-2 text-sm w-full text-left ${
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700"
                                        }`}>
                                        Suspend User
                                      </button>
                                    )}
                                  </Menu.Item>
                                )}
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => handleRoleChange(user._id)}
                                      className={`block px-4 py-2 text-sm w-full text-left ${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      }`}>
                                     Change Role
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </div>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
