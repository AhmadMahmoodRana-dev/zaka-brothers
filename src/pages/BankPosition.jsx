// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import {
//   formatDateForAPI,
//   getCurrentDate,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";
// import BankPositionTable from "../components/tables/BankPositionTable";


// const BankPosition = () => {
//   const { theme } = useContext(Context);
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


//   const getCollectionTableData1 = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/bankPostion",
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
//         <BankPositionTable collectionTableData={collectionTableData1} />
//       </div>
  
//     </div>
//   );
// };

// export default BankPosition;

import { useContext, useEffect, useState, useCallback } from "react";
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
    try {
      const { data } = await axios.get(
        "https://zbl.erprz.com/zbl/bankPostion",
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
      console.error("Error fetching collection table data:", error);
      setCollectionTableData1([]);
    } finally {
      setLoader(false);
    }
  };

  // Fetch Company and Branch List for Dropdown
  const fetchDropdownData = useCallback(async () => {
    try {
      const storedCompanies = localStorage.getItem('company_list');
      const storedBranches = localStorage.getItem('branch_list');
      
      console.log("Stored Companies:", storedCompanies);
      console.log("Stored Branches:", storedBranches);
      console.log("Logged-in Company:", selectedCompany);
      console.log("Logged-in Branch:", selectedBranch);
      
      if (storedCompanies && storedBranches) {
        const companiesData = JSON.parse(storedCompanies);
        const branchesData = JSON.parse(storedBranches);
        
        console.log("Parsed Companies:", companiesData);
        console.log("Parsed Branches:", branchesData);
        
        // Handle different data formats
        let transformedCompanies = [];
        let transformedBranches = [];
        
        // Check if data is in login response format or API format
        if (Array.isArray(companiesData)) {
          transformedCompanies = companiesData.map(company => ({
            COMPANY_ID: company.id?.toString() || company.COMPANY_ID?.toString(),
            COMPANY_NAME: company.name || company.COMPANY_NAME
          }));
        } else if (companiesData.company_list) {
          // Handle nested structure
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
          // Handle nested structure
          transformedBranches = branchesData.branch_list.map(branchItem => ({
            BRANCH_ID: branchItem.BRANCH_ID?.toString(),
            BRANCH_NAME: branchItem.BRANCH_NAME,
            COMPANY_ID: branchItem.COMPANY_ID?.toString()
          }));
        }
        
        console.log("Transformed Companies:", transformedCompanies);
        console.log("Transformed Branches:", transformedBranches);
        
        setCompanies(transformedCompanies);
        setBranch(transformedBranches);
        
        // Set filters based on logged-in company and branch
        if (transformedCompanies.length > 0) {
          // Check if logged-in company exists in the company list
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
            // Fallback to first company if logged-in company not found
            setFilters(prev => ({
              ...prev,
              rec_company: transformedCompanies[0].COMPANY_ID || "1"
            }));
          }
        }
      } else {
        // Fallback to API if localStorage is empty
        console.log("No data in localStorage, fetching from API...");
        try {
          const { data } = await axios.get(
            "https://zbl.erprz.com/zbl/pre-define"
          );
          console.log("API Response:", data);
          
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
            
            // Store in localStorage for future use
            localStorage.setItem('company_list', JSON.stringify(apiCompanies));
            localStorage.setItem('branch_list', JSON.stringify(apiBranches));
            
            // Set filters based on logged-in company and branch
            if (apiCompanies.length > 0) {
              // Check if logged-in company exists in the company list
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
                // Fallback to first company if logged-in company not found
                setFilters(prev => ({
                  ...prev,
                  rec_company: apiCompanies[0].COMPANY_ID 
                }));
              }
            }
          } else {
            console.error("Invalid company list format:", data);
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

  console.log("Available Branches:", branch);
  console.log("Filtered Branches:", filteredBranches);
  console.log("Selected Company:", filters.rec_company);
  console.log("Selected Branch:", filters.branch);

  return (
    <div
      className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" 
          : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800"
      }`}
    >
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-6 shadow-lg">
        <div className="w-[91%] mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Bank Position</h1>
          <p className="text-blue-100 text-sm md:text-base">
            Monitor and analyze your bank account positions and transactions
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-[91%] -mt-4 relative z-10">
        <div className={`
          w-full py-6 px-6 shadow-2xl rounded-2xl border backdrop-blur-sm transition-all duration-300
          ${theme === "dark" 
            ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
            : "bg-white/95 border-gray-200"
          }
        `}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Company Select */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}>
                Company
              </label>
              <select
                value={filters.rec_company}
                onChange={(e) =>
                  setFilters({ ...filters, rec_company: e.target.value, branch: "" })
                }
                className={`
                  w-full p-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50" 
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500/30"
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
                  <option value="">Loading companies...</option>
                )}
              </select>
            </div>

            {/* Branch Select */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}>
                Branch
              </label>
              <select
                value={filters.branch}
                onChange={(e) =>
                  setFilters({ ...filters, branch: e.target.value })
                }
                className={`
                  w-full p-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50" 
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500/30"
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
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}>
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
                className={`
                  w-full p-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50" 
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500/30"
                  }
                `}
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}>
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
                className={`
                  w-full p-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50" 
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500/30"
                  }
                `}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              theme === "dark" ? "bg-blue-600 text-blue-100" : "bg-blue-100 text-blue-700"
            }`}>
              Company: {companies.find(c => c.COMPANY_ID === filters.rec_company)?.COMPANY_NAME || 'N/A'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              theme === "dark" ? "bg-purple-600 text-purple-100" : "bg-purple-100 text-purple-700"
            }`}>
              Branch: {filteredBranches.find(b => b.BRANCH_ID === filters.branch)?.BRANCH_NAME || 'All'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              theme === "dark" ? "bg-green-600 text-green-100" : "bg-green-100 text-green-700"
            }`}>
              Period: {formatDateForInput(filters.sdate)} to {formatDateForInput(filters.edate)}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-[91%] mt-8">
        {loader ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className={`
              relative inline-flex
              ${theme === "dark" ? "text-blue-400" : "text-blue-600"}
            `}>
              <div className="w-12 h-12 border-4 rounded-full animate-spin border-current border-t-transparent"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 rounded-full animate-ping border-current opacity-20"></div>
            </div>
            <p className={`mt-4 text-lg font-medium transition-colors ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Loading bank position data...
            </p>
            <p className={`mt-2 text-sm transition-colors ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Please wait while we fetch the latest information
            </p>
          </div>
        ) : (
          <div className={`
            rounded-2xl shadow-xl overflow-hidden border transition-all duration-300
            ${theme === "dark" 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-gray-200"
            }
          `}>
            <div className={`
              px-6 py-4 border-b transition-colors
              ${theme === "dark" ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-gray-50"}
            `}>
              <h2 className={`
                text-xl font-bold transition-colors
                ${theme === "dark" ? "text-white" : "text-gray-800"}
              `}>
                Bank Position Overview
              </h2>
              <p className={`
                text-sm transition-colors mt-1
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
              `}>
                Real-time view of your banking transactions and balances
              </p>
            </div>
            <BankPositionTable collectionTableData={collectionTableData1} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BankPosition;