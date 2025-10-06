// import React, { useContext} from "react";
// import { Context } from "../../context/Context";
// import { motion } from "framer-motion";
// const ReceiveTable = ({collectionTableData}) => {
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
//         Receiveable
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
//                 Customer Name
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Balance
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
//                   {data?.CUSTOMER_NAME}
//                 </th>
//                 <td className="px-2 py-4">{data?.BALANCE ?? 0}</td>
               
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReceiveTable;



import React, { useContext} from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

const ReceiveTable = ({collectionTableData}) => {
  const { theme } = useContext(Context);

  // Calculate totals for footer
  const totals = collectionTableData?.reduce((acc, data) => ({
    opening: (acc.opening || 0) + (data?.OPENING || 0),
    sale: (acc.sale || 0) + (data?.SALE || 0),
    sale_return: (acc.sale_return || 0) + (data?.SALE_RETURN || 0),
    recovery: (acc.recovery || 0) + (data?.RECOVRY || 0),
    credit_note: (acc.credit_note || 0) + (data?.CREDIT_NOTE || 0),
    advance: (acc.advance || 0) + (data?.ADVANCE || 0),
    closing: (acc.closing || 0) + (data?.CLOSING || 0),
    debit_note: (acc.debit_note || 0) + (data?.DEBIT_NOTE || 0)
  }), {});

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
        Receivable Summary
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
                Customer Name
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Opening
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Sales
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Sale Return
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Recovery
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Credit Note
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Advance
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Debit Note
              </th>
              <th scope="col" className="px-1 py-3 font-semibold text-right">
                Closing
              </th>
            </motion.tr>
          </thead>
          <tbody>
            {collectionTableData?.map((data, index) => (
              <motion.tr
                key={data?.CUSTOMER_ID || data?.id || index}
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
                  {data?.CUSTOMER_NAME || data?.customer_name || 'N/A'}
                </th>
                <td className="px-2 py-4 text-right">{data?.OPENING ?? data?.opening ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.SALE ?? data?.sale ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.SALE_RETURN ?? data?.sale_return ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.RECOVRY ?? data?.recovery ?? data?.RECOVERY ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.CREDIT_NOTE ?? data?.credit_note ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.ADVANCE ?? data?.advance ?? 0}</td>
                <td className="px-2 py-4 text-right">{data?.DEBIT_NOTE ?? data?.debit_note ?? 0}</td>
                <td className="px-2 py-4 text-right font-semibold">
                  {data?.CLOSING ?? data?.closing ?? 0}
                </td>
              </motion.tr>
            ))}
            
            {/* Totals Row */}
            {totals && collectionTableData?.length > 0 && (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`${
                  theme == "dark"
                    ? "border-t-2 border-gray-400 text-[#D1D5DB] bg-[#1a2d4a] font-bold"
                    : "border-t-2 border-gray-300 bg-[#e8f4fd] font-bold"
                }`}
              >
                <th scope="row" className="px-2 py-4 whitespace-nowrap">
                  TOTAL
                </th>
                <td className="px-2 py-4 text-right">{totals.opening || 0}</td>
                <td className="px-2 py-4 text-right">{totals.sale || 0}</td>
                <td className="px-2 py-4 text-right">{totals.sale_return || 0}</td>
                <td className="px-2 py-4 text-right">{totals.recovery || 0}</td>
                <td className="px-2 py-4 text-right">{totals.credit_note || 0}</td>
                <td className="px-2 py-4 text-right">{totals.advance || 0}</td>
                <td className="px-2 py-4 text-right">{totals.debit_note || 0}</td>
                <td className="px-2 py-4 text-right">{totals.closing || 0}</td>
              </motion.tr>
            )}
            
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
                <td colSpan="9" className="px-2 py-4 text-center">
                  No receivable data available
                </td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiveTable;