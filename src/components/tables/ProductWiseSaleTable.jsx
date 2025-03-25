import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Context } from "../../context/Context";

const ProductWiseSaleTable = () => {
  const { theme } = useContext(Context);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const getCollectionTableData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/product_sale?sdate=01-Mar-25&edate=31-Mar-25&branch&company=1"
      );
      console.log(data);
      setCollectionTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };
  const formatNumber = (num) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  useEffect(() => {
    getCollectionTableData();
  }, []);

  return (
    <div
      className={`p-4  w-[91%] ${
        theme == "dark" ? "bg-[transparent] shadow-2xl border" : "border"
      } border-gray-200 rounded-lg`}
    >
      <h1
        className={`text-2xl font-semibold mb-2 ${
          theme == "dark" ? "text-white" : ""
        }`}
      >
       Product Sale Data
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  max-h-[50vh]  min-w-0">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead
            className={`text-xs uppercase ${
              theme == "dark"
                ? "text-white bg-[#203c63]"
                : "text-gray-500 bg-[#e1e1e3]"
            } sticky top-0 z-10`}
          >
            <tr>
              <th scope="col" className="px-1 py-3">
              PRODUCT
              </th>
              <th scope="col" className="px-1 py-3">
              TOTAL SALE              </th>
              <th scope="col" className="px-1 py-3">
              INSTALLMENT
              </th>
              <th scope="col" className="px-1 py-3">
              CREDIT
              </th>
              <th scope="col" className="px-1 py-3">
              CASH
              </th>
            </tr>
          </thead>
          <tbody>
            {collectionTableData.map((data) => (
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
                  {data?.PRODUCT}
                </th>
                <td className="px-2 py-4">{data?.TOTAL_SALE ?? 0}</td>
                <td className="px-2 py-4">{data?.INSTALLMENT ?? 0}</td>
                <td className="px-2 py-4">{data?.CREDIT ?? 0}</td>
                <td className="px-2 py-4">{data?.CASH ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductWiseSaleTable;
