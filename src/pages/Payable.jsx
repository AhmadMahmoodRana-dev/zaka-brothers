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

// const Payable = () => {
//   const { theme } = useContext(Context);
//   const [collectionTableData1, setCollectionTableData1] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);

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
//     }
//   };

//   // Fetch Company and Branch List for Dropdown
//   const fetchDropdownData = useCallback(async () => {
//     try {
//       const storedCompanies = localStorage.getItem('company_list');
//       const storedBranches = localStorage.getItem('branch_list');
      
//       console.log("Stored Companies:", storedCompanies);
//       console.log("Stored Branches:", storedBranches);
//       console.log("Logged-in Company:", selectedCompany);
//       console.log("Logged-in Branch:", selectedBranch);
      
//       if (storedCompanies && storedBranches) {
//         const companiesData = JSON.parse(storedCompanies);
//         const branchesData = JSON.parse(storedBranches);
        
//         console.log("Parsed Companies:", companiesData);
//         console.log("Parsed Branches:", branchesData);
        
//         // Handle different data formats
//         let transformedCompanies = [];
//         let transformedBranches = [];
        
//         // Check if data is in login response format or API format
//         if (Array.isArray(companiesData)) {
//           transformedCompanies = companiesData.map(company => ({
//             COMPANY_ID: company.id?.toString() || company.COMPANY_ID?.toString(),
//             COMPANY_NAME: company.name || company.COMPANY_NAME
//           }));
//         } else if (companiesData.company_list) {
//           // Handle nested structure
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
//           // Handle nested structure
//           transformedBranches = branchesData.branch_list.map(branchItem => ({
//             BRANCH_ID: branchItem.BRANCH_ID?.toString(),
//             BRANCH_NAME: branchItem.BRANCH_NAME,
//             COMPANY_ID: branchItem.COMPANY_ID?.toString()
//           }));
//         }
        
//         console.log("Transformed Companies:", transformedCompanies);
//         console.log("Transformed Branches:", transformedBranches);
        
//         setCompanies(transformedCompanies);
//         setBranch(transformedBranches);
        
//         // Set filters based on logged-in company and branch
//         if (transformedCompanies.length > 0) {
//           // Check if logged-in company exists in the company list
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
//             // Fallback to first company if logged-in company not found
//             setFilters(prev => ({
//               ...prev,
//               rec_company: transformedCompanies[0].COMPANY_ID || "1"
//             }));
//           }
//         }
//       } else {
//         // Fallback to API if localStorage is empty
//         console.log("No data in localStorage, fetching from API...");
//         try {
//           const { data } = await axios.get(
//             "https://zbl.erprz.com/zbl/pre-define"
//           );
//           console.log("API Response:", data);
          
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
            
//             // Store in localStorage for future use
//             localStorage.setItem('company_list', JSON.stringify(apiCompanies));
//             localStorage.setItem('branch_list', JSON.stringify(apiBranches));
            
//             // Set filters based on logged-in company and branch
//             if (apiCompanies.length > 0) {
//               // Check if logged-in company exists in the company list
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
//                 // Fallback to first company if logged-in company not found
//                 setFilters(prev => ({
//                   ...prev,
//                   rec_company: apiCompanies[0].COMPANY_ID 
//                 }));
//               }
//             }
//           } else {
//             console.error("Invalid company list format:", data);
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

//   console.log("Available Branches:", branch);
//   console.log("Filtered Branches:", filteredBranches);
//   console.log("Selected Company:", filters.rec_company);
//   console.log("Selected Branch:", filters.branch);

// const handleFilterChange = (key, value) => {
//     if (key === 'rec_company') {
//       // When company changes, automatically select the first branch of the new company
//       const newCompanyBranches = branch.filter(br => br.COMPANY_ID === value);
//       const firstBranch = newCompanyBranches.length > 0 ? newCompanyBranches[0].BRANCH_ID : "";
      
//       setFilters(prev => ({
//         ...prev,
//         rec_company: value,
//         branch: firstBranch // Automatically select first branch
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

//   // Calculate financial metrics for stats overview
//   const calculateFinancialMetrics = () => {
//     if (!collectionTableData1 || collectionTableData1.length === 0) {
//       return {
//         totalVendors: 0,
//         totalDue: 0,
//         totalAdvance: 0,
//         totalPurchase: 0,
//         totalPayment: 0,
//         netPosition: 0
//       };
//     }

