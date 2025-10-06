// import React, { useContext} from "react";
// import { Context } from "../../context/Context";
// import {motion} from "framer-motion"
// const StockTable = ({collectionTableData}) => {
//   const { theme } = useContext(Context);

  
//   return (
//     <div
//       className={`p-4 w-[91%] ${
//         theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"
//       } border-gray-100 rounded-lg`}
//     >
//       <h1
//         className={`text-2xl font-semibold mb-2 ${
//           theme === "dark" ? "text-white" : ""
//         }`}
//       >
//         Stock
//       </h1>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh]">
//         <table className="w-full text-sm text-left">
//           <thead
//             className={`${
//               theme === "dark"
//                 ? "text-white bg-[#203c63]"
//                 : "text-gray-500 bg-[#e1e1e3]"
//             } sticky top-0`}
//           >
//             <motion.tr
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className={`${
//                 theme == "dark"
//                   ? "border-b border-gray-500 text-[#D1D5DB] bg-[#203c63]"
//                   : "border-b border-gray-200 bg-[#f4f6f8] text-[#7e868c]"
//               }`}
//             >
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Product Name
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Brand
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Quantity
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Rate
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Ammount
//               </th>
//             </motion.tr>
//           </thead>
//           <tbody>
//             {collectionTableData?.map((data) => (
//               <motion.tr
//                 key={data?.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className={`${
//                   theme == "dark"
//                     ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]"
//                     : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"
//                 }`}
//               >
//                 <th
//                   scope="row"
//                   className="px-2 py-4 font-medium  whitespace-nowrap"
//                 >
//                   {data?.PRODUCT_NAME}
//                 </th>
//                 <td className="px-2 py-4">{data?.BRAND_NAME ?? 0}</td>
//                 <td className="px-2 py-4">{data?.QTY ?? 0}</td>
//                 <td className="px-2 py-4">{data?.RATE ?? 0}</td>
//                 <td className="px-2 py-4">{data?.AMOUNT ?? 0}</td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StockTable;

import React, { useContext} from "react";
import { Context } from "../../context/Context";
import {motion} from "framer-motion"

const StockTable = ({collectionTableData}) => {
  const { theme } = useContext(Context);

  return (
    <div
      className={`p-4 w-[91%] ${
        theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"
      } border-gray-100 rounded-lg`}
    >
      <h1
        className={`text-2xl font-semibold mb-2 ${
          theme === "dark" ? "text-white" : ""
        }`}
      >
        Stock Summary
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh]">
        <table className="w-full text-sm text-left">
          <thead
            className={`${
              theme === "dark"
                ? "text-white bg-[#203c63]"
                : "text-gray-500 bg-[#e1e1e3]"
            } sticky top-0`}
          >
            <motion.tr
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`${
                theme == "dark"
                  ? "border-b border-gray-500 text-[#D1D5DB] bg-[#203c63]"
                  : "border-b border-gray-200 bg-[#f4f6f8] text-[#7e868c]"
              }`}
            >
              <th scope="col" className="px-1 py-3 font-semibold">
                Product Name
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Brand
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Opening Qty
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                In Qty
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Out Qty
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Closing Qty
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Closing Rate
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Closing Amount
              </th>
            </motion.tr>
          </thead>
          <tbody>
            {collectionTableData?.map((data, index) => (
              <motion.tr
                key={data?.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                className={`${
                  theme == "dark"
                    ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]"
                    : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"
                }`}
              >
                <th
                  scope="row"
                  className="px-2 py-4 font-medium whitespace-nowrap"
                >
                  {data?.PRODUCT_NAME || data?.product_name || 'N/A'}
                </th>
                <td className="px-2 py-4">{data?.BRAND_NAME || data?.brand_name || 'N/A'}</td>
                <td className="px-2 py-4 text-right">{data?.OPENING_QTY ?? data?.opening_qty ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.IN_QTY ?? data?.in_qty ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.OUT_QTY ?? data?.out_qty ?? 0}</td>
                <td className="px-2 py-4 text-right font-semibold">
                  {data?.CLOSING_QTY ?? data?.closing_qty ?? data?.QTY ?? data?.qty ?? 0}
                </td>
                <td className="px-2 py-4 text-right">{data?.CLOSING_RATE ?? data?.closing_rate ?? data?.RATE ?? data?.rate ?? 0}</td>
                <td className="px-2 py-4 text-right font-semibold">
                  {data?.CLOSING_AMOUNT ?? data?.closing_amount ?? data?.AMOUNT ?? data?.amount ?? 0}
                </td>
              </motion.tr>
            ))}
            
            {(!collectionTableData || collectionTableData.length === 0) && (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`${
                  theme == "dark"
                    ? "border-b border-gray-500 text-[#D1D5DB] bg-[#203c63]"
                    : "border-b border-gray-200 bg-white"
                }`}
              >
                <td colSpan="8" className="px-2 py-4 text-center">
                  No stock data available
                </td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
