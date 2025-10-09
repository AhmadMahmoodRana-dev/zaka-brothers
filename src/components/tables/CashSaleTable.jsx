// import React, { useContext } from "react";
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { Context } from "../../context/Context";
// import { motion } from "framer-motion";
// const CashSaleTable = ({ collectionTableData }) => {
//   const { theme } = useContext(Context);

//   const calculatePercentageChange = (current, previous) => {
//     if (previous === 0) return current > 0 ? 100 : 0;
//     return ((current - previous) / previous) * 100;
//   };

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const renderPercentageChange = (current, previous) => {
//     const change = calculatePercentageChange(current, previous);
//     const isPositive = change >= 0;

//     return (
//       <td
//         className={`px-2 py-4 flex items-center gap-2 ${
//           isPositive ? "text-[#00a76f]" : "text-red-600"
//         }`}
//       >
//         {isPositive ? <FaArrowUp /> : <FaArrowDown />}
//         <p>{formatNumber(change)}%</p>
//       </td>
//     );
//   };

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
//         Sale
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
//                 Branch Name
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Cash Sale
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Cash Unit
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Opening
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Credit Sale
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Credit Units
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Recoveved
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Balance
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 I.S Sale
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 I.S Adv
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Unit
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Ex.Adv I.S
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Lm.Adv I.S
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Adv.Ratio
//               </th>
//             </motion.tr>
//           </thead>
//           <tbody>
//             {collectionTableData.map((data) => (
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
//                   {data?.BRANCH_NAME}
//                 </th>
//                 <td className="px-2 py-4">{data?.CASH_SALE ?? 0}</td>
//                 <td className="px-2 py-4">{data?.CASH_UNIT ?? 0}</td>
//                 <td className="px-2 py-4">{data?.OPENING ?? 0}</td>
//                 <td className="px-2 py-4">{data?.CREDIT_SALE ?? 0}</td>
//                 <td className="px-2 py-4">{data?.CREDIT_UNIT ?? 0}</td>
//                 <td className="px-2 py-4">{data?.CR_RECOVERY ?? 0}</td>
//                 <td className="px-2 py-4">{data?.REMAINING ?? 0}</td>
//                 <td className="px-2 py-4">{data?.INSTALL_SALE ?? 0}</td>
//                 <td className="px-2 py-4">{data?.INST_ADVANCE ?? 0}</td>
//                 <td className="px-2 py-4">{data?.INSTALLMENT_UNIT ?? 0}</td>
//                 <td className="px-2 py-4">{data?.EX_ADV_I_S ?? 0}</td>
//                 <td className="px-2 py-4">{data?.LM_EX_ADV_I_S ?? 0}</td>
//                 {renderPercentageChange(data?.EX_ADV_I_S, data?.LM_EX_ADV_I_S)}
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CashSaleTable;


import React, { useContext } from "react";
import { FaArrowUp, FaArrowDown, FaChartLine, FaBuilding, FaMoneyBillWave, FaCreditCard, FaBox, FaBalanceScale,  FaExchangeAlt, FaPercentage } from "react-icons/fa";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

const CashSaleTable = ({ collectionTableData }) => {
  const { theme } = useContext(Context);

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num || 0);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num || 0);

  const renderPercentageChange = (current, previous) => {
    const change = calculatePercentageChange(current, previous);
    const isPositive = change >= 0;

    return (
      <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
        isPositive 
          ? theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
          : theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"
      }`}>
        {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
        <span>{formatNumber(Math.abs(change))}%</span>
      </div>
    );
  };

  // Header configuration with icons
  const headerConfig = [
    { key: "BRANCH_NAME", label: "Branch Name"  },
    { key: "CASH_SALE", label: "C.Sale" },
    { key: "CASH_UNIT", label: "C.Unit" },
    { key: "OPENING", label: "Opening"},
    { key: "CREDIT_SALE", label: "Cr.Sale" },
    { key: "CREDIT_UNIT", label: "Cr.Units" },
    { key: "CR_RECOVERY", label: "Recovered" },
    { key: "REMAINING", label: "Balance" },
    { key: "INSTALL_SALE", label: "I.S Sale"},
    { key: "INST_ADVANCE", label: "I.S Adv" },
    { key: "INSTALLMENT_UNIT", label: "Unit" },
    { key: "EX_ADV_I_S", label: "Ex.Adv I.S" },
    { key: "LM_EX_ADV_I_S", label: "Lm.Adv I.S"},
    { key: "ADV_RATIO", label: "Adv.Ratio" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full p-6 rounded-2xl shadow-xl border-2 backdrop-blur-sm transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
          : "bg-white/95 border-blue-100"
      }`}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h2 className={`text-2xl font-bold flex items-center gap-3 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>
            <FaChartLine className="text-blue-500" />
            Sales Performance Details
          </h2>
          <p className={`mt-1 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Branch-wise breakdown of sales performance across different categories
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full mt-2 lg:mt-0 ${
          theme === "dark" ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-700"
        }`}>
          <FaBox className="text-sm" />
          <span className="text-sm font-medium">
            {collectionTableData.length} Branches
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className={`relative overflow-hidden rounded-xl border-2 ${
        theme === "dark" 
          ? "border-gray-700 bg-gray-800/50" 
          : "border-gray-200 bg-white"
      } shadow-lg`}>
        <div className="overflow-x-auto max-h-[65vh] custom-scrollbar">
          <table className="w-full text-[13px] font-medium min-w-max">
            {/* Table Header */}
            <thead className={`sticky top-0 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 text-white" 
                : "bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-gray-800 border-b-2 border-gray-300"
            } shadow-lg backdrop-blur-sm`}>
              <motion.tr
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {headerConfig.map((header, index) => (
                  <th 
                    key={header.key} 
                    scope="col" 
                    className={`px-1 py-4 font-bold text-center uppercase tracking-wider text-xs ${
                      index === 0 ? "text-left" : "text-center"
                    } whitespace-nowrap`}
                  >
                    <div className={`flex items-center ${
                      index === 0 ? "justify-start" : "justify-center"
                    }`}>
                      {header.icon}
                      <span>{header.label}</span>
                    </div>
                  </th>
                ))}
              </motion.tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200/50">
              {collectionTableData.map((data, index) => (
                <motion.tr
                  key={data?.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`group transition-all duration-300 ease-out ${
                    theme === "dark"
                      ? `hover:bg-gray-700/80 ${
                          index % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/20'
                        }`
                      : `hover:bg-blue-50/80 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`
                  } hover:shadow-lg hover:scale-[1.001] border-b border-gray-200/30`}
                >
                  {/* Branch Name */}
                  <td className="px-1 py-3 whitespace-nowrap">
                    <div className={`font-semibold transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-gray-200 group-hover:text-white group-hover:font-bold" 
                        : "text-gray-800 group-hover:text-blue-900 group-hover:font-bold"
                    }`}>
                      {data?.BRANCH_NAME || 'N/A'}
                    </div>
                  </td>

                  {/* Cash Sale */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-1 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-green-400 bg-green-900/20" 
                        : "text-green-600 bg-green-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.CASH_SALE)}
                    </div>
                  </td>

                  {/* Cash Unit */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-1 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-blue-400 bg-blue-900/20" 
                        : "text-blue-600 bg-blue-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatNumber(data?.CASH_UNIT)}
                    </div>
                  </td>

                  {/* Opening */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-purple-400 bg-purple-900/20" 
                        : "text-purple-600 bg-purple-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.OPENING)}
                    </div>
                  </td>

                  {/* Credit Sale */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-orange-400 bg-orange-900/20" 
                        : "text-orange-600 bg-orange-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.CREDIT_SALE)}
                    </div>
                  </td>

                  {/* Credit Units */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-indigo-400 bg-indigo-900/20" 
                        : "text-indigo-600 bg-indigo-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatNumber(data?.CREDIT_UNIT)}
                    </div>
                  </td>

                  {/* Recovered */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-teal-400 bg-teal-900/20" 
                        : "text-teal-600 bg-teal-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.CR_RECOVERY)}
                    </div>
                  </td>

                  {/* Balance */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-bold px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-red-400 bg-red-900/20" 
                        : "text-red-600 bg-red-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.REMAINING)}
                    </div>
                  </td>

                  {/* I.S Sale */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-pink-400 bg-pink-900/20" 
                        : "text-pink-600 bg-pink-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.INSTALL_SALE)}
                    </div>
                  </td>

                  {/* I.S Adv */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-yellow-400 bg-yellow-900/20" 
                        : "text-yellow-600 bg-yellow-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.INST_ADVANCE)}
                    </div>
                  </td>

                  {/* Unit */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-cyan-400 bg-cyan-900/20" 
                        : "text-cyan-600 bg-cyan-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatNumber(data?.INSTALLMENT_UNIT)}
                    </div>
                  </td>

                  {/* Ex.Adv I.S */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-lime-400 bg-lime-900/20" 
                        : "text-lime-600 bg-lime-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.EX_ADV_I_S)}
                    </div>
                  </td>

                  {/* Lm.Adv I.S */}
                  <td className="px-1 py-3 text-center">
                    <div className={`font-mono text-sm font-medium px-2 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-amber-400 bg-amber-900/20" 
                        : "text-amber-600 bg-amber-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.LM_EX_ADV_I_S)}
                    </div>
                  </td>

                  {/* Adv.Ratio */}
                  <td className="px-1 py-3 text-center">
                    {renderPercentageChange(data?.EX_ADV_I_S, data?.LM_EX_ADV_I_S)}
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
                  <td colSpan="14" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-20 h-20 rounded-2xl mb-4 flex items-center justify-center ${
                        theme === "dark" 
                          ? "bg-gray-700/50 text-gray-500 border border-gray-600" 
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      }`}>
                        <FaChartLine className="w-10 h-10" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        No sales data available
                      </h3>
                      <p className={`text-sm max-w-md ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}>
                        There are no sales records to display for the selected period.
                      </p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1f2937' : '#f8fafc'};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#4b5563' : '#cbd5e1'};
          border-radius: 4px;
          border: 2px solid ${theme === 'dark' ? '#1f2937' : '#f8fafc'};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'dark' ? '#6b7280' : '#94a3b8'};
        }
      `}</style>
    </motion.div>
  );
};

export default CashSaleTable;