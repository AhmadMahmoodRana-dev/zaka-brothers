import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import {
  formatDateForAPI,
  getCurrentDate,
  formatDateForInput,
  getFirstDayOfCurrentMonth,
} from "../utils/TableUtils";
import BankPositionTable from "../components/tables/BankPositionTable";


const BankPosition = () => {
  const { theme } = useContext(Context);
  const [collectionTableData1, setCollectionTableData1] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);

  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: "",
  });


  const getCollectionTableData1 = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/bankPostion",
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
      setCollectionTableData1(data);
    } catch (error) {
      console.error("Error fetching collection table data:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.zaffarsons.com/zbl/pre-define"
      );
      if (Array.isArray(data?.company_list)) {
        setCompanies(data?.company_list);
        setBranch(data?.branch_list);
      } else {
        console.error("Invalid company list format:", data?.company_list);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    getCollectionTableData1();
    fetchDropdownData();
  }, []);

  useEffect(() => {
    getCollectionTableData1();
  }, [filters]);

  return (
    <div
      className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
        theme === "dark" ? "top-section" : "bg-white"
      } border-white`}
    >
      {/* Filter Form */}
      <div className="mb-6 w-[91%] py-2">
        <div className={`w-full  pb-4 px-4 ${theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"}  shadow-lg rounded-md`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

     
      {/* Tables */}
     
      <div className="product_table w-full justify-center flex mt-5">
        <BankPositionTable collectionTableData={collectionTableData1} />
      </div>
  
    </div>
  );
};

export default BankPosition;
