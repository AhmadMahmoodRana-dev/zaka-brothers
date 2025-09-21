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
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaDollarSign, 
  FaCreditCard, 
  FaChartLine,
  FaMoneyBillWave,
  FaReceipt,
  FaCalculator,
  FaPercentage,
  FaBalanceScale,
  FaBoxes
} from "react-icons/fa";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

const CashSaleTable = ({ collectionTableData }) => {
  const { theme } = useContext(Context);

  // Calculate totals
  const calculateTotals = () => {
    const totals = {
      CASH_SALE: 0,
      CASH_UNIT: 0,
      OPENING: 0,
      CREDIT_SALE: 0,
      CREDIT_UNIT: 0,
      CR_RECOVERY: 0,
      REMAINING: 0,
      INSTALL_SALE: 0,
      INST_ADVANCE: 0,
      INSTALLMENT_UNIT: 0,
      EX_ADV_I_S: 0,
      LM_EX_ADV_I_S: 0
    };

    collectionTableData.forEach(data => {
      Object.keys(totals).forEach(key => {
        totals[key] += Number(data[key] || 0);
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0.00";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatCurrency = (num) => {
    if (num === null || num === undefined) return "₨ 0.00";
    return new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num).replace('PKR', '₨');
  };

  const formatCount = (num) => {
    if (num === null || num === undefined) return "0";
    return new Intl.NumberFormat("en-US").format(num);
  };

  const renderPercentageChange = (current, previous) => {
    const change = calculatePercentageChange(current, previous);
    const isPositive = change >= 0;

    return (
      <td className="px-4 py-3 text-center">
        <div className={`flex items-center justify-center gap-1 ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}>
          {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
          <span className="text-sm font-medium">{formatNumber(Math.abs(change))}%</span>
        </div>
      </td>
    );
  };

  const getColumnIcon = (columnName) => {
    const icons = {
      'Branch Name': <FaChartLine className="text-blue-500" />,
      'Cash Sale': <FaDollarSign className="text-green-500" />,
      'Cash Unit': <FaBoxes className="text-blue-400" />,
      'Opening': <FaMoneyBillWave className="text-yellow-500" />,
      'Credit Sale': <FaCreditCard className="text-purple-500" />,
      'Credit Units': <FaBoxes className="text-purple-400" />,
      'Recoveved': <FaReceipt className="text-green-600" />,
      'Balance': <FaBalanceScale className="text-gray-500" />,
      'I.S Sale': <FaCalculator className="text-orange-500" />,
      'I.S Adv': <FaMoneyBillWave className="text-orange-400" />,
      'Unit': <FaBoxes className="text-orange-300" />,
      'Ex.Adv I.S': <FaChartLine className="text-red-500" />,
      'Lm.Adv I.S': <FaChartLine className="text-red-400" />,
      'Adv.Ratio': <FaPercentage className="text-indigo-500" />
    };
    return icons[columnName] || <FaChartLine />;
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      theme === "dark" ? "bg-[#2a3e67] border-gray-700" : "bg-white border-gray-200"
    } border`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-semibold flex items-center gap-2 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          <FaChartLine className="text-blue-500" />
          Sales Detailed Analysis
        </h2>
        <div className={`text-sm px-3 py-1 rounded-full ${
          theme === "dark" ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
        }`}>
          {collectionTableData.length} Branches
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className={`${
            theme === "dark" 
              ? "bg-gradient-to-r from-blue-800 to-purple-800 text-white" 
              : "bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700"
          }`}>
            <motion.tr
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {[
                "Branch Name", "Cash Sale", "Cash Unit", "Opening", 
                "Credit Sale", "Credit Units", "Recoveved", "Balance",
                "I.S Sale", "I.S Adv", "Unit", "Ex.Adv I.S", "Lm.Adv I.S", "Adv.Ratio"
              ].map((header, index) => (
                <th key={header} className="px-4 py-4 font-semibold text-sm uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    {getColumnIcon(header)}
                    <span>{header}</span>
                  </div>
                </th>
              ))}
            </motion.tr>
          </thead>
          
          <tbody>
            {collectionTableData.map((data, index) => (
              <motion.tr
                key={data?.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${
                  theme === "dark"
                    ? "border-b border-gray-600 hover:bg-gray-700/50"
                    : "border-b border-gray-200 hover:bg-gray-50"
                } transition-colors duration-200`}
              >
                <th scope="row" className="px-4 py-3 font-medium whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                    }`}></div>
                    <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                      {data?.BRANCH_NAME || "N/A"}
                    </span>
                  </div>
                </th>
                
                <td className="px-4 py-3 font-mono text-green-600">{formatCurrency(data?.CASH_SALE)}</td>
                <td className="px-4 py-3 text-center font-medium">{formatCount(data?.CASH_UNIT)}</td>
                <td className="px-4 py-3 font-mono text-blue-600">{formatCurrency(data?.OPENING)}</td>
                <td className="px-4 py-3 font-mono text-purple-600">{formatCurrency(data?.CREDIT_SALE)}</td>
                <td className="px-4 py-3 text-center font-medium">{formatCount(data?.CREDIT_UNIT)}</td>
                <td className="px-4 py-3 font-mono text-green-600">{formatCurrency(data?.CR_RECOVERY)}</td>
                <td className="px-4 py-3 font-mono text-orange-600">{formatCurrency(data?.REMAINING)}</td>
                <td className="px-4 py-3 font-mono text-red-600">{formatCurrency(data?.INSTALL_SALE)}</td>
                <td className="px-4 py-3 font-mono text-yellow-600">{formatCurrency(data?.INST_ADVANCE)}</td>
                <td className="px-4 py-3 text-center font-medium">{formatCount(data?.INSTALLMENT_UNIT)}</td>
                <td className="px-4 py-3 font-mono text-indigo-600">{formatCurrency(data?.EX_ADV_I_S)}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{formatCurrency(data?.LM_EX_ADV_I_S)}</td>
                {renderPercentageChange(data?.EX_ADV_I_S, data?.LM_EX_ADV_I_S)}
              </motion.tr>
            ))}
            
            {/* Total Row */}
            {collectionTableData.length > 0 && (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`${
                  theme === "dark"
                    ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white font-bold"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-bold"
                }`}
              >
                <th className="px-4 py-3 text-left">TOTAL</th>
                <td className="px-4 py-3 font-mono text-green-600">{formatCurrency(totals.CASH_SALE)}</td>
                <td className="px-4 py-3 text-center">{formatCount(totals.CASH_UNIT)}</td>
                <td className="px-4 py-3 font-mono text-blue-600">{formatCurrency(totals.OPENING)}</td>
                <td className="px-4 py-3 font-mono text-purple-600">{formatCurrency(totals.CREDIT_SALE)}</td>
                <td className="px-4 py-3 text-center">{formatCount(totals.CREDIT_UNIT)}</td>
                <td className="px-4 py-3 font-mono text-green-600">{formatCurrency(totals.CR_RECOVERY)}</td>
                <td className="px-4 py-3 font-mono text-orange-600">{formatCurrency(totals.REMAINING)}</td>
                <td className="px-4 py-3 font-mono text-red-600">{formatCurrency(totals.INSTALL_SALE)}</td>
                <td className="px-4 py-3 font-mono text-yellow-600">{formatCurrency(totals.INST_ADVANCE)}</td>
                <td className="px-4 py-3 text-center">{formatCount(totals.INSTALLMENT_UNIT)}</td>
                <td className="px-4 py-3 font-mono text-indigo-600">{formatCurrency(totals.EX_ADV_I_S)}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{formatCurrency(totals.LM_EX_ADV_I_S)}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500">
                    <FaPercentage className="text-xs" />
                    <span className="text-sm">-</span>
                  </div>
                </td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>

      {collectionTableData.length === 0 && (
        <div className={`text-center py-12 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}>
          <FaChartLine className="text-4xl mx-auto mb-4 opacity-50" />
          <p>No sales data available</p>
        </div>
      )}
    </div>
  );
};

export default CashSaleTable;