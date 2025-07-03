import AdminDashboardContent from "../pages/admin/AdminDashboardContent";

import AllCourseAndCreate from "../pages/admin/AllCourseAndCreate";
import EditProfile from "../pages/student/EditProfile";
import FileUploaded from "../pages/student/FileUploaded";
import SingleCoursePreview from "../pages/student/SingleCoursePreview";

import AllUserManage from "../pages/admin/AllUserManage";
import CounsellingPage from "../pages/admin/CounsellingPage";
import CreateCounseling from "../pages/admin/CreateCounselling";
import Message from "../pages/admin/Message";
import ResourceMange from "../pages/admin/ResourceMange";

import Forum from "../pages/student/Forum";
import SingleForum from "../pages/student/SingleForum";
import GroupStudy from "../pages/student/GroupStudy";
import GroupStudyCreate from "../pages/student/GroupStudyCreate";
import FaqBot from "../pages/student/FaqBot";
import AiTutor from "../pages/student/AiTutor";
export const adminPaths = [
  {
    index: true,
    element: <AdminDashboardContent></AdminDashboardContent>,
  },
  {
    path: "dashboard",
    element: <AdminDashboardContent></AdminDashboardContent>,
  },

  {
    path: "EditProfile",
    element: <EditProfile />,
  },
  {
    path: "dashboard/EditProfile",
    element: <EditProfile />,
  },
  {
    path: "AllCourse",
    element: <AllCourseAndCreate />,
  },
  {
    path: "course/:id",
    element: <SingleCoursePreview />,
  },
  {
    path: "fileUpload/:id",
    element: <FileUploaded></FileUploaded>,
  },
  {
    path: "Counselling",
    element: <CounsellingPage></CounsellingPage>,
  },
  {
    path: "Counselling/CreateCounselling",
    element: <CreateCounseling></CreateCounseling>,
  },
  {
    path: "AllUser",
    element: <AllUserManage></AllUserManage>,
  },
  {
    path: "AllResource",
    element: <ResourceMange></ResourceMange>,
  },
  {
    path: "messages",
    element: <Message></Message>,
  },
  {
    path: "GroupStudy",
    element: <GroupStudy></GroupStudy>,
  },
  {
    path: "GroupStudy/CreateCounselling",
    element: <GroupStudyCreate></GroupStudyCreate>,
  },
  {
    path: "Forum",
    element: <Forum></Forum>,
  },
  {
    path: "Forum/posts/:postId",
    element: <SingleForum></SingleForum>,
  },
  {
    path: "FaqBot",
    element: <FaqBot></FaqBot>,
  },
  {
    path: "AiTutor",
    element: <AiTutor></AiTutor>,
  },
];
