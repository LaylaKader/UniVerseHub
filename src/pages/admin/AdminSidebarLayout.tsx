import { Dialog, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  HomeIcon,
  LightBulbIcon,
  QrCodeIcon,
  UserGroupIcon,
  XMarkIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Fragment, SetStateAction, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../Image/logo.png";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";

const navigation = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: HomeIcon,
  },
  { name: "All Courses", to: "/admin/AllCourse", icon: QrCodeIcon },

  {
    name: "Counselling",
    to: "/admin/counselling",
    icon: UserGroupIcon,
  },
  {
    name: "User Manage",
    to: "/admin/AllUser",
    icon: UserGroupIcon,
  },
  {
    name: "Resource Manage ",
    to: "/admin/AllResource",
    icon: UserGroupIcon,
  },
  { name: "F.A.Q Bot", to: "/admin/faqBot", icon: LightBulbIcon },
  { name: "AI Tutor", to: "/admin/Aitutor", icon: AcademicCapIcon },
  {
    name: "Messages",
    to: "/admin/messages",
    icon: ChatBubbleLeftEllipsisIcon,
  },
  {
    name: "Group Study",
    to: "/admin/GroupStudy",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: "Forum",
    to: "/admin/Forum",
    icon: SparklesIcon,
  },
];

const userNavigation = [{ name: "Sign out", action: "signout", to: "/" }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminSidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentNavItem, setCurrentNavItem] = useState("Dashboard"); // Initial state

  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleNavigationClick = (itemName: SetStateAction<string>) => {
    setCurrentNavItem(itemName);
    setSidebarOpen(false); // Close sidebar on navigation click for mobile view
  };

  return (
    <>
      <div className="">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full">
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 bg-white">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link to="/admin">
                        <img
                          className="h-8 w-auto"
                          src="https://res.cloudinary.com/dymnilfcs/image/upload/v1727961145/u2mi01shjx0gsbi8qubc.svg"
                          alt="Your Company"
                        />
                      </Link>
                    </div>

                    <nav className="flex flex-1 flex-col ">
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.to}
                              className={classNames(
                                currentNavItem === item.name
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-slate-950 hover:text-indigo-600 hover:bg-gray-50",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                              onClick={() => handleNavigationClick(item.name)}>
                              <item.icon
                                className={classNames(
                                  currentNavItem === item.name
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-52 lg:flex-col ">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#719cff]   px-6 pb-4">
            <Link to="/student" className="flex h-16 shrink-0 items-center">
              <img
                className="h-20 w-40 pt-5" // Adjust `h-12` for a larger image and `pt-4` for padding-top
                src="https://res.cloudinary.com/dymnilfcs/image/upload/v1727961145/u2mi01shjx0gsbi8qubc.svg"
                alt="UniverseHub"
              />
            </Link>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.to}
                          className={classNames(
                            currentNavItem === item.name
                              ? "bg-gray-50 text-black"
                              : "text-black hover:text-black hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                          onClick={() => handleNavigationClick(item.name)}>
                          <item.icon
                            className={classNames(
                              currentNavItem === item.name
                                ? "text-indigo-600"
                                : "text-black group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-52">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border  bg-[#ff933a] px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div className="h-6 w-px  hidden lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 px-10 ">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                {/* <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
                {/* <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-[#f0f0f0]"
                  placeholder="Search..."
                  type="search"
                  name="search"
                /> */}
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900"
                  aria-hidden="true"
                />

                <button
                  onClick={handleSignOut}
                  className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Sign Out</span>
                  <span className=" lg:mt-0 lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true">
                      Sign Out
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <main className="py-10 bg-[#f8f8e1] ">
            <div className="px-4 sm:px- lg:px-8">
              <Outlet></Outlet>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
