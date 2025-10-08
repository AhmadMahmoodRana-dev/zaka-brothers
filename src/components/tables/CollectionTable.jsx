// import React, { useContext } from "react";
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { Context } from "../../context/Context";
// import { motion } from "framer-motion";
// const CollectionTable = ({ collectionTableData }) => {
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
//         Collection
//       </h1>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh] min-w-0">
//         <table className="w-full text-sm text-left rtl:text-right">
//           <thead
//             className={`text-xs uppercase ${
//               theme === "dark"
//                 ? "text-white bg-[#203c63]"
//                 : "text-gray-500 bg-[#e1e1e3]"
//             } sticky top-0 z-10`}
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
//               {[
//                 "BRANCH NAME",
//                 "RECEIVABLE",
//                 "Collection",
//                 "L.m Coll",
//                 "Coll.Per",
//                 "L.d Coll",
//                 "Recovery",
//                 "Achieved",
//                 "Client",
//                 "Covered",
//                 "L.m Covered",
//                 "Coverage",
//               ].map((header) => (
//                 <th
//                   key={header}
//                   scope="col"
//                   className="px-2 py-3 font-semibold"
//                 >
//                   {header}
//                 </th>
//               ))}
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
//                   className="px-2 py-4 font-medium whitespace-nowrap"
//                 >
//                   {data?.BRANCH_NAME}
//                 </th>
//                 <td className="px-2 py-4">{data?.RECEIVEABLE}</td>
//                 <td className="px-2 py-4">{data?.COLLECTION}</td>
//                 <td className="px-2 py-4">{data?.LM_COLLECTION}</td>
//                 {renderPercentageChange(data?.COLLECTION, data?.LM_COLLECTION)}
//                 <td className="px-2 py-4">{data?.LD_COLL}</td>
//                 <td className="px-2 py-4">{data?.RECORY}</td>
//                 <td className="px-2 py-4">{data?.ACHIEVED}</td>
//                 <td className="px-2 py-4">{data?.CLIENTS}</td>
//                 <td className="px-2 py-4">{data?.COVERED}</td>
//                 {renderPercentageChange(data?.COVERED, data?.LM_COVERED)}
//                 <td className="px-2 py-4">{data?.COVERAGE}</td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CollectionTable;
import React, { useContext } from "react";
import { FaArrowUp, FaArrowDown, FaChartLine, FaUsers, FaMoneyBillWave, FaPercentage } from "react-icons/fa";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

