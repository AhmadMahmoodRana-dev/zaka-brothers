// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import MainCard from "../components/card/MainCard";
// import CollectionTable from "../components/tables/CollectionTable";
// import {
//   getCurrentDate,
//   formatDateForAPI,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";
// const Collection = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState([]);
//   const [collectionTableData, setCollectionTableData] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [loader, setLoader] = useState(true);

//   console.log(collectionData, "LAST CARD RESPONSE");

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//   });

//   // Fetch Collection data (Main API)
//   const getCollection = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.erprz.com/zbl/Collection`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: "",
//             crr: "",
//           },
//         }
//       );
//       setCollectionData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
 

//   // Fetch Collection Table Data (Recovery API)
//   const getCollectionTableData = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/recovery",
//         { params: filters }
//       );
//       setCollectionTableData(data);
//     } catch (error) {
//       console.error("Error fetching collection table data:", error);
//     }
//   };

//   // Fetch Company List for Dropdown
//   const fetchDropdownData = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/pre-define"
//       );
//       if (Array.isArray(data?.company_list)) {
//         setCompanies(data?.company_list);
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
//     fetchDropdownData();
//   }, []);

//   useEffect(() => {
//     getCollection();
//     getCollectionTableData();
//   }, [filters]);

//   return (
//     <div
//       className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
//         theme === "dark" ? "top-section" : "bg-white"
//       } border-white`}
//     >
//       {/* Filter Form */}
//       <div className="mb-6 w-[93%] p-4">
//         <div
//           className={`w-full  pb-4 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

//       {/* Collection Cards */}
//       <div
//         className={`w-[91%]  pb-8  ${
//           theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//         }  shadow-lg rounded-md`}
//       >
//         <div className="flex gap-5 w-full justify-center items-center flex-wrap my-10 px-3">
//           <MainCard
//             first={"Inst.M Recovery"}
//             second={"L.M Inst Recovery"}
//             third={"Inst.TD Recovery"}
//             four={"L.D Inst Recovery"}
//             currentMonth={collectionData?.installment_recovery?.COLLECTION}
//             lastMonth={collectionData?.installment_recovery?.LAST_COLLECTION}
//             todaySale={collectionData?.installment_recovery?.LD_COLL}
//             LastDaySale={collectionData?.installment_recovery?.LD_COLL_LAST}
//           />
//           <MainCard
//             first={"Credit.M Recovery"}
//             second={"L.M Credit Recovery"}
//             third={"Credit.TD Recovery"}
//             four={"L.D Credit Recovery"}
//             currentMonth={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
//             lastMonth={
//               collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
//             }
//             todaySale={collectionData?.credit_cash_recovery?.LD_CR}
//             LastDaySale={collectionData?.credit_cash_recovery?.LD_CR_LAST}
//             // currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
//             // lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
//             // todaySale={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
//             // LastDaySale={
//             //   collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
//             // }
//           />
//           <MainCard
//             first={"Cash.M Recovery"}
//             second={"L.M Cash Recovery"}
//             third={"Cash.TD Recovery"}
//             four={"L.D Cash Recovery"}
//             currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
//             lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
//             todaySale={collectionData?.credit_cash_recovery?.LD_CASH_COLL}
//             LastDaySale={
//               collectionData?.credit_cash_recovery?.LD_CASH_COLL_LAST
//             }
//           />
//         </div>
//       </div>

//       {/* Collection Table */}
//       <div className="collection_table w-full justify-center flex mt-5">
//         <CollectionTable collectionTableData={collectionTableData} />
//       </div>
      
//     </div>
//   );
// };

// export default Collection;


// import React, { useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import MainCard from "../components/card/MainCard";
// import CollectionTable from "../components/tables/CollectionTable";
// import {
//   getCurrentDate,
//   formatDateForAPI,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";

// const Collection = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState([]);
//   const [collectionTableData, setCollectionTableData] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);

//   console.log("Collection Data:", collectionData);
//   console.log("Table Data:", collectionTableData);

//   // Get logged-in company and branch from localStorage
//   const selectedCompany = localStorage.getItem("selectedCompany");
//   const selectedBranch = localStorage.getItem("selectedBranch");

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: selectedCompany,
//    // branch: selectedBranch || "",
//     curr_date: formatDateForAPI(getCurrentDate()),
//   });

