// import React, { useContext } from "react";
// import { Context } from "../../context/Context";
// import { motion } from "framer-motion";
// const ProductWiseSaleTable = ({ collectionTableData1 }) => {
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
//         Product
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
//                 Product
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Total Sale
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Installment
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Credit
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Cash
//               </th>
//             </motion.tr>
//           </thead>
//           <tbody>
//             {collectionTableData1.map((data) => (
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
//                   {data?.PRODUCT}
//                 </th>
//                 <td className="px-2 py-4">{data?.TOTAL_SALE ?? 0}</td>
//                 <td className="px-2 py-4">{data?.INSTALLMENT ?? 0}</td>
//                 <td className="px-2 py-4">{data?.CREDIT ?? 0}</td>
//                 <td className="px-2 py-4">{data?.CASH ?? 0}</td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductWiseSaleTable;
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { motion, AnimatePresence } from "framer-motion";
import { FaBox, FaMoneyBillWave, FaCreditCard, FaCashRegister, FaChartBar, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const ProductWiseSaleTable = ({ collectionTableData1 }) => {
  const { theme } = useContext(Context);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Format numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num || 0);
  };

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return collectionTableData1;

    return [...collectionTableData1].sort((a, b) => {
      const aValue = a[sortConfig.key] || 0;
      const bValue = b[sortConfig.key] || 0;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [collectionTableData1, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="text-blue-500" /> : 
      <FaSortDown className="text-blue-500" />;
  };

  // Calculate totals
  const totals = React.useMemo(() => {
    return sortedData.reduce((acc, item) => ({
      totalSale: acc.totalSale + (item.TOTAL_SALE || 0),
      installment: acc.installment + (item.INSTALLMENT || 0),
      credit: acc.credit + (item.CREDIT || 0),
      cash: acc.cash + (item.CASH || 0)
    }), { totalSale: 0, installment: 0, credit: 0, cash: 0 });
  }, [sortedData]);

  const headerConfig = [
    { key: "PRODUCT", label: "Product", icon: <FaBox className="text-xs" />, sortable: true },
    { key: "TOTAL_SALE", label: "Total Sale", icon: <FaChartBar className="text-xs" />, sortable: true },
    { key: "INSTALLMENT", label: "Installment", icon: <FaCreditCard className="text-xs" />, sortable: true },
    { key: "CREDIT", label: "Credit", icon: <FaCreditCard className="text-xs" />, sortable: true },
    { key: "CASH", label: "Cash", icon: <FaCashRegister className="text-xs" />, sortable: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className={`text-xl sm:text-2xl font-bold flex items-center gap-3 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>
            <FaBox className="text-blue-500" />
            Product Sales Breakdown
          </h2>
          <p className={`mt-1 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Performance analysis by product category
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full mt-2 sm:mt-0 ${
          theme === "dark" ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-700"
        }`}>
          <FaBox className="text-sm" />
          <span className="text-sm font-medium">
            {sortedData.length} Products
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Sales", value: totals.totalSale, icon: FaChartBar, color: "blue" },
          { label: "Installment", value: totals.installment, icon: FaCreditCard, color: "purple" },
          { label: "Credit Sales", value: totals.credit, icon: FaCreditCard, color: "orange" },
          { label: "Cash Sales", value: totals.cash, icon: FaCashRegister, color: "green" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-3 sm:p-4 rounded-xl backdrop-blur-sm border ${
              theme === "dark" 
                ? "bg-gray-700/50 border-gray-600" 
                : "bg-white border-gray-200"
            } shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {item.label}
                </p>
                <p className={`text-lg sm:text-xl font-bold mt-1 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}>
                  {formatNumber(item.value)}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${
                item.color === "blue" ? "bg-blue-500/20 text-blue-500" :
                item.color === "purple" ? "bg-purple-500/20 text-purple-500" :
                item.color === "orange" ? "bg-orange-500/20 text-orange-500" :
                "bg-green-500/20 text-green-500"
              }`}>
                <item.icon className="text-sm" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Container */}
      <div className={`relative overflow-hidden rounded-lg border ${
        theme === "dark" 
          ? "border-gray-700 bg-gray-800/50" 
          : "border-gray-200 bg-white"
      } shadow-lg`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-medium">
            {/* Table Header */}
            <thead className={`sticky top-0 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 text-white" 
                : "bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-gray-800 border-b border-gray-300"
            } shadow-lg`}>
              <tr>
                {headerConfig.map((header) => (
                  <th 
                    key={header.key}
                    scope="col" 
                    className={`px-3 sm:px-4 py-3 font-bold text-left uppercase tracking-wider text-xs ${
                      header.sortable ? "cursor-pointer hover:bg-gray-500/10 transition-colors" : ""
                    }`}
                    onClick={() => header.sortable && handleSort(header.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline">{header.icon}</span>
                      <span>{header.label}</span>
                      {header.sortable && (
                        <span className="flex-shrink-0">
                          {getSortIcon(header.key)}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200/50">
              <AnimatePresence>
                {sortedData.map((data, index) => (
                  <motion.tr
                    key={data?.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className={`group transition-all duration-300 ${
                      theme === "dark"
                        ? `hover:bg-gray-700/80 ${
                            index % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/20'
                          }`
                        : `hover:bg-blue-50/80 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`
                    } border-b border-gray-200/30`}
                  >
                    <td className="px-3 sm:px-4 py-3">
                      <div className={`font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}>
                        {data?.PRODUCT || 'Unnamed Product'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className={`font-mono text-sm font-semibold px-2 py-1 rounded-lg ${
                        theme === "dark" 
                          ? "text-green-400 bg-green-900/20" 
                          : "text-green-600 bg-green-50"
                      }`}>
                        {formatNumber(data?.TOTAL_SALE)}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className={`font-mono text-sm font-semibold px-2 py-1 rounded-lg ${
                        theme === "dark" 
                          ? "text-purple-400 bg-purple-900/20" 
                          : "text-purple-600 bg-purple-50"
                      }`}>
                        {formatNumber(data?.INSTALLMENT)}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className={`font-mono text-sm font-semibold px-2 py-1 rounded-lg ${
                        theme === "dark" 
                          ? "text-orange-400 bg-orange-900/20" 
                          : "text-orange-600 bg-orange-50"
                      }`}>
                        {formatNumber(data?.CREDIT)}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <div className={`font-mono text-sm font-semibold px-2 py-1 rounded-lg ${
                        theme === "dark" 
                          ? "text-blue-400 bg-blue-900/20" 
                          : "text-blue-600 bg-blue-50"
                      }`}>
                        {formatNumber(data?.CASH)}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>

              {/* Empty State */}
              {(!sortedData || sortedData.length === 0) && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center ${
                        theme === "dark" 
                          ? "bg-gray-700/50 text-gray-500 border border-gray-600" 
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      }`}>
                        <FaBox className="w-8 h-8" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        No product data available
                      </h3>
                      <p className={`text-sm max-w-md ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}>
                        No sales records found for the selected period
                      </p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs">
        <div className={`${theme === "dark" ? "text-gray-500" : "text-gray-600"}`}>
          💡 Click on column headers to sort data
        </div>
        {sortConfig.key && (
          <div className={`mt-1 sm:mt-0 ${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}>
            Sorted by: {headerConfig.find(h => h.key === sortConfig.key)?.label} ({sortConfig.direction})
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductWiseSaleTable;