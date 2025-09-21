// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { Context } from "../context/Context";
// import MainCard from "../components/card/MainCard";
// import CashSaleTable from "../components/tables/CashSaleTable";
// import ProductWiseSaleTable from "../components/tables/ProductWiseSaleTable";
// import {
//   formatDateForAPI,
//   getCurrentDate,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";

// const CashSale = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState([]);
//   const [collectionTableData, setCollectionTableData] = useState([]);
//   const [collectionTableData1, setCollectionTableData1] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);

//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: "",
//   });

//   const getCollection = async () => {
//     try {
//       const { data } = await axios.get(`https://zbl.erprz.com/zbl/Sales`, {
//         params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch,
//           crr: "",
//         },
//       });
//       setCollectionData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };

//   const getCollectionTableData = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/sale_detail",
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             crr: "",
//           },
//         }
//       );
//       setCollectionTableData(data);
//     } catch (error) {
//       console.error("Error fetching collection table data:", error);
//     }
//   };

//   const getCollectionTableData1 = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/product_sale",
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             crr: "",
//           },
//         }
//       );
//       setCollectionTableData1(data);
//     } catch (error) {
//       console.error("Error fetching collection table data:", error);
//     }
//   };

//   const fetchDropdownData = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/pre-define"
//       );
//       if (Array.isArray(data?.company_list)) {
//         setCompanies(data?.company_list);
//         setBranch(data?.branch_list);
//       } else {
//         console.error("Invalid company list format:", data?.company_list);
//       }
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   };

 





//   useEffect(() => {
//     getCollection();
//     getCollectionTableData();
//     getCollectionTableData1();
//     fetchDropdownData();
//   }, []);

//   useEffect(() => {
//     getCollection();
//     getCollectionTableData();
//     getCollectionTableData1();
//   }, [filters]);

//   return (
//     <div
//       className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
//         theme === "dark" ? "top-section" : "bg-white"
//       } border-white`}
//     >
//       {/* Filter Form */}
//       <div className="mb-6 w-[91%] py-2">
//         <div className={`w-full  pb-4 px-4 ${theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"}  shadow-lg rounded-md`}>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Company</label>
//               <select
//                 value={filters.rec_company}
//                 onChange={(e) =>
//                   setFilters({ ...filters, rec_company: e.target.value })
//                 }
//                 className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {companies.map((company) => (
//                   <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                     {company.COMPANY_NAME}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">Branch</label>
//               <select
//                 value={filters.branch}
//                 onChange={(e) =>
//                   setFilters({ ...filters, branch: e.target.value })
//                 }
//                 className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {branch.map((branch) => (
//                   <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
//                     {branch.BRANCH_NAME}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 value={formatDateForInput(filters.sdate)}
//                 onChange={(e) =>
//                   setFilters({
//                     ...filters,
//                     sdate: formatDateForAPI(e.target.value),
//                   })
//                 }
//                 className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">End Date</label>
//               <input
//                 type="date"
//                 value={formatDateForInput(filters.edate)}
//                 onChange={(e) =>
//                   setFilters({
//                     ...filters,
//                     edate: formatDateForAPI(e.target.value),
//                   })
//                 }
//                 className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cards */}
//       <div className={`w-[91%]  pb-8 px-4 ${theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"}  shadow-lg rounded-md`}>

//       <motion.div
//         className="flex gap-4 w-full justify-center items-center flex-wrap my-5 "
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <MainCard
//           first={"Cash Sales"}
//           second={"Last M Sales"}
//           third={"Today Sales"}
//           four={"Last D Sales"}
//           currentMonth={collectionData[0]?.CASH_SALE}
//           lastMonth={collectionData[0]?.LAST_CASH_SALE}
//           todaySale={collectionData[0]?.LD_CASH}
//           LastDaySale={collectionData[0]?.LD_CASH_LAST}
//         />
//         <MainCard
//           first={"Installment Sales"}
//           second={"Last M Installment"}
//           third={"Today Installment"}
//           four={"Last D Installment"}
//           currentMonth={collectionData[0]?.INSTALLMENT_SALE}
//           lastMonth={collectionData[0]?.LAST_INST_SALE}
//           todaySale={collectionData[0]?.LD_INST}
//           LastDaySale={collectionData[0]?.LD_INST_LAST}
//         />
//         <MainCard
//           first={"Credits Sales"}
//           second={"Last M Credits"}
//           third={"Today Credits"}
//           four={"Last D Credits"}
//           currentMonth={collectionData[0]?.CREDIT_SALE}
//           lastMonth={collectionData[0]?.LAST_CREDIT_SALE}
//           todaySale={collectionData[0]?.LD_CREDIT}
//           LastDaySale={collectionData[0]?.LD_CREDIT_LAST}
//         />
//       </motion.div>
//       </div>

//       {/* Tables */}
//       <div className="cash_sale_table w-full justify-center flex mt-5">
//         <CashSaleTable collectionTableData={collectionTableData} />
//       </div>
//       <div className="product_table w-full justify-center flex mt-5">
//         <ProductWiseSaleTable collectionTableData1={collectionTableData1} />
//       </div>
     
//     </div>
//   );
// };

// export default CashSale;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Context } from "../context/Context";
import MainCard from "../components/card/MainCard";
import CashSaleTable from "../components/tables/CashSaleTable";
import ProductWiseSaleTable from "../components/tables/ProductWiseSaleTable";
import {
  formatDateForAPI,
  getCurrentDate,
  formatDateForInput,
  getFirstDayOfCurrentMonth,
} from "../utils/TableUtils";
import { 
  FiHome, 
  FiGitBranch, 
  FiCalendar, 
  FiDollarSign, 
  FiCreditCard,
  FiLayers,
  FiRefreshCw,
  FiTrendingUp
} from "react-icons/fi";