//   // Fetch Collection data (Main API)
//   const getCollection = async () => {
//     try {
//       setLoader(true);
//       const { data } = await axios.get(
//         `https://zbl.erprz.com/zbl/Collection`,
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
//       setCollectionData(data);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   // Fetch Collection Table Data (Recovery API)
//   const getCollectionTableData = async () => {
//     try {
//       console.log("Fetching table data with params:", {
//         sdate: filters.sdate,
//         edate: filters.edate,
//         company: filters.rec_company,
//        // branch: filters.branch,
//         curr_date: filters.curr_date
//       });

//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/recovery",
//         { 
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             rec_company: filters.rec_company,
//          //   branch: filters.branch,
//             curr_date: filters.curr_date
//           }
//         }
//       );
//       console.log("Table API Response:", data);
//       setCollectionTableData(data || []);
//     } catch (error) {
//       console.error("Error fetching collection table data:", error);
//       setCollectionTableData([]);
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
//     console.log("Fetching all data with filters:", filters);
//     getCollection();
//     getCollectionTableData();
//   }, [filters]);

//   useEffect(() => {
//     fetchDropdownData();
//   }, [fetchDropdownData]);

//   // Refresh data when filters change
//   useEffect(() => {
//     if (filters.rec_company) {
//       fetchAllData();
//     }
//   }, [fetchAllData, filters.rec_company]);

//   // Filter branches based on selected company
//   const filteredBranches = branch.filter(
//     (br) => br.COMPANY_ID === filters.rec_company
//   );

//   console.log("Available Branches:", branch);
//   console.log("Filtered Branches:", filteredBranches);
//   console.log("Selected Company:", filters.rec_company);
//   console.log("Selected Branch:", filters.branch);

//   return (
//     <div
//       className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
//         theme === "dark" ? "top-section" : "bg-white"
//       } border-white`}
//     >
//       {/* Filter Form */}
//       <div className="mb-6 w-[93%] p-4">
//         <div
//           className={`w-full pb-4 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           } shadow-lg rounded-md`}
//         >
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

//       {/* Collection Cards */}
//       <div
//         className={`w-[91%] pb-8 ${
//           theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//         } shadow-lg rounded-md`}
//       >
//         <div className="flex gap-5 w-full justify-center items-center flex-wrap my-10 px-3">
//           <MainCard
//             first={"Inst.M Recovery"}
//             second={"L.M Inst Recovery"}
//             third={"Inst.TD Recovery"}
//             four={"L.D Inst Recovery"}
//             currentMonth={collectionData?.installment_recovery?.COLLECTION}
//             lastMonth={collectionData?.installment_recovery?.LAST_COLLECTION}
//             todaySale={collectionData?.installment_recovery?.LD_COLL}
//             LastDaySale={collectionData?.installment_recovery?.LD_COLL_LAST}
//           />
//           <MainCard
//             first={"Credit.M Recovery"}
//             second={"L.M Credit Recovery"}
//             third={"Credit.TD Recovery"}
//             four={"L.D Credit Recovery"}
//             currentMonth={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
//             lastMonth={
//               collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
//             }
//             todaySale={collectionData?.credit_cash_recovery?.LD_CR}
//             LastDaySale={collectionData?.credit_cash_recovery?.LD_CR_LAST}
//           />
//           <MainCard
//             first={"Cash.M Recovery"}
//             second={"L.M Cash Recovery"}
//             third={"Cash.TD Recovery"}
//             four={"L.D Cash Recovery"}
//             currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
//             lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
//             todaySale={collectionData?.credit_cash_recovery?.LD_CASH_COLL}
//             LastDaySale={
//               collectionData?.credit_cash_recovery?.LD_CASH_COLL_LAST
//             }
//           />
//         </div>
//       </div>

//       {/* Collection Table */}
//       <div className="collection_table w-full justify-center flex mt-5">
//         {loader ? (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//             <p className="mt-2 text-gray-600">Loading table data...</p>
//           </div>
//         ) : (
//           <CollectionTable collectionTableData={collectionTableData} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Collection;

// import React, { useContext, useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import MainCard from "../components/card/MainCard";
// import CollectionTable from "../components/tables/CollectionTable";
// import {
//   getCurrentDate,
//   formatDateForAPI,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";

// const Collection = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState([]);
//   const [collectionTableData, setCollectionTableData] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check screen size on mount and resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   console.log("Collection Data:", collectionData);
//   console.log("Table Data:", collectionTableData);

//   // Get logged-in company and branch from localStorage
//   const selectedCompany = localStorage.getItem("selectedCompany");
//   const selectedBranch = localStorage.getItem("selectedBranch");

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: selectedCompany,
//     curr_date: formatDateForAPI(getCurrentDate()),
//   });

