import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import StockTable from "../components/tables/StockTable";

const formatDateForAPI = (dateString) => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const [year, month, day] = dateString.split("-");
  return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
};

const formatDateForInput = (dateString) => {
  const months = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${year}-${months[month]}-${day}`;
};

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

const Stock = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);

  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: "01-MAR-2025",
    edate: "31-MAR-2025",
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: ""
  });

  // Fetch Collection data (Main API)
  const getCollection = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(`https://zbl.zaffarsons.com/zbl/stock`, {
        params: {
          sdate: filters.sdate,
          edate: filters.edate,
          company: filters.rec_company,
          branch: filters.branch,
          crr: "",
        },
      });

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
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/pre-define");
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

  // Handle Filter Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    getCollection();
  };

  return (
    <div className={`w-full min-h-[92.2vh] flex flex-col items-center ${theme === "dark" ? "top-section" : "bg-white"} border-white`}>
      
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
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              value={filters.branch}
              onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
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
              onChange={(e) => setFilters({ ...filters, edate: formatDateForAPI(e.target.value) })}
              className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button type="submit" className="mt-6 px-6 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            Apply Filters
          </button>
        </div>
      </form>

      {/* Collection Table */}
      <div className="stockTable w-full justify-center flex mt-5">
        <StockTable collectionTableData={collectionData} />
      </div>
     
    </div>
  );
};

export default Stock;
