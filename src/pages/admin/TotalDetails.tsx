import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useGetAllCounsellingQuery } from "../../redux/features/Admin Management/GetAllCounselling";
import { useGetAllUserQuery } from "../../redux/features/Admin Management/getAllUser";
import { useGetAllResourceQuery } from "../../redux/features/Admin Management/getAllResource";
import { useGetAllCoursesQuery } from "../../redux/features/Student Management/getAllCourseAPI";
import { useGetAllPostsQuery } from "../../redux/features/Student Management/Forum";

export default function TotalDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Assuming these are variables for search, pagination
  const searchKeyWord = ""; // Adjust this variable based on your use case
  const page = 1; // Pagination page number
  const limit = 100; // Number of items per page

  // Data fetching from respective endpoints
  const { data: counsellingData } = useGetAllCounsellingQuery(undefined);
  const { data: userData } = useGetAllUserQuery(undefined);
  const { data: resourceData } = useGetAllResourceQuery(undefined);
  const { data: postData } = useGetAllPostsQuery(undefined);
  const { data: courseData } = useGetAllCoursesQuery({
    searchKeyWord,
    page,
    limit,
  });

  // State to track totals
  const [totalCounselling, setTotalCounselling] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const [pendingResources, setPendingResources] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  // Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Update state based on fetched data
  useEffect(() => {
    if (counsellingData?.data) {
      setTotalCounselling(counsellingData.data.length);
    }
    if (userData?.data) {
      setTotalUsers(userData.data.length);
    }
    if (resourceData?.data) {
      setTotalResources(resourceData.data.length);

      // Filter Pending Resources
      const pending = resourceData.data.filter(
        (resource) => resource.status === "Pending"
      ).length;
      setPendingResources(pending);
    }
    if (courseData?.data) {
      setTotalCourses(courseData.data.length);
    }
    if (postData?.data) {
      setTotalPosts(postData.data.length);
    }
  }, [counsellingData, userData, resourceData, courseData, postData]);

  // Updated design
  return (
    <div className="bg-gray-50 py-24 sm:py-10 shadow-xl rounded-3xl mt-10" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Platform Statistics
          </h2>
          <p className="mt-5 mb-12 text-lg leading-8 text-gray-600">
            Get a snapshot of the platform's current state with key performance
            indicators.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <dt className="text-base leading-7 text-gray-600">
              Total Counselling Sessions
            </dt>
            <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {isVisible && (
                <CountUp start={0} end={totalCounselling} duration={10} />
              )}
            </dd>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <dt className="text-base leading-7 text-gray-600">Total Users</dt>
            <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {isVisible && <CountUp start={0} end={totalUsers} duration={10} />}
            </dd>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <dt className="text-base leading-7 text-gray-600">
              Total Resources
            </dt>
            <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {isVisible && (
                <CountUp start={0} end={totalResources} duration={10} />
              )}
            </dd>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <dt className="text-base leading-7 text-gray-600">
              Pending Resources
            </dt>
            <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {isVisible && (
                <CountUp start={0} end={pendingResources} duration={10} />
              )}
            </dd>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <dt className="text-base leading-7 text-gray-600">Total Courses</dt>
            <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {isVisible && (
                <CountUp start={0} end={totalCourses} duration={10} />
              )}
            </dd>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <dt className="text-base leading-7 text-gray-600">
              Total Forum Posts
            </dt>
            <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {isVisible && <CountUp start={0} end={totalPosts} duration={10} />}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
