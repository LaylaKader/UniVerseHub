import { useGetOwnerCounsellingQuery } from "../../redux/features/Admin Management/GetOwnerCounselling";


export default function MyCompleteCounsellingStudent() {
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
    (counselling) => counselling.isCompleted
  );

  return (
    <div className="bg-white">
      <div className="mb-6 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          Completed Counselling Sessions
        </h2>

        <div className=" mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
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
                  <p className="relative text-2xl text-right font-bold text-black">
                    {counselling.CashAmount > 0
                      ? `৳${counselling.CashAmount}`
                      : "Free"}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-black">
                    Counsellor Name:{" "}
                    <span className="font-normal">{counselling.CreateBy}</span>
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-black">
                    Topic Name:{" "}
                    <span className="font-normal">{counselling.TopicName}</span>
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    Description:{" "}
                    <span className="font-normal">
                      {counselling.Description}
                    </span>
                  </p>
                  <p className="mt-2 text-lg font-semibold text-black">
                    Type:{" "}
                    <span className="font-normal">{counselling.Type}</span>
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    Duration:{" "}
                    <span className="font-normal">
                      {counselling.Duration} Minutes
                    </span>
                  </p>
                  <p className="mt-2 text-lg font-semibold text-black">
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
                    <p className="mt-2 text-lg font-semibold text-black">
                      Study Room Number:{" "}
                      <span className="font-normal">
                        {counselling.StudyRoomNumber}
                      </span>
                    </p>
                  )}
                  {counselling.BookedByName ? (
                    <>
                      <p className="mt-2 text-lg font-semibold text-black">
                        Booked By:{" "}
                        <span className="font-normal">
                          {counselling.BookedByName}
                        </span>
                      </p>
                      <p className="mt-2 text-lg font-semibold text-black">
                        Booked By Phone:{" "}
                        <span className="font-normal">
                          {counselling.BookedByPhone}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-lg font-semibold text-black">
                      Not Booked Yet
                    </p>
                  )}
                  <p className="mt-2 text-lg font-semibold text-black">
                    Payment:{" "}
                    <span className="font-normal">
                      {counselling.isPayment ? "Completed" : "Pending"}
                    </span>
                  </p>

                  <p className="mt-2 text-lg font-semibold text-black mb-6">
                    Is Completed:{" "}
                    <span className="font-normal">
                      {counselling.Completed ? "" : "Completed"}
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
