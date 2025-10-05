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
   // branch: selectedBranch || "",
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
       // branch: filters.branch,
        curr_date: filters.curr_date
      });

      const { data } = await axios.get(
        "https://zbl.erprz.com/zbl/recovery",
        { 
          params: {
            sdate: filters.sdate,
            edate: filters.edate,
            rec_company: filters.rec_company,
         //   branch: filters.branch,
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
      className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
        theme === "dark" ? "top-section" : "bg-white"
      } border-white`}
    >
      {/* Filter Form */}
      <div className="mb-6 w-[93%] p-4">
        <div
          className={`w-full pb-4 px-4 ${
            theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
          } shadow-lg rounded-md`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <select
                value={filters.rec_company}
                onChange={(e) =>
                  setFilters({ ...filters, rec_company: e.target.value, branch: "" })
                }
                className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
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

            <div>
              <label className="block text-sm font-medium mb-1">Branch</label>
              <select
                value={filters.branch}
                onChange={(e) =>
                  setFilters({ ...filters, branch: e.target.value })
                }
                className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
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

      {/* Collection Cards */}
      <div
        className={`w-[91%] pb-8 ${
          theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
        } shadow-lg rounded-md`}
      >
        <div className="flex gap-5 w-full justify-center items-center flex-wrap my-10 px-3">
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

      {/* Collection Table */}
      <div className="collection_table w-full justify-center flex mt-5">
        {loader ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading table data...</p>
          </div>
        ) : (
          <CollectionTable collectionTableData={collectionTableData} />
        )}
      </div>
    </div>
  );
};

export default Collection;