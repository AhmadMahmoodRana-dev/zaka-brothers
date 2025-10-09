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



import React, { useContext, useEffect, useState, useCallback } from "react";
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
  FiFilter, 
  FiHome, 
  FiGitBranch, 
  FiCalendar, 
  FiRefreshCw,
  FiTrendingUp,
  FiDollarSign,
  FiCreditCard,
  FiLayers
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

  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");

  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: selectedCompany,
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: selectedBranch || "",
  });

  const getCollection = async () => {
    try {
      setLoader(true);
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
    } finally {
      setLoader(false);
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

  const fetchDropdownData = useCallback(async () => {
    try {
      const storedCompanies = localStorage.getItem('company_list');
      const storedBranches = localStorage.getItem('branch_list');
      
      if (storedCompanies && storedBranches) {
        const companiesData = JSON.parse(storedCompanies);
        const branchesData = JSON.parse(storedBranches);
        
        let transformedCompanies = [];
        let transformedBranches = [];
        
        if (Array.isArray(companiesData)) {
          transformedCompanies = companiesData.map(company => ({
            COMPANY_ID: company.id?.toString() || company.COMPANY_ID?.toString(),
            COMPANY_NAME: company.name || company.COMPANY_NAME
          }));
        } else if (companiesData.company_list) {
          transformedCompanies = companiesData.company_list.map(company => ({
            COMPANY_ID: company.COMPANY_ID?.toString(),
            COMPANY_NAME: company.COMPANY_NAME
          }));
        }
        
        if (Array.isArray(branchesData)) {
          transformedBranches = branchesData.map(branchItem => ({
            BRANCH_ID: branchItem.id?.toString() || branchItem.BRANCH_ID?.toString(),
            BRANCH_NAME: branchItem.name || branchItem.BRANCH_NAME,
            COMPANY_ID: branchItem.company_id?.toString() || branchItem.COMPANY_ID?.toString()
          }));
        } else if (branchesData.branch_list) {
          transformedBranches = branchesData.branch_list.map(branchItem => ({
            BRANCH_ID: branchItem.BRANCH_ID?.toString(),
            BRANCH_NAME: branchItem.BRANCH_NAME,
            COMPANY_ID: branchItem.COMPANY_ID?.toString()
          }));
        }
        
        setCompanies(transformedCompanies);
        setBranch(transformedBranches);
        
        if (transformedCompanies.length > 0 && !selectedCompany) {
          setFilters(prev => ({
            ...prev,
            rec_company: transformedCompanies[0].COMPANY_ID || "1"
          }));
        }
      } else {
        try {
          const { data } = await axios.get(
            "https://zbl.erprz.com/zbl/pre-define"
          );
          
          if (data?.company_list && Array.isArray(data.company_list)) {
            const apiCompanies = data.company_list.map(company => ({
              COMPANY_ID: company.COMPANY_ID?.toString(),
              COMPANY_NAME: company.COMPANY_NAME
            }));
            
            const apiBranches = data.branch_list.map(branchItem => ({
              BRANCH_ID: branchItem.BRANCH_ID?.toString(),
              BRANCH_NAME: branchItem.BRANCH_NAME,
              COMPANY_ID: branchItem.COMPANY_ID?.toString()
            }));
            
            setCompanies(apiCompanies);
            setBranch(apiBranches);
            
            localStorage.setItem('company_list', JSON.stringify(apiCompanies));
            localStorage.setItem('branch_list', JSON.stringify(apiBranches));
            
            if (apiCompanies.length > 0 && !selectedCompany) {
              setFilters(prev => ({
                ...prev,
                rec_company: apiCompanies[0].COMPANY_ID || "1"
              }));
            }
          }
        } catch (apiError) {
          console.error("Error fetching dropdown data from API:", apiError);
        }
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  }, [selectedCompany]);

  const fetchAllData = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        getCollection(),
        getCollectionTableData(),
        getCollectionTableData1()
      ]);
    } catch (error) {
      console.error("Error fetching all data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [filters.sdate, filters.edate, filters.rec_company, filters.branch]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  useEffect(() => {
    if (filters.rec_company) {
      fetchAllData();
    }
  }, [fetchAllData, filters.rec_company]);

  const filteredBranches = branch.filter(
    (br) => br.COMPANY_ID === filters.rec_company
  );

  const handleRefresh = () => {
    fetchAllData();
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
        : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
    }`}>
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-8 shadow-2xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Sales Dashboard
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                Comprehensive overview of cash, installment, and credit sales performance
              </p>
            </div>
            <div className={`mt-4 lg:mt-0 px-6 py-3 rounded-2xl backdrop-blur-sm ${
              theme === "dark" ? "bg-black/20" : "bg-white/20"
            }`}>
              <div className="text-white text-center">
                <div className="text-sm opacity-90">Active Period</div>
                <div className="font-semibold text-lg">
                  {formatDateForInput(filters.sdate)} - {formatDateForInput(filters.edate)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="mb-8">
          <div className={`
            w-full p-6 lg:p-8 rounded-2xl shadow-xl border-2 backdrop-blur-sm transition-all duration-300
            ${theme === "dark" 
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
              : "bg-white/95 border-blue-100"
            }
          `}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h2 className={`text-xl font-bold flex items-center gap-3 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}>
                  <FiFilter className="text-blue-500" />
                  Sales Filters
                </h2>
                <p className={`mt-1 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Customize your sales data view
                </p>
              </div>
              
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200
                  ${refreshing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  }
                `}
              >
                <FiRefreshCw className={`text-lg ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Company Select */}
              <div className="space-y-3">
                <label className={`block text-sm font-semibold transition-colors ${
                  theme === "dark" ? "text-blue-300" : "text-blue-700"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <FiHome className="text-blue-500" />
                    Company
                  </div>
                </label>
                <select
                  value={filters.rec_company}
                  onChange={(e) =>
                    setFilters({ ...filters, rec_company: e.target.value, branch: "" })
                  }
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                    shadow-sm
                    ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50 hover:border-gray-500" 
                      : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500/30 hover:border-gray-400"
                    }
                  `}
                >
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                        {company.COMPANY_NAME}
                      </option>
                    ))
                  ) : (
                    <option value="1">Loading companies...</option>
                  )}
                </select>
              </div>

              {/* Branch Select */}
              <div className="space-y-3">
                <label className={`block text-sm font-semibold transition-colors ${
                  theme === "dark" ? "text-purple-300" : "text-purple-700"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <FiGitBranch className="text-purple-500" />
                    Branch
                  </div>
                </label>
                <select
                  value={filters.branch}
                  onChange={(e) =>
                    setFilters({ ...filters, branch: e.target.value })
                  }
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                    shadow-sm
                    ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500/50 hover:border-gray-500" 
                      : "bg-white border-gray-300 text-gray-800 focus:border-purple-500 focus:ring-purple-500/30 hover:border-gray-400"
                    }
                  `}
                >
                  <option value="">All Branches</option>
                  {filteredBranches.length > 0 ? (
                    filteredBranches.map((branchItem) => (
                      <option key={branchItem.BRANCH_ID} value={branchItem.BRANCH_ID}>
                        {branchItem.BRANCH_NAME}
                      </option>
                    ))
                  ) : (
                    <option value="">No branches available</option>
                  )}
                </select>
              </div>

              {/* Start Date */}
              <div className="space-y-3">
                <label className={`block text-sm font-semibold transition-colors ${
                  theme === "dark" ? "text-green-300" : "text-green-700"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <FiCalendar className="text-green-500" />
                    Start Date
                  </div>
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
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                    shadow-sm
                    ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-green-500/50 hover:border-gray-500" 
                      : "bg-white border-gray-300 text-gray-800 focus:border-green-500 focus:ring-green-500/30 hover:border-gray-400"
                    }
                  `}
                />
              </div>

              {/* End Date */}
              <div className="space-y-3">
                <label className={`block text-sm font-semibold transition-colors ${
                  theme === "dark" ? "text-orange-300" : "text-orange-700"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <FiCalendar className="text-orange-500" />
                    End Date
                  </div>
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
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                    shadow-sm
                    ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500/50 hover:border-gray-500" 
                      : "bg-white border-gray-300 text-gray-800 focus:border-orange-500 focus:ring-orange-500/30 hover:border-gray-400"
                    }
                  `}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mb-8">
          <div className={`
            w-full p-6 lg:p-8 rounded-2xl shadow-xl border-2 backdrop-blur-sm transition-all duration-300
            ${theme === "dark" 
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
              : "bg-white/95 border-blue-100"
            }
          `}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
              <div>
                <h2 className={`text-2xl font-bold flex items-center gap-3 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}>
                  <FiTrendingUp className="text-blue-500" />
                  Sales Performance
                </h2>
                <p className={`mt-1 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Overview of different sales categories with trend analysis
                </p>
              </div>
              <span className={`text-sm font-medium px-4 py-2 rounded-full mt-2 lg:mt-0 ${
                theme === "dark" ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-700"
              }`}>
                Real-time Data
              </span>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <MainCard
                  first={"Cash Sales"}
                  second={"Last M Sales"}
                  third={"Today Sales"}
                  four={"Last D Sales"}
                  currentMonth={collectionData[0]?.CASH_SALE}
                  lastMonth={collectionData[0]?.LAST_CASH_SALE}
                  todaySale={collectionData[0]?.LD_CASH}
                  LastDaySale={collectionData[0]?.LD_CASH_LAST}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <MainCard
                  first={"Installment Sales"}
                  second={"Last M Installment"}
                  third={"Today Installment"}
                  four={"Last D Installment"}
                  currentMonth={collectionData[0]?.INSTALLMENT_SALE}
                  lastMonth={collectionData[0]?.LAST_INST_SALE}
                  todaySale={collectionData[0]?.LD_INST}
                  LastDaySale={collectionData[0]?.LD_INST_LAST}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <MainCard
                  first={"Credits Sales"}
                  second={"Last M Credits"}
                  third={"Today Credits"}
                  four={"Last D Credits"}
                  currentMonth={collectionData[0]?.CREDIT_SALE}
                  lastMonth={collectionData[0]?.LAST_CREDIT_SALE}
                  todaySale={collectionData[0]?.LD_CREDIT}
                  LastDaySale={collectionData[0]?.LD_CREDIT_LAST}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="space-y-8">
          {/* Cash Sale Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CashSaleTable collectionTableData={collectionTableData} />
          </motion.div>

          {/* Product Wise Sale Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ProductWiseSaleTable collectionTableData1={collectionTableData1} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CashSale;