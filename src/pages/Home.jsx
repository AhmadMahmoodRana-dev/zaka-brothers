import React, { useContext, useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { Context } from "../context/Context";
import axios from "axios";

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

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const Home = () => {
  const { isCollapsed, user, theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);

  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: "01-MAR-2025",
    edate: "31-MAR-2025",
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: "",
  });

  // Fetch Collection data (Main API)
  const getCollection = async () => {
    try {
      const { data } = await axios.get(
        `https://zbl.zaffarsons.com/zbl/dashboad`,
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
      console.log("API Response:", data); // Debugging line
      setCollectionData(data);
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
        setBranch(data?.branch_list);
      } else {
        console.error("Invalid company list format:", data?.company_list);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    getCollection();
    fetchDropdownData();
  }, []);

  // Handle Filter Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    getCollection();
  };
  const formatNumberWithCommas = (number) => {
    if (!number) return "0";
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div
      className={`w-full ${
        theme === "dark" ? "bg-[#141b2e]" : "bg-white border-l border-gray-200"
      } h-[92.2vh]`}
    >
      <div
        className={`${
          theme === "dark" ? "top-section" : "bg-white"
        } pb-10 min-h-[92vh] h-auto w-full px-4`}
      >
        <h1 className="text-white font-semibold text-2xl pt-3">
          Welcome {user?.user?.user} !
        </h1>

        {/* Filter Section */}
        <form onSubmit={handleSubmit} className="mb-6 w-[91%] p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <button
              type="submit"
              className="mt-6 px-6 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </form>

        {/* Cards Section */}
        <h1 className="text-xl font-semibold mt-3">Sales</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
          <div className="tilt-box-wrap min-h-[90px]">
            <div
              className={`tilt-box rounded-sm ${
                theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
              } flex items-center gap-4 px-4`}
            >
              <div
                className={`circle3 ${
                  isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
                } bg-blue-400 rounded-full flex justify-center items-center`}
              >
                <FaCartArrowDown size={24} />
              </div>
              <div className="content">
                <h1 className="text-gray-500 uppercase font-semibold">
                  Total Sales
                </h1>
                <h1 className="text-gray-600 font-semibold text-xl">
                 {formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE)}
                </h1>
              </div>
            </div>
          </div>
          <div className="tilt-box-wrap min-h-[90px]">
            <div
              className={`tilt-box rounded-sm ${
                theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
              } flex items-center gap-4 px-4`}
            >
              <div
                className={`circle3 ${
                  isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
                } bg-blue-400 rounded-full flex justify-center items-center`}
              >
                <FaCartArrowDown size={24} />
              </div>
              <div className="content">
                <h1 className="text-gray-500 uppercase font-semibold">
                  Credit Sale
                </h1>
                <h1 className="text-gray-600 font-semibold text-xl">
                  {formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE)}
                </h1>
              </div>
            </div>
          </div>
          <div className="tilt-box-wrap min-h-[90px]">
            <div
              className={`tilt-box rounded-sm ${
                theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
              } flex items-center gap-4 px-4`}
            >
              <div
                className={`circle3 ${
                  isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
                } bg-blue-400 rounded-full flex justify-center items-center`}
              >
                <FaCartArrowDown size={24} />
              </div>
              <div className="content">
                <h1 className="text-gray-500 uppercase font-semibold">
                  Cash Sales
                </h1>
                <h1 className="text-gray-600 font-semibold text-xl">
                  {formatNumberWithCommas(collectionData?.sale?.CASH_SALE)}
                </h1>
              </div>
            </div>
          </div>
          <div className="tilt-box-wrap min-h-[90px]">
            <div
              className={`tilt-box rounded-sm ${
                theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
              } flex items-center gap-4 px-4`}
            >
              <div
                className={`circle3 ${
                  isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
                } bg-blue-400 rounded-full flex justify-center items-center`}
              >
                <FaCartArrowDown size={24} />
              </div>
              <div className="content">
                <h1 className="text-gray-500 uppercase font-semibold">
                  Installment Sales
                </h1>
                <h1 className="text-gray-600 font-semibold text-xl">
                  {formatNumberWithCommas(collectionData?.sale?.INSTALLMENT_SALE)}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-semibold mt-3">Recovery</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">

        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold text-[.95rem]">
                Installment Recovery
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_RECOVERY)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Cash Recovery
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.CASH_RECOVERY)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Credit Recovery
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.CREDIT_RECOVERY)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Installment Advance
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_ADVANCE)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Credit Advance
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.CREDIT_ADVANCE)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Total Advance
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.TOTAL_ADVANCE)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Total Recovery
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.TOTAL_RECOVERY)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Grand Total
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.recovery?.GRAND_TOTAL)}
              </h1>
            </div>
          </div>
        </div>
        </div>
        <h1 className="text-xl font-semibold mt-3">Bank Expense</h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                CASH AT BANK
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.CASH_AT_BANK)}
              </h1>
            </div>
          </div>
        </div>

        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                CASH IN HAND
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.CASH_IN_HAND)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                TOTAL EXPENSE
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_EXPENSE)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                PURCHASES
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.PURCHASES)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                PAYMENTS
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.PAYMENTS)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                SALARY PAYABLE
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.SALARY_PAYABLE)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">DRAWING</h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.DRAWING)}
              </h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <div
            className={`tilt-box rounded-sm ${
              theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
            } flex items-center gap-4 px-4`}
          >
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
              } bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                TOTAL CASH
              </h1>
              <h1 className="text-gray-600 font-semibold text-xl">
                {formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_CASH)}
              </h1>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