//   // Fetch Collection data (Main API)
//   const getCollection = async () => {
//     try {
//       setLoader(true);
//       const { data } = await axios.get(
//         `https://zbl.erprz.com/zbl/Collection`,
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
//       setCollectionData(data);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   // Fetch Collection Table Data (Recovery API)
//   const getCollectionTableData = async () => {
//     try {
//       console.log("Fetching table data with params:", {
//         sdate: filters.sdate,
//         edate: filters.edate,
//         company: filters.rec_company,
//         curr_date: filters.curr_date
//       });

//       const { data } = await axios.get(
//         "https://zbl.erprz.com/zbl/recovery",
//         { 
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             rec_company: filters.rec_company,
//             curr_date: filters.curr_date
//           }
//         }
//       );
//       console.log("Table API Response:", data);
//       setCollectionTableData(data || []);
//     } catch (error) {
//       console.error("Error fetching collection table data:", error);
//       setCollectionTableData([]);
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
//     console.log("Fetching all data with filters:", filters);
//     getCollection();
//     getCollectionTableData();
//   }, [filters]);

//   useEffect(() => {
//     fetchDropdownData();
//   }, [fetchDropdownData]);

//   // Refresh data when filters change
//   useEffect(() => {
//     if (filters.rec_company) {
//       fetchAllData();
//     }
//   }, [fetchAllData, filters.rec_company]);

//   // Filter branches based on selected company
//   const filteredBranches = branch.filter(
//     (br) => br.COMPANY_ID === filters.rec_company
//   );

//   console.log("Available Branches:", branch);
//   console.log("Filtered Branches:", filteredBranches);
//   console.log("Selected Company:", filters.rec_company);
//   console.log("Selected Branch:", filters.branch);

//   return (
//     <div className={`
//       w-full min-h-screen pb-4
//       ${theme === "dark" 
//         ? "bg-gradient-to-br from-gray-900 to-gray-800" 
//         : "bg-gradient-to-br from-gray-50 to-blue-50"
//       }
//       transition-all duration-300
//       overflow-x-hidden
//     `}>
//       {/* Header Section */}
//       <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
//           <div>
//             <h1 className={`
//               text-xl sm:text-2xl font-bold
//               ${theme === "dark" ? "text-white" : "text-gray-900"}
//               transition-colors duration-200
//             `}>
//               Collection Dashboard
//             </h1>
//             <p className={`
//               text-xs sm:text-sm mt-1
//               ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
//               transition-colors duration-200
//             `}>
//               Monitor and analyze your collection performance
//             </p>
//           </div>
//           <div className={`
//             px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start
//             ${theme === "dark" 
//               ? "bg-blue-900/50 text-blue-200" 
//               : "bg-blue-100 text-blue-800"
//             }
//             transition-colors duration-200
//           `}>
//             Real-time Data
//           </div>
//         </div>
//       </div>

//       {/* Filter Section */}
//       <div className="px-4 sm:px-6 mb-6">
//         <div className={`
//           w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg
//           ${theme === "dark" 
//             ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700" 
//             : "bg-white/80 backdrop-blur-sm border border-white"
//           }
//           transition-all duration-300 hover:shadow-xl
//         `}>
//           <div className="flex items-center gap-3 mb-4">
//             <div className={`
//               w-1 h-6 rounded-full
//               ${theme === "dark" ? "bg-blue-500" : "bg-blue-600"}
//             `} />
//             <h2 className={`
//               text-base sm:text-lg font-semibold
//               ${theme === "dark" ? "text-white" : "text-gray-900"}
//             `}>
//               Filters & Controls
//             </h2>
//           </div>
          
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//             {/* Company Select */}
//             <div className="space-y-2">
//               <label className={`
//                 block text-xs sm:text-sm font-medium
//                 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
//               `}>
//                 Company
//               </label>
//               <select
//                 value={filters.rec_company}
//                 onChange={(e) =>
//                   setFilters({ ...filters, rec_company: e.target.value, branch: "" })
//                 }
//                 className={`
//                   w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 focus:ring-2 focus:ring-opacity-20 transition-all duration-200 text-sm sm:text-base
//                   ${theme === "dark" 
//                     ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" 
//                     : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//                   }
//                   hover:border-opacity-70
//                 `}
//               >
//                 {companies.length > 0 ? (
//                   companies.map((company) => (
//                     <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                       {company.COMPANY_NAME}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="">Loading companies...</option>
//                 )}
//               </select>
//             </div>