const CashSale = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const [collectionTableData1, setCollectionTableData1] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: "",
  });

  const getCollection = async () => {
    try {
      const { data } = await axios.get(`https://zbl.erprz.com/zbl/Sales`, {
        params: {
          sdate: filters.sdate,
          edate: filters.edate,
          company: filters.rec_company,
          branch: filters.branch,
          crr: "",
        },
      });
      setCollectionData(data);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const getCollectionTableData = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.erprz.com/zbl/sale_detail",
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
      setCollectionTableData(data);
    } catch (error) {
      console.error("Error fetching collection table data:", error);
    }
  };

  const getCollectionTableData1 = async () => {
    try {
      const { data } = await axios.get(
        "https://zbl.erprz.com/zbl/product_sale",
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
        "https://zbl.erprz.com/zbl/pre-define"
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

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        getCollection(),
        getCollectionTableData(),
        getCollectionTableData1()
      ]);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        await Promise.all([
          getCollection(),
          getCollectionTableData(),
          getCollectionTableData1(),
          fetchDropdownData()
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoader(true);
      try {
        await Promise.all([
          getCollection(),
          getCollectionTableData(),
          getCollectionTableData1()
        ]);
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchFilteredData();
  }, [filters]);

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen pb-5 flex flex-col items-center ${
        theme === "dark" ? "bg-[#141b2e]" : "bg-gray-50"
      }`}
    >
      {/* Header Section */}
      {/* <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Sales Dashboard</h1>
          <p className="text-blue-100">Monitor and analyze your sales performance</p>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="w-full max-w-7xl px-4">
        {/* Filter Form */}
        <div className="mb-6">
          <div className={`w-full p-6 rounded-xl shadow-lg ${
            theme === "dark" ? "bg-[#2a3e67] border-gray-700" : "bg-white border-gray-200"
          } border`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Filter Options
              </h2>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  refreshing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Company Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                  <FiHome className="mr-2" />
                  Company
                </label>
                <select
                  value={filters.rec_company}
                  onChange={(e) =>
                    setFilters({ ...filters, rec_company: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {companies.map((company) => (
                    <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                      {company.COMPANY_NAME}
                    </option>
                  ))}
                </select>
              </div>

              {/* Branch Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                  <FiGitBranch className="mr-2" />
                  Branch
                </label>
                <select
                  value={filters.branch}
                  onChange={(e) =>
                    setFilters({ ...filters, branch: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Branches</option>
                  {branch.map((branchItem) => (
                    <option key={branchItem.BRANCH_ID} value={branchItem.BRANCH_ID}>
                      {branchItem.BRANCH_NAME}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                  <FiCalendar className="mr-2" />
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
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center">
                  <FiCalendar className="mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(filters.edate)}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      edate: formatDateForAPI(e.target.value),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className={`w-full p-6 rounded-xl shadow-lg mb-6 ${
          theme === "dark" ? "bg-[#2a3e67] border-gray-700" : "bg-white border-gray-200"
        } border`}>
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
            <FiTrendingUp className="mr-3 text-blue-500" />
            Sales Overview
          </h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MainCard
              icon={<FiDollarSign className="text-green-500 text-2xl" />}
              first={"Cash Sales"}
              second={"Last M Sales"}
              third={"Today Sales"}
              four={"Last D Sales"}
              currentMonth={collectionData[0]?.CASH_SALE}
              lastMonth={collectionData[0]?.LAST_CASH_SALE}
              todaySale={collectionData[0]?.LD_CASH}
              LastDaySale={collectionData[0]?.LD_CASH_LAST}
              theme={theme}
            />
            <MainCard
              icon={<FiLayers className="text-orange-500 text-2xl" />}
              first={"Installment Sales"}
              second={"Last M Installment"}
              third={"Today Installment"}
              four={"Last D Installment"}
              currentMonth={collectionData[0]?.INSTALLMENT_SALE}
              lastMonth={collectionData[0]?.LAST_INST_SALE}
              todaySale={collectionData[0]?.LD_INST}
              LastDaySale={collectionData[0]?.LD_INST_LAST}
              theme={theme}
            />
            <MainCard
              icon={<FiCreditCard className="text-purple-500 text-2xl" />}
              first={"Credits Sales"}
              second={"Last M Credits"}
              third={"Today Credits"}
              four={"Last D Credits"}
              currentMonth={collectionData[0]?.CREDIT_SALE}
              lastMonth={collectionData[0]?.LAST_CREDIT_SALE}
              todaySale={collectionData[0]?.LD_CREDIT}
              LastDaySale={collectionData[0]?.LD_CREDIT_LAST}
              theme={theme}
            />
          </motion.div>
        </div>

        {/* Tables Section */}
        <div className="space-y-6">
          {/* Cash Sale Table */}
          <div className={`p-6 rounded-xl shadow-lg ${
            theme === "dark" ? "bg-[#2a3e67] border-gray-700" : "bg-white border-gray-200"
          } border`}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Detailed Sales Records
            </h2>
            <CashSaleTable 
              collectionTableData={collectionTableData} 
              theme={theme}
            />
          </div>

          {/* Product Wise Sale Table */}
          <div className={`p-6 rounded-xl shadow-lg ${
            theme === "dark" ? "bg-[#2a3e67] border-gray-700" : "bg-white border-gray-200"
          } border`}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Product-wise Sales Analysis
            </h2>
            <ProductWiseSaleTable 
              collectionTableData1={collectionTableData1} 
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashSale;