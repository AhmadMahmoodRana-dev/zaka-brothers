import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import MainCard from "../components/card/MainCard";
import CollectionTable from "../components/tables/CollectionTable";
import {
  getCurrentDate,
  formatDateForAPI,
  formatDateForInput,
  getFirstDayOfCurrentMonth,
} from "../utils/TableUtils";
import Barchart from "../charts/Barchart";
import RecoveryCharts from "../charts/RecoveryCharts";
const Collection = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loader, setLoader] = useState(true);
  const [chartData, setChartData] = useState([]);

  console.log(collectionData, "LAST CARD RESPONSE");

  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
  });

  // Fetch Collection data (Main API)
  const getCollection = async () => {
    try {
      const { data } = await axios.get(
        `https://zbl.zaffarsons.com/zbl/Collection`,
        {
          params: {
            sdate: filters.sdate,
            edate: filters.edate,
            company: filters.rec_company,
            branch: "",
            crr: "",
          },
        }
      );
      setCollectionData(data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };
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

  // Fetch Collection Table Data (Recovery API)
  const getCollectionTableData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/recovery",
        { params: filters }
      );
      setCollectionTableData(data);
    } catch (error) {
      console.error("Error fetching collection table data:", error);
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
    Target: item.TARGET_AMOUNT,
    Achieved: item.RECOVERY_AMOUNT,
  }));
 // In Collection.js (parent component)
const formatChartData1 = chartData.map((item) => ({
  MONTH_LABEL: item.MONTH_LABEL,
    RECOVERY_IN_MILLION: parseFloat(item.RECOVERY_IN_MILLION.replace("M", ""))
}));

  useEffect(() => {
    getCollection();
    getCollectionTableData();
    fetchDropdownData();
    getChartData();
  }, []);

  useEffect(() => {
    getCollection();
    getCollectionTableData();
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

      {/* Collection Cards */}
      <div
        className={`w-[91%]  pb-8  ${
          theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
        }  shadow-lg rounded-md`}
      >
        <div className="flex gap-5 w-full justify-center items-center flex-wrap my-10 px-3">
          <MainCard
            first={"Inst.M Recovery"}
            second={"L.M Inst Recovery"}
            third={"Inst.TD Recovery"}
            four={"L.D Inst Recovery"}
            currentMonth={collectionData?.installment_recovery?.COLLECTION}
            lastMonth={collectionData?.installment_recovery?.LAST_COLLECTION}
            todaySale={collectionData?.installment_recovery?.LD_COLL}
            LastDaySale={collectionData?.installment_recovery?.LD_COLL_LAST}
          />
          <MainCard
            first={"Credit.M Recovery"}
            second={"L.M Credit Recovery"}
            third={"Credit.TD Recovery"}
            four={"L.D Credit Recovery"}
            currentMonth={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
            lastMonth={
              collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
            }
            todaySale={collectionData?.credit_cash_recovery?.LD_CR}
            LastDaySale={collectionData?.credit_cash_recovery?.LD_CR_LAST}
            // currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
            // lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
            // todaySale={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
            // LastDaySale={
            //   collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
            // }
          />
          <MainCard
            first={"Cash.M Recovery"}
            second={"L.M Cash Recovery"}
            third={"Cash.TD Recovery"}
            four={"L.D Cash Recovery"}
            currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
            lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
            todaySale={collectionData?.credit_cash_recovery?.LD_CASH_COLL}
            LastDaySale={
              collectionData?.credit_cash_recovery?.LD_CASH_COLL_LAST
            }
          />
        </div>
      </div>

      {/* Collection Table */}
      <div className="collection_table w-full justify-center flex mt-5">
        <CollectionTable collectionTableData={collectionTableData} />
      </div>
      <Barchart collectionData={formatChartData} />
      <RecoveryCharts chartData={formatChartData1} />
    </div>
  );
};

export default Collection;
