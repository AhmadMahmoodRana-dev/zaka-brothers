import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Context } from "../../context/Context";

const CollectionTable = () => {
  const { theme } = useContext(Context);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const getCollectionTableData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/recovery?sdate=01-MAR-2025&edate=31-MAR-2025&rec_company=1&curr_date=20-MAR-2025"
      );
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
        Collection Data
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
              <th scope="col" className="px-2 py-3">
                BRANCH NAME
              </th>
              <th scope="col" className="px-2 py-3">
                RECEIVEABLE
              </th>

              <th scope="col" className="px-2 py-3">
                Collection
              </th>
              <th scope="col" className="px-2 py-3">
                L.m Coll
              </th>
              <th scope="col" className="px-2 py-3">
                Coll.Per
              </th>
              <th scope="col" className="px-2 py-3">
                L.d Coll
              </th>
              <th scope="col" className="px-2 py-3">
                Recovery
              </th>
              <th scope="col" className="px-2 py-3">
                Achieved
              </th>
              <th scope="col" className="px-2 py-3">
                Client
              </th>
              <th scope="col" className="px-2 py-3">
                Covered
              </th>
              <th scope="col" className="px-2 py-3">
                L.m Covered
              </th>
              <th scope="col" className="px-2 py-3">
                Coverage
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
                  {data?.BRANCH_NAME}
                </th>
                <td className="px-2 py-4">{data?.RECEIVEABLE}</td>
                <td className="px-2 py-4">{data?.COLLECTION}</td>
                <td className="px-2 py-4">{data?.LM_COLLECTION}</td>
                {calculatePercentageChange(
                  data?.COLLECTION,
                  data?.LM_COLLECTION
                ) >= 0 ? (
                  <td className="px-2 py-4 flex flex-row  items-center gap-2 text-[#00a76f]">
                    <FaArrowUp className="text-[#00a76f]" />
                    <p>
                      {formatNumber(
                        calculatePercentageChange(
                          data?.COLLECTION,
                          data?.LM_COLLECTION
                        )
                      )}
                      %
                    </p>
                  </td>
                ) : (
                  <td className="px-2 py-4 flex flex-row items-center gap-2 text-red-600">
                    <FaArrowDown className="text-red-600" />
                    <p>
                      {formatNumber(
                        calculatePercentageChange(
                          data?.COLLECTION,
                          data?.LM_COLLECTION
                        )
                      )}
                      %
                    </p>
                  </td>
                )}

                <td className="px-2 py-4">{data?.LD_COLL}</td>
                <td className="px-2 py-4">{data?.RECORY}</td>
                <td className="px-2 py-4">{data?.ACHIEVED}</td>
                <td className="px-2 py-4">{data?.CLIENTS}</td>
                <td className="px-2 py-4">{data?.COVERED}</td>
                {calculatePercentageChange(data?.COVERED, data?.LM_COVERED) >=
                0 ? (
                  <td className="px-2 py-4 flex flex-row  items-center gap-2 text-[#00a76f]">
                    <FaArrowUp className="text-[#00a76f]" />
                    <p>
                      {formatNumber(
                        calculatePercentageChange(
                          data?.COVERED,
                          data?.LM_COVERED
                        )
                      )}
                      %
                    </p>
                  </td>
                ) : (
                  <td className="px-2 py-4 flex flex-row items-center gap-2 text-red-600">
                    <FaArrowDown className="text-red-600" />
                    <p>
                      {formatNumber(
                        calculatePercentageChange(
                          data?.COVERED,
                          data?.LM_COVERED
                        )
                      )}
                      %
                    </p>
                  </td>
                )}
                <td className="px-2 py-4">{data?.COVERAGE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionTable;
