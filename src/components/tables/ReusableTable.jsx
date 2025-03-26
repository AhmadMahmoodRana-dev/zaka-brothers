import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";

const ReusableTable = ({ apiUrl, title, columns, defaultFilters }) => {
  const { theme } = useContext(Context);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);

  const formatAPIDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const fetchData = async () => {
    try {
      const params = {
        ...filters,
        sdate: formatAPIDate(filters.sdate),
        edate: formatAPIDate(filters.edate),
      };
      const { data } = await axios.get(apiUrl, { params });
      setTableData(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/pre-define");
      setBranches(data.branch_list);
      setCompanies(data.company_list);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDropdownData();
  }, []);

  return (
    <div className={`p-4 w-[91%] ${theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"} border-gray-200 rounded-lg`}>
      <h1 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{title}</h1>

      <form onSubmit={(e) => { e.preventDefault(); fetchData(); }} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          className={`w-full p-2 rounded ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"} border`}
        >
          {companies.map(({ COMPANY_ID, COMPANY_NAME }) => (
            <option key={COMPANY_ID} value={COMPANY_ID}>{COMPANY_NAME}</option>
          ))}
        </select>

        <select
          value={filters.branch}
          onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          className={`w-full p-2 rounded ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"} border`}
        >
          <option value="">All Branches</option>
          {branches.map(({ BRANCH_ID, BRANCH_NAME }) => (
            <option key={BRANCH_ID} value={BRANCH_ID}>{BRANCH_NAME}</option>
          ))}
        </select>

        <input type="date" value={filters.sdate} onChange={(e) => setFilters({ ...filters, sdate: e.target.value })} className={`w-full p-2 rounded border`} />
        <input type="date" value={filters.edate} onChange={(e) => setFilters({ ...filters, edate: e.target.value })} className={`w-full p-2 rounded border`} />
        <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Apply Filters</button>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh] min-w-0">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className={`text-xs uppercase ${theme === "dark" ? "text-white bg-[#203c63]" : "text-gray-500 bg-[#e1e1e3]"} sticky top-0 z-10`}>
            <tr>
              {columns.map(({ header }, index) => (
                <th key={index} className="px-2 py-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${theme === "dark" ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]" : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"}`}>
                {columns.map(({ key }, colIndex) => (
                  <td key={colIndex} className="px-2 py-4">{row[key] ?? 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