//     return collectionTableData1.reduce(
//       (acc, item) => {
//         const closing = Number(item?.CLOSING) || 0;
//         const purchase = Number(item?.PURCHASE) || 0;
//         const payment = Number(item?.PAYMENT) || 0;

//         return {
//           totalVendors: acc.totalVendors + 1,
//           totalDue: acc.totalDue /*+ (closing > 0 ? closing : 0)*/,
//           totalAdvance: acc.totalAdvance + (closing < 0 ? Math.abs(closing) : 0),
//           totalPurchase: acc.totalPurchase + purchase,
//           totalPayment: acc.totalPayment + payment,
//           netPosition: acc.netPosition + closing
//         };
//       },
//       { totalVendors: 0, totalDue: 0, totalAdvance: 0, totalPurchase: 0, totalPayment: 0, netPosition: 0 }
//     );
//   };

//   const financialMetrics = calculateFinancialMetrics();

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-PK", {
//       style: "currency",
//       currency: "PKR",
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };



//   return (
//     <div
//       className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
//         theme === "dark" ? "top-section" : "bg-white"
//       } border-white`}
//     >
//       {/* Filter Form */}
//       <div className="mb-6 w-[91%] py-2">
//         <div className={`w-full pb-4 px-4 ${theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"} shadow-lg rounded-md`}>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Company</label>
//               <select
//                 value={filters.rec_company}
//                 onChange={(e) =>
//                   setFilters({ ...filters, rec_company: e.target.value, branch: "" })
//                 }
//                 className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//               >
//                 {companies.length > 0 ? (
//                   companies.map((company) => (
//                     <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                       {company.COMPANY_NAME}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="">Loading...</option>
//                 )}
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
//                 <option value="">All Branches</option>
//                 {filteredBranches.length > 0 ? (
//                   filteredBranches.map((branchItem) => (
//                     <option key={branchItem.BRANCH_ID} value={branchItem.BRANCH_ID}>
//                       {branchItem.BRANCH_NAME}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="">No branches available</option>
//                 )}
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
//         {loader ? (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//             <p className="mt-2 text-gray-600">Loading payable data...</p>
//           </div>
//         ) : (
//           <PayableTable collectionTableData={collectionTableData1} />
//         )}
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
  FiRefreshCw 
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
        
        // Set filters based on logged-in company and branch
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
            setFilters(prev => ({
              ...prev,
              rec_company: transformedCompanies[0].COMPANY_ID || "1"
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
                setFilters(prev => ({
                  ...prev,
                  rec_company: apiCompanies[0].COMPANY_ID 
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

  return (
    <div className={`w-full min-h-screen ${theme === "dark" ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-gray-50 to-blue-50"} pb-8`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Payable Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Track and manage vendor payments and balances
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                refreshing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              <FiRefreshCw className={`mr-3 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>

          {/* Modern Filter Section - KEEPING YOUR EXACT FUNCTIONALITY */}
          <div className={`w-full p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-3">
                  <FiFilter className="text-blue-600 dark:text-blue-400 text-lg" />
                </div>
                Filter Options
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                Active Filters
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Company Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiHome className="mr-2" />
                  Company
                </label>
                <select
                  value={filters.rec_company}
                  onChange={(e) => handleFilterChange('rec_company', e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                        {company.COMPANY_NAME}
                      </option>
                    ))
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </select>
              </div>

              {/* Branch Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiGitBranch className="mr-2" />
                  Branch
                </label>
                <select
                  value={filters.branch}
                  onChange={(e) => handleFilterChange('branch', e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiCalendar className="mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(filters.sdate)}
                  onChange={(e) => handleFilterChange('sdate', formatDateForAPI(e.target.value))}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FiCalendar className="mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(filters.edate)}
                  onChange={(e) => handleFilterChange('edate', formatDateForAPI(e.target.value))}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Selected Filters Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center mb-2 sm:mb-0">
                  <FiCalendar className="mr-2" />
                  Showing data from {formatDateForInput(filters.sdate)} to {formatDateForInput(filters.edate)}
                </p>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  {filters.branch 
                    ? (filteredBranches.find(b => b.BRANCH_ID === filters.branch)?.BRANCH_NAME || "Selected Branch")
                    : "All Branches"
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

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