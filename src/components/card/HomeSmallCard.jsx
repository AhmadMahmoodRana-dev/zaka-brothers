// // import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
// import { FaHandHoldingUsd } from "react-icons/fa";
// export default function HomeSmallCard({ heading, number,open}) {
//   return (
//     <div onClick={() => open()} className="relative transform overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
//       <div className="bg-white px-4 py-5 pb-4 sm:p-6 sm:pb-4">
//         <div className="sm:flex sm:items-start">
//           <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
//             <FaHandHoldingUsd className="size-6 text-red-600" />
//           </div>
//           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//             <h1 className="text-base font-semibold text-gray-900">
//               {heading}
//             </h1>
//             <div className="mt-2">
//               <p className="text-sm text-gray-500">{number}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// HomeSmallCard.jsx
// export default function HomeSmallCard({ heading, number, open, icon, loading }) {
//   return (
//     <div 
//       onClick={() => open()} 
//       className={`relative transform overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg hover:-translate-y-1 ${
//         loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//       }`}
//     >
//       <div className="bg-white px-4 py-5 pb-4 sm:p-6 sm:pb-4">
//         <div className="sm:flex sm:items-start">
//           <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
//             {icon || <FaHandHoldingUsd className="size-6 text-blue-600" />}
//           </div>
//           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//             <h1 className="text-base font-semibold text-gray-900">
//               {heading}
//             </h1>
//             <div className="mt-2">
//               <p className="text-sm text-gray-500">
//                 {loading ? 'Loading...' : number}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { FaHandHoldingUsd } from "react-icons/fa";

export default function HomeSmallCard({ heading, number, open, icon, loading }) {
  return (
    <div 
      onClick={() => !loading && open()} 
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-300 group
        ${loading 
          ? 'opacity-70 cursor-not-allowed bg-gradient-to-br from-gray-100 to-gray-200' 
          : 'cursor-pointer bg-gradient-to-br from-white to-blue-50/50 hover:from-blue-50 hover:to-white hover:scale-105 hover:-translate-y-1'
        }
        shadow-lg hover:shadow-2xl border border-gray-100/80
      `}
    >
      {/* Background Animation Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <div className="relative px-6 py-6">
        <div className="flex items-start justify-between">
          {/* Icon Section */}
          <div className={`
            relative p-3 rounded-2xl transition-all duration-300 group-hover:scale-110
            ${loading 
              ? 'bg-gray-200' 
              : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25'
            }
          `}>
            <div className="text-white text-xl">
              {loading ? (
                <div className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                icon || <FaHandHoldingUsd className="size-6" />
              )}
            </div>
            
            {/* Icon Glow Effect */}
            {!loading && (
              <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-sm group-hover:bg-blue-400/30 transition-all duration-300" />
            )}
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="flex-1 ml-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4" />
              <div className="h-6 bg-gray-400 rounded animate-pulse w-1/2" />
            </div>
          )}
        </div>

        {/* Content Section */}
        {!loading && (
          <div className="mt-6 space-y-2">
            <h3 className={`
              text-sm font-semibold uppercase tracking-wide transition-colors duration-300
              text-gray-600 group-hover:text-gray-800
            `}>
              {heading}
            </h3>
            
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold transition-all duration-300 group-hover:scale-105 text-gray-900 group-hover:text-blue-700">
                {number}
              </p>
              
              {/* Pulse Animation for Active Cards */}
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Border Animation */}
        {!loading && (
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full" />
        )}
      </div>

      {/* Hover Effect Overlay */}
      {!loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      )}
    </div>
  );
}