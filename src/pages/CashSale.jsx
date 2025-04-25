// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import MainCard from "../components/card/MainCard";
// import CashSaleTable from "../components/tables/CashSaleTable";
// import ProductWiseSaleTable from "../components/tables/ProductWiseSaleTable";
// import { formatDateForAPI,getCurrentDate,formatDateForInput } from "../utils/TableUtils";

// const CashSale = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState([]);
//   const [collectionTableData, setCollectionTableData] = useState([]);
//   const [collectionTableData1, setCollectionTableData1] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: "01-MAR-2025",
//     edate: "31-MAR-2025",
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch:""
//   });

//   // Fetch Collection data (Main API)
//   const getCollection = async () => {
//     try {
//       const { data } = await axios.get(`https://zbl.zaffarsons.com/zbl/Sales`, {
//         params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch, // Pass the selected branch here
//           crr: "",
//         },
//       });
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
//         "https://zbl.zaffarsons.com/zbl/sale_detail",
//         {  params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch, // Pass the selected branch here
//           crr: "",
//         }, }
//       );
//       setCollectionTableData(data);
//     } catch (error) {
//       console.error("Error fetching collection table data:", error);
//     }
//   };
//   const getCollectionTableData1 = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.zaffarsons.com/zbl/product_sale",
//         {  params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch, // Pass the selected branch here
//           crr: "",
//         }, }
//       );
//       setCollectionTableData1(data);
//     } catch (error) {
//       console.error("Error fetching collection table data:", error);
//     }
//   };

//   // Fetch Company List for Dropdown
//   const fetchDropdownData = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.zaffarsons.com/zbl/pre-define"
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

//   // Handle Filter Submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     getCollection();
//     getCollectionTableData();
//     getCollectionTableData1();
//   };

//   return (
//     <div
//       className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
//         theme === "dark" ? "top-section" : "bg-white"
//       } border-white`}
//     >
//       {/* Filter Form */}
//       <form onSubmit={handleSubmit} className="mb-6 w-[91%] p-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Company</label>
//             <select
//               value={filters.rec_company}
//               onChange={(e) =>
//                 setFilters({ ...filters, rec_company: e.target.value })
//               }
//               className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//             >
//               {companies.map((company) => (
//                 <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                   {company.COMPANY_NAME}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Branch</label>
//             <select
//               value={filters.branch}
//               onChange={(e) =>
//                 setFilters({ ...filters, branch: e.target.value })
//               }
//               className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//             >
//               {branch.map((branch) => (
//                 <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
//                   {branch.BRANCH_NAME}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Start Date</label>
//             <input
//               type="date"
//               value={formatDateForInput(filters.sdate)}
//               onChange={(e) =>
//                 setFilters({
//                   ...filters,
//                   sdate: formatDateForAPI(e.target.value),
//                 })
//               }
//               className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">End Date</label>
//             <input
//               type="date"
//               value={formatDateForInput(filters.edate)}
//               onChange={(e) =>
//                 setFilters({
//                   ...filters,
//                   edate: formatDateForAPI(e.target.value),
//                 })
//               }
//               className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="mt-6 px-6 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </form>

//       {/* Collection Cards */}
//       <div className="flex gap-5 w-full justify-center items-center flex-wrap mt-10 px-3">
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
//       </div>

//       {/* Collection Table */}
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
import { formatDateForAPI, getCurrentDate, formatDateForInput } from "../utils/TableUtils";

const CashSale = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState([]);
  const [collectionTableData, setCollectionTableData] = useState([]);
  const [collectionTableData1, setCollectionTableData1] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);

  const [filters, setFilters] = useState({
    sdate: "01-MAR-2025",
    edate: "31-MAR-2025",
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: ""
  });

  const getCollection = async () => {
    try {
      const { data } = await axios.get(`https://zbl.zaffarsons.com/zbl/Sales`, {
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
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/sale_detail", {
        params: {
          sdate: filters.sdate,
          edate: filters.edate,
          company: filters.rec_company,
          branch: filters.branch,
          crr: "",
        },
      });
      setCollectionTableData(data);
    } catch (error) {
      console.error("Error fetching collection table data:", error);
    }
  };

  const getCollectionTableData1 = async () => {
    try {
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/product_sale", {
        params: {
          sdate: filters.sdate,
          edate: filters.edate,
          company: filters.rec_company,
          branch: filters.branch,
          crr: "",
        },
      });
      setCollectionTableData1(data);
    } catch (error) {
      console.error("Error fetching collection table data:", error);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/pre-define");
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
    getCollectionTableData();
    getCollectionTableData1();
    fetchDropdownData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getCollection();
    getCollectionTableData();
    getCollectionTableData1();
  };

  return (
    <div
      className={`w-full min-h-[92.2vh] pb-5 flex flex-col items-center ${
        theme === "dark" ? "top-section" : "bg-white"
      } border-white`}
    >
      {/* Filter Form */}
      <form onSubmit={handleSubmit} className="mb-6 w-[91%] p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <select
              value={filters.rec_company}
              onChange={(e) => setFilters({ ...filters, rec_company: e.target.value })}
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
              onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
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
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={formatDateForInput(filters.sdate)}
              onChange={(e) =>
                setFilters({ ...filters, sdate: formatDateForAPI(e.target.value) })
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
                setFilters({ ...filters, edate: formatDateForAPI(e.target.value) })
              }
              className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow transition-all duration-300"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {/* Cards */}
      <motion.div
        className="flex gap-5 w-full justify-center items-center flex-wrap my-10 px-3"
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
