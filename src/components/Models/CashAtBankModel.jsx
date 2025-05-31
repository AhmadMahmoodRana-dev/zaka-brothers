import { useContext } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

export default function CashAtBankModel({ data, open, setOpen }) {
  const { theme, isCollapsed } = useContext(Context);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
  const totals = data?.reduce(
    (acc, curr) => {
      acc.debit += Number(curr?.DEBIT?.toString().replace(/,/g, "")) || 0;
      acc.credit += Number(curr?.CREDIT?.toString().replace(/,/g, "")) || 0;
      acc.balance += Number(curr?.BALANCE?.toString().replace(/,/g, "")) || 0;
      return acc;
    },
    { debit: 0, credit: 0, balance: 0 }
  );

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10 ">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div
        className={`fixed inset-0 z-10 w-screen overflow-y-auto ${
          isCollapsed ? "" : "left-[120px]"
        } `}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-[79%] max-w-6xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className={`absolute top- right-0 z-20 p-1 rounded-full hover:bg-opacity-20 transition-colors ${
                theme === "dark"
                  ? "text-white hover:bg-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="overflow-x-auto p-6">
              <div className="max-h-[70vh] overflow-y-auto">
                <table className="w-full text-sm text-left min-w-[1000px]">
                  <thead
                    className={`sticky top-0 z-10 ${
                      theme === "dark"
                        ? "text-white bg-[#203c63]"
                        : "text-gray-500 bg-[#e1e1e3]"
                    }`}
                  >
                    <motion.tr
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`${
                        theme == "dark"
                          ? "border-b border-gray-500 text-[#D1D5DB]"
                          : "border-b border-gray-200 text-[#7e868c]"
                      }`}
                    >
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        VOUCHER_DATE
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        DESCRIPTION
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        VOUCHER_TYPE
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        VOUCHER_NO
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        REFERENCE_NO
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        NARATION
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        DEBIT
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        CREDIT
                      </th>
                      <th className="text-center py-4 text-xs font-semibold px-4">
                        BALANCE
                      </th>
                    </motion.tr>
                  </thead>
                  <tbody>
                    {data?.map((data, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={`${
                          theme == "dark"
                            ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]"
                            : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"
                        }`}
                      >
                        <td className="px-6 py-4 text-xs text-center">
                          {formatDate(data?.VOUCHER_DATE)}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {data?.DESCRIPTION}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {data?.VOUCHER_TYPE}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {data?.VOUCHER_NO}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {data?.REFERENCE_NO}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {data?.NARATION}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {formatCurrency(data?.DEBIT)}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {formatCurrency(data?.CREDIT)}
                        </td>
                        <td className="px-6 py-4 text-xs text-center">
                          {formatCurrency(data?.BALANCE)}
                        </td>
                      </motion.tr>
                    ))}
                    <tr
                      className={`font-semibold ${
                        theme === "dark"
                          ? "bg-[#152033] text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-xs text-center text-sm font-bold"
                      >
                        Total
                      </td>
                      <td className="px-6 py-4 text-xs text-center">
                        {formatCurrency(totals.debit)}
                      </td>
                      <td className="px-6 py-4 text-xs text-center">
                        {formatCurrency(totals.credit)}
                      </td>
                      <td className="px-6 py-4 text-xs text-center">
                        {formatCurrency(totals.balance)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
