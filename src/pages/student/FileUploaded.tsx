import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUploadFileMutation } from "../../redux/features/Student Management/fileuploadAPI";
import { useGetSingleCourseQuery } from "../../redux/features/Student Management/getSingleCoursePreviewAPI";

export default function FileUploaded() {
  const { id } = useParams<{ id: string }>();
  const { data: courseData } = useGetSingleCourseQuery(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();
  const [uploadFile] = useUploadFileMutation();

  const [fileName, setFileName] = useState("");

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const uploadData = new FormData();

    if (courseData) {
      uploadData.append("file", formData.file[0]);
      uploadData.append("type", formData.type);
      uploadData.append("fileName", formData.title);
      uploadData.append("fileDescription", formData.Description);
      uploadData.append("courseId", courseData.data._id);
      uploadData.append("courseName", courseData.data.courseName);
    }

    try {
      await uploadFile(uploadData).unwrap();
      toast.success("File uploaded successfully. Waiting for admin approval.");

      reset();
      setFileName("");
    } catch (error) {
      toast.error(`File upload failed: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 bg-white p-5">
        <ToastContainer />
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold leading-7 text-gray-900">
              File Upload
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              This information will be displayed publicly, so be careful what
              you share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="title"
                    {...register("title", { required: true })}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Spring Mid question"
                  />
                </div>
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">Title is required</p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="Description"
                  rows={3}
                  {...register("Description", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Provide a brief description of the file"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600"></p>
              {errors.Description && (
                <p className="text-red-500 text-xs mt-1">
                  Description is required
                </p>
              )}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900">
                Select File
              </label>
              <div className="mt-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-16 w-16 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Select a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        {...register("file", {
                          required: true,
                          onChange: (e) =>
                            setFileName(e.target.files[0]?.name || ""),
                        })}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {fileName && (
                    <p className="text-sm text-gray-600 mt-2">{fileName}</p>
                  )}
                  {errors.file && (
                    <p className="text-red-500 text-xs mt-1">
                      File is required
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  File Type
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Which type of file is this?
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      type="radio"
                      value="Question"
                      {...register("type", { required: true })}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Question
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      type="radio"
                      value="Video"
                      {...register("type", { required: true })}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Video
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      type="radio"
                      value="Personal Note"
                      {...register("type", { required: true })}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Personal Note
                    </label>
                  </div>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">
                    File type is required
                  </p>
                )}
              </fieldset>
            </div>
          </div>
        </div>{" "}
        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Upload
          </button>
        </div>
      </div>
    </form>
  );
}
