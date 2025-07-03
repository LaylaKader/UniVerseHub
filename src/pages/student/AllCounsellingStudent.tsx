import { useState } from "react";
import { Slide, toast } from "react-toastify";
import { useGetAllCounsellingQuery } from "../../redux/features/Admin Management/GetAllCounselling";
import { useEventBookedMutation } from "../../redux/features/Student Management/EventBooked";

export default function AllCounsellingStudent() {
  const { data: AllCounsellingData } = useGetAllCounsellingQuery(undefined);
  const [eventBooked, { isLoading }] = useEventBookedMutation();
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Filter the counseling sessions to only show available (not booked) ones
  const availableCounsellingSessions = AllCounsellingData?.data?.filter(
    (counselling) => !counselling.isBooked
  );

  // Handler to book a counselling session
  const handleSendBookingId = async (id: string) => {
    console.log(id);

    setProcessingId(id); // Set the specific session as processing

    try {
      const response = await eventBooked(id).unwrap();
      console.log(response);

      // Handle payment redirection if needed
      const paymentUrl = response?.data?.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.success("Booking is successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.error("Failed to book the counselling session.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      console.error("Booking error:", error);
    } finally {
      setProcessingId(null); // Reset processing state after completion
    }
  };

  // Helper function to format date and time
  const formatDateTime = (dateTimeString: string | number | Date) => {
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

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Available Counselling Sessions
        </h2>

        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {availableCounsellingSessions?.map((counselling) => (
            <div
              key={counselling._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative">
              <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
                <img
                  src={counselling.imgSrc || "https://via.placeholder.com/400"}
                  alt={counselling.TopicName || "Counselling Session"}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xl font-bold">
                    {counselling.CashAmount > 0
                      ? `৳${counselling.CashAmount}`
                      : "Free"}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">
                  Counsellor:{" "}
                  <span className="font-normal">{counselling.CreateBy}</span>
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                  Topic:{" "}
                  <span className="font-normal">{counselling.TopicName}</span>
                </h3>
                <p className="text-lg font-semibold text-gray-600 mt-2">
                  Description:{" "}
                  <span className="font-normal">{counselling.Description}</span>
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Type: <span className="font-normal">{counselling.Type}</span>
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Duration:{" "}
                  <span className="font-normal">
                    {counselling.Duration} Minutes
                  </span>
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  Date & Time:{" "}
                  <span className="font-normal">
                    {formatDateTime(counselling.selectDate)}
                  </span>
                </p>
              </div>
              <div className="p-4">
                <button
                  onClick={() => handleSendBookingId(counselling._id)}
                  disabled={processingId === counselling._id || isLoading}
                  className={`w-full flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    processingId === counselling._id || isLoading
                      ? " cursor-not-allowed"
                      : ""
                  }`}>
                  {processingId === counselling._id
                    ? "Processing..."
                    : "Pay and Book"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
