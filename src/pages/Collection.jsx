import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import MainCard from "../components/card/MainCard";
import CollectionTable from "../components/tables/CollectionTable";
import { getCurrentDate,formatDateForAPI,formatDateForInput } from "../utils/TableUtils";
const Collection = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loader, setLoader] = useState(true);

  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: "01-MAR-2025",
    edate: "31-MAR-2025",
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
  });

  // Fetch Collection data (Main API)
  const getCollection = async () => {
    try {
      const { data } = await axios.get(
        `https://zbl.zaffarsons.com/zbl/Collection`, 
        { params: { 
            sdate: filters.sdate, 
            edate: filters.edate, 
            company: filters.rec_company, 
            branch: "", 
            crr: "" 
        } }
      );
      setCollectionData(data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  // Fetch Collection Table Data (Recovery API)
  const getCollectionTableData = async () => {
    try {
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/recovery", { params: filters });
      setCollectionTableData(data);
    } catch (error) {
      console.error("Error fetching collection table data:", error);
    }
  };

  // Fetch Company List for Dropdown
  const fetchDropdownData = async () => {
    try {
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/pre-define");
      if (Array.isArray(data?.company_list)) {
        setCompanies(data?.company_list);
      } else {
        console.error("Invalid company list format:", data?.company_list);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    getCollection();
    getCollectionTableData();
    fetchDropdownData();
  }, []);

  // Handle Filter Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    getCollection();
    getCollectionTableData();
  };

  return (
    <div className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${theme === "dark" ? "top-section" : "bg-white"} border-white`}>
      {/* Filter Form */}
      <form onSubmit={handleSubmit} className="mb-6 w-[91%] p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <select
              value={filters.rec_company}
              onChange={(e) => setFilters({ ...filters, rec_company: e.target.value })}
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
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={formatDateForInput(filters.sdate)}
              onChange={(e) => setFilters({ ...filters, sdate: formatDateForAPI(e.target.value) })}
              className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={formatDateForInput(filters.edate)}
              onChange={(e) => setFilters({ ...filters, edate: formatDateForAPI(e.target.value) })}
              className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        <button type="submit" className="mt-6 px-6 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
          Apply Filters
        </button>
        </div>
      </form>

      {/* Collection Cards */}
      <div className="flex gap-5 w-full justify-center items-center flex-wrap my-10 px-3">
      <MainCard
          first={"Cash Recovery"}
          second={"Last M Recovery"}
          third={"Today Recovery"}
          four={"Last D Recovery"}
          currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
          lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
          todaySale={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
          LastDaySale={
            collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
          }
        />
        <MainCard
          first={"Cash Recovery"}
          second={"Last M Recovery"}
          third={"Today Recovery"}
          four={"Last D Recovery"}
          currentMonth={collectionData?.credit_cash_recovery?.LD_CASH_COLL}
          lastMonth={collectionData?.credit_cash_recovery?.LD_CASH_COLL_LAST}
          todaySale={collectionData?.credit_cash_recovery?.LD_CR}
          LastDaySale={collectionData?.credit_cash_recovery?.LD_CR_LAST}
        />
        <MainCard
          first={"Cash Recovery"}
          second={"Last M Recovery"}
          third={"Today Recovery"}
          four={"Last D Recovery"}
          currentMonth={collectionData?.installment_recovery?.COLLECTION}
          lastMonth={collectionData?.installment_recovery?.LAST_COLLECTION}
          todaySale={collectionData?.installment_recovery?.NET_RECOVERY}
          LastDaySale={collectionData?.installment_recovery?.LAST_NET_RECOVERY}
        />
      </div>

      {/* Collection Table */}
      <div className="collection_table w-full justify-center flex mt-5">
        <CollectionTable collectionTableData={collectionTableData} />
      </div>
    </div>
  );
};

export default Collection;
