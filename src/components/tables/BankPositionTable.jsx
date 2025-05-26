import React, { useContext} from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
const BankPositionTable = ({collectionTableData}) => {
  const { theme } = useContext(Context);

const formatCurrency = (amount) => {
  // If it's a string, clean it
  if (typeof amount === "string") {
    amount = amount.replace(/,/g, "").trim(); // Remove commas and spaces
  }

  // Convert to number
  const numericAmount = Number(amount);

  // Handle invalid numbers
  if (isNaN(numericAmount)) {
    return "Invalid amount";
  }

  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(numericAmount);
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
        Bank Position
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
                BANK NAME
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                ACCOUNT NO
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                OPENING
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                PAYMENT
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                DEPOSITS
              </th>
              <th scope="col" className="px-1 py-3 font-semibold">
                CLOSING
              </th>
             
            </motion.tr>
          </thead>
          <tbody>
            {collectionTableData?.map((data) => (
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
                  {data?.BANK_NAME}
                </th>
                <td className="px-2 py-4">{data?.ACCOUNT_NO ?? 0}</td>
                <td className="px-2 py-4">{formatCurrency(data?.OPENING)}</td>
                <td className="px-2 py-4">{formatCurrency(data?.PAYMENT)}</td>
                <td className="px-2 py-4">{formatCurrency(data?.DEPOSITS)}</td>
                <td className="px-2 py-4">{formatCurrency(data?.OPENING)}</td>
               
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankPositionTable;