//             {/* Branch Select */}
//             <div className="space-y-2">
//               <label className={`
//                 block text-xs sm:text-sm font-medium
//                 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
//               `}>
//                 Branch
//               </label>
//               <select
//                 value={filters.branch}
//                 onChange={(e) =>
//                   setFilters({ ...filters, branch: e.target.value })
//                 }
//                 className={`
//                   w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 focus:ring-2 focus:ring-opacity-20 transition-all duration-200 text-sm sm:text-base
//                   ${theme === "dark" 
//                     ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" 
//                     : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//                   }
//                   hover:border-opacity-70
//                 `}
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

//             {/* Start Date */}
//             <div className="space-y-2">
//               <label className={`
//                 block text-xs sm:text-sm font-medium
//                 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
//               `}>
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
//                 className={`
//                   w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 focus:ring-2 focus:ring-opacity-20 transition-all duration-200 text-sm sm:text-base
//                   ${theme === "dark" 
//                     ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" 
//                     : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//                   }
//                   hover:border-opacity-70
//                 `}
//               />
//             </div>

//             {/* End Date */}
//             <div className="space-y-2">
//               <label className={`
//                 block text-xs sm:text-sm font-medium
//                 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
//               `}>
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 value={formatDateForInput(filters.edate)}
//                 onChange={(e) =>
//                   setFilters({
//                     ...filters,
//                     edate: formatDateForAPI(e.target.value),
//                   })
//                 }
//                 className={`
//                   w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 focus:ring-2 focus:ring-opacity-20 transition-all duration-200 text-sm sm:text-base
//                   ${theme === "dark" 
//                     ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500" 
//                     : "bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//                   }
//                   hover:border-opacity-70
//                 `}
//               />
//             </div>
//           </div>

//           {/* Active Filters Badge - Only show on larger screens */}
//           {!isMobile && (
//             <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-600/50">
//               <span className={`
//                 text-xs font-medium
//                 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
//               `}>
//                 Active filters:
//               </span>
//               {filters.rec_company && (
//                 <span className={`
//                   px-2 py-1 rounded-full text-xs font-medium
//                   ${theme === "dark" 
//                     ? "bg-blue-900/50 text-blue-200" 
//                     : "bg-blue-100 text-blue-800"
//                   }
//                 `}>
//                   Company: {companies.find(c => c.COMPANY_ID === filters.rec_company)?.COMPANY_NAME}
//                 </span>
//               )}
//               {filters.branch && (
//                 <span className={`
//                   px-2 py-1 rounded-full text-xs font-medium
//                   ${theme === "dark" 
//                     ? "bg-green-900/50 text-green-200" 
//                     : "bg-green-100 text-green-800"
//                   }
//                 `}>
//                   Branch: {filteredBranches.find(b => b.BRANCH_ID === filters.branch)?.BRANCH_NAME}
//                 </span>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Collection Cards Section */}
//       <div className="px-4 sm:px-6 mb-6">
//         <div className={`
//           w-full p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg
//           ${theme === "dark" 
//             ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700" 
//             : "bg-white/80 backdrop-blur-sm border border-white"
//           }
//           transition-all duration-300
//         `}>
//           <div className="flex items-center gap-3 mb-4 sm:mb-6">
//             <div className={`
//               w-1 h-6 rounded-full
//               ${theme === "dark" ? "bg-green-500" : "bg-green-600"}
//             `} />
//             <h2 className={`
//               text-base sm:text-lg font-semibold
//               ${theme === "dark" ? "text-white" : "text-gray-900"}
//             `}>
//               Recovery Metrics
//             </h2>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             <MainCard
//               first={"Inst.M Recovery"}
//               second={"L.M Inst Recovery"}
//               third={"Inst.TD Recovery"}
//               four={"L.D Inst Recovery"}
//               currentMonth={collectionData?.installment_recovery?.COLLECTION}
//               lastMonth={collectionData?.installment_recovery?.LAST_COLLECTION}
//               todaySale={collectionData?.installment_recovery?.LD_COLL}
//               LastDaySale={collectionData?.installment_recovery?.LD_COLL_LAST}
//             />
//             <MainCard
//               first={"Credit.M Recovery"}
//               second={"L.M Credit Recovery"}
//               third={"Credit.TD Recovery"}
//               four={"L.D Credit Recovery"}
//               currentMonth={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
//               lastMonth={
//                 collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
//               }
//               todaySale={collectionData?.credit_cash_recovery?.LD_CR}
//               LastDaySale={collectionData?.credit_cash_recovery?.LD_CR_LAST}
//             />
//             <MainCard
//               first={"Cash.M Recovery"}
//               second={"L.M Cash Recovery"}
//               third={"Cash.TD Recovery"}
//               four={"L.D Cash Recovery"}
//               currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
//               lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
//               todaySale={collectionData?.credit_cash_recovery?.LD_CASH_COLL}
//               LastDaySale={
//                 collectionData?.credit_cash_recovery?.LD_CASH_COLL_LAST
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {/* Collection Table Section */}
//       <div className="px-4 sm:px-6 pb-4">
//         <div className="collection_table w-full">
//           {loader ? (
//             <div className={`
//               flex flex-col items-center justify-center py-8 sm:py-12 rounded-xl sm:rounded-2xl
//               ${theme === "dark" 
//                 ? "bg-gray-800/50 border border-gray-700" 
//                 : "bg-white/80 border border-white"
//               }
//               transition-all duration-300
//             `}>
//               <div className={`
//                 inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-opacity-30
//                 ${theme === "dark" 
//                   ? "border-gray-600 border-t-blue-500" 
//                   : "border-gray-300 border-t-blue-600"
//                 }
//               `} />
//               <p className={`
//                 mt-3 sm:mt-4 text-sm sm:text-lg font-medium
//                 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
//               `}>
//                 Loading collection data...
//               </p>
//               <p className={`
//                 mt-1 sm:mt-2 text-xs sm:text-sm
//                 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}
//               `}>
//                 Please wait while we fetch the latest records
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <CollectionTable collectionTableData={collectionTableData} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;

