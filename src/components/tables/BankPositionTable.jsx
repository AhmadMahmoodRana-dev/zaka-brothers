// import React, { useContext} from "react";
// import { Context } from "../../context/Context";
// import { motion } from "framer-motion";
// const BankPositionTable = ({collectionTableData}) => {
//   const { theme } = useContext(Context);

// const formatCurrency = (amount) => {
//   // If it's a string, clean it
//   if (typeof amount === "string") {
//     amount = amount.replace(/,/g, "").trim(); // Remove commas and spaces
//   }

//   // Convert to number
//   const numericAmount = Number(amount);

//   // Handle invalid numbers
//   if (isNaN(numericAmount)) {
//     return "Invalid amount";
//   }

//   return new Intl.NumberFormat("en-PK", {
//     style: "currency",
//     currency: "PKR",
//     maximumFractionDigits: 0,
//   }).format(numericAmount);
// };
  
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
//         Bank Position
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
//                 BANK NAME
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 ACCOUNT NO
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 OPENING
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 PAYMENT
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 DEPOSITS
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 CLOSING
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
//                   {data?.BANK_NAME}
//                 </th>
//                 <td className="px-2 py-4">{data?.ACCOUNT_NO ?? 0}</td>
//                 <td className="px-2 py-4">{formatCurrency(data?.OPENING)}</td>
//                 <td className="px-2 py-4">{formatCurrency(data?.PAYMENT)}</td>
//                 <td className="px-2 py-4">{formatCurrency(data?.DEPOSITS)}</td>
//                 <td className="px-2 py-4">{formatCurrency(data?.OPENING)}</td>
               
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BankPositionTable;

import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import { FiTrendingUp, FiDollarSign, FiCreditCard, FiDatabase, FiHome, FiArrowUp, FiArrowDown } from "react-icons/fi";

