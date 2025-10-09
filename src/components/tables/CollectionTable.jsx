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
      <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-xs ${
        isPositive 
          ? theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
          : theme === "dark" ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-700"
      }`}>
        {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
        <span className="font-semibold whitespace-nowrap">{formatNumber(Math.abs(change))}%</span>
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

  // Responsive header configuration
  const headerConfig = [
    { key: "BRANCH_NAME", label: "Branch", icon: "🏢", priority: 1 },
    { key: "RECEIVEABLE", label: "Receivable", icon: "💰", priority: 2 },
    { key: "COLLECTION", label: "Collection", icon: "📊", priority: 1 },
    { key: "LM_COLLECTION", label: "L.M Coll", icon: "📅", priority: 3 },
    { key: "PERCENTAGE_CHANGE", label: "Coll %", icon: "📈", priority: 2 },
    { key: "LD_COLL", label: "L.D Coll", icon: "📆", priority: 3 },
    { key: "RECORY", label: "Recovery", icon: "🔄", priority: 2 },
    { key: "ACHIEVED", label: "Achieved", icon: "🎯", priority: 2 },
    { key: "CLIENTS", label: "Client", icon: "👥", priority: 3 },
    { key: "COVERED", label: "Covered", icon: "🛡️", priority: 3 },
    { key: "LM_COVERED_PERCENTAGE", label: "L.M Cov", icon: "📊", priority: 4 },
    { key: "COVERAGE", label: "Coverage", icon: "🎯", priority: 2 }
  ];

  // Get headers based on priority for different screen sizes
  const getHeadersForScreen = () => {
    return headerConfig.filter(header => {
      if (typeof window === 'undefined') return true;
      
      const width = window.innerWidth;
      if (width >= 1536) return true; // 2xl - show all
      if (width >= 1280) return header.priority <= 3; // xl - hide priority 4
      if (width >= 1024) return header.priority <= 2; // lg - hide priority 3,4
      if (width >= 768) return header.priority <= 2; // md - hide priority 3,4
      if (width >= 640) return header.priority <= 1; // sm - show only priority 1
      return header.priority <= 1; // xs - show only priority 1
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-4 sm:p-6 w-full max-w-full ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700" 
          : "bg-white border-gray-200"
      } border rounded-xl sm:rounded-2xl shadow-lg`}
    >
      {/* Header Section */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h1 className={`text-xl sm:text-2xl font-bold truncate ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>
            Collection Summary
          </h1>
          <p className={`mt-1 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          } truncate`}>
            Overview of branch-wise collections and recovery performance
          </p>
        </div>
        
        {/* Summary Stats */}
        {totals && collectionTableData?.length > 0 && (
          <div className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 rounded-lg ${
            theme === "dark" ? "bg-gray-700" : "bg-blue-50"
          } flex-shrink-0`}>
            <div className="text-center min-w-20">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Total Collection
              </div>
              <div className={`text-sm sm:text-lg font-bold ${
                theme === "dark" ? "text-green-400" : "text-green-600"
              }`}>
                PKR {formatCurrency(totals.collection)}
              </div>
            </div>
            <div className="w-px h-6 bg-gray-400 opacity-40"></div>
            <div className="text-center min-w-16">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Branches
              </div>
              <div className={`text-sm sm:text-lg font-bold ${
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
          <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Performance Overview
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {summaryCards.map((card, index) => {
              const colors = getColorClasses(card.color, theme === "dark");
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-2 sm:p-3 rounded-lg border ${colors.bg} ${colors.border} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                      {card.icon}
                    </span>
                    <span className={`text-xs font-medium ${colors.text} truncate ml-1`}>
                      {card.label}
                    </span>
                  </div>
                  <div className={`text-xs sm:text-sm font-bold font-mono ${colors.value} truncate`}>
                    {card.format === 'currency' ? `PKR ${formatCurrency(card.value)}` : formatCurrency(card.value)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Table Container */}
      <div className={`relative overflow-hidden rounded-lg border ${
        theme === "dark" 
          ? "border-gray-700 bg-gray-800/50" 
          : "border-gray-200 bg-white"
      } shadow-lg`}>
        <div className="overflow-x-auto max-h-[60vh] custom-scrollbar">
          <table className="w-full text-xs sm:text-[13px] font-medium min-w-max">
            {/* Table Header */}
            <thead className={`sticky top-0 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 text-white" 
                : "bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-gray-800 border-b border-gray-300"
            } shadow-lg backdrop-blur-sm`}>
              <motion.tr
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {getHeadersForScreen().map((header, index, array) => (
                  <th 
                    key={header.key} 
                    scope="col" 
                    className={`px-2 sm:px-3 py-3 font-bold text-center uppercase tracking-wider text-xs ${
                      index === 0 ? "text-left" : 
                      index === array.length - 1 ? "text-right" : "text-center"
                    } whitespace-nowrap`}
                  >
                    <div className={`flex items-center gap-1 ${
                      index === 0 ? "justify-start" : 
                      index === array.length - 1 ? "justify-end" : "justify-center"
                    }`}>
                      <span className="text-xs hidden xs:inline">{header.icon}</span>
                      <span className="truncate">{header.label}</span>
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
                  } hover:shadow-md border-b border-gray-200/30`}
                >
                  {/* Branch Name - Always visible */}
                  <td className="px-2 sm:px-3 py-3 whitespace-nowrap">
                    <div className={`font-semibold text-xs sm:text-sm transition-all duration-300 truncate max-w-[120px] sm:max-w-[150px] ${
                      theme === "dark" 
                        ? "text-gray-200 group-hover:text-white" 
                        : "text-gray-800 group-hover:text-blue-900"
                    }`}>
                      {data?.BRANCH_NAME || 'N/A'}
                    </div>
                  </td>

                  {/* Conditional rendering based on screen size */}
                  {getHeadersForScreen().map((header, cellIndex) => {
                    if (header.key === "BRANCH_NAME") return null;

                    return (
                      <td key={header.key} className="px-2 sm:px-3 py-3 text-center whitespace-nowrap">
                        {header.key === "RECEIVEABLE" && (
                          <div className={`font-mono text-xs font-medium px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-blue-400 bg-blue-900/20" 
                              : "text-blue-600 bg-blue-50"
                          }`}>
                            {formatCurrency(data?.RECEIVEABLE)}
                          </div>
                        )}

                        {header.key === "COLLECTION" && (
                          <div className={`font-mono text-xs font-medium px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-green-400 bg-green-900/20" 
                              : "text-green-600 bg-green-50"
                          }`}>
                            {formatCurrency(data?.COLLECTION)}
                          </div>
                        )}

                        {header.key === "LM_COLLECTION" && (
                          <div className={`font-mono text-xs font-medium px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-purple-400 bg-purple-900/20" 
                              : "text-purple-600 bg-purple-50"
                          }`}>
                            {formatCurrency(data?.LM_COLLECTION)}
                          </div>
                        )}

                        {header.key === "PERCENTAGE_CHANGE" && (
                          renderPercentageChange(data?.COLLECTION, data?.LM_COLLECTION)
                        )}

                        {header.key === "LD_COLL" && (
                          <div className={`font-mono text-xs font-medium px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-orange-400 bg-orange-900/20" 
                              : "text-orange-600 bg-orange-50"
                          }`}>
                            {formatCurrency(data?.LD_COLL)}
                          </div>
                        )}

                        {header.key === "RECORY" && (
                          <div className={`font-mono text-xs font-medium px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-teal-400 bg-teal-900/20" 
                              : "text-teal-600 bg-teal-50"
                          }`}>
                            {formatCurrency(data?.RECORY)}
                          </div>
                        )}

                        {header.key === "ACHIEVED" && (
                          <div className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                            (data?.ACHIEVED || 0) >= 100 
                              ? theme === "dark" 
                                ? "text-green-400 bg-green-900/30" 
                                : "text-green-600 bg-green-100"
                              : theme === "dark" 
                                ? "text-yellow-400 bg-yellow-900/20" 
                                : "text-yellow-600 bg-yellow-50"
                          }`}>
                            {formatNumber(data?.ACHIEVED || 0)}%
                          </div>
                        )}

                        {header.key === "CLIENTS" && (
                          <div className={`font-mono text-xs font-medium px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-indigo-400 bg-indigo-900/20" 
                              : "text-indigo-600 bg-indigo-50"
                          }`}>
                            {formatCurrency(data?.CLIENTS)}
                          </div>
                        )}

                        {header.key === "COVERED" && (
                          <div className={`font-mono text-xs font-medium px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-pink-400 bg-pink-900/20" 
                              : "text-pink-600 bg-pink-50"
                          }`}>
                            {formatCurrency(data?.COVERED)}
                          </div>
                        )}

                        {header.key === "LM_COVERED_PERCENTAGE" && (
                          renderPercentageChange(data?.COVERED, data?.LM_COVERED)
                        )}

                        {header.key === "COVERAGE" && (
                          <div className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                            theme === "dark" 
                              ? "text-green-400 bg-green-900/30" 
                              : "text-green-700 bg-green-100"
                          }`}>
                            {formatNumber(data?.COVERAGE || 0)}%
                          </div>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
              
              {/* Empty State */}
              {(!collectionTableData || collectionTableData.length === 0) && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <td colSpan={getHeadersForScreen().length} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-16 h-16 rounded-xl mb-3 flex items-center justify-center ${
                        theme === "dark" 
                          ? "bg-gray-700/50 text-gray-500 border border-gray-600" 
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      }`}>
                        <FaChartLine className="w-8 h-8" />
                      </div>
                      <h3 className={`text-base font-semibold mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        No collection data available
                      </h3>
                      <p className={`text-xs max-w-md ${
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

      {/* Mobile Info Notice */}
      <div className="mt-4 text-center">
        <p className={`text-xs ${
          theme === "dark" ? "text-gray-500" : "text-gray-600"
        }`}>
          💡 <span className="hidden sm:inline">Scroll horizontally to view more columns</span>
          <span className="sm:hidden">Swipe horizontally to view more data</span>
        </p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1f2937' : '#f8fafc'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#4b5563' : '#cbd5e1'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'dark' ? '#6b7280' : '#94a3b8'};
        }
      `}</style>
    </motion.div>
  );
};

export default CollectionTable;