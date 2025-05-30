import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import {
  getCurrentDate,
  formatDateForAPI,
  formatDateForInput,
  getFirstDayOfCurrentMonth,
} from "../utils/TableUtils";
import Barchart from "../charts/Barchart";
import RecoveryCharts from "../charts/RecoveryCharts";
const InstallmentRecoveryChart = () => {
  const { theme } = useContext(Context);
  const [companies, setCompanies] = useState([]);
  const [loader, setLoader] = useState(true);
  const [chartData, setChartData] = useState([]);


  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
  });

  // Fetch CHART data
  const getChartData = async () => {
    try {
      const { data } = await axios.get(
        `https://zbl.zaffarsons.com/zbl/RecoveryPerformance`,
        {
          params: {
            // sdate: filters.sdate,
            // edate: filters.edate,
            company: filters.rec_company,
            branch: "",
            // crr: "",
          },
        }
      );
      setChartData(data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  // Fetch Company List for Dropdown
  const fetchDropdownData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/pre-define"
      );
      if (Array.isArray(data?.company_list)) {
        setCompanies(data?.company_list);
      } else {
        console.error("Invalid company list format:", data?.company_list);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

 const formatChartData = chartData.map((item) => ({
  name: item.MONTH_LABEL,
  Target: +(item.TARGET_AMOUNT / 1_000_000).toFixed(1),   // 13.3 (number)
  Achieved: +(item.RECOVERY_AMOUNT / 1_000_000).toFixed(1), // 10.4 (number)
}));

  // In Collection.js (parent component)
  const formatChartData1 = chartData.map((item) => ({
    MONTH_LABEL: item.MONTH_LABEL,
    RECOVERY_IN_MILLION: parseFloat(item.RECOVERY_IN_MILLION.replace("M", "")),
  }));

  useEffect(() => {
    fetchDropdownData();
    getChartData();
  }, []);

  useEffect(() => {
    getChartData();
  }, [filters]);

  return (
    <div
      className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
        theme === "dark" ? "top-section" : "bg-white"
      } border-white`}
    >
      {/* Filter Form */}
      <div className="mb-6 w-[93%] p-4">
        <div
          className={`w-full  pb-4 px-4 ${
            theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
          }  shadow-lg rounded-md`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <select
                value={filters.rec_company}
                onChange={(e) =>
                  setFilters({ ...filters, rec_company: e.target.value })
                }
                className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
              >
                {companies.map((company) => (
                  <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                    {company.COMPANY_NAME}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formatDateForInput(filters.sdate)}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    sdate: formatDateForAPI(e.target.value),
                  })
                }
                className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={formatDateForInput(filters.edate)}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    edate: formatDateForAPI(e.target.value),
                  })
                }
                className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collection Table */}
      <Barchart collectionData={formatChartData} />
      <RecoveryCharts chartData={formatChartData1} />
    </div>
  );
};

export default InstallmentRecoveryChart;
