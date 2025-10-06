// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import {
//   formatDateForAPI,
//   getCurrentDate,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";
// import PayableTable from "../components/tables/PayableTable";


// const Payable = () => {
//   const { theme } = useContext(Context);
//   const [collectionTableData1, setCollectionTableData1] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);

//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: "",
//   });


//   const getCollectionTableData1 = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/payable",
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
//     getCollectionTableData1();
//     fetchDropdownData();
//   }, []);

//   useEffect(() => {
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

     
//       {/* Tables */}
     
//       <div className="product_table w-full justify-center flex mt-5">
//         <PayableTable collectionTableData={collectionTableData1} />
//       </div>
  
//     </div>
//   );
// };

// export default Payable;


// import { useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import {
//   formatDateForAPI,
//   getCurrentDate,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";
// import PayableTable from "../components/tables/PayableTable";
// import { 
//   FiFilter, 
//   FiCalendar, 
//   FiHome, 
//   FiGitBranch, 
//   FiRefreshCw,
//   FiDollarSign,
//   FiTrendingUp
// } from "react-icons/fi";

// // Modern Loader Component
// const Loader = () => (
//   <div className="flex flex-col items-center justify-center py-12">
//     <div className="relative">
//       <div className="w-12 h-12 border-4 border-blue-100 rounded-full"></div>
//       <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//     </div>
//     <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading Payable Data</p>
//     <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Please wait while we fetch your records</p>
//   </div>
// );

// const Payable = () => {
//   const { theme } = useContext(Context);
//   const [collectionTableData1, setCollectionTableData1] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Get logged-in company and branch from localStorage
//   const selectedCompany = localStorage.getItem("selectedCompany");
//   const selectedBranch = localStorage.getItem("selectedBranch");

//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: selectedCompany || "1",
//     branch: selectedBranch || "",
//     curr_date: formatDateForAPI(getCurrentDate()),
//   });

//   const getCollectionTableData1 = async () => {
//     setLoader(true);
//     setRefreshing(true);
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/payable",
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
//       setCollectionTableData1(data || []);
//     } catch (error) {
//       console.error("Error fetching payable data:", error);
//       setCollectionTableData1([]);
//     } finally {
//       setLoader(false);
//       setRefreshing(false);
//     }
//   };

//   // Fetch Company and Branch List for Dropdown
//   const fetchDropdownData = useCallback(async () => {
//     try {
//       const storedCompanies = localStorage.getItem('company_list');
//       const storedBranches = localStorage.getItem('branch_list');
      
//       if (storedCompanies && storedBranches) {
//         const companiesData = JSON.parse(storedCompanies);
//         const branchesData = JSON.parse(storedBranches);
        
//         let transformedCompanies = [];
//         let transformedBranches = [];
        
//         if (Array.isArray(companiesData)) {
//           transformedCompanies = companiesData.map(company => ({
//             COMPANY_ID: company.id?.toString() || company.COMPANY_ID?.toString(),
//             COMPANY_NAME: company.name || company.COMPANY_NAME
//           }));
//         } else if (companiesData.company_list) {
//           transformedCompanies = companiesData.company_list.map(company => ({
//             COMPANY_ID: company.COMPANY_ID?.toString(),
//             COMPANY_NAME: company.COMPANY_NAME
//           }));
//         }
        
//         if (Array.isArray(branchesData)) {
//           transformedBranches = branchesData.map(branchItem => ({
//             BRANCH_ID: branchItem.id?.toString() || branchItem.BRANCH_ID?.toString(),
//             BRANCH_NAME: branchItem.name || branchItem.BRANCH_NAME,
//             COMPANY_ID: branchItem.company_id?.toString() || branchItem.COMPANY_ID?.toString()
//           }));
//         } else if (branchesData.branch_list) {
//           transformedBranches = branchesData.branch_list.map(branchItem => ({
//             BRANCH_ID: branchItem.BRANCH_ID?.toString(),
//             BRANCH_NAME: branchItem.BRANCH_NAME,
//             COMPANY_ID: branchItem.COMPANY_ID?.toString()
//           }));
//         }
        
//         setCompanies(transformedCompanies);
//         setBranch(transformedBranches);
        
//         if (transformedCompanies.length > 0) {
//           const loggedInCompanyExists = transformedCompanies.some(
//             company => company.COMPANY_ID === selectedCompany
//           );
          
