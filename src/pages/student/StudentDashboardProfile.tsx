import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  UserIcon,
  StarIcon,
  AcademicCapIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useGetWhoLogInQuery } from "../../redux/features/Student Management/getWhoLogInAPI";
import Loader from "../../components/Loader";

export default function StudentDashboardProfile() {
  const { data, isLoading } = useGetWhoLogInQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  const profile = {
    id: data.data.id,
    name: data.data.name,
    email: data.data.email,
    avatar: data.data.imageLink,
    backgroundImage: data.data.coverLink,
    status: data.data.status,
    program: data.data.program,
    phone: data.data.phone,
    course: data.data.course,
    role: data.data.role,
  };

  return (
    <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
      <div className="relative">
        {/* Background Image with Gradient Overlay */}
        <img
          className="h-40 w-full object-cover lg:h-56"
          src={profile.backgroundImage}
          alt="Cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-75"></div>
      </div>

      <div className="relative flex items-center justify-center -mt-16">
        <div className="flex-shrink-0">
          <img
            className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            src={profile.avatar}
            alt="Avatar"
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-gray-900">{profile.name}</h1>
        <p className="text-gray-500 text-sm capitalize">{profile.role}</p>
      </div>

      <div className="px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Info Cards */}
          {[
            { icon: EnvelopeIcon, label: profile.email },
            { icon: IdentificationIcon, label: profile.id },
            { icon: UserIcon, label: profile.role, capitalize: true },
            { icon: PhoneIcon, label: profile.phone },
            { icon: StarIcon, label: profile.status, capitalize: true },
            { icon: AcademicCapIcon, label: profile.program },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center p-5 bg-white shadow-md rounded-lg border border-gray-200 transition-transform transform hover:scale-105">
              <item.icon className="h-8 w-8 text-indigo-500 mr-4" />
              <span
                className={`text-gray-700 ${
                  item.capitalize ? "capitalize" : ""
                }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        {/* Edit Profile Button */}
        <Link
          to="EditProfile"
          className="mt-8 inline-flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300">
          <PencilSquareIcon className="h-6 w-6 mr-2" />
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
