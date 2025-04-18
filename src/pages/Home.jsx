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

  const Sale = [
    {
      id: 1,
      name: "Total Sale",
      saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
    },
    {
      id: 2,
      name: "Cash Sale",
      saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
    },
    {
      id: 3,
      name: "Credit Sale",
      saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
    },
    {
      id: 4,
      name: "Installment Sale",
      saleFunction: formatNumberWithCommas(
        collectionData?.sale?.INSTALLMENT_SALE
      ),
    },
  ];
  const Recovery = [
    {
      id: 1,
      name: "Installment Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.INSTALLMENT_RECOVERY
      ),
    },
    {
      id: 2,
      name: "Cash Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.CASH_RECOVERY
      ),
    },
    {
      id: 3,
      name: "Credit Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.CREDIT_RECOVERY
      ),
    },
    {
      id: 4,
      name: "Installment Advance",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.INSTALLMENT_ADVANCE
      ),
    },
    {
      id: 5,
      name: "Credit Advance",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.CREDIT_ADVANCE
      ),
    },
    {
      id: 6,
      name: "Total Advance",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.TOTAL_ADVANCE
      ),
    },
    {
      id: 7,
      name: "Total Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.TOTAL_RECOVERY
      ),
    },
    {
      id: 8,
      name: "Grand Total",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.GRAND_TOTAL
      ),
    },
  ];

  const bank_expense = [
    {
      id: 1,
      name: "Cash At Bank",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.CASH_AT_BANK
      ),
    },
    {
      id: 2,
      name: "Cash In Hand",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.CASH_IN_HAND
      ),
    },
    {
      id: 3,
      name: "Total Expense",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.TOTAL_EXPENSE
      ),
    },
    {
      id: 4,
      name: "Purchases",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.PURCHASES
      ),
    },
    {
      id: 5,
      name: "Payments",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.PAYMENTS
      ),
    },
    {
      id: 6,
      name: "Salary Payable",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.SALARY_PAYABLE
      ),
    },
    {
      id: 7,
      name: "Drawing",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.DRAWING
      ),
    },
    {
      id: 8,
      name: "Total Cash",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.TOTAL_CASH
      ),
    },
  ];

  return (
    <div
      className={`w-full ${
        theme === "dark" ? "bg-[#141b2e]" : "bg-white border-l border-gray-200"
      } min-h-[92.2vh]`}
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
        <form onSubmit={handleSubmit} className="mb-6 w-[91%] p-4 ">
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
          {Sale.map((sale) => {
            return (
              <div key={sale.id} className="tilt-box-wrap min-h-[90px]">
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
                      {sale.name}
                    </h1>
                    <h1 className="text-gray-600 font-semibold text-xl">
                      {sale.saleFunction}
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="text-xl font-semibold mt-3">Recovery</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
          {Recovery.map((recovery) => {
            return (
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
                      {recovery.name}
                    </h1>
                    <h1 className="text-gray-600 font-semibold text-xl">
                      {recovery.saleFunction}
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h1 className="text-xl font-semibold mt-3">Bank Expense</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
          {bank_expense.map((bank) => {
            return (
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
                      {bank.name}
                    </h1>
                    <h1 className="text-gray-600 font-semibold text-xl">
                      {bank.saleFunction}
                    </h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
