import AdminDashboardProfile from "./AdminDashboardProfile";
import TotalDetails from "./TotalDetails";

const AdminDashboardContent = () => {
  return (
    <div>
      <AdminDashboardProfile></AdminDashboardProfile>
      <TotalDetails></TotalDetails>
      <div className="text-center text-2xl text-orange-500  font-bold mt-11"></div>
    </div>
  );
};

export default AdminDashboardContent;
