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



// import React, { useContext} from "react";
// import { Context } from "../../context/Context";
// import { motion } from "framer-motion";

// const ReceiveTable = ({collectionTableData}) => {
//   const { theme } = useContext(Context);

//   // Calculate totals for footer
//   const totals = collectionTableData?.reduce((acc, data) => ({
//     opening: (acc.opening || 0) + (data?.OPENING || 0),
//     sale: (acc.sale || 0) + (data?.SALE || 0),
//     sale_return: (acc.sale_return || 0) + (data?.SALE_RETURN || 0),
//     recovery: (acc.recovery || 0) + (data?.RECOVRY || 0),
//     credit_note: (acc.credit_note || 0) + (data?.CREDIT_NOTE || 0),
//     advance: (acc.advance || 0) + (data?.ADVANCE || 0),
//     closing: (acc.closing || 0) + (data?.CLOSING || 0),
//     debit_note: (acc.debit_note || 0) + (data?.DEBIT_NOTE || 0)
//   }), {});

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
//         Receivable Summary
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
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Opening
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Sales
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Sale Return
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Recovery
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Credit Note
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Advance
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Debit Note
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold text-right">
//                 Closing
//               </th>
//             </motion.tr>
//           </thead>
//           <tbody>
//             {collectionTableData?.map((data, index) => (
//               <motion.tr
//                 key={data?.CUSTOMER_ID || data?.id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
//                 className={`${
//                   theme == "dark"
//                     ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]"
//                     : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"
//                 }`}
//               >
//                 <th
//                   scope="row"
//                   className="px-2 py-4 font-medium whitespace-nowrap"
//                 >
//                   {data?.CUSTOMER_NAME || data?.customer_name || 'N/A'}
//                 </th>
//                 <td className="px-2 py-4 text-right">{data?.OPENING ?? data?.opening ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.SALE ?? data?.sale ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.SALE_RETURN ?? data?.sale_return ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.RECOVRY ?? data?.recovery ?? data?.RECOVERY ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.CREDIT_NOTE ?? data?.credit_note ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.ADVANCE ?? data?.advance ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.DEBIT_NOTE ?? data?.debit_note ?? 0}</td>
//                 <td className="px-2 py-4 text-right font-semibold">
//                   {data?.CLOSING ?? data?.closing ?? 0}
//                 </td>
//               </motion.tr>
//             ))}
            
//             {/* Totals Row */}
//             {totals && collectionTableData?.length > 0 && (
//               <motion.tr
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className={`${
//                   theme == "dark"
//                     ? "border-t-2 border-gray-400 text-[#D1D5DB] bg-[#1a2d4a] font-bold"
//                     : "border-t-2 border-gray-300 bg-[#e8f4fd] font-bold"
//                 }`}
//               >
//                 <th scope="row" className="px-2 py-4 whitespace-nowrap">
//                   TOTAL
//                 </th>
//                 <td className="px-2 py-4 text-right">{totals.opening || 0}</td>
//                 <td className="px-2 py-4 text-right">{totals.sale || 0}</td>
//                 <td className="px-2 py-4 text-right">{totals.sale_return || 0}</td>
//                 <td className="px-2 py-4 text-right">{totals.recovery || 0}</td>
//                 <td className="px-2 py-4 text-right">{totals.credit_note || 0}</td>
//                 <td className="px-2 py-4 text-right">{totals.advance || 0}</td>
//                 <td className="px-2 py-4 text-right">{totals.debit_note || 0}</td>
//                 <td className="px-2 py-4 text-right">{totals.closing || 0}</td>
//               </motion.tr>
//             )}
            
//             {(!collectionTableData || collectionTableData.length === 0) && (
//               <motion.tr
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className={`${
//                   theme == "dark"
//                     ? "border-b border-gray-500 text-[#D1D5DB] bg-[#203c63]"
//                     : "border-b border-gray-200 bg-white"
//                 }`}
//               >
//                 <td colSpan="9" className="px-2 py-4 text-center">
//                   No receivable data available
//                 </td>
//               </motion.tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReceiveTable;

import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

