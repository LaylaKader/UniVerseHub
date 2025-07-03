import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import { useDeleteEventMutation } from "../../redux/features/Admin Management/DeleteEvent";
import { useGetOwnerCounsellingQuery } from "../../redux/features/Admin Management/GetOwnerCounselling";
import { useMarkCompletedMutation } from "../../redux/features/Admin Management/MarkCompletedEvent";

export default function MyCounselling() {
  const { data: AllCounsellingData } = useGetOwnerCounsellingQuery(undefined);

  // Mark As Completed Mutation
  const [markCompleted] = useMarkCompletedMutation();

  // Delete Mutation
  const [deleteEvent] = useDeleteEventMutation();

  // Helper function to format date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleString("en-US", options);
  };

  // Handle mark completed button
  const handleMarkCompleted = async (eventId: any) => {
    try {
      const res = await markCompleted(eventId).unwrap();
      if (res.success) {
        toast.success("Counseling session marked as completed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error("Failed to mark as completed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // Handle delete button
  const handleDelete = async (eventId: any) => {
    try {
      const res = await deleteEvent(eventId).unwrap();
      console.log(res.success);
      if (res.success) {
        toast.info("Event deleted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error("Failed to delete event", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // Filter the counseling sessions to only show completed ones
  const completedCounsellingSessions = AllCounsellingData?.data?.filter(
    (counselling) => counselling.isCompleted === false
  );

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          My Active Counselling Sessions
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {completedCounsellingSessions?.map((counselling) => (
            <div
              key={counselling._id}
              className="shadow-xl rounded-lg overflow-hidden bg-white relative">
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={counselling.imgSrc || "default-image.jpg"}
                    alt={counselling.TopicName || "Counselling Session"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4 px-4">
                  <p className="relative text-2xl text-right font-semibold text-black">
                    {counselling.CashAmount > 0
                      ? `৳${counselling.CashAmount}`
                      : "Free"}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-black">
                    Counsellor Name:{" "}
                    <span className="font-normal">{counselling.CreateBy}</span>
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-black">
                    Topic Name:{" "}
                    <span className="font-normal">{counselling.TopicName}</span>
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-slate-800">
                    Description:{" "}
                    <span className="font-normal">
                      {counselling.Description}
                    </span>
                  </p>
                  <p className="mt-1 text-lg font-semibold text-black">
                    Type:{" "}
                    <span className="font-normal">{counselling.Type}</span>
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    Duration:{" "}
                    <span className="font-normal">{counselling.Duration}</span>{" "}
                    Minutes
                  </p>
                  <p className="mt-1 text-lg font-semibold text-black">
                    Date and Time:{" "}
                    <span className="font-normal">
                      {formatDateTime(counselling.selectDate)}
                    </span>
                  </p>

                  {/* New fields */}
                  {counselling.MeetLink && (
                    <a
                      href={counselling.MeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 text-lg text-blue-600 hover:underline">
                      Meet Link: {counselling.MeetLink}
                    </a>
                  )}
                  {counselling.StudyRoomNumber && (
                    <p className="mt-3 text-lg font-semibold text-black">
                      Study Room Number:{" "}
                      <span className="font-normal">
                        {counselling.StudyRoomNumber}
                      </span>
                    </p>
                  )}
                  {counselling.BookedByName ? (
                    <>
                      <p className="mt-3 text-lg font-semibold text-black">
                        Booked By:{" "}
                        <span className="font-normal">
                          {counselling.BookedByName}
                        </span>
                      </p>
                      <p className="mt-3 text-lg font-semibold text-black">
                        Booked By Phone:{" "}
                        <span className="font-normal">
                          {counselling.BookedByPhone}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="mt-3 text-lg font-semibold text-black">
                      Not Booked Yet
                    </p>
                  )}
                  <p className="mt-3 text-lg font-semibold text-black">
                    Payment:{" "}
                    <span className="font-normal">
                      {counselling.isPayment ? "Completed" : "Pending"}
                    </span>
                  </p>
                  <p className="mt-3 text-lg font-semibold text-black">
                    Booking Status:{" "}
                    <span className="font-normal">
                      {counselling.isBooked ? "Booked" : "Not Booked"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-8 px-6 pb-6 flex space-x-4">
                {counselling.BookedByName && (
                  <button
                    onClick={() => handleMarkCompleted(counselling._id)}
                    className="relative w-full flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Mark Completed
                  </button>
                )}

                {/* Conditionally render the Delete button if not booked */}
                {!counselling.BookedByName && (
                  <button
                    onClick={() => handleDelete(counselling._id)}
                    className="relative w-full flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