const BankPositionTable = ({ collectionTableData }) => {
  const { theme } = useContext(Context);

  const formatCurrency = (amount) => {
    if (typeof amount === "string") {
      amount = amount.replace(/,/g, "").trim();
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount)) {
      return "Invalid amount";
    }

    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(numericAmount);
  };

  // Calculate totals for each column
  const calculateTotals = () => {
    if (!collectionTableData || collectionTableData.length === 0) {
      return {
        totalOpening: 0,
        totalPayment: 0,
        totalDeposits: 0,
        totalClosing: 0,
        totalBanks: 0
      };
    }

    const totals = collectionTableData.reduce(
      (acc, data) => ({
        totalOpening: acc.totalOpening + (Number(data?.OPENING) || 0),
        totalPayment: acc.totalPayment + (Number(data?.PAYMENT) || 0),
        totalDeposits: acc.totalDeposits + (Number(data?.DEPOSITS) || 0),
        totalClosing: acc.totalClosing + (Number(data?.OPENING) || 0), // Assuming CLOSING is same as OPENING
        totalBanks: acc.totalBanks + 1
      }),
      { totalOpening: 0, totalPayment: 0, totalDeposits: 0, totalClosing: 0, totalBanks: 0 }
    );

    return totals;
  };

  const totals = calculateTotals();

  // Card data for summary
  const summaryCards = [
    {
      id: 1,
      title: "Total Banks",
      value: totals.totalBanks.toString(),
      icon: <FiHome className="text-blue-600" />,
      color: "blue",
      description: "Active accounts"
    },
    {
      id: 2,
      title: "Total Opening",
      value: formatCurrency(totals.totalOpening),
      icon: <FiTrendingUp className="text-green-600" />,
      color: "green",
      description: "Initial balance"
    },
    {
      id: 3,
      title: "Total Payments",
      value: formatCurrency(totals.totalPayment),
      icon: <FiArrowUp className="text-red-600" />,
      color: "red",
      description: "Outgoing funds"
    },
    {
      id: 4,
      title: "Total Deposits",
      value: formatCurrency(totals.totalDeposits),
      icon: <FiArrowDown className="text-purple-600" />,
      color: "purple",
      description: "Incoming funds"
    },
    {
      id: 5,
      title: "Total Closing",
      value: formatCurrency(totals.totalClosing),
      icon: <FiDollarSign className="text-orange-600" />,
      color: "orange",
      description: "Final balance"
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: card.id * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${card.color}-50 dark:bg-${card.color}-900/20 rounded-xl flex items-center justify-center`}>
                {card.icon}
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">{card.title}</h3>
            <p className="text-lg font-bold text-gray-800 dark:text-white mb-1">{card.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden`}
      >
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Bank Position Overview</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bank accounts and financial positions</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {totals.totalBanks} Banks
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600"
              >
                <th className="px-4 py-4 font-semibold text-gray-600 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  BANK NAME
                </th>
                <th className="px-4 py-4 font-semibold text-gray-600 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  ACCOUNT NO
                </th>
                <th className="px-4 py-4 font-semibold text-gray-600 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  OPENING
                </th>
                <th className="px-4 py-4 font-semibold text-gray-600 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  PAYMENT
                </th>
                <th className="px-4 py-4 font-semibold text-gray-600 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  DEPOSITS
                </th>
                <th className="px-4 py-4 font-semibold text-gray-600 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  CLOSING
                </th>
                <th className="px-4 py-4 font-semibold text-gray-600 dark:text-gray-300 text-left text-xs uppercase tracking-wider">
                  STATUS
                </th>
              </motion.tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {collectionTableData?.map((data, index) => {
                const opening = Number(data?.OPENING) || 0;
                const payment = Number(data?.PAYMENT) || 0;
                const deposits = Number(data?.DEPOSITS) || 0;
                const closing = Number(data?.OPENING) || 0; // Assuming CLOSING is same as OPENING
                
                const netFlow = deposits - payment;
                const status = netFlow > 0 ? "Positive" : netFlow < 0 ? "Negative" : "Neutral";
                const statusColor = netFlow > 0 ? "green" : netFlow < 0 ? "red" : "gray";

                return (
                  <motion.tr
                    key={data?.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                  >
                    <td className="px-4 py-4">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {data?.BANK_NAME}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                        {data?.ACCOUNT_NO || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {formatCurrency(opening)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-red-600 dark:text-red-400 text-sm">
                        {formatCurrency(payment)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-green-600 dark:text-green-400 text-sm">
                        {formatCurrency(deposits)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                        {formatCurrency(closing)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColor}-100 dark:bg-${statusColor}-900/30 text-${statusColor}-800 dark:text-${statusColor}-300`}>
                        {status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>

            {/* Totals Row */}
            <tfoot>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 border-t-2 border-gray-200 dark:border-gray-600"
              >
                <td className="px-4 py-4">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">TOTAL</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {totals.totalBanks} accounts
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-gray-900 dark:text-white text-sm">
                    {formatCurrency(totals.totalOpening)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-red-600 dark:text-red-400 text-sm">
                    {formatCurrency(totals.totalPayment)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-green-600 dark:text-green-400 text-sm">
                    {formatCurrency(totals.totalDeposits)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                    {formatCurrency(totals.totalClosing)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${
                    totals.totalDeposits > totals.totalPayment ? 'green' : totals.totalDeposits < totals.totalPayment ? 'red' : 'gray'
                  }-100 dark:bg-${
                    totals.totalDeposits > totals.totalPayment ? 'green' : totals.totalDeposits < totals.totalPayment ? 'red' : 'gray'
                  }-900/30 text-${
                    totals.totalDeposits > totals.totalPayment ? 'green' : totals.totalDeposits < totals.totalPayment ? 'red' : 'gray'
                  }-800 dark:text-${
                    totals.totalDeposits > totals.totalPayment ? 'green' : totals.totalDeposits < totals.totalPayment ? 'red' : 'gray'
                  }-300 font-bold`}>
                    {totals.totalDeposits > totals.totalPayment ? 'Net Inflow' : totals.totalDeposits < totals.totalPayment ? 'Net Outflow' : 'Balanced'}
                  </span>
                </td>
              </motion.tr>
            </tfoot>
          </table>
        </div>

        {/* Empty State */}
        {(!collectionTableData || collectionTableData.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-12 px-6"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FiDatabase className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Bank Data Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              No bank position records found for the selected period. 
              Try adjusting your filters or check back later for updates.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BankPositionTable;