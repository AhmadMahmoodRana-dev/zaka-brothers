import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Context } from "../../context/Context";

const CashSaleTable = () => {
  const { theme } = useContext(Context);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const [companies, setCompanies] = useState([]);

  const formatDateForAPI = (dateString) => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const [year, month, day] = dateString.split("-");
    return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
  };

  const formatDateForInput = (dateString) => {
    const months = {
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12",
    };
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${months[month]}-${day}`;
  };

  const getCollectionTableData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/sale_detail",
        { params: filters }
      );
      setCollectionTableData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/pre-define"
      );
      setCompanies(data?.company_list || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCollectionTableData();
    fetchCompanies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getCollectionTableData();
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
      } border-gray-200 rounded-lg`}
    >
      <h1
        className={`text-2xl font-semibold mb-2 ${
          theme === "dark" ? "text-white" : ""
        }`}
      >
        Sale Data
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div>
          <label className="block text-sm font-medium">Company</label>
          <select
            value={filters.company}
            onChange={(e) =>
              setFilters({ ...filters, company: e.target.value })
            }
            className="w-full p-2 rounded border"
          >
            {companies.map((company) => (
              <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                {company.COMPANY_NAME}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={formatDateForInput(filters.sdate)}
            onChange={(e) =>
              setFilters({
                ...filters,
                sdate: formatDateForAPI(e.target.value),
              })
            }
            className="w-full p-2 rounded border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={formatDateForInput(filters.edate)}
            onChange={(e) =>
              setFilters({
                ...filters,
                edate: formatDateForAPI(e.target.value),
              })
            }
            className="w-full p-2 rounded border"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          Apply Filters
        </button>
      </form>

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
                BRANCH NAME
              </th>
              <th scope="col" className="px-1 py-3">
                Cash Sale
              </th>
              <th scope="col" className="px-1 py-3">
                Cash Unit
              </th>
              <th scope="col" className="px-1 py-3">
                Opening
              </th>
              <th scope="col" className="px-1 py-3">
                Credit Sale
              </th>
              <th scope="col" className="px-1 py-3">
                Credit Units
              </th>
              <th scope="col" className="px-1 py-3">
                Recoveved
              </th>
              <th scope="col" className="px-1 py-3">
                Balance
              </th>
              <th scope="col" className="px-1 py-3">
                I.S Sale
              </th>
              <th scope="col" className="px-1 py-3">
                I.S Adv
              </th>
              <th scope="col" className="px-1 py-3">
                Unit
              </th>
              <th scope="col" className="px-1 py-3">
                Ex.Adv I.S
              </th>
              <th scope="col" className="px-1 py-3">
                Lm.Adv I.S
              </th>
              <th scope="col" className="px-1 py-3">
                Adv.Ratio
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashSaleTable;
