
import { useGetOwnerCounsellingQuery } from "../../redux/features/Admin Management/GetOwnerCounselling";



export default function MyBookedCounsellingStudent() {
  const { data: AllCounsellingData } = useGetOwnerCounsellingQuery(undefined);

  

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


  // Filter the counseling sessions to only show completed ones
  const completedCounsellingSessions = AllCounsellingData?.data?.filter(
    (counselling) => counselling.isBooked === true
  );



  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-500">
          My Booked Counselling Sessions
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 mb-5">
          {completedCounsellingSessions?.map((counselling) => (
            <div
              key={counselling._id}
              className="shadow-xl rounded-lg overflow-hidden bg-white relative pb-6">
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={counselling.imgSrc || "default-image.jpg"}
                    alt={counselling.TopicName || "Counselling Session"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4 px-4">
                  <p className="relative text-2xl text-right font-semibold text-gray-900">
                    {counselling.CashAmount > 0
                      ? `৳${counselling.CashAmount}`
                      : "Free"}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    Counsellor Name:{" "}
                    <span className="font-normal">{counselling.CreateBy}</span>
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    Topic Name:{" "}
                    <span className="font-normal">{counselling.TopicName}</span>
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    Description:{" "}
                    <span className="font-normal">
                      {counselling.Description}
                    </span>
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
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
                      
                    </>
                  ) : (
                    <p className="mt-3 text-lg font-semibold text-black">
                      Not Booked Yet
                    </p>
                  )}
                  <p className="mt-3 text-lg font-semibold text-black">
                    Payment:{" "}
                    <span className="font-normal">
                      {counselling.isPayment === true ? "Completed" : "Pending"}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
