// import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { FaHandHoldingUsd } from "react-icons/fa";
export default function HomeSmallCard({ heading, number}) {
  return (
    <div className="relative transform overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="bg-white px-4 py-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
            <FaHandHoldingUsd className="size-6 text-red-600" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h1 className="text-base font-semibold text-gray-900">
              {heading}
            </h1>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}