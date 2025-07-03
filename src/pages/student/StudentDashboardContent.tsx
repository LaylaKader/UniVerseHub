import EnrolCourse from "./EnrolCourse";
import StudentDashboardProfile from "./StudentDashboardProfile";

const StudentDashboardContent = () => {
  return (
    <div>
      <StudentDashboardProfile />

      <div className="flex justify-center mt-11 mb-8">
        {" "}
        {/* Added mb-8 for the gap */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-8xl p-4">
          <div className="text-center text-2xl text-blue-500 font-bold">
            Subscribed Courses
          </div>
        </div>
      </div>

      <EnrolCourse />
    </div>
  );
  
};

export default StudentDashboardContent;
