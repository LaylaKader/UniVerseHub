import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

interface Course {
  _id: string;
  courseName: string;
  createdAt: string;
  files: {
    notes: number; // Assuming files.notes is a number
    // Add other fields as needed
  };
}




function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AllCourseCard({ courses }: { courses: Course }) {
  console.log(courses);
  const { _id, courseName, createdAt, files } = courses;

  return (
    <ul role="list">
      <li
        key={_id}
        className="overflow-hidden rounded-xl border border-gray-200">
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <img
            src={`https://banner2.cleanpng.com/20180406/vfe/kisspng-massive-open-online-course-learning-management-sys-toga-5ac79dcf4a8032.9003689215230315033052.jpg`}
            alt={_id}
            className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
          />
          <div className="text-sm font-medium leading-6 text-gray-900">
            {courseName}
          </div>
          <Menu as="div" className="relative ml-auto">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open options</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}>
                      View<span className="sr-only">, {courseName}</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                      )}>
                      Edit<span className="sr-only">, {courseName}</span>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Total Notes</dt>
            <dd className="text-gray-700">{files.notes}</dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Amount</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">{createdAt}</div>
            </dd>
          </div>
        </dl>
      </li>
    </ul>
  );
}