import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Context } from "../context/Context";
import MainCard from "../components/card/MainCard";
import CollectionTable from "../components/tables/CollectionTable";
import {
  getCurrentDate,
  formatDateForAPI,
  formatDateForInput,
  getFirstDayOfCurrentMonth,
} from "../utils/TableUtils";

const Collection = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);

  console.log("Collection Data:", collectionData);
  console.log("Table Data:", collectionTableData);

  // Get logged-in company and branch from localStorage
  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");

  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: selectedCompany,
    curr_date: formatDateForAPI(getCurrentDate()),
  });

  // Fetch Collection data (Main API)
  const getCollection = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://zbl.erprz.com/zbl/Collection`,
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
      setCollectionData(data);
    } catch (error) {
      console.error("Error fetching collection data:", error);
    } finally {
      setLoader(false);
    }
  };

  // Fetch Collection Table Data (Recovery API)
  const getCollectionTableData = async () => {
    try {
      console.log("Fetching table data with params:", {
        sdate: filters.sdate,
        edate: filters.edate,
        company: filters.rec_company,
        curr_date: filters.curr_date
      });

      const { data } = await axios.get(
        "https://zbl.erprz.com/zbl/recovery",
        { 
          params: {
            sdate: filters.sdate,
            edate: filters.edate,
            rec_company: filters.rec_company,
            curr_date: filters.curr_date
          }
        }
      );
      console.log("Table API Response:", data);
      setCollectionTableData(data || []);
    } catch (error) {
      console.error("Error fetching collection table data:", error);
      setCollectionTableData([]);
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
    console.log("Fetching all data with filters:", filters);
    getCollection();
    getCollectionTableData();
  }, [filters]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  // Refresh data when filters change
  useEffect(() => {
    if (filters.rec_company) {
      fetchAllData();
    }
  }, [fetchAllData, filters.rec_company]);

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
      className={`w-full min-h-screen pb-8 flex flex-col items-center transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-8 shadow-2xl">
        <div className="w-[95%] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Collection Dashboard
              </h1>
              <p className="text-blue-100 text-lg">
                Monitor and analyze your collection performance across different metrics
              </p>
            </div>
            <div className={`mt-4 sm:mt-0 px-6 py-3 rounded-2xl backdrop-blur-sm ${
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

      {/* Filter Section */}
      <div className="w-[95%] -mt-6 relative z-10">
        <div className={`
          w-full py-7 px-8 shadow-2xl rounded-2xl border-2 backdrop-blur-sm transition-all duration-300
          ${theme === "dark" 
            ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
            : "bg-white/95 border-blue-100"
          }
        `}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                Filter Options
              </h2>
              <p className={`mt-1 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Customize your collection data view
              </p>
            </div>
            
            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2 mt-3 lg:mt-0">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                theme === "dark" ? "bg-blue-600 text-blue-100" : "bg-blue-100 text-blue-700"
              }`}>
                Company: {companies.find(c => c.COMPANY_ID === filters.rec_company)?.COMPANY_NAME || 'N/A'}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                theme === "dark" ? "bg-purple-600 text-purple-100" : "bg-purple-100 text-purple-700"
              }`}>
                Branch: {filteredBranches.find(b => b.BRANCH_ID === filters.branch)?.BRANCH_NAME || 'All'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Company Select */}
            <div className="space-y-3">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Company
                </div>
              </label>
              <select
                value={filters.rec_company}
                onChange={(e) =>
                  setFilters({ ...filters, rec_company: e.target.value, branch: "" })
                }
                className={`
                  w-full p-3.5 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
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
                  <option value="">Loading companies...</option>
                )}
              </select>
            </div>

            {/* Branch Select */}
            <div className="space-y-3">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-purple-300" : "text-purple-700"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Branch
                </div>
              </label>
              <select
                value={filters.branch}
                onChange={(e) =>
                  setFilters({ ...filters, branch: e.target.value })
                }
                className={`
                  w-full p-3.5 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
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
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
                  w-full p-3.5 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
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
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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
                  w-full p-3.5 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  shadow-sm
                  ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500/50 hover:border-gray-500" 
                    : "bg-white border-gray-300 text-gray-800 focus:border-orange-500 focus:ring-orange-500/30 hover:border-gray-400"
                  }
                `}
              />
            </div>
          </div>

          {/* Quick Action Buttons */}
          {/* <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-600/30">
            <button
              onClick={fetchAllData}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              🔄 Refresh Data
            </button>
            <button
              onClick={() => setFilters({
                ...filters,
                sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
                edate: formatDateForAPI(getCurrentDate())
              })}
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-green-500/25 hover:scale-105"
            >
              📅 Current Month
            </button>
            <button
              onClick={() => setFilters({
                ...filters,
                branch: ""
              })}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              🌐 All Branches
            </button>
          </div> */}
        </div>
      </div>

      {/* Collection Cards Section */}
      <div className="w-[95%] mt-8">
        <div className={`
          w-full py-7 px-8 shadow-2xl rounded-2xl border-2 backdrop-blur-sm transition-all duration-300
          ${theme === "dark" 
            ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
            : "bg-white/95 border-blue-100"
          }
        `}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                Recovery Metrics
              </h2>
              <p className={`mt-1 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Overview of collection performance across different categories
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MainCard
              first={"Inst.M Recovery"}
              second={"L.M Inst Recovery"}
              third={"Inst.TD Recovery"}
              four={"L.D Inst Recovery"}
              currentMonth={collectionData?.installment_recovery?.COLLECTION}
              lastMonth={collectionData?.installment_recovery?.LAST_COLLECTION}
              todaySale={collectionData?.installment_recovery?.LD_COLL}
              LastDaySale={collectionData?.installment_recovery?.LD_COLL_LAST}
            />
            <MainCard
              first={"Credit.M Recovery"}
              second={"L.M Credit Recovery"}
              third={"Credit.TD Recovery"}
              four={"L.D Credit Recovery"}
              currentMonth={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
              lastMonth={
                collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
              }
              todaySale={collectionData?.credit_cash_recovery?.LD_CR}
              LastDaySale={collectionData?.credit_cash_recovery?.LD_CR_LAST}
            />
            <MainCard
              first={"Cash.M Recovery"}
              second={"L.M Cash Recovery"}
              third={"Cash.TD Recovery"}
              four={"L.D Cash Recovery"}
              currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
              lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
              todaySale={collectionData?.credit_cash_recovery?.LD_CASH_COLL}
              LastDaySale={
                collectionData?.credit_cash_recovery?.LD_CASH_COLL_LAST
              }
            />
          </div>
        </div>
      </div>

      {/* Collection Table Section */}
      <div className="w-[95%] mt-8">
        {loader ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className={`
              relative inline-flex mb-4
              ${theme === "dark" ? "text-blue-400" : "text-blue-600"}
            `}>
              <div className="w-16 h-16 border-4 rounded-full animate-spin border-current border-t-transparent"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 rounded-full animate-ping border-current opacity-20"></div>
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              Loading Collection Data
            </h3>
            <p className={`text-center max-w-md transition-colors ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Please wait while we fetch the latest collection records...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
           <CollectionTable collectionTableData={collectionTableData} /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;