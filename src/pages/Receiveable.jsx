import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import ReceiveTable from "../components/tables/ReceiveTable";
import {
  formatDateForAPI,
  formatDateForInput,
  getCurrentDate,
} from "../utils/TableUtils";
const Receiveable = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);

  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: "01-MAR-2025",
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: "",
  });

  // Fetch Collection data (Main API)
  const getCollection = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `https://zbl.zaffarsons.com/zbl/receivable`,
        {
          params: {
            sdate: filters.sdate,
            edate: filters.edate,
            company: filters.rec_company,
            branch: filters.branch,
            crr: "",
          },
        }
      );

      if (Array.isArray(data)) {
        setCollectionData([...data]); // Spread operator to ensure re-render
      } else {
        console.error("Expected an array, but got:", typeof data);
        setCollectionData([]);
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
      setCollectionData([]);
    } finally {
      setLoader(false);
    }
  };

  // Fetch Company List for Dropdown
  const fetchDropdownData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/pre-define"
      );
      if (Array.isArray(data?.company_list)) {
        setCompanies(data.company_list);
        setBranch(data.branch_list);
      } else {
        console.error("Invalid company list format:", data?.company_list);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  // Fetch data on mount & when filters change
  useEffect(() => {
    getCollection();
    fetchDropdownData();
  }, []);

  // Log updated state when collectionData changes
  useEffect(() => {
    console.log("Updated Collection Data:", collectionData);
  }, [collectionData]);
  
  useEffect(() => {
    getCollection();
  }, [filters]);

  return (
    <div
      className={`w-full min-h-[92.2vh] flex flex-col items-center ${
        theme === "dark" ? "top-section" : "bg-white"
      } border-white`}
    >
      {/* Filter Form */}
      <div className="mb-6 w-[93%] p-4">
      <div className={`w-full  pb-4 px-4 ${theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"}  shadow-lg rounded-md`}>

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
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              value={filters.branch}
              onChange={(e) =>
                setFilters({ ...filters, branch: e.target.value })
              }
              className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
            >
              {branch.map((branch) => (
                <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
                  {branch.BRANCH_NAME}
                </option>
              ))}
            </select>
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
      <div className="stockTable w-full justify-center flex">
        <ReceiveTable collectionTableData={collectionData} />
      </div>
    </div>
  );
};

export default Receiveable;
