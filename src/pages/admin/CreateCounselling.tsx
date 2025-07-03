import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CounselingFormData } from "../../Types/FileType";

import { useCreateCounselingMutation } from "../../redux/features/Admin Management/CreateCounselling";
import Loader from "../../components/Loader";

export default function CreateCounseling() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CounselingFormData>();

  const [EventInformation, { isLoading }] = useCreateCounselingMutation();
  const [type, setType] = useState<"online" | "offline">("online");
  const [isFree, setIsFree] = useState<boolean>(true);

  const onSubmit = async (data: CounselingFormData) => {
    const formattedData = {
      ...data,
      CashAmount: isFree ? 0 : Number(data.CashAmount),
      Type: type,
      selectDate: new Date(data.selectDate).toISOString(),
      MeetLink: type === "online" ? data.MeetLink : null,
      imgSrc:
        data.imgSrc ||
        "https://img.freepik.com/free-vector/organic-flat-customer-support-illustrated_23-2148923865.jpg?t=st=1725410152~exp=1725413752~hmac=b1f29afceebe0be8278aa844a1d4d500a70b6a60ce7974771630e876b62c3c80&w=996",
    };

    try {
      if (isLoading) return <div className="h-screen w-screen flex justify-center items-center"><Loader /></div>;

      await EventInformation(formattedData).unwrap();
      toast.success("Counseling created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      toast.error("Failed to create counseling", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    }

    reset();
  };

  const handleCreateMeetLink = () => {
    window.open("https://meet.google.com/new", "_blank");
  };

  return (
    <div className="text-black flex justify-center items-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Counseling Session
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Topic Name */}
          <div>
            <label
              htmlFor="TopicName"
              className="block text-sm font-semibold text-gray-700 mb-2">
              Topic Name
            </label>
            <input
              {...register("TopicName", { required: "Topic Name is required" })}
              type="text"
              id="TopicName"
              placeholder="Enter the topic of the session"
              className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.TopicName && (
              <span className="text-red-500 text-sm">
                {errors.TopicName.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="Description"
              className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("Description", {
                required: "Description is required",
              })}
              id="Description"
              rows={4}
              placeholder="Provide a detailed description of the session"
              className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.Description && (
              <span className="text-red-500 text-sm">
                {errors.Description.message}
              </span>
            )}
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="Duration"
              className="block text-sm font-semibold text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <select
              {...register("Duration", { required: "Duration is required" })}
              id="Duration"
              className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((duration) => (
                <option key={duration} value={duration}>
                  {duration} minutes
                </option>
              ))}
            </select>
            {errors.Duration && (
              <span className="text-red-500 text-sm">
                {errors.Duration.message}
              </span>
            )}
          </div>

          {/* Image Source */}
          <div>
            <label
              htmlFor="imgSrc"
              className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              {...register("imgSrc")}
              type="text"
              id="imgSrc"
              placeholder="Optional: Provide a link to an image"
              className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Date and Time */}
          <div>
            <label
              htmlFor="selectDate"
              className="block text-sm font-semibold text-gray-700 mb-2">
              Pick Date and Time
            </label>
            <input
              {...register("selectDate", {
                required: "Date and Time are required",
              })}
              type="datetime-local"
              id="selectDate"
              className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.selectDate && (
              <span className="text-red-500 text-sm">
                {errors.selectDate.message}
              </span>
            )}
          </div>

          {/* Session Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Session Type
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="online"
                  checked={type === "online"}
                  onChange={() => setType("online")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-sm">Online</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="offline"
                  checked={type === "offline"}
                  onChange={() => setType("offline")}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-sm">Offline</span>
              </label>
            </div>
          </div>

          {/* Conditional Fields */}
          {type === "online" && (
            <div>
              <label
                htmlFor="MeetLink"
                className="block text-sm font-semibold text-gray-700 mb-2">
                Meeting Link
              </label>
              <div className="flex items-center">
                <input
                  {...register("MeetLink")}
                  type="text"
                  id="MeetLink"
                  placeholder="Enter or generate a Meet link"
                  className="flex-1 block rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleCreateMeetLink}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Create Meet Link
                </button>
              </div>
            </div>
          )}

          {type === "offline" && (
            <div>
              <label
                htmlFor="StudyRoomNumber"
                className="block text-sm font-semibold text-gray-700 mb-2">
                Study Room Number
              </label>
              <input
                {...register("StudyRoomNumber", {
                  required: type === "offline",
                })}
                type="text"
                id="StudyRoomNumber"
                placeholder="Enter the study room number"
                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.StudyRoomNumber && (
                <span className="text-red-500 text-sm">
                  {errors.StudyRoomNumber.message}
                </span>
              )}
            </div>
          )}

          {/* Cost Option */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cost
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={true}
                  checked={isFree}
                  onChange={() => setIsFree(true)}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-sm">Free</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={false}
                  checked={!isFree}
                  onChange={() => setIsFree(false)}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-sm">Paid</span>
              </label>
            </div>
          </div>

          {/* Cash Amount */}
          {!isFree && (
            <div>
              <label
                htmlFor="CashAmount"
                className="block text-sm font-semibold text-gray-700 mb-2">
                Cash Amount
              </label>
              <input
                {...register("CashAmount", { required: !isFree })}
                type="number"
                id="CashAmount"
                placeholder="Enter the cost amount"
                className="block w-full rounded-md border border-gray-300 py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.CashAmount && (
                <span className="text-red-500 text-sm">
                  {errors.CashAmount.message}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-x-4 border-t border-gray-300 pt-4">
            <button
              type="button"
              className="text-sm font-semibold text-gray-900 hover:text-gray-700">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
