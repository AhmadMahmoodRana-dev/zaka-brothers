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

const CashSale = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const [collectionTableData1, setCollectionTableData1] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);


const selectedCompany = localStorage.getItem("selectedCompany");
const selectedBranch = localStorage.getItem("selectedBranch");


const [filters, setFilters] = useState({
  sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
  edate: formatDateForAPI(getCurrentDate()),
  rec_company: selectedCompany , // Use the stored company ID
  curr_date: formatDateForAPI(getCurrentDate()),
  branch: selectedBranch || "",
});

  // const [filters, setFilters] = useState({
  //   sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
  //   edate: formatDateForAPI(getCurrentDate()),
  //   rec_company: "1",
  //   curr_date: formatDateForAPI(getCurrentDate()),
  //   branch: "",
  // });

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
      setLoader(false);
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

  const fetchDropdownData = useCallback(async () => {
    try {
      const storedCompanies = localStorage.getItem('company_list');
      const storedBranches = localStorage.getItem('branch_list');
      
      console.log("Stored Companies:", storedCompanies);
      console.log("Stored Branches:", storedBranches);
      
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
        
        if (transformedCompanies.length > 0) {
          setFilters(prev => ({
            ...prev,
            rec_company: transformedCompanies[0].COMPANY_ID || "1"
          }));
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
            
            if (apiCompanies.length > 0) {
              setFilters(prev => ({
                ...prev,
                rec_company: apiCompanies[0].COMPANY_ID || "1"
              }));
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
  }, []);

  const fetchAllData = useCallback(() => {
    getCollection();
    getCollectionTableData();
    getCollectionTableData1();
  }, [filters.sdate, filters.edate, filters.rec_company, filters.branch]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  // Refresh data when filters change
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Filter branches based on selected company
  const filteredBranches = branch.filter(
    (br) => br.COMPANY_ID === filters.rec_company
  );

  console.log("Available Branches:", branch);
  console.log("Filtered Branches:", filteredBranches);
  console.log("Selected Company:", filters.rec_company);

  return (
    <div
      className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
        theme === "dark" ? "top-section" : "bg-white"
      } border-white`}
    >
      {/* Filter Form */}
      <div className="mb-6 w-[91%] py-2">
        <div className={`w-full pb-4 px-4 ${theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"} shadow-lg rounded-md`}>
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
                  <option value="1">Loading...</option>
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

      {/* Cards */}
      <div className={`w-[91%] pb-8 px-4 ${theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"} shadow-lg rounded-md`}>
        <motion.div
          className="flex gap-4 w-full justify-center items-center flex-wrap my-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
      </div>

      {/* Tables */}
      <div className="cash_sale_table w-full justify-center flex mt-5">
        <CashSaleTable collectionTableData={collectionTableData} />
      </div>
      <div className="product_table w-full justify-center flex mt-5">
        <ProductWiseSaleTable collectionTableData1={collectionTableData1} />
      </div>
    </div>
  );
};

export default CashSale;