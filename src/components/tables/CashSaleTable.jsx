import React, { useContext } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const renderPercentageChange = (current, previous) => {
    const change = calculatePercentageChange(current, previous);
    const isPositive = change >= 0;

    return (
      <td
        className={`px-2 py-4 flex items-center gap-2 ${
          isPositive ? "text-[#00a76f]" : "text-red-600"
        }`}
      >
        {isPositive ? <FaArrowUp /> : <FaArrowDown />}
        <p>{formatNumber(change)}%</p>
      </td>
    );
  };

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
        Sale
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
                Branch Name
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Cash Sale
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Cash Unit
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Opening
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Credit Sale
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Credit Units
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Recoveved
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Balance
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                I.S Sale
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                I.S Adv
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Unit
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Ex.Adv I.S
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Lm.Adv I.S
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                Adv.Ratio
              </th>
            </motion.tr>
          </thead>
          <tbody>
            {collectionTableData.map((data) => (
              <motion.tr
                key={data?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`${
                  theme == "dark"
                    ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]"
                    : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"
                }`}
              >
                <th
                  scope="row"
                  className="px-2 py-4 font-medium  whitespace-nowrap"
                >
                  {data?.BRANCH_NAME}
                </th>
                <td className="px-2 py-4">{data?.CASH_SALE ?? 0}</td>
                <td className="px-2 py-4">{data?.CASH_UNIT ?? 0}</td>
                <td className="px-2 py-4">{data?.OPENING ?? 0}</td>
                <td className="px-2 py-4">{data?.CREDIT_SALE ?? 0}</td>
                <td className="px-2 py-4">{data?.CREDIT_UNIT ?? 0}</td>
                <td className="px-2 py-4">{data?.CR_RECOVERY ?? 0}</td>
                <td className="px-2 py-4">{data?.REMAINING ?? 0}</td>
                <td className="px-2 py-4">{data?.INSTALL_SALE ?? 0}</td>
                <td className="px-2 py-4">{data?.INST_ADVANCE ?? 0}</td>
                <td className="px-2 py-4">{data?.INSTALLMENT_UNIT ?? 0}</td>
                <td className="px-2 py-4">{data?.EX_ADV_I_S ?? 0}</td>
                <td className="px-2 py-4">{data?.LM_EX_ADV_I_S ?? 0}</td>
                {renderPercentageChange(data?.EX_ADV_I_S, data?.LM_EX_ADV_I_S)}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashSaleTable;