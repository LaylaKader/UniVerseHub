import { useForm } from "react-hook-form";
import { Slide, toast } from "react-toastify";
import { useCreateGroupStudyMutation } from "../../redux/features/Student Management/GroupStudy";


export default function GroupStudyCreate() {
  
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Initialize mutation from Redux
  const [createGroupStudy, { isLoading }] = useCreateGroupStudyMutation();

  // Form submission handler
  const onSubmit = async (data) => {
    const formData = {
      ...data,
    
    };

    
    try {
      // Trigger mutation to create a group study
      const res = await createGroupStudy(formData);
    
      if (res?.data.success === true) {
        toast.success("Study group created successfully", {
          position: "top-right",
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
      toast.error("Failed to create study group", {
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

    reset();
  };

  // Handle generating a new Google Meet link
  const handleCreateMeetLink = () => {
    window.open("https://meet.google.com/new", "_blank");
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 -mt-10 -mx-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create a New Study Group
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Fill out the form below to create a new study group.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)} // Bind form submission to react-hook-form's handleSubmit
        className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-semibold leading-6 text-gray-900">
              Topic
            </label>
            <div className="mt-2.5">
              <input
                id="topic"
                name="topic"
                type="text"
                placeholder="Enter study group topic"
                autoComplete="off"
                {...register("topic", { required: "Topic is required" })} // Register input
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.topic && (
                <span className="text-red-600">{errors.topic.message}</span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="Description"
              className="block text-sm font-semibold leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2.5">
              <input
                id="Description"
                name="Description"
                type="text"
                placeholder="Enter a description"
                autoComplete="off"
                {...register("Description", {
                  required: "Description is required",
                })}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.Description && (
                <span className="text-red-600">
                  {errors.Description.message}
                </span>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="datetime"
              className="block text-sm font-semibold leading-6 text-gray-900">
              Date and Time
            </label>
            <div className="mt-2.5">
              <input
                id="selectDate"
                name="selectDate"
                type="datetime-local"
                placeholder="Select date and time"
                {...register("selectDate", {
                  required: "Date and time are required",
                })}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.datetime && (
                <span className="text-red-600">{errors.datetime.message}</span>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
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
                  className="flex-1 block rounded-md border-black border-2 py-2 px-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleCreateMeetLink}
                  className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Create Meet Link
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {isLoading ? "Creating..." : "Create Study Group"}
          </button>
        </div>
      </form>
    </div>
  );
}