const ReceiveTable = ({ collectionTableData }) => {
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

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num || 0);
  };

  // Summary cards data
  const summaryCards = [
    { 
      label: "Opening Balance", 
      value: totals?.opening || 0, 
      color: "blue",
      icon: "📊"
    },
    { 
      label: "Total Sales", 
      value: totals?.sale || 0, 
      color: "green",
      icon: "💰"
    },
    { 
      label: "Sale Return", 
      value: totals?.sale_return || 0, 
      color: "orange",
      icon: "↩️"
    },
    { 
      label: "Recovery", 
      value: totals?.recovery || 0, 
      color: "teal",
      icon: "🔄"
    },
    { 
      label: "Advance", 
      value: totals?.advance || 0, 
      color: "purple",
      icon: "⏩"
    },
    { 
      label: "Credit Note", 
      value: totals?.credit_note || 0, 
      color: "red",
      icon: "📝"
    },
    { 
      label: "Closing Balance", 
      value: totals?.closing || 0, 
      color: "indigo",
      icon: "🎯"
    }
  ];

  const getColorClasses = (color, isDark) => {
    const colorMap = {
      blue: {
        bg: isDark ? "bg-blue-900/30" : "bg-blue-50",
        text: isDark ? "text-blue-300" : "text-blue-700",
        border: isDark ? "border-blue-700" : "border-blue-200",
        value: isDark ? "text-blue-400" : "text-blue-600"
      },
      green: {
        bg: isDark ? "bg-green-900/30" : "bg-green-50",
        text: isDark ? "text-green-300" : "text-green-700",
        border: isDark ? "border-green-700" : "border-green-200",
        value: isDark ? "text-green-400" : "text-green-600"
      },
      orange: {
        bg: isDark ? "bg-orange-900/30" : "bg-orange-50",
        text: isDark ? "text-orange-300" : "text-orange-700",
        border: isDark ? "border-orange-700" : "border-orange-200",
        value: isDark ? "text-orange-400" : "text-orange-600"
      },
      teal: {
        bg: isDark ? "bg-teal-900/30" : "bg-teal-50",
        text: isDark ? "text-teal-300" : "text-teal-700",
        border: isDark ? "border-teal-700" : "border-teal-200",
        value: isDark ? "text-teal-400" : "text-teal-600"
      },
      purple: {
        bg: isDark ? "bg-purple-900/30" : "bg-purple-50",
        text: isDark ? "text-purple-300" : "text-purple-700",
        border: isDark ? "border-purple-700" : "border-purple-200",
        value: isDark ? "text-purple-400" : "text-purple-600"
      },
      red: {
        bg: isDark ? "bg-red-900/30" : "bg-red-50",
        text: isDark ? "text-red-300" : "text-red-700",
        border: isDark ? "border-red-700" : "border-red-200",
        value: isDark ? "text-red-400" : "text-red-600"
      },
      indigo: {
        bg: isDark ? "bg-indigo-900/30" : "bg-indigo-50",
        text: isDark ? "text-indigo-300" : "text-indigo-700",
        border: isDark ? "border-indigo-700" : "border-indigo-200",
        value: isDark ? "text-indigo-400" : "text-indigo-600"
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 w-full ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-gray-700" 
          : "bg-white shadow-xl border-gray-200"
      } border rounded-2xl backdrop-blur-sm`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>
            Receivable Summary
          </h1>
          <p className={`mt-1 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Overview of customer receivables and transactions
          </p>
        </div>
        
        {/* Summary Stats */}
        {totals && collectionTableData?.length > 0 && (
          <div className={`flex items-center gap-4 mt-3 sm:mt-0 px-4 py-2 rounded-xl ${
            theme === "dark" ? "bg-gray-700" : "bg-blue-50"
          }`}>
            <div className="text-center">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Total Closing
              </div>
              <div className={`text-lg font-bold ${
                theme === "dark" ? "text-green-400" : "text-green-600"
              }`}>
                {formatNumber(totals.closing)}
              </div>
            </div>
            <div className="w-px h-8 bg-gray-400 opacity-40"></div>
            <div className="text-center">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Customers
              </div>
              <div className={`text-lg font-bold ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}>
                {collectionTableData.length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Cards Section */}
      {totals && collectionTableData?.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Financial Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {summaryCards.map((card, index) => {
              const colors = getColorClasses(card.color, theme === "dark");
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-3 rounded-xl border-2 ${colors.bg} ${colors.border} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{card.icon}</span>
                    <span className={`text-xs font-medium ${colors.text}`}>
                      {card.label}
                    </span>
                  </div>
                  <div className={`text-sm font-bold font-mono ${colors.value}`}>
                    {formatNumber(card.value)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Table Container */}
      <div className={`relative overflow-hidden rounded-xl border ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}>
        <div className="overflow-x-auto max-h-[60vh] custom-scrollbar">
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead className={`sticky top-0 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-blue-900 to-purple-900 text-white" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            } shadow-lg`}>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <th scope="col" className="px-4 py-4 font-semibold text-left rounded-tl-xl">
                  <div className="flex items-center gap-2">
                    <span>Customer Name</span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-4 font-semibold text-right">
                  Opening
                </th>
                <th scope="col" className="px-3 py-4 font-semibold text-right">
                  Sales
                </th>
                <th scope="col" className="px-3 py-4 font-semibold text-right">
                  Sale Return
                </th>
                <th scope="col" className="px-3 py-4 font-semibold text-right">
                  Recovery
                </th>
                <th scope="col" className="px-3 py-4 font-semibold text-right">
                  Credit Note
                </th>
                <th scope="col" className="px-3 py-4 font-semibold text-right">
                  Advance
                </th>
                <th scope="col" className="px-3 py-4 font-semibold text-right">
                  Debit Note
                </th>
                <th scope="col" className="px-4 py-4 font-semibold text-right rounded-tr-xl">
                  Closing
                </th>
              </motion.tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {collectionTableData?.map((data, index) => (
                <motion.tr
                  key={data?.CUSTOMER_ID || data?.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`group transition-all duration-200 ${
                    theme === "dark"
                      ? `border-b border-gray-700 hover:bg-gray-750 ${
                          index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/80'
                        }`
                      : `border-b border-gray-100 hover:bg-blue-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`
                  } hover:scale-[1.002] hover:shadow-md`}
                >
                  {/* Customer Name */}
                  <th scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                    <div className={`transition-colors ${
                      theme === "dark" ? "text-white group-hover:text-blue-300" : "text-gray-900 group-hover:text-blue-600"
                    }`}>
                      {data?.CUSTOMER_NAME || data?.customer_name || 'N/A'}
                    </div>
                  </th>

                  {/* Numeric Columns */}
                  {[
                    data?.OPENING ?? data?.opening ?? 0,
                    data?.SALE ?? data?.sale ?? 0,
                    data?.SALE_RETURN ?? data?.sale_return ?? 0,
                    data?.RECOVRY ?? data?.recovery ?? data?.RECOVERY ?? 0,
                    data?.CREDIT_NOTE ?? data?.credit_note ?? 0,
                    data?.ADVANCE ?? data?.advance ?? 0,
                    data?.DEBIT_NOTE ?? data?.debit_note ?? 0,
                  ].map((value, colIndex) => (
                    <td key={colIndex} className="px-3 py-4 text-right font-mono text-sm">
                      <span className={`
                        ${value < 0 ? 'text-red-500' : 
                          value === 0 ? 'text-gray-400' : 
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                      `}>
                        {formatNumber(value)}
                      </span>
                    </td>
                  ))}

                  {/* Closing Amount */}
                  <td className="px-4 py-4 text-right font-mono font-semibold">
                    <span className={`
                      ${(data?.CLOSING ?? data?.closing ?? 0) < 0 ? 'text-red-500' : 
                        (data?.CLOSING ?? data?.closing ?? 0) === 0 ? 'text-gray-400' : 
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'}
                    `}>
                      {formatNumber(data?.CLOSING ?? data?.closing ?? 0)}
                    </span>
                  </td>
                </motion.tr>
              ))}
              
              {/* Empty State */}
              {(!collectionTableData || collectionTableData.length === 0) && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <td colSpan="9" className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${
                        theme === "dark" ? "bg-gray-700 text-gray-500" : "bg-gray-100 text-gray-400"
                      }`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className={`text-lg font-medium mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        No receivable data available
                      </h3>
                      <p className={`text-sm ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}>
                        There are no records to display for the selected period
                      </p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>

            {/* Totals Footer */}
            {totals && collectionTableData?.length > 0 && (
              <tfoot>
                <motion.tr
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    theme === "dark"
                      ? "bg-gradient-to-r from-gray-800 to-gray-900 border-t-2 border-gray-600 text-white"
                      : "bg-gradient-to-r from-blue-50 to-purple-50 border-t-2 border-blue-200 text-gray-800"
                  } font-bold sticky bottom-0 shadow-lg`}
                >
                  <th scope="row" className="px-4 py-4 whitespace-nowrap rounded-bl-xl">
                    <div className="flex items-center gap-2">
                      <span>TOTAL</span>
                      <span className={`text-xs font-normal px-2 py-1 rounded ${
                        theme === "dark" ? "bg-gray-700" : "bg-blue-200"
                      }`}>
                        {collectionTableData.length} customers
                      </span>
                    </div>
                  </th>
                  {[
                    totals.opening || 0,
                    totals.sale || 0,
                    totals.sale_return || 0,
                    totals.recovery || 0,
                    totals.credit_note || 0,
                    totals.advance || 0,
                    totals.debit_note || 0,
                  ].map((value, index) => (
                    <td key={index} className="px-3 py-4 text-right font-mono">
                      <span className={value < 0 ? 'text-red-500' : value === 0 ? 'text-gray-400' : ''}>
                        {formatNumber(value)}
                      </span>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-right font-mono rounded-br-xl">
                    <span className={`
                      ${totals.closing < 0 ? 'text-red-500' : 
                        totals.closing === 0 ? 'text-gray-400' : 
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'}
                    `}>
                      {formatNumber(totals.closing)}
                    </span>
                  </td>
                </motion.tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#374151' : '#f1f5f9'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#6b7280' : '#cbd5e1'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'dark' ? '#9ca3af' : '#94a3b8'};
        }
      `}</style>
    </motion.div>
  );
};

export default ReceiveTable;