//           if (loggedInCompanyExists && selectedCompany) {
//             setFilters(prev => ({
//               ...prev,
//               rec_company: selectedCompany,
//               branch: selectedBranch || ""
//             }));
//           } else {
//             setFilters(prev => ({
//               ...prev,
//               rec_company: transformedCompanies[0].COMPANY_ID || "1"
//             }));
//           }
//         }
//       } else {
//         try {
//           const { data } = await axios.get(
//             "https://zbl.erprz.com/zbl/pre-define"
//           );
          
//           if (data?.company_list && Array.isArray(data.company_list)) {
//             const apiCompanies = data.company_list.map(company => ({
//               COMPANY_ID: company.COMPANY_ID?.toString(),
//               COMPANY_NAME: company.COMPANY_NAME
//             }));
            
//             const apiBranches = data.branch_list.map(branchItem => ({
//               BRANCH_ID: branchItem.BRANCH_ID?.toString(),
//               BRANCH_NAME: branchItem.BRANCH_NAME,
//               COMPANY_ID: branchItem.COMPANY_ID?.toString()
//             }));
            
//             setCompanies(apiCompanies);
//             setBranch(apiBranches);
            
//             localStorage.setItem('company_list', JSON.stringify(apiCompanies));
//             localStorage.setItem('branch_list', JSON.stringify(apiBranches));
            
//             if (apiCompanies.length > 0) {
//               const loggedInCompanyExists = apiCompanies.some(
//                 company => company.COMPANY_ID === selectedCompany
//               );
              
//               if (loggedInCompanyExists && selectedCompany) {
//                 setFilters(prev => ({
//                   ...prev,
//                   rec_company: selectedCompany,
//                   branch: selectedBranch || ""
//                 }));
//               } else {
//                 setFilters(prev => ({
//                   ...prev,
//                   rec_company: apiCompanies[0].COMPANY_ID 
//                 }));
//               }
//             }
//           }
//         } catch (apiError) {
//           console.error("Error fetching dropdown data from API:", apiError);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   }, [selectedCompany, selectedBranch]);

//   const fetchAllData = useCallback(() => {
//     getCollectionTableData1();
//   }, [filters.sdate, filters.edate, filters.rec_company, filters.branch]);

//   useEffect(() => {
//     fetchDropdownData();
//   }, [fetchDropdownData]);

//   // Refresh data when filters change
//   useEffect(() => {
//     if (filters.rec_company) {
//       fetchAllData();
//     }
//   }, [fetchAllData]);

//   // Filter branches based on selected company
//   const filteredBranches = branch.filter(
//     (br) => br.COMPANY_ID === filters.rec_company
//   );

//   const handleFilterChange = (key, value) => {
//     if (key === 'rec_company') {
//       setFilters(prev => ({
//         ...prev,
//         rec_company: value,
//         branch: "" // Reset branch when company changes
//       }));
//     } else {
//       setFilters(prev => ({
//         ...prev,
//         [key]: value
//       }));
//     }
//   };

//   const handleRefresh = () => {
//     fetchAllData();
//   };

//   return (
//     <div className={`w-full min-h-screen ${theme === "dark" ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-gray-50 to-blue-50"} pb-8`}>
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
//                 Payable Management
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 text-lg">
//                 Track and manage vendor payments and balances
//               </p>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className={`flex items-center px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
//                 refreshing 
//                   ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
//                   : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl text-gray-700 dark:text-gray-300'
//               }`}
//             >
//               <FiRefreshCw className={`mr-3 ${refreshing ? 'animate-spin' : ''}`} />
//               {refreshing ? 'Refreshing...' : 'Refresh Data'}
//             </button>
//           </div>

