import {
  CreditCardIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"; // Import PlusIcon for the button
import { SetStateAction, useState } from "react";

import { useGetAllCounsellingQuery } from "../../redux/features/Admin Management/GetAllCounselling";

import MyCounselling from "./MyCounselling";
import MyCompleteCounseling from "./MyCompleteCounseling";
import { Link } from "react-router-dom";
import AllCounselling from "./AllCounselling";
import Loader from "../../components/Loader";


const tabs = [
  { name: "All Counselling", href: "#", icon: UserIcon, current: true },
  { name: "My Counselling", href: "#", icon: CreditCardIcon, current: false },
  {
    name: "My Completed Counselling",
    href: "#",
    icon: UserIcon,
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CounsellingPage() {
  const {
    data: AllCounsellingData,
    isLoading,
    error,
  } = useGetAllCounsellingQuery(undefined);

  const [currentTab, setCurrentTab] = useState(
    tabs.find((tab) => tab.current)?.name || "All Counselling"
  );

  const handleTabChange = (tabName: SetStateAction<string>) => {
    setCurrentTab(tabName);
  };

  // Example filtering based on some property
  const filteredCounsellingSessions =
    AllCounsellingData?.data?.filter(
      (session: { isBooked: any; isPayment: any }) =>
        currentTab === "All Counselling"
          ? true
          : currentTab === "My Counselling"
          ? session.isBooked
          : session.isPayment
    ) || [];

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-16 rounded-lg mb-9">
        {" "}
        {/* Reduced padding */}
        {/* Background image */}
        <img
          src="https://img.freepik.com/free-vector/women-discussing-new-message_74855-6722.jpg?t=st=1727745813~exp=1727749413~hmac=a39a7f6b9dbf40e78083f259fda025e464c9babb76a60804e78372d2b50f273d&w=900"
          alt="Students Counselling"
          className="absolute inset-0 -z-20 h-full w-full object-cover rounded-lg"
        />
        {/* Color overlay */}
        <div className="absolute inset-0 -z-10 bg-[#0a1244] opacity-70 rounded-lg"></div>
        {/* Content */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              One-on-One Counselling
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Connect with fellow students for personalized guidance and
              support. Enhance your learning experience through meaningful
              discussions and advice.
            </p>
          </div>
        </div>
      </div>

      {/* Create Counseling Button */}
      <div className="w-full max-w-2xl px-4 mb-12 ">
        <Link to="CreateCounselling">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Create Counseling
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        {/* Mobile tab selection */}
        <div className="sm:hidden w-full max-w-md px-4">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            value={currentTab}
            onChange={(e) => handleTabChange(e.target.value)}>
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden sm:block w-full max-w-2xl px-4">
          <nav
            className="isolate flex justify-center divide-x divide-gray-200 rounded-lg shadow mb-4"
            aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(tab.name)}
                className={classNames(
                  currentTab === tab.name
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-3 px-4 text-center text-sm font-medium border-b-2"
                )}
                aria-current={currentTab === tab.name ? "page" : undefined}>
                <tab.icon
                  className={classNames(
                    currentTab === tab.name
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "inline h-6 w-6 mr-2"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    currentTab === tab.name
                      ? "bg-indigo-500"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="relative w-full px-4">
          {isLoading && <Loader />}
          {error && <p>Error fetching counselling data</p>}

          {currentTab === "All Counselling" &&
            !isLoading &&
            !error &&
            filteredCounsellingSessions.length > 0 && (
              <AllCounselling></AllCounselling>
            )}

          {currentTab === "My Counselling" && !isLoading && !error && (
            <MyCounselling></MyCounselling>
          )}

          {currentTab === "My Completed Counselling" &&
            !isLoading &&
            !error && <MyCompleteCounseling></MyCompleteCounseling>}
        </div>
      </div>
    </>
  );
}