const CollectionTable = ({ collectionTableData }) => {
  const { theme } = useContext(Context);

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
        isPositive 
          ? theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
          : theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"
      }`}>
        {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
        <span className="text-xs font-semibold">{formatNumber(Math.abs(change))}%</span>
      </div>
    );
  };

  // Calculate totals for summary
  const totals = collectionTableData?.reduce((acc, data) => ({
    receivable: (acc.receivable || 0) + (data?.RECEIVEABLE || 0),
    collection: (acc.collection || 0) + (data?.COLLECTION || 0),
    lm_collection: (acc.lm_collection || 0) + (data?.LM_COLLECTION || 0),
    recovery: (acc.recovery || 0) + (data?.RECORY || 0),
    clients: (acc.clients || 0) + (data?.CLIENTS || 0),
    covered: (acc.covered || 0) + (data?.COVERED || 0),
  }), {});

  // Summary cards data
  const summaryCards = [
    { 
      label: "Total Receivable", 
      value: totals?.receivable || 0, 
      color: "blue",
      icon: <FaMoneyBillWave className="text-sm" />,
      format: "currency"
    },
    { 
      label: "Total Collection", 
      value: totals?.collection || 0, 
      color: "green",
      icon: <FaChartLine className="text-sm" />,
      format: "currency"
    },
    { 
      label: "Total Recovery", 
      value: totals?.recovery || 0, 
      color: "teal",
      icon: <FaPercentage className="text-sm" />,
      format: "currency"
    },
    { 
      label: "Total Clients", 
      value: totals?.clients || 0, 
      color: "purple",
      icon: <FaUsers className="text-sm" />,
      format: "number"
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
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  const headerConfig = [
    { key: "BRANCH_NAME", label: "Branch Name", icon: "🏢" },
    { key: "RECEIVEABLE", label: "Receivable", icon: "💰" },
    { key: "COLLECTION", label: "Collection", icon: "📊" },
    { key: "LM_COLLECTION", label: "L.m Coll", icon: "📅" },
    { key: "PERCENTAGE_CHANGE", label: "Coll.Per", icon: "📈" },
    { key: "LD_COLL", label: "L.d Coll", icon: "📆" },
    { key: "RECORY", label: "Recovery", icon: "🔄" },
    { key: "ACHIEVED", label: "Achieved", icon: "🎯" },
    { key: "CLIENTS", label: "Client", icon: "👥" },
    { key: "COVERED", label: "Covered", icon: "🛡️" },
    { key: "LM_COVERED_PERCENTAGE", label: "L.m Covered", icon: "📊" },
    { key: "COVERAGE", label: "Coverage", icon: "🎯" }
  ];

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
            Collection Summary
          </h1>
          <p className={`mt-1 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Overview of branch-wise collections and recovery performance
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
                Total Collection
              </div>
              <div className={`text-lg font-bold ${
                theme === "dark" ? "text-green-400" : "text-green-600"
              }`}>
                PKR {formatCurrency(totals.collection)}
              </div>
            </div>
            <div className="w-px h-8 bg-gray-400 opacity-40"></div>
            <div className="text-center">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Branches
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
            Performance Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                      {card.icon}
                    </span>
                    <span className={`text-xs font-medium ${colors.text}`}>
                      {card.label}
                    </span>
                  </div>
                  <div className={`text-sm font-bold font-mono ${colors.value}`}>
                    {card.format === 'currency' ? `PKR ${formatCurrency(card.value)}` : formatCurrency(card.value)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Table Container */}
      <div className={`relative overflow-hidden rounded-2xl border-2 ${
        theme === "dark" 
          ? "border-gray-700 bg-gray-800/50" 
          : "border-gray-200 bg-white"
      } shadow-2xl`}>
        <div className="overflow-x-auto max-h-[65vh] custom-scrollbar">
          <table className="w-full text-[13px] font-medium">
            {/* Table Header */}
            <thead className={`sticky top-0 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 text-white" 
                : "bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-gray-800 border-b-2 border-gray-300"
            } shadow-2xl backdrop-blur-sm`}>
              <motion.tr
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b-0"
              >
                {headerConfig.map((header, index) => (
                  <th 
                    key={header.key} 
                    scope="col" 
                    className={`px-4 py-4 font-bold text-center uppercase tracking-wider text-xs ${
                      index === 0 ? "rounded-tl-xl text-left" : 
                      index === headerConfig.length - 1 ? "rounded-tr-xl text-right" : "text-center"
                    }`}
                  >
                    <div className={`flex items-center gap-2 ${
                      index === 0 ? "justify-start" : 
                      index === headerConfig.length - 1 ? "justify-end" : "justify-center"
                    }`}>
                      <span className="text-xs">{header.icon}</span>
                      <span>{header.label}</span>
                    </div>
                  </th>
                ))}
              </motion.tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200/50">
              {collectionTableData?.map((data, index) => (
                <motion.tr
                  key={data?.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.015 }}
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
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`font-semibold transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-gray-200 group-hover:text-white group-hover:font-bold" 
                        : "text-gray-800 group-hover:text-blue-900 group-hover:font-bold"
                    }`}>
                      {data?.BRANCH_NAME || 'N/A'}
                    </div>
                  </td>

                  {/* Receivable */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-blue-400 bg-blue-900/20" 
                        : "text-blue-600 bg-blue-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      PKR {formatCurrency(data?.RECEIVEABLE)}
                    </div>
                  </td>

                  {/* Collection */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-green-400 bg-green-900/20" 
                        : "text-green-600 bg-green-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      PKR {formatCurrency(data?.COLLECTION)}
                    </div>
                  </td>

                  {/* Last Month Collection */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-purple-400 bg-purple-900/20" 
                        : "text-purple-600 bg-purple-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      PKR {formatCurrency(data?.LM_COLLECTION)}
                    </div>
                  </td>

                  {/* Collection Percentage Change */}
                  <td className="px-4 py-4 text-center">
                    {renderPercentageChange(data?.COLLECTION, data?.LM_COLLECTION)}
                  </td>

                  {/* Last Day Collection */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-orange-400 bg-orange-900/20" 
                        : "text-orange-600 bg-orange-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      PKR {formatCurrency(data?.LD_COLL)}
                    </div>
                  </td>

                  {/* Recovery */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-teal-400 bg-teal-900/20" 
                        : "text-teal-600 bg-teal-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      PKR {formatCurrency(data?.RECORY)}
                    </div>
                  </td>

                  {/* Achieved */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-bold px-3 py-1 rounded-lg transition-all duration-300 ${
                      (data?.ACHIEVED || 0) >= 100 
                        ? theme === "dark" 
                          ? "text-green-400 bg-green-900/30 border border-green-800" 
                          : "text-green-600 bg-green-100 border border-green-200"
                        : theme === "dark" 
                          ? "text-yellow-400 bg-yellow-900/20" 
                          : "text-yellow-600 bg-yellow-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatNumber(data?.ACHIEVED || 0)}%
                    </div>
                  </td>

                  {/* Clients */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-indigo-400 bg-indigo-900/20" 
                        : "text-indigo-600 bg-indigo-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.CLIENTS)}
                    </div>
                  </td>

                  {/* Covered */}
                  <td className="px-4 py-4 text-center">
                    <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-pink-400 bg-pink-900/20" 
                        : "text-pink-600 bg-pink-50"
                    } group-hover:scale-105 group-hover:shadow-sm`}>
                      {formatCurrency(data?.COVERED)}
                    </div>
                  </td>

                  {/* Last Month Covered Percentage */}
                  <td className="px-4 py-4 text-center">
                    {renderPercentageChange(data?.COVERED, data?.LM_COVERED)}
                  </td>

                  {/* Coverage */}
                  <td className="px-4 py-4 text-right">
                    <div className={`font-mono text-sm font-bold px-3 py-2 rounded-xl transition-all duration-300 ${
                      theme === "dark" 
                        ? "text-green-400 bg-green-900/30 border border-green-800" 
                        : "text-green-700 bg-green-100 border border-green-200"
                    } group-hover:scale-110 group-hover:shadow-md`}>
                      {formatNumber(data?.COVERAGE || 0)}%
                    </div>
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
                  <td colSpan="12" className="px-6 py-20 text-center">
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
                        No collection data available
                      </h3>
                      <p className={`text-sm max-w-md ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}>
                        There are no collection records to display for the selected period.
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

export default CollectionTable;