//           {/* Modern Filter Section */}
//           <div className={`w-full p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-3xl shadow-sm border ${theme === "dark" ? "border-gray-700" : "border-gray-200"} backdrop-blur-sm`}>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
//                 <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3">
//                   <FiFilter className="text-blue-600 dark:text-blue-400 text-lg" />
//                 </div>
//                 Filter Options
//               </h2>
//               <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
//                 Active Period
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {[
//                 {
//                   label: "Company",
//                   icon: <FiHome className="mr-2" />,
//                   value: filters.rec_company,
//                   onChange: (e) => handleFilterChange('rec_company', e.target.value),
//                   type: "select",
//                   options: companies
//                 },
//                 {
//                   label: "Branch",
//                   icon: <FiGitBranch className="mr-2" />,
//                   value: filters.branch,
//                   onChange: (e) => handleFilterChange('branch', e.target.value),
//                   type: "select",
//                   options: filteredBranches,
//                   hasAll: true
//                 },
//                 {
//                   label: "Start Date",
//                   icon: <FiCalendar className="mr-2" />,
//                   value: formatDateForInput(filters.sdate),
//                   onChange: (e) => handleFilterChange('sdate', formatDateForAPI(e.target.value)),
//                   type: "date"
//                 },
//                 {
//                   label: "End Date",
//                   icon: <FiCalendar className="mr-2" />,
//                   value: formatDateForInput(filters.edate),
//                   onChange: (e) => handleFilterChange('edate', formatDateForAPI(e.target.value)),
//                   type: "date"
//                 }
//               ].map((filter, index) => (
//                 <div key={index} className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
//                     {filter.icon}
//                     {filter.label}
//                   </label>
//                   {filter.type === "select" ? (
//                     <select
//                       value={filter.value}
//                       onChange={filter.onChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                     >
//                       {filter.hasAll && <option value="">All {filter.label}s</option>}
//                       {filter.options.map((option) => (
//                         <option key={option.COMPANY_ID || option.BRANCH_ID} value={option.COMPANY_ID || option.BRANCH_ID}>
//                           {option.COMPANY_NAME || option.BRANCH_NAME}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       type={filter.type}
//                       value={filter.value}
//                       onChange={filter.onChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Date Range Info */}
//             <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200 dark:border-blue-700">
//               <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
//                 <FiCalendar className="mr-2" />
//                 Showing payable data from {formatDateForInput(filters.sdate)} to {formatDateForInput(filters.edate)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         {!loader && collectionTableData1.length > 0 && (
//           <div className="mb-8">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Vendors</p>
//                     <p className="text-2xl font-bold text-gray-800 dark:text-white">{collectionTableData1.length}</p>
//                   </div>
//                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
//                     <FiHome className="text-blue-600 text-xl" />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Payable</p>
//                     <p className="text-2xl font-bold text-red-600 dark:text-red-400">
//                       {new Intl.NumberFormat("en-PK", {
//                         style: "currency",
//                         currency: "PKR",
//                         maximumFractionDigits: 0,
//                       }).format(
//                         collectionTableData1.reduce((sum, item) => sum + (Number(item?.CLOSING) || 0), 0)
//                       )}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
//                     <FiDollarSign className="text-red-600 text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Purchase</p>
//                     <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                       {new Intl.NumberFormat("en-PK", {
//                         style: "currency",
//                         currency: "PKR",
//                         maximumFractionDigits: 0,
//                       }).format(
//                         collectionTableData1.reduce((sum, item) => sum + (Number(item?.PURCHASE) || 0), 0)
//                       )}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
//                     <FiTrendingUp className="text-green-600 text-xl" />
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Payment</p>
//                     <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                       {new Intl.NumberFormat("en-PK", {
//                         style: "currency",
//                         currency: "PKR",
//                         maximumFractionDigits: 0,
//                       }).format(
//                         collectionTableData1.reduce((sum, item) => sum + (Number(item?.PAYMENT) || 0), 0)
//                       )}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
//                     <FiDollarSign className="text-blue-600 text-xl" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Table Section */}
//         <div className="w-full">
//           {loader ? (
//             <Loader />
//           ) : (
//             <PayableTable collectionTableData={collectionTableData1} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payable;


import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import {
  formatDateForAPI,
  getCurrentDate,
  formatDateForInput,
  getFirstDayOfCurrentMonth,
} from "../utils/TableUtils";
import PayableTable from "../components/tables/PayableTable";
import { 
  FiFilter, 
  FiCalendar, 
  FiHome, 
  FiGitBranch, 
  FiRefreshCw,
  FiDollarSign,
  FiTrendingUp
} from "react-icons/fi";

// Modern Loader Component
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-100 rounded-full"></div>
      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading Payable Data</p>
    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Please wait while we fetch your records</p>
  </div>
);

const Payable = () => {
  const { theme } = useContext(Context);
  const [collectionTableData1, setCollectionTableData1] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Get logged-in company and branch from localStorage
  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");

  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: selectedCompany || "1",
    branch: selectedBranch || "",
    curr_date: formatDateForAPI(getCurrentDate()),
  });

  const getCollectionTableData1 = async () => {
    setLoader(true);
    setRefreshing(true);
    try {
      const { data } = await axios.get(
        "https://zbl.erprz.com/zbl/payable",
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
      setCollectionTableData1(data || []);
    } catch (error) {
      console.error("Error fetching payable data:", error);
      setCollectionTableData1([]);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  };

  // Fetch Company and Branch List for Dropdown
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
        
        if (transformedCompanies.length > 0) {
          const loggedInCompanyExists = transformedCompanies.some(
            company => company.COMPANY_ID === selectedCompany
          );
          
          if (loggedInCompanyExists && selectedCompany) {
            setFilters(prev => ({
              ...prev,
              rec_company: selectedCompany,
              branch: selectedBranch || ""
            }));
          } else {
            // Set first company and automatically select its first branch
            const firstCompany = transformedCompanies[0].COMPANY_ID || "1";
            const firstCompanyBranches = transformedBranches.filter(br => br.COMPANY_ID === firstCompany);
            const firstBranch = firstCompanyBranches.length > 0 ? firstCompanyBranches[0].BRANCH_ID : "";
            
            setFilters(prev => ({
              ...prev,
              rec_company: firstCompany,
              branch: firstBranch
            }));
          }
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
            
            if (apiCompanies.length > 0) {
              const loggedInCompanyExists = apiCompanies.some(
                company => company.COMPANY_ID === selectedCompany
              );
              
              if (loggedInCompanyExists && selectedCompany) {
                setFilters(prev => ({
                  ...prev,
                  rec_company: selectedCompany,
                  branch: selectedBranch || ""
                }));
              } else {
                // Set first company and automatically select its first branch
                const firstCompany = apiCompanies[0].COMPANY_ID;
                const firstCompanyBranches = apiBranches.filter(br => br.COMPANY_ID === firstCompany);
                const firstBranch = firstCompanyBranches.length > 0 ? firstCompanyBranches[0].BRANCH_ID : "";
                
                setFilters(prev => ({
                  ...prev,
                  rec_company: firstCompany,
                  branch: firstBranch
                }));
              }
            }
          }
        } catch (apiError) {
          console.error("Error fetching dropdown data from API:", apiError);
        }
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  }, [selectedCompany, selectedBranch]);

  const fetchAllData = useCallback(() => {
    getCollectionTableData1();
  }, [filters.sdate, filters.edate, filters.rec_company, filters.branch]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  // Refresh data when filters change
  useEffect(() => {
    if (filters.rec_company) {
      fetchAllData();
    }
  }, [fetchAllData]);

  // Filter branches based on selected company
  const filteredBranches = branch.filter(
    (br) => br.COMPANY_ID === filters.rec_company
  );

  const handleFilterChange = (key, value) => {
    if (key === 'rec_company') {
      // When company changes, automatically select the first branch of the new company
      const newCompanyBranches = branch.filter(br => br.COMPANY_ID === value);
      const firstBranch = newCompanyBranches.length > 0 ? newCompanyBranches[0].BRANCH_ID : "";
      
      setFilters(prev => ({
        ...prev,
        rec_company: value,
        branch: firstBranch // Automatically select first branch
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleRefresh = () => {
    fetchAllData();
  };

  // Calculate financial metrics for stats overview
  const calculateFinancialMetrics = () => {
    if (!collectionTableData1 || collectionTableData1.length === 0) {
      return {
        totalVendors: 0,
        totalDue: 0,
        totalAdvance: 0,
        totalPurchase: 0,
        totalPayment: 0,
        netPosition: 0
      };
    }

    return collectionTableData1.reduce(
      (acc, item) => {
        const closing = Number(item?.CLOSING) || 0;
        const purchase = Number(item?.PURCHASE) || 0;
        const payment = Number(item?.PAYMENT) || 0;

        return {
          totalVendors: acc.totalVendors + 1,
          totalDue: acc.totalDue + (closing > 0 ? closing : 0),
          totalAdvance: acc.totalAdvance + (closing < 0 ? Math.abs(closing) : 0),
          totalPurchase: acc.totalPurchase + purchase,
          totalPayment: acc.totalPayment + payment,
          netPosition: acc.netPosition + closing
        };
      },
      { totalVendors: 0, totalDue: 0, totalAdvance: 0, totalPurchase: 0, totalPayment: 0, netPosition: 0 }
    );
  };

  const financialMetrics = calculateFinancialMetrics();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`w-full min-h-screen ${theme === "dark" ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-gray-50 to-blue-50"} pb-8`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                Payable Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Track and manage vendor payments and balances
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                refreshing 
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl text-gray-700 dark:text-gray-300'
              }`}
            >
              <FiRefreshCw className={`mr-3 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>

          {/* Modern Filter Section */}
          <div className={`w-full p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-3xl shadow-sm border ${theme === "dark" ? "border-gray-700" : "border-gray-200"} backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3">
                  <FiFilter className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                Filter Options
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                Active Period
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Company",
                  icon: <FiHome className="mr-2" />,
                  value: filters.rec_company,
                  onChange: (e) => handleFilterChange('rec_company', e.target.value),
                  type: "select",
                  options: companies
                },
                {
                  label: "Branch",
                  icon: <FiGitBranch className="mr-2" />,
                  value: filters.branch,
                  onChange: (e) => handleFilterChange('branch', e.target.value),
                  type: "select",
                  options: filteredBranches,
                  hasAll: false // Changed to false to always select a branch
                },
                {
                  label: "Start Date",
                  icon: <FiCalendar className="mr-2" />,
                  value: formatDateForInput(filters.sdate),
                  onChange: (e) => handleFilterChange('sdate', formatDateForAPI(e.target.value)),
                  type: "date"
                },
                {
                  label: "End Date",
                  icon: <FiCalendar className="mr-2" />,
                  value: formatDateForInput(filters.edate),
                  onChange: (e) => handleFilterChange('edate', formatDateForAPI(e.target.value)),
                  type: "date"
                }
              ].map((filter, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    {filter.icon}
                    {filter.label}
                  </label>
                  {filter.type === "select" ? (
                    <select
                      value={filter.value}
                      onChange={filter.onChange}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    >
                      {filter.hasAll && <option value="">All {filter.label}s</option>}
                      {filter.options.map((option) => (
                        <option key={option.COMPANY_ID || option.BRANCH_ID} value={option.COMPANY_ID || option.BRANCH_ID}>
                          {option.COMPANY_NAME || option.BRANCH_NAME}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={filter.type}
                      value={filter.value}
                      onChange={filter.onChange}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Selected Filters Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200 dark:border-blue-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center mb-2 sm:mb-0">
                  <FiCalendar className="mr-2" />
                  Showing data from {formatDateForInput(filters.sdate)} to {formatDateForInput(filters.edate)}
                </p>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  {filters.branch && filteredBranches.find(b => b.BRANCH_ID === filters.branch)?.BRANCH_NAME || "All Branches"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        {!loader && collectionTableData1.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Vendors</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{financialMetrics.totalVendors}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <FiHome className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Due</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(financialMetrics.totalDue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                    <FiDollarSign className="text-red-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Advance</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(financialMetrics.totalAdvance)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <FiTrendingUp className="text-green-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Purchase</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(financialMetrics.totalPurchase)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                    <FiTrendingUp className="text-purple-600 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Net Position</p>
                    <p className={`text-2xl font-bold ${
                      financialMetrics.netPosition > 0 
                        ? 'text-red-600 dark:text-red-400' 
                        : financialMetrics.netPosition < 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {formatCurrency(Math.abs(financialMetrics.netPosition))}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    financialMetrics.netPosition > 0 
                      ? 'bg-red-50 dark:bg-red-900/20' 
                      : financialMetrics.netPosition < 0 
                      ? 'bg-green-50 dark:bg-green-900/20' 
                      : 'bg-gray-50 dark:bg-gray-900/20'
                  }`}>
                    <FiDollarSign className={
                      financialMetrics.netPosition > 0 
                        ? 'text-red-600 text-xl' 
                        : financialMetrics.netPosition < 0 
                        ? 'text-green-600 text-xl' 
                        : 'text-gray-600 text-xl'
                    } />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="w-full">
          {loader ? (
            <Loader />
          ) : (
            <PayableTable collectionTableData={collectionTableData1} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payable;