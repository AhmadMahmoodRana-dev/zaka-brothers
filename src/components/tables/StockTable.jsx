import React, { useContext} from "react";
import { Context } from "../../context/Context";

const StockTable = ({collectionTableData}) => {
  const { theme } = useContext(Context);

  
  return (
    <div
      className={`p-4 w-[91%] ${
        theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"
      } border-gray-200 rounded-lg`}
    >
      <h1
        className={`text-2xl font-semibold mb-2 ${
          theme === "dark" ? "text-white" : ""
        }`}
      >
        Sale Data
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
            <tr>
              <th scope="col" className="px-1 py-3">
                Product Name
              </th>
              <th scope="col" className="px-1 py-3">
                Total Sale
              </th>
              <th scope="col" className="px-1 py-3">
                Installment
              </th>
              <th scope="col" className="px-1 py-3">
                Credit
              </th>
              <th scope="col" className="px-1 py-3">
                Cash
              </th>
            </tr>
          </thead>
          <tbody>
            {collectionTableData?.map((data) => (
              <tr
                key={data?.id}
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
                  {data?.PRODUCT_NAME}
                </th>
                <td className="px-2 py-4">{data?.BRAND_NAME ?? 0}</td>
                <td className="px-2 py-4">{data?.QTY ?? 0}</td>
                <td className="px-2 py-4">{data?.RATE ?? 0}</td>
                <td className="px-2 py-4">{data?.AMOUNT ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
