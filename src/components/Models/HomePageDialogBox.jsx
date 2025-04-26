import { useContext } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

export default function HomePageDialogBox({ data, open, setOpen }) {
  const { theme } = useContext(Context);
  // Sample data structure - replace with your actual data source

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full max-w-4xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="overflow-x-auto">
            
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm text-left">
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
                      <th className="text-center py-3 text-xs font-semibold">
                        Invoice Date
                      </th>
                      <th className="text-center py-3 text-xs font-semibold">
                        Invoice No
                      </th>
                      <th className="text-center py-3 text-xs font-semibold">
                        Customer Details
                      </th>
                      <th className="text-center py-3 text-xs font-semibold">
                        Item Code
                      </th>
                      <th className="text-center py-3 text-xs font-semibold">
                        Description
                      </th>
                      <th className="text-center py-3 text-xs font-semibold">
                        Qty
                      </th>
                      <th className="text-center py-3 text-xs font-semibold">
                        Rate
                      </th>
                      <th className="text-center py-3 text-xs font-semibold">
                        Total Amount
                      </th>
                    </motion.tr>
                  </thead>
                  <tbody>
                    {data.map((data, index) => (
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
                        <td className="px-4 py-4 text-xs">
                          {formatDate(data.INVOICE_DATE)}
                        </td>
                        <td className="px-4 py-4 text-xs">
                          {data.SALES_INVOICE_NO}
                        </td>
                        <td className="px-4 py-4 text-xs">
                          {data["AC.CUSTOMER_NAME||'-'||AC.MANUAL_CUST_NO"]}
                        </td>
                        <td className="px-4 py-4 text-xs">{data.ITEM_CODE}</td>
                        <td className="px-4 py-4 text-xs">{data.ITEM_DESC}</td>
                        <td className="px-4 py-4 text-xs">{data.SALE_QTY}</td>
                        <td className="px-4 py-4 text-xs">
                          {formatCurrency(data.RATE)}
                        </td>
                        <td className="px-4 py-4 text-xs font-medium">
                          {formatCurrency(data.TOTAL_AMOUNT)}
                        </td>
                      </motion.tr>
                    ))}
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
