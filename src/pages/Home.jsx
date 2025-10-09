
// import React, { useCallback, useContext, useEffect, useState } from "react";
// import HomePageDialogBox from "../components/Models/HomePageDialogBox";
// import { Context } from "../context/Context";
// import axios from "axios";
// import HomeSmallCard from "../components/card/HomeSmallCard";
// import HomePageRecoveryDialogBox from "../components/Models/HomePageRecoveryDialogBox";
// import HomePageAdvanceDialogBox from "../components/Models/HomePageAdvanceDialogBox";
// import CashAtBankModel from "../components/Models/CashAtBankModel";
// import ExpenseModel from "../components/Models/ExpenseModel";
// import PurchaseModel from "../components/Models/PurchaseModel";
// import PaymentModel from "../components/Models/PaymentModel";
// import SalaryPayableModel from "../components/Models/SalaryPayableModel";

// const formatDateForAPI = (dateString) => {
//   const months = [
//     "JAN",
//     "FEB",
//     "MAR",
//     "APR",
//     "MAY",
//     "JUN",
//     "JUL",
//     "AUG",
//     "SEP",
//     "OCT",
//     "NOV",
//     "DEC",
//   ];
//   const [year, month, day] = dateString.split("-");
//   return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
// };

// const formatDateForInput = (dateString) => {
//   const months = {
//     JAN: "01",
//     FEB: "02",
//     MAR: "03",
//     APR: "04",
//     MAY: "05",
//     JUN: "06",
//     JUL: "07",
//     AUG: "08",
//     SEP: "09",
//     OCT: "10",
//     NOV: "11",
//     DEC: "12",
//   };
//   if (!dateString) return "";
//   const [day, month, year] = dateString.split("-");
//   return `${year}-${months[month]}-${day}`;
// };

// const getCurrentDate = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const dd = String(today.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const getFirstDateOfCurrentMonth = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   return `${yyyy}-${mm}-01`;
// };

// const Home = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState({});
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [firstModelData, setFirstModelData] = useState([]);
//   const [secondModelData, setSecondModelData] = useState([]);
//   const [thirdModelData, setThirdModelData] = useState([]);
//   const [fourthModelData, setFourthModelData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [open3, setOpen3] = useState(false);

//   // #######################################################
//   const [firstRecoveryModelData, setFirstRecoveryModelData] = useState([]);
//   const [secondRecoveryModelData, setSecondRecoveryModelData] = useState([]);
//   const [thirdRecoveryModelData, setThirdRecoveryModelData] = useState([]);

//   const [fourthRecoveryModelData, setfourthRecoveryModelData] = useState([]);

//   const [recoveryOpen, setRecoveryOpen] = useState(false);
//   const [recoveryOpen1, setRecoveryOpen1] = useState(false);
//   const [recoveryOpen2, setRecoveryOpen2] = useState(false);
//   const [recoveryOpen3, setRecoveryOpen3] = useState(false);

//   // #######################################################
//   const [firstAdvanceModelData, setFirstAdvanceModelData] = useState([]);
//   const [secondAdvanceModelData, setSecondAdvanceModelData] = useState([]);
//   const [thirdAdvanceModelData, setThirdAdvanceModelData] = useState([]);

//   const [advanceOpen, setAdvanceOpen] = useState(false);
//   const [advanceOpen1, setAdvanceOpen1] = useState(false);
//   const [advanceOpen2, setAdvanceOpen2] = useState(false);

//   // #######################################################
//   const [cashAtBankModelData, setCashAtBankModelData] = useState([]);
//   const [cashBankOpen, setCashBankOpen] = useState(false);
//   // #######################################################
//   const [cashInHandModelData, setCashInHandModelData] = useState([]);
//   const [cashInHandOpen, setCashInHandOpen] = useState(false);
//   // #######################################################
//   const [expenseModelData, setExpenseModelData] = useState([]);
//   const [expenseOpen, setExpenseOpen] = useState(false);
//   // #######################################################
//   const [purchaseModelData, setPurchaseModelData] = useState([]);
//   const [purchaseOpen, setPurchaseOpen] = useState(false);
//   // #######################################################
//   const [paymentModelData, setPaymentModelData] = useState([]);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   // #######################################################
//   const [salaryPayableModelData, setSalaryPayableModelData] = useState([]);
//   const [salaryPayableOpen, setSalaryPayableOpen] = useState(false);
//   // #######################################################
//   const [drawingModelData, setDrawingModelData] = useState([]);
//   const [drawingeOpen, setDrawingOpen] = useState(false);

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: "",
//   });

//   // Generic API fetch function
//   const fetchData = useCallback(async (url, params, setter) => {
//     try {
//       const { data } = await axios.get(url, {
//         params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch,
//           ...params
//         }
//       });
//       setter(data);
//     } catch (error) {
//       console.error(`Error fetching ${url}:`, error);
//     }
//   }, [filters]);

//   // API call configurations
//   const apiConfigurations = useCallback(() => ([
//     // Main dashboard
//     { url: 'https://zbl.erprz.com/zbl/dashboad', params: { crr: "" }, setter: setCollectionData },
    
//     // Daily Sales
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "" }, setter: setFirstModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CASH" }, setter: setSecondModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CREDIT" }, setter: setThirdModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "INSTALLMENT" }, setter: setFourthModelData },

//     // Recovery
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "INSTALLMENT" }, setter: setFirstRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CASH" }, setter: setSecondRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CREDIT" }, setter: setThirdRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "" }, setter: setfourthRecoveryModelData },
    
//     // Advance
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "INSTALLMENT" }, setter: setFirstAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "CREDIT" }, setter: setSecondAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "" }, setter: setThirdAdvanceModelData },
    
//     // Other endpoints
//     { url: 'https://zbl.zaffarsons.com/zbl/db-cash-at-bank', setter: setCashAtBankModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-cash-in-hand', setter: setCashInHandModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-expense', setter: setExpenseModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-purchase', setter: setPurchaseModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-payments', setter: setPaymentModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-salary-payable', setter: setSalaryPayableModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-drawing', setter: setDrawingModelData },
//   ]), []);

//   // Fetch all data
//   const fetchAllData = useCallback(async () => {
//     setLoader(true);
//     try {
//       await Promise.all(
//         apiConfigurations().map(({ url, params, setter }) => 
//           fetchData(url, params, setter)
//       ));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoader(false);
//     }
//   }, [fetchData, apiConfigurations]);

//   // Fetch dropdown data
//   const fetchDropdownData = useCallback(async () => {
//     try {
//       const { data } = await axios.get("https://zbl.erprz.com/zbl/pre-define");
//       if (data?.company_list) {
//         setCompanies(data.company_list);
//         setBranch(data.branch_list);
//       }
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   }, []);

//   // Main effect
//   useEffect(() => {
//     fetchAllData();
//     fetchDropdownData();
//   }, [fetchAllData, fetchDropdownData]);

//   // Memoized number formatting
//   const formatNumberWithCommas = useCallback((number) => 
//     number ? Number(number).toLocaleString() : "0", 
//   []);

//   const Sale = [
//     {
//       id: 1,
//       name: "Total Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
//       open: () => {
//         setOpen(!open);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
//       open: () => {
//         setOpen1(!open1);
//       },
//     },
//     {
//       id: 3,
//       name: "Credit Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
//       open: () => {
//         setOpen2(!open2);
//       },
//     },
//     {
//       id: 4,
//       name: "Installment Sale",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.sale?.INSTALLMENT_SALE
//       ),
//       open: () => {
//         setOpen3(!open3);
//       },
//     },
//   ];
//   const Recovery = [
//     {
//       id: 1,
//       name: "Installment Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.INSTALLMENT_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen(!recoveryOpen);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CASH_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen1(!recoveryOpen1);
//       },
//     },
//     {
//       id: 3,
//       name: "Credit Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CREDIT_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen2(!recoveryOpen2);
//       },
//     },
//     {
//       id: 4,
//       name: "Installment Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.INSTALLMENT_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen(!advanceOpen);
//       },
//     },
//     {
//       id: 5,
//       name: "Credit Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CREDIT_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen1(!advanceOpen1);
//       },
//     },
//     {
//       id: 6,
//       name: "Total Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.TOTAL_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen2(!advanceOpen2);
//       },
//     },
//     {
//       id: 7,
//       name: "Total Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.TOTAL_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen3(!recoveryOpen3);
//       },
//     },
//     {
//       id: 8,
//       name: "Grand Total",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.GRAND_TOTAL
//       ),
//     },
//   ];

//   const bank_expense = [
//     {
//       id: 1,
//       name: "Cash At Bank",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.CASH_AT_BANK
//       ),
//       open: () => {
//         setCashBankOpen(!cashBankOpen);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash In Hand",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.CASH_IN_HAND
//       ),
//       open: () => {
//         setCashInHandOpen(!cashInHandOpen);
//       },
//     },
//     {
//       id: 3,
//       name: "Total Expense",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.TOTAL_EXPENSE
//       ),
//       open: () => {
//         setExpenseOpen(!expenseOpen);
//       },
//     },
//     {
//       id: 4,
//       name: "Purchases",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.PURCHASES
//       ),
//       open: () => {
//         setPurchaseOpen(!purchaseOpen);
//       },
//     },
//     {
//       id: 5,
//       name: "Payments",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.PAYMENTS
//       ),
//       open: () => {
//         setPaymentOpen(!paymentOpen);
//       },
//     },
//     {
//       id: 6,
//       name: "Salary Payable",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.SALARY_PAYABLE
//       ),
//       open:() =>{
//         setSalaryPayableOpen(!salaryPayableOpen);
//       }
//     },
//     {
//       id: 7,
//       name: "Drawing",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.DRAWING
//       ),
//       open:() =>{
//         setDrawingOpen(!drawingeOpen);
//       }
//     },
//     {
//       id: 8,
//       name: "Total Cash",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.TOTAL_CASH
//       ),
//     },
//   ];

//   return (
//     <div
//       className={`w-full ${
//         theme === "dark"
//           ? "bg-[#141b2e]"
//           : "bg-[#f1f1f1] border-l border-gray-200"
//       } min-h-[92.2vh]`}
//     >
//       <div
//         className={`${
//           theme === "dark" ? "top-section" : "bg-white"
//         } pb-10 min-h-[92vh] h-auto w-full px-4`}
//       >
//         {/* Filter Section */}
//         <div className="mb-6 w-[100%] py-3">
//           <div
//             className={`w-full  pb-8 px-4 ${
//               theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//             }  shadow-lg rounded-md`}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Company
//                 </label>
//                 <select
//                   value={filters.rec_company}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       rec_company: e.target.value,
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {companies.map((company) => (
//                     <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                       {company.COMPANY_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Branch</label>
//                 <select
//                   value={filters.branch}
//                   onChange={(e) =>
//                     setFilters((prev) => ({ ...prev, branch: e.target.value }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {branch.map((branch) => (
//                     <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
//                       {branch.BRANCH_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.sdate)}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       sdate: formatDateForAPI(e.target.value),
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.edate)}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       edate: formatDateForAPI(e.target.value),
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Cards Section */}
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Sales</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
//             {Sale.map((sale) => (
//               <HomeSmallCard
//                 key={sale.id}
//                 open={sale.open}
//                 heading={sale.name}
//                 number={sale.saleFunction}
//               />
//             ))}
//           </div>
//         </div>
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Recovery</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
//             {Recovery.map((recovery, i) => {
//               return (
//                 <HomeSmallCard
//                   key={i}
//                   open={recovery.open}
//                   heading={recovery.name}
//                   number={recovery.saleFunction}
//                 />
//               );
//             })}
//           </div>
//         </div>
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Bank & Expense</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
//             {bank_expense.map((bank) => {
//               return (
//                 <HomeSmallCard
//                   open={bank.open}
//                   heading={bank.name}
//                   number={bank.saleFunction}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <HomePageDialogBox data={firstModelData} open={open} setOpen={setOpen} />
//       <HomePageDialogBox
//         data={secondModelData}
//         open={open1}
//         setOpen={setOpen1}
//       />
//       <HomePageDialogBox
//         data={thirdModelData}
//         open={open2}
//         setOpen={setOpen2}
//       />
//       <HomePageDialogBox
//         data={fourthModelData}
//         open={open3}
//         setOpen={setOpen3}
//       />
//       <HomePageRecoveryDialogBox
//         data={firstRecoveryModelData}
//         open={recoveryOpen}
//         setOpen={setRecoveryOpen}
//       />
//       <HomePageRecoveryDialogBox
//         data={secondRecoveryModelData}
//         open={recoveryOpen1}
//         setOpen={setRecoveryOpen1}
//       />
//       <HomePageRecoveryDialogBox
//         data={thirdRecoveryModelData}
//         open={recoveryOpen2}
//         setOpen={setRecoveryOpen2}
//       />
//       <HomePageRecoveryDialogBox
//         data={fourthRecoveryModelData}
//         open={recoveryOpen3}
//         setOpen={setRecoveryOpen3}
//       />
//       <HomePageAdvanceDialogBox
//         data={firstAdvanceModelData}
//         open={advanceOpen}
//         setOpen={setAdvanceOpen}
//       />
//       <HomePageAdvanceDialogBox
//         data={secondAdvanceModelData}
//         open={advanceOpen1}
//         setOpen={setAdvanceOpen1}
//       />
//       <HomePageAdvanceDialogBox
//         data={thirdAdvanceModelData}
//         open={advanceOpen2}
//         setOpen={setAdvanceOpen2}
//       />
//       <CashAtBankModel
//         data={cashAtBankModelData}
//         open={cashBankOpen}
//         setOpen={setCashBankOpen}
//       />
//       <CashAtBankModel
//         data={cashInHandModelData}
//         open={cashInHandOpen}
//         setOpen={setCashInHandOpen}
//       />
//       <ExpenseModel
//         data={expenseModelData}
//         open={expenseOpen}
//         setOpen={setExpenseOpen}
//       />
//       <PurchaseModel
//         data={purchaseModelData}
//         open={purchaseOpen}
//         setOpen={setPurchaseOpen}
//       />
//       <PaymentModel
//         data={paymentModelData}
//         open={paymentOpen}
//         setOpen={setPaymentOpen}
//       />
//       <SalaryPayableModel
//         data={salaryPayableModelData}
//         open={salaryPayableOpen}
//         setOpen={setSalaryPayableOpen}
//       />
//       <SalaryPayableModel
//         data={drawingModelData}
//         open={drawingeOpen}
//         setOpen={setDrawingOpen}
//       />
      
//     </div>
//   );
// };

// export default Home;



// import React, { useCallback, useContext, useEffect, useState } from "react";
// import HomePageDialogBox from "../components/Models/HomePageDialogBox";
// import { Context } from "../context/Context";
// import axios from "axios";
// import HomeSmallCard from "../components/card/HomeSmallCard";
// import HomePageRecoveryDialogBox from "../components/Models/HomePageRecoveryDialogBox";
// import HomePageAdvanceDialogBox from "../components/Models/HomePageAdvanceDialogBox";
// import CashAtBankModel from "../components/Models/CashAtBankModel";
// import ExpenseModel from "../components/Models/ExpenseModel";
// import PurchaseModel from "../components/Models/PurchaseModel";
// import PaymentModel from "../components/Models/PaymentModel";
// import SalaryPayableModel from "../components/Models/SalaryPayableModel";

// const formatDateForAPI = (dateString) => {
//   const months = [
//     "JAN",
//     "FEB",
//     "MAR",
//     "APR",
//     "MAY",
//     "JUN",
//     "JUL",
//     "AUG",
//     "SEP",
//     "OCT",
//     "NOV",
//     "DEC",
//   ];
//   const [year, month, day] = dateString.split("-");
//   return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
// };

// const formatDateForInput = (dateString) => {
//   const months = {
//     JAN: "01",
//     FEB: "02",
//     MAR: "03",
//     APR: "04",
//     MAY: "05",
//     JUN: "06",
//     JUL: "07",
//     AUG: "08",
//     SEP: "09",
//     OCT: "10",
//     NOV: "11",
//     DEC: "12",
//   };
//   if (!dateString) return "";
//   const [day, month, year] = dateString.split("-");
//   return `${year}-${months[month]}-${day}`;
// };

// const getCurrentDate = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const dd = String(today.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const getFirstDateOfCurrentMonth = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   return `${yyyy}-${mm}-01`;
// };

// const Home = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState({});
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [firstModelData, setFirstModelData] = useState([]);
//   const [secondModelData, setSecondModelData] = useState([]);
//   const [thirdModelData, setThirdModelData] = useState([]);
//   const [fourthModelData, setFourthModelData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [open3, setOpen3] = useState(false);

//   // #######################################################
//   const [firstRecoveryModelData, setFirstRecoveryModelData] = useState([]);
//   const [secondRecoveryModelData, setSecondRecoveryModelData] = useState([]);
//   const [thirdRecoveryModelData, setThirdRecoveryModelData] = useState([]);

//   const [fourthRecoveryModelData, setfourthRecoveryModelData] = useState([]);

//   const [recoveryOpen, setRecoveryOpen] = useState(false);
//   const [recoveryOpen1, setRecoveryOpen1] = useState(false);
//   const [recoveryOpen2, setRecoveryOpen2] = useState(false);
//   const [recoveryOpen3, setRecoveryOpen3] = useState(false);

//   // #######################################################
//   const [firstAdvanceModelData, setFirstAdvanceModelData] = useState([]);
//   const [secondAdvanceModelData, setSecondAdvanceModelData] = useState([]);
//   const [thirdAdvanceModelData, setThirdAdvanceModelData] = useState([]);

//   const [advanceOpen, setAdvanceOpen] = useState(false);
//   const [advanceOpen1, setAdvanceOpen1] = useState(false);
//   const [advanceOpen2, setAdvanceOpen2] = useState(false);

//   // #######################################################
//   const [cashAtBankModelData, setCashAtBankModelData] = useState([]);
//   const [cashBankOpen, setCashBankOpen] = useState(false);
//   // #######################################################
//   const [cashInHandModelData, setCashInHandModelData] = useState([]);
//   const [cashInHandOpen, setCashInHandOpen] = useState(false);
//   // #######################################################
//   const [expenseModelData, setExpenseModelData] = useState([]);
//   const [expenseOpen, setExpenseOpen] = useState(false);
//   // #######################################################
//   const [purchaseModelData, setPurchaseModelData] = useState([]);
//   const [purchaseOpen, setPurchaseOpen] = useState(false);
//   // #######################################################
//   const [paymentModelData, setPaymentModelData] = useState([]);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   // #######################################################
//   const [salaryPayableModelData, setSalaryPayableModelData] = useState([]);
//   const [salaryPayableOpen, setSalaryPayableOpen] = useState(false);
//   // #######################################################
//   const [drawingModelData, setDrawingModelData] = useState([]);
//   const [drawingeOpen, setDrawingOpen] = useState(false);

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: "",
//   });

//   // Generic API fetch function
//   const fetchData = useCallback(async (url, params, setter) => {
//     try {
//       const { data } = await axios.get(url, {
//         params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch,
//           ...params
//         }
//       });
//       setter(data);
//     } catch (error) {
//       console.error(`Error fetching ${url}:`, error);
//     }
//   }, [filters]);

//   // API call configurations
//   const apiConfigurations = useCallback(() => ([
//     // Main dashboard
//     { url: 'https://zbl.erprz.com/esb/dashboad', params: { crr: "" }, setter: setCollectionData },
    
//     // Daily Sales
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "" }, setter: setFirstModelData },
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "CASH" }, setter: setSecondModelData },
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "CREDIT" }, setter: setThirdModelData },
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "INSTALLMENT" }, setter: setFourthModelData },

//     // Recovery
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "INSTALLMENT" }, setter: setFirstRecoveryModelData },
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "CASH" }, setter: setSecondRecoveryModelData },
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "CREDIT" }, setter: setThirdRecoveryModelData },
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "" }, setter: setfourthRecoveryModelData },

//     // Advance
//     { url: 'https://zbl.erprz.com/esb/advance-receivable', params: { inst_type: "INSTALLMENT" }, setter: setFirstAdvanceModelData },
//     { url: 'https://zbl.erprz.com/esb/advance-receivable', params: { inst_type: "CREDIT" }, setter: setSecondAdvanceModelData },
//     { url: 'https://zbl.erprz.com/esb/advance-receivable', params: { inst_type: "" }, setter: setThirdAdvanceModelData },

//     // Other endpoints
//     { url: 'https://zbl.erprz.com/esb/db-cash-at-bank', setter: setCashAtBankModelData },
//     { url: 'https://zbl.erprz.com/esb/db-cash-in-hand', setter: setCashInHandModelData },
//     { url: 'https://zbl.erprz.com/esb/db-expense', setter: setExpenseModelData },
//     { url: 'https://zbl.erprz.com/esb/db-purchase', setter: setPurchaseModelData },
//     { url: 'https://zbl.erprz.com/esb/db-payments', setter: setPaymentModelData },
//     { url: 'https://zbl.erprz.com/esb/db-salary-payable', setter: setSalaryPayableModelData },
//     { url: 'https://zbl.erprz.com/esb/db-drawing', setter: setDrawingModelData },
//   ]), []);

//   // Fetch all data
//   const fetchAllData = useCallback(async () => {
//     setLoader(true);
//     try {
//       await Promise.all(
//         apiConfigurations().map(({ url, params, setter }) => 
//           fetchData(url, params, setter)
//       ));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoader(false);
//     }
//   }, [fetchData, apiConfigurations]);

//   // Fetch dropdown data
//   const fetchDropdownData = useCallback(async () => {
//     try {
//       const { data } = await axios.get("https://zbl.erprz.com/esb/pre-define");
//       if (data?.company_list) {
//         setCompanies(data.company_list);
//         setBranch(data.branch_list);
//       }
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   }, []);

//   // Main effect
//   useEffect(() => {
//     fetchAllData();
//     fetchDropdownData();
//   }, [fetchAllData, fetchDropdownData]);

//   // Memoized number formatting
//   const formatNumberWithCommas = useCallback((number) => 
//     number ? Number(number).toLocaleString() : "0", 
//   []);

//   const Sale = [
//     {
//       id: 1,
//       name: "Total Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
//       open: () => {
//         setOpen(!open);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
//       open: () => {
//         setOpen1(!open1);
//       },
//     },
//     {
//       id: 3,
//       name: "Credit Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
//       open: () => {
//         setOpen2(!open2);
//       },
//     },
//     {
//       id: 4,
//       name: "Installment Sale",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.sale?.INSTALLMENT_SALE
//       ),
//       open: () => {
//         setOpen3(!open3);
//       },
//     },
//   ];
//   const Recovery = [
//     {
//       id: 1,
//       name: "Installment Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.INSTALLMENT_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen(!recoveryOpen);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CASH_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen1(!recoveryOpen1);
//       },
//     },
//     {
//       id: 3,
//       name: "Credit Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CREDIT_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen2(!recoveryOpen2);
//       },
//     },
//     {
//       id: 4,
//       name: "Installment Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.INSTALLMENT_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen(!advanceOpen);
//       },
//     },
//     {
//       id: 5,
//       name: "Credit Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CREDIT_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen1(!advanceOpen1);
//       },
//     },
//     {
//       id: 6,
//       name: "Total Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.TOTAL_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen2(!advanceOpen2);
//       },
//     },
//     {
//       id: 7,
//       name: "Total Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.TOTAL_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen3(!recoveryOpen3);
//       },
//     },
//     {
//       id: 8,
//       name: "Grand Total",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.GRAND_TOTAL
//       ),
//     },
//   ];

//   const bank_expense = [
//     {
//       id: 1,
//       name: "Cash At Bank",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.CASH_AT_BANK
//       ),
//       open: () => {
//         setCashBankOpen(!cashBankOpen);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash In Hand",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.CASH_IN_HAND
//       ),
//       open: () => {
//         setCashInHandOpen(!cashInHandOpen);
//       },
//     },
//     {
//       id: 3,
//       name: "Total Expense",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.TOTAL_EXPENSE
//       ),
//       open: () => {
//         setExpenseOpen(!expenseOpen);
//       },
//     },
//     {
//       id: 4,
//       name: "Purchases",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.PURCHASES
//       ),
//       open: () => {
//         setPurchaseOpen(!purchaseOpen);
//       },
//     },
//     {
//       id: 5,
//       name: "Payments",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.PAYMENTS
//       ),
//       open: () => {
//         setPaymentOpen(!paymentOpen);
//       },
//     },
//     {
//       id: 6,
//       name: "Salary Payable",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.SALARY_PAYABLE
//       ),
//       open:() =>{
//         setSalaryPayableOpen(!salaryPayableOpen);
//       }
//     },
//     {
//       id: 7,
//       name: "Drawing",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.DRAWING
//       ),
//       open:() =>{
//         setDrawingOpen(!drawingeOpen);
//       }
//     },
//     {
//       id: 8,
//       name: "Total Cash",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.TOTAL_CASH
//       ),
//     },
//   ];

//   return (
//     <div
//       className={`w-full ${
//         theme === "dark"
//           ? "bg-[#141b2e]"
//           : "bg-[#f1f1f1] border-l border-gray-200"
//       } min-h-[92.2vh]`}
//     >
//       <div
//         className={`${
//           theme === "dark" ? "top-section" : "bg-white"
//         } pb-10 min-h-[92vh] h-auto w-full px-4`}
//       >
//         {/* Filter Section */}
//         <div className="mb-6 w-[100%] py-3">
//           <div
//             className={`w-full  pb-8 px-4 ${
//               theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//             }  shadow-lg rounded-md`}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Company
//                 </label>
//                 <select
//                   value={filters.rec_company}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       rec_company: e.target.value,
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {companies.map((company) => (
//                     <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                       {company.COMPANY_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Branch</label>
//                 <select
//                   value={filters.branch}
//                   onChange={(e) =>
//                     setFilters((prev) => ({ ...prev, branch: e.target.value }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {branch.map((branch) => (
//                     <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
//                       {branch.BRANCH_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.sdate)}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       sdate: formatDateForAPI(e.target.value),
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.edate)}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       edate: formatDateForAPI(e.target.value),
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Cards Section */}
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Sales</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
//             {Sale.map((sale) => (
//               <HomeSmallCard
//                 key={sale.id}
//                 open={sale.open}
//                 heading={sale.name}
//                 number={sale.saleFunction}
//               />
//             ))}
//           </div>
//         </div>
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Recovery</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
//             {Recovery.map((recovery, i) => {
//               return (
//                 <HomeSmallCard
//                   key={i}
//                   open={recovery.open}
//                   heading={recovery.name}
//                   number={recovery.saleFunction}
//                 />
//               );
//             })}
//           </div>
//         </div>
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Bank & Expense</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
//             {bank_expense.map((bank) => {
//               return (
//                 <HomeSmallCard
//                   open={bank.open}
//                   heading={bank.name}
//                   number={bank.saleFunction}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <HomePageDialogBox data={firstModelData} open={open} setOpen={setOpen} />
//       <HomePageDialogBox
//         data={secondModelData}
//         open={open1}
//         setOpen={setOpen1}
//       />
//       <HomePageDialogBox
//         data={thirdModelData}
//         open={open2}
//         setOpen={setOpen2}
//       />
//       <HomePageDialogBox
//         data={fourthModelData}
//         open={open3}
//         setOpen={setOpen3}
//       />
//       <HomePageRecoveryDialogBox
//         data={firstRecoveryModelData}
//         open={recoveryOpen}
//         setOpen={setRecoveryOpen}
//       />
//       <HomePageRecoveryDialogBox
//         data={secondRecoveryModelData}
//         open={recoveryOpen1}
//         setOpen={setRecoveryOpen1}
//       />
//       <HomePageRecoveryDialogBox
//         data={thirdRecoveryModelData}
//         open={recoveryOpen2}
//         setOpen={setRecoveryOpen2}
//       />
//       <HomePageRecoveryDialogBox
//         data={fourthRecoveryModelData}
//         open={recoveryOpen3}
//         setOpen={setRecoveryOpen3}
//       />
//       <HomePageAdvanceDialogBox
//         data={firstAdvanceModelData}
//         open={advanceOpen}
//         setOpen={setAdvanceOpen}
//       />
//       <HomePageAdvanceDialogBox
//         data={secondAdvanceModelData}
//         open={advanceOpen1}
//         setOpen={setAdvanceOpen1}
//       />
//       <HomePageAdvanceDialogBox
//         data={thirdAdvanceModelData}
//         open={advanceOpen2}
//         setOpen={setAdvanceOpen2}
//       />
//       <CashAtBankModel
//         data={cashAtBankModelData}
//         open={cashBankOpen}
//         setOpen={setCashBankOpen}
//       />
//       <CashAtBankModel
//         data={cashInHandModelData}
//         open={cashInHandOpen}
//         setOpen={setCashInHandOpen}
//       />
//       <ExpenseModel
//         data={expenseModelData}
//         open={expenseOpen}
//         setOpen={setExpenseOpen}
//       />
//       <PurchaseModel
//         data={purchaseModelData}
//         open={purchaseOpen}
//         setOpen={setPurchaseOpen}
//       />
//       <PaymentModel
//         data={paymentModelData}
//         open={paymentOpen}
//         setOpen={setPaymentOpen}
//       />
//       <SalaryPayableModel
//         data={salaryPayableModelData}
//         open={salaryPayableOpen}
//         setOpen={setSalaryPayableOpen}
//       />
//       <SalaryPayableModel
//         data={drawingModelData}
//         open={drawingeOpen}
//         setOpen={setDrawingOpen}
//       />
      
//     </div>
//   );
// };

// export default Home;

// import React, { useCallback, useContext, useEffect, useState } from "react";
// import HomePageDialogBox from "../components/Models/HomePageDialogBox";
// import { Context } from "../context/Context";
// import axios from "axios";
// import HomeSmallCard from "../components/card/HomeSmallCard";
// import HomePageRecoveryDialogBox from "../components/Models/HomePageRecoveryDialogBox";
// import HomePageAdvanceDialogBox from "../components/Models/HomePageAdvanceDialogBox";
// import CashAtBankModel from "../components/Models/CashAtBankModel";
// import ExpenseModel from "../components/Models/ExpenseModel";
// import PurchaseModel from "../components/Models/PurchaseModel";
// import PaymentModel from "../components/Models/PaymentModel";
// import SalaryPayableModel from "../components/Models/SalaryPayableModel";

// const formatDateForAPI = (dateString) => {
//   const months = [
//     "JAN",
//     "FEB",
//     "MAR",
//     "APR",
//     "MAY",
//     "JUN",
//     "JUL",
//     "AUG",
//     "SEP",
//     "OCT",
//     "NOV",
//     "DEC",
//   ];
//   const [year, month, day] = dateString.split("-");
//   return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
// };

// const formatDateForInput = (dateString) => {
//   const months = {
//     JAN: "01",
//     FEB: "02",
//     MAR: "03",
//     APR: "04",
//     MAY: "05",
//     JUN: "06",
//     JUL: "07",
//     AUG: "08",
//     SEP: "09",
//     OCT: "10",
//     NOV: "11",
//     DEC: "12",
//   };
//   if (!dateString) return "";
//   const [day, month, year] = dateString.split("-");
//   return `${year}-${months[month]}-${day}`;
// };

// const getCurrentDate = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const dd = String(today.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const getFirstDateOfCurrentMonth = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   return `${yyyy}-${mm}-01`;
// };

// const Home = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState({});
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [firstModelData, setFirstModelData] = useState([]);
//   const [secondModelData, setSecondModelData] = useState([]);
//   const [thirdModelData, setThirdModelData] = useState([]);
//   const [fourthModelData, setFourthModelData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [open3, setOpen3] = useState(false);

//   // #######################################################
//   const [firstRecoveryModelData, setFirstRecoveryModelData] = useState([]);
//   const [secondRecoveryModelData, setSecondRecoveryModelData] = useState([]);
//   const [thirdRecoveryModelData, setThirdRecoveryModelData] = useState([]);

//   const [fourthRecoveryModelData, setfourthRecoveryModelData] = useState([]);

//   const [recoveryOpen, setRecoveryOpen] = useState(false);
//   const [recoveryOpen1, setRecoveryOpen1] = useState(false);
//   const [recoveryOpen2, setRecoveryOpen2] = useState(false);
//   const [recoveryOpen3, setRecoveryOpen3] = useState(false);

//   // #######################################################
//   const [firstAdvanceModelData, setFirstAdvanceModelData] = useState([]);
//   const [secondAdvanceModelData, setSecondAdvanceModelData] = useState([]);
//   const [thirdAdvanceModelData, setThirdAdvanceModelData] = useState([]);

//   const [advanceOpen, setAdvanceOpen] = useState(false);
//   const [advanceOpen1, setAdvanceOpen1] = useState(false);
//   const [advanceOpen2, setAdvanceOpen2] = useState(false);

//   // #######################################################
//   const [cashAtBankModelData, setCashAtBankModelData] = useState([]);
//   const [cashBankOpen, setCashBankOpen] = useState(false);
//   // #######################################################
//   const [cashInHandModelData, setCashInHandModelData] = useState([]);
//   const [cashInHandOpen, setCashInHandOpen] = useState(false);
//   // #######################################################
//   const [expenseModelData, setExpenseModelData] = useState([]);
//   const [expenseOpen, setExpenseOpen] = useState(false);
//   // #######################################################
//   const [purchaseModelData, setPurchaseModelData] = useState([]);
//   const [purchaseOpen, setPurchaseOpen] = useState(false);
//   // #######################################################
//   const [paymentModelData, setPaymentModelData] = useState([]);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   // #######################################################
//   const [salaryPayableModelData, setSalaryPayableModelData] = useState([]);
//   const [salaryPayableOpen, setSalaryPayableOpen] = useState(false);
//   // #######################################################
//   const [drawingModelData, setDrawingModelData] = useState([]);
//   const [drawingeOpen, setDrawingOpen] = useState(false);

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: "",
//   });

//   // Generic API fetch function
//   const fetchData = useCallback(async (url, params, setter) => {
//     try {
//       const { data } = await axios.get(url, {
//         params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch,
//           ...params
//         }
//       });
//       setter(data);
//     } catch (error) {
//       console.error(`Error fetching ${url}:`, error);
//     }
//   }, [filters]);

//   // API call configurations
//   const apiConfigurations = useCallback(() => ([
//     // Main dashboard
//     { url: 'https://zbl.erprz.com/esb/dashboad', params: { crr: "" }, setter: setCollectionData },
    
//     // Daily Sales
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "" }, setter: setFirstModelData },
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "CASH" }, setter: setSecondModelData },
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "CREDIT" }, setter: setThirdModelData },
//     { url: 'https://zbl.erprz.com/esb/DailySale', params: { inst_type: "INSTALLMENT" }, setter: setFourthModelData },

//     // Recovery
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "INSTALLMENT" }, setter: setFirstRecoveryModelData },
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "CASH" }, setter: setSecondRecoveryModelData },
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "CREDIT" }, setter: setThirdRecoveryModelData },
//     { url: 'https://zbl.erprz.com/esb/db-recovery', params: { inst_type: "" }, setter: setfourthRecoveryModelData },

//     // Advance
//     { url: 'https://zbl.erprz.com/esb/advance-receivable', params: { inst_type: "INSTALLMENT" }, setter: setFirstAdvanceModelData },
//     { url: 'https://zbl.erprz.com/esb/advance-receivable', params: { inst_type: "CREDIT" }, setter: setSecondAdvanceModelData },
//     { url: 'https://zbl.erprz.com/esb/advance-receivable', params: { inst_type: "" }, setter: setThirdAdvanceModelData },

//     // Other endpoints
//     { url: 'https://zbl.erprz.com/esb/db-cash-at-bank', setter: setCashAtBankModelData },
//     { url: 'https://zbl.erprz.com/esb/db-cash-in-hand', setter: setCashInHandModelData },
//     { url: 'https://zbl.erprz.com/esb/db-expense', setter: setExpenseModelData },
//     { url: 'https://zbl.erprz.com/esb/db-purchase', setter: setPurchaseModelData },
//     { url: 'https://zbl.erprz.com/esb/db-payments', setter: setPaymentModelData },
//     { url: 'https://zbl.erprz.com/esb/db-salary-payable', setter: setSalaryPayableModelData },
//     { url: 'https://zbl.erprz.com/esb/db-drawing', setter: setDrawingModelData },
//   ]), []);

//   // Fetch all data
//   const fetchAllData = useCallback(async () => {
//     setLoader(true);
//     try {
//       await Promise.all(
//         apiConfigurations().map(({ url, params, setter }) => 
//           fetchData(url, params, setter)
//       ));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoader(false);
//     }
//   }, [fetchData, apiConfigurations]);




// const fetchDropdownData = useCallback(async () => {
//   try {
//     // Check localStorage first
//     const storedCompanies = localStorage.getItem('company_list');
//     const storedBranches = localStorage.getItem('branch_list');
    
//     if (storedCompanies && storedBranches) {
//       const companiesData = JSON.parse(storedCompanies);
//       const branchesData = JSON.parse(storedBranches);
      
//       setCompanies(companiesData);
//       setBranch(branchesData);
      
//       if (companiesData.length > 0) {
//         setFilters(prev => ({
//           ...prev,
//           rec_company: companiesData[0].COMPANY_ID || "1"
//         }));
//       }
//     } else {
//       // Fallback to API if not in localStorage
//       console.log('Fetching dropdown data from API...');
//       const { data } = await axios.get("https://zbl.erprz.com/esb/pre-define");
//       if (data?.company_list) {
//         // Store in localStorage for future use
//         localStorage.setItem('company_list', JSON.stringify(data.company_list));
//         localStorage.setItem('branch_list', JSON.stringify(data.branch_list));
        
//         setCompanies(data.company_list);
//         setBranch(data.branch_list);
        
//         if (data.company_list.length > 0) {
//           setFilters(prev => ({
//             ...prev,
//             rec_company: data.company_list[0].COMPANY_ID || "1"
//           }));
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching dropdown data:", error);
//   }
// }, []);

//   // Main effect
//   useEffect(() => {
//     fetchAllData();
//     fetchDropdownData();
//   }, [fetchAllData, fetchDropdownData]);

//   // Memoized number formatting
//   const formatNumberWithCommas = useCallback((number) => 
//     number ? Number(number).toLocaleString() : "0", 
//   []);

//   const Sale = [
//     {
//       id: 1,
//       name: "Total Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
//       open: () => {
//         setOpen(!open);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
//       open: () => {
//         setOpen1(!open1);
//       },
//     },
//     {
//       id: 3,
//       name: "Credit Sale",
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
//       open: () => {
//         setOpen2(!open2);
//       },
//     },
//     {
//       id: 4,
//       name: "Installment Sale",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.sale?.INSTALLMENT_SALE
//       ),
//       open: () => {
//         setOpen3(!open3);
//       },
//     },
//   ];
//   const Recovery = [
//     {
//       id: 1,
//       name: "Installment Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.INSTALLMENT_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen(!recoveryOpen);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CASH_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen1(!recoveryOpen1);
//       },
//     },
//     {
//       id: 3,
//       name: "Credit Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CREDIT_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen2(!recoveryOpen2);
//       },
//     },
//     {
//       id: 4,
//       name: "Installment Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.INSTALLMENT_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen(!advanceOpen);
//       },
//     },
//     {
//       id: 5,
//       name: "Credit Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.CREDIT_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen1(!advanceOpen1);
//       },
//     },
//     {
//       id: 6,
//       name: "Total Advance",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.TOTAL_ADVANCE
//       ),
//       open: () => {
//         setAdvanceOpen2(!advanceOpen2);
//       },
//     },
//     {
//       id: 7,
//       name: "Total Recovery",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.TOTAL_RECOVERY
//       ),
//       open: () => {
//         setRecoveryOpen3(!recoveryOpen3);
//       },
//     },
//     {
//       id: 8,
//       name: "Grand Total",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.recovery?.GRAND_TOTAL
//       ),
//     },
//   ];

//   const bank_expense = [
//     {
//       id: 1,
//       name: "Cash At Bank",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.CASH_AT_BANK
//       ),
//       open: () => {
//         setCashBankOpen(!cashBankOpen);
//       },
//     },
//     {
//       id: 2,
//       name: "Cash In Hand",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.CASH_IN_HAND
//       ),
//       open: () => {
//         setCashInHandOpen(!cashInHandOpen);
//       },
//     },
//     {
//       id: 3,
//       name: "Total Expense",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.TOTAL_EXPENSE
//       ),
//       open: () => {
//         setExpenseOpen(!expenseOpen);
//       },
//     },
//     {
//       id: 4,
//       name: "Purchases",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.PURCHASES
//       ),
//       open: () => {
//         setPurchaseOpen(!purchaseOpen);
//       },
//     },
//     {
//       id: 5,
//       name: "Payments",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.PAYMENTS
//       ),
//       open: () => {
//         setPaymentOpen(!paymentOpen);
//       },
//     },
//     {
//       id: 6,
//       name: "Salary Payable",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.SALARY_PAYABLE
//       ),
//       open:() =>{
//         setSalaryPayableOpen(!salaryPayableOpen);
//       }
//     },
//     {
//       id: 7,
//       name: "Drawing",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.DRAWING
//       ),
//       open:() =>{
//         setDrawingOpen(!drawingeOpen);
//       }
//     },
//     {
//       id: 8,
//       name: "Total Cash",
//       saleFunction: formatNumberWithCommas(
//         collectionData?.bank_expense?.TOTAL_CASH
//       ),
//     },
//   ];

//   return (
//     <div
//       className={`w-full ${
//         theme === "dark"
//           ? "bg-[#141b2e]"
//           : "bg-[#f1f1f1] border-l border-gray-200"
//       } min-h-[92.2vh]`}
//     >
//       <div
//         className={`${
//           theme === "dark" ? "top-section" : "bg-white"
//         } pb-10 min-h-[92vh] h-auto w-full px-4`}
//       >
//         {/* Filter Section */}
//         <div className="mb-6 w-[100%] py-3">
//           <div
//             className={`w-full  pb-8 px-4 ${
//               theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//             }  shadow-lg rounded-md`}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Company
//                 </label>
//                 <select
//                   value={filters.rec_company}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       rec_company: e.target.value,
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {companies.map((company) => (
//                     <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                       {company.COMPANY_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Branch</label>
//                 <select
//                   value={filters.branch}
//                   onChange={(e) =>
//                     setFilters((prev) => ({ ...prev, branch: e.target.value }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   {branch.map((branch) => (
//                     <option key={branch.BRANCH_ID} value={branch.BRANCH_ID}>
//                       {branch.BRANCH_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.sdate)}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       sdate: formatDateForAPI(e.target.value),
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.edate)}
//                   onChange={(e) =>
//                     setFilters((prev) => ({
//                       ...prev,
//                       edate: formatDateForAPI(e.target.value),
//                     }))
//                   }
//                   className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Cards Section */}
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Sales</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
//             {Sale.map((sale) => (
//               <HomeSmallCard
//                 key={sale.id}
//                 open={sale.open}
//                 heading={sale.name}
//                 number={sale.saleFunction}
//               />
//             ))}
//           </div>
//         </div>
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Recovery</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
//             {Recovery.map((recovery, i) => {
//               return (
//                 <HomeSmallCard
//                   key={i}
//                   open={recovery.open}
//                   heading={recovery.name}
//                   number={recovery.saleFunction}
//                 />
//               );
//             })}
//           </div>
//         </div>
//         <div
//           className={`w-full  pb-8 px-4 ${
//             theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
//           }  shadow-lg rounded-md`}
//         >
//           <h1 className="text-xl font-semibold mt-3">Bank & Expense</h1>
//           <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
//             {bank_expense.map((bank, i) => {
//               return (
//                 <HomeSmallCard
//                   key={i}
//                   open={bank.open}
//                   heading={bank.name}
//                   number={bank.saleFunction}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <HomePageDialogBox data={firstModelData} open={open} setOpen={setOpen} />
//       <HomePageDialogBox
//         data={secondModelData}
//         open={open1}
//         setOpen={setOpen1}
//       />
//       <HomePageDialogBox
//         data={thirdModelData}
//         open={open2}
//         setOpen={setOpen2}
//       />
//       <HomePageDialogBox
//         data={fourthModelData}
//         open={open3}
//         setOpen={setOpen3}
//       />
//       <HomePageRecoveryDialogBox
//         data={firstRecoveryModelData}
//         open={recoveryOpen}
//         setOpen={setRecoveryOpen}
//       />
//       <HomePageRecoveryDialogBox
//         data={secondRecoveryModelData}
//         open={recoveryOpen1}
//         setOpen={setRecoveryOpen1}
//       />
//       <HomePageRecoveryDialogBox
//         data={thirdRecoveryModelData}
//         open={recoveryOpen2}
//         setOpen={setRecoveryOpen2}
//       />
//       <HomePageRecoveryDialogBox
//         data={fourthRecoveryModelData}
//         open={recoveryOpen3}
//         setOpen={setRecoveryOpen3}
//       />
//       <HomePageAdvanceDialogBox
//         data={firstAdvanceModelData}
//         open={advanceOpen}
//         setOpen={setAdvanceOpen}
//       />
//       <HomePageAdvanceDialogBox
//         data={secondAdvanceModelData}
//         open={advanceOpen1}
//         setOpen={setAdvanceOpen1}
//       />
//       <HomePageAdvanceDialogBox
//         data={thirdAdvanceModelData}
//         open={advanceOpen2}
//         setOpen={setAdvanceOpen2}
//       />
//       <CashAtBankModel
//         data={cashAtBankModelData}
//         open={cashBankOpen}
//         setOpen={setCashBankOpen}
//       />
//       <CashAtBankModel
//         data={cashInHandModelData}
//         open={cashInHandOpen}
//         setOpen={setCashInHandOpen}
//       />
//       <ExpenseModel
//         data={expenseModelData}
//         open={expenseOpen}
//         setOpen={setExpenseOpen}
//       />
//       <PurchaseModel
//         data={purchaseModelData}
//         open={purchaseOpen}
//         setOpen={setPurchaseOpen}
//       />
//       <PaymentModel
//         data={paymentModelData}
//         open={paymentOpen}
//         setOpen={setPaymentOpen}
//       />
//       <SalaryPayableModel
//         data={salaryPayableModelData}
//         open={salaryPayableOpen}
//         setOpen={setSalaryPayableOpen}
//       />
//       <SalaryPayableModel
//         data={drawingModelData}
//         open={drawingeOpen}
//         setOpen={setDrawingOpen}
//       />
      
//     </div>
//   );
// };

// export default Home;


// HomeSmallCard.jsx update



// import React, { useCallback, useContext, useEffect, useState } from "react";
// import HomePageDialogBox from "../components/Models/HomePageDialogBox";
// import { Context } from "../context/Context";
// import axios from "axios";
// import HomeSmallCard from "../components/card/HomeSmallCard";
// import HomePageRecoveryDialogBox from "../components/Models/HomePageRecoveryDialogBox";
// import HomePageAdvanceDialogBox from "../components/Models/HomePageAdvanceDialogBox";
// import CashAtBankModel from "../components/Models/CashAtBankModel";
// import ExpenseModel from "../components/Models/ExpenseModel";
// import PurchaseModel from "../components/Models/PurchaseModel";
// import PaymentModel from "../components/Models/PaymentModel";
// import SalaryPayableModel from "../components/Models/SalaryPayableModel";
// import { 
//   FiRefreshCw, 
//   FiCalendar, 
//   FiDollarSign, 
//   FiTrendingUp, 
//   FiCreditCard,
//   FiPieChart,
//   FiDatabase,
//   FiLayers,
//   FiShoppingCart,
//   FiUsers,
//   FiUser,
//   FiHome,
//   FiGitBranch
// } from "react-icons/fi";

// const formatDateForAPI = (dateString) => {
//   const months = [
//     "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
//     "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
//   ];
//   const [year, month, day] = dateString.split("-");
//   return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
// };

// const formatDateForInput = (dateString) => {
//   const months = {
//     JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
//     JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
//   };
//   if (!dateString) return "";
//   const [day, month, year] = dateString.split("-");
//   return `${year}-${months[month]}-${day}`;
// };

// const getCurrentDate = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const dd = String(today.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const getFirstDateOfCurrentMonth = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   return `${yyyy}-${mm}-01`;
// };

// const Home = () => {
//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState({});
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [firstModelData, setFirstModelData] = useState([]);
//   const [secondModelData, setSecondModelData] = useState([]);
//   const [thirdModelData, setThirdModelData] = useState([]);
//   const [fourthModelData, setFourthModelData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [open3, setOpen3] = useState(false);

//   // Recovery states
//   const [firstRecoveryModelData, setFirstRecoveryModelData] = useState([]);
//   const [secondRecoveryModelData, setSecondRecoveryModelData] = useState([]);
//   const [thirdRecoveryModelData, setThirdRecoveryModelData] = useState([]);
//   const [fourthRecoveryModelData, setfourthRecoveryModelData] = useState([]);
//   const [recoveryOpen, setRecoveryOpen] = useState(false);
//   const [recoveryOpen1, setRecoveryOpen1] = useState(false);
//   const [recoveryOpen2, setRecoveryOpen2] = useState(false);
//   const [recoveryOpen3, setRecoveryOpen3] = useState(false);

//   // Advance states
//   const [firstAdvanceModelData, setFirstAdvanceModelData] = useState([]);
//   const [secondAdvanceModelData, setSecondAdvanceModelData] = useState([]);
//   const [thirdAdvanceModelData, setThirdAdvanceModelData] = useState([]);
//   const [advanceOpen, setAdvanceOpen] = useState(false);
//   const [advanceOpen1, setAdvanceOpen1] = useState(false);
//   const [advanceOpen2, setAdvanceOpen2] = useState(false);

//   // Other financial states
//   const [cashAtBankModelData, setCashAtBankModelData] = useState([]);
//   const [cashBankOpen, setCashBankOpen] = useState(false);
//   const [cashInHandModelData, setCashInHandModelData] = useState([]);
//   const [cashInHandOpen, setCashInHandOpen] = useState(false);
//   const [expenseModelData, setExpenseModelData] = useState([]);
//   const [expenseOpen, setExpenseOpen] = useState(false);
//   const [purchaseModelData, setPurchaseModelData] = useState([]);
//   const [purchaseOpen, setPurchaseOpen] = useState(false);
//   const [paymentModelData, setPaymentModelData] = useState([]);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   const [salaryPayableModelData, setSalaryPayableModelData] = useState([]);
//   const [salaryPayableOpen, setSalaryPayableOpen] = useState(false);
//   const [drawingModelData, setDrawingModelData] = useState([]);
//   const [drawingeOpen, setDrawingOpen] = useState(false);

//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: "",
//   });

//   // Generic API fetch function
//   const fetchData = useCallback(async (url, params, setter) => {
//     try {
//       const { data } = await axios.get(url, {
//         params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch,
//           ...params
//         }
//       });
//       setter(data);
//       return data;
//     } catch (error) {
//       console.error(`Error fetching ${url}:`, error);
//       return null;
//     }
//   }, [filters]);

//   // API call configurations
//   const apiConfigurations = useCallback(() => ([
//     { url: 'https://zbl.erprz.com/zbl/dashboad', params: { crr: "" }, setter: setCollectionData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "" }, setter: setFirstModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CASH" }, setter: setSecondModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CREDIT" }, setter: setThirdModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "INSTALLMENT" }, setter: setFourthModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "INSTALLMENT" }, setter: setFirstRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CASH" }, setter: setSecondRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CREDIT" }, setter: setThirdRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "" }, setter: setfourthRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "INSTALLMENT" }, setter: setFirstAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "CREDIT" }, setter: setSecondAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "" }, setter: setThirdAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-cash-at-bank', setter: setCashAtBankModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-cash-in-hand', setter: setCashInHandModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-expense', setter: setExpenseModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-purchase', setter: setPurchaseModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-payments', setter: setPaymentModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-salary-payable', setter: setSalaryPayableModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-drawing', setter: setDrawingModelData },
//   ]), []);

//   // Fetch all data
//   const fetchAllData = useCallback(async () => {
//     setLoader(true);
//     setRefreshing(true);
//     try {
//       await Promise.all(
//         apiConfigurations().map(({ url, params, setter }) => 
//           fetchData(url, params, setter)
//       ));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoader(false);
//       setRefreshing(false);
//     }
//   }, [fetchData, apiConfigurations]);

//   // Fetch dropdown data
//   const fetchDropdownData = useCallback(async () => {
//     try {
//       const storedCompanies = localStorage.getItem('company_list');
//       const storedBranches = localStorage.getItem('branch_list');
      
//       if (storedCompanies && storedBranches) {
//         const companiesData = JSON.parse(storedCompanies);
//         const branchesData = JSON.parse(storedBranches);
        
//         setCompanies(companiesData);
//         setBranch(branchesData);
        
//         if (companiesData.length > 0) {
//           setFilters(prev => ({
//             ...prev,
//             rec_company: companiesData[0].COMPANY_ID || "1"
//           }));
//         }
//       } else {
//         const { data } = await axios.get("https://zbl.erprz.com/zbl/pre-define");
//         if (data?.company_list) {
//           localStorage.setItem('company_list', JSON.stringify(data.company_list));
//           localStorage.setItem('branch_list', JSON.stringify(data.branch_list));
          
//           setCompanies(data.company_list);
//           setBranch(data.branch_list);
          
//           if (data.company_list.length > 0) {
//             setFilters(prev => ({
//               ...prev,
//               rec_company: data.company_list[0].COMPANY_ID || "1"
//             }));
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   }, []);

//   // Refresh data when filters change
//   useEffect(() => {
//     fetchAllData();
//   }, [filters.rec_company, filters.branch, filters.sdate, filters.edate, fetchAllData]);

//   // Initial data fetch
//   useEffect(() => {
//     fetchDropdownData();
//   }, [fetchDropdownData]);

//   // Handle filter changes
//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   // Refresh button handler
//   const handleRefresh = () => {
//     fetchAllData();
//   };

//   // Memoized number formatting
//   const formatNumberWithCommas = useCallback((number) => 
//     number ? Number(number).toLocaleString() : "0", 
//   []);

//   // Card data arrays with icons
//   const Sale = [
//     {
//       id: 1,
//       name: "Total Sale",
//       icon: <FiTrendingUp className="text-blue-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
//       open: () => setOpen(!open),
//     },
//     {
//       id: 2,
//       name: "Cash Sale",
//       icon: <FiDollarSign className="text-green-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
//       open: () => setOpen1(!open1),
//     },
//     {
//       id: 3,
//       name: "Credit Sale",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
//       open: () => setOpen2(!open2),
//     },
//     {
//       id: 4,
//       name: "Installment Sale",
//       icon: <FiLayers className="text-orange-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.INSTALLMENT_SALE),
//       open: () => setOpen3(!open3),
//     },
//   ];

//   const Recovery = [
//     {
//       id: 1,
//       name: "Installment Recovery",
//       icon: <FiLayers className="text-orange-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_RECOVERY),
//       open: () => setRecoveryOpen(!recoveryOpen),
//     },
//     {
//       id: 2,
//       name: "Cash Recovery",
//       icon: <FiDollarSign className="text-green-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.CASH_RECOVERY),
//       open: () => setRecoveryOpen1(!recoveryOpen1),
//     },
//     {
//       id: 3,
//       name: "Credit Recovery",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.CREDIT_RECOVERY),
//       open: () => setRecoveryOpen2(!recoveryOpen2),
//     },
//     {
//       id: 4,
//       name: "Installment Advance",
//       icon: <FiTrendingUp className="text-blue-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_ADVANCE),
//       open: () => setAdvanceOpen(!advanceOpen),
//     },
//     {
//       id: 5,
//       name: "Credit Advance",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.CREDIT_ADVANCE),
//       open: () => setAdvanceOpen1(!advanceOpen1),
//     },
//     {
//       id: 6,
//       name: "Total Advance",
//       icon: <FiDatabase className="text-teal-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.TOTAL_ADVANCE),
//       open: () => setAdvanceOpen2(!advanceOpen2),
//     },
//     {
//       id: 7,
//       name: "Total Recovery",
//       icon: <FiPieChart className="text-indigo-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.TOTAL_RECOVERY),
//       open: () => setRecoveryOpen3(!recoveryOpen3),
//     },
//     {
//       id: 8,
//       name: "Grand Total",
//       icon: <FiDatabase className="text-gray-600 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.GRAND_TOTAL),
//     },
//   ];

//   const bank_expense = [
//     {
//       id: 1,
//       name: "Cash At Bank",
//       icon: <FiDatabase className="text-blue-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.CASH_AT_BANK),
//       open: () => setCashBankOpen(!cashBankOpen),
//     },
//     {
//       id: 2,
//       name: "Cash In Hand",
//       icon: <FiDollarSign className="text-green-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.CASH_IN_HAND),
//       open: () => setCashInHandOpen(!cashInHandOpen),
//     },
//     {
//       id: 3,
//       name: "Total Expense",
//       icon: <FiTrendingUp className="text-red-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_EXPENSE),
//       open: () => setExpenseOpen(!expenseOpen),
//     },
//     {
//       id: 4,
//       name: "Purchases",
//       icon: <FiShoppingCart className="text-orange-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.PURCHASES),
//       open: () => setPurchaseOpen(!purchaseOpen),
//     },
//     {
//       id: 5,
//       name: "Payments",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.PAYMENTS),
//       open: () => setPaymentOpen(!paymentOpen),
//     },
//     {
//       id: 6,
//       name: "Salary Payable",
//       icon: <FiUsers className="text-pink-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.SALARY_PAYABLE),
//       open: () => setSalaryPayableOpen(!salaryPayableOpen),
//     },
//     {
//       id: 7,
//       name: "Drawing",
//       icon: <FiUser className="text-teal-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.DRAWING),
//       open: () => setDrawingOpen(!drawingeOpen),
//     },
//     {
//       id: 8,
//       name: "Total Cash",
//       icon: <FiDatabase className="text-gray-600 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_CASH),
//     },
//   ];

//   // Loader component
//   const Loader = () => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-3"></div>
//         <p className="text-gray-700 dark:text-gray-300">Loading data...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className={`w-full ${theme === "dark" ? "bg-[#141b2e]" : "bg-[#f1f1f1]"} min-h-[92.2vh]`}>
//       {loader && <Loader />}
      
//       <div className={`${theme === "dark" ? "top-section" : "bg-white"} pb-10 min-h-[92vh] h-auto w-full px-4`}>
//         {/* Filter Section */}
//         <div className="mb-6 w-full py-3">
//           <div className={`w-full pb-8 px-6 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                 Dashboard Filters
//               </h2>
//               <button
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
//                   refreshing 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-blue-500 hover:bg-blue-600 text-white'
//                 }`}
//               >
//                 <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//                 {refreshing ? 'Refreshing...' : 'Refresh Data'}
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiHome className="inline mr-2" />
//                   Company
//                 </label>
//                 <select
//                   value={filters.rec_company}
//                   onChange={(e) => handleFilterChange('rec_company', e.target.value)}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 >
//                   {companies.map((company) => (
//                     <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                       {company.COMPANY_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiGitBranch className="inline mr-2" />
//                   Branch
//                 </label>
//                 <select
//                   value={filters.branch}
//                   onChange={(e) => handleFilterChange('branch', e.target.value)}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 >
//                   <option value="">All Branches</option>
//                   {branch.map((branchItem) => (
//                     <option key={branchItem.BRANCH_ID} value={branchItem.BRANCH_ID}>
//                       {branchItem.BRANCH_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiCalendar className="inline mr-2" />
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.sdate)}
//                   onChange={(e) => handleFilterChange('sdate', formatDateForAPI(e.target.value))}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiCalendar className="inline mr-2" />
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.edate)}
//                   onChange={(e) => handleFilterChange('edate', formatDateForAPI(e.target.value))}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cards Sections */}
//         <div className="space-y-6">
//           {/* Sales Section */}
//           <div className={`w-full pb-8 px-6 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
//                 <FiTrendingUp className="mr-3 text-blue-500" />
//                 Sales Overview
//               </h2>
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {formatDateForInput(filters.sdate)} to {formatDateForInput(filters.edate)}
//               </span>
//             </div>
//             <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
//               {Sale.map((sale) => (
//                 <HomeSmallCard
//                   key={sale.id}
//                   open={sale.open}
//                   heading={sale.name}
//                   number={sale.saleFunction}
//                   icon={sale.icon}
//                   loading={loader}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Recovery Section */}
//           <div className={`w-full pb-8 px-6 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
//               <FiPieChart className="mr-3 text-green-500" />
//               Recovery & Advances
//             </h2>
//             <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
//               {Recovery.map((recovery) => (
//                 <HomeSmallCard
//                   key={recovery.id}
//                   open={recovery.open}
//                   heading={recovery.name}
//                   number={recovery.saleFunction}
//                   icon={recovery.icon}
//                   loading={loader}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Bank & Expense Section */}
//           <div className={`w-full pb-8 px-6 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
//               <FiDatabase className="mr-3 text-purple-500" />
//               Bank & Expense Management
//             </h2>
//             <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
//               {bank_expense.map((bank) => (
//                 <HomeSmallCard
//                   key={bank.id}
//                   open={bank.open}
//                   heading={bank.name}
//                   number={bank.saleFunction}
//                   icon={bank.icon}
//                   loading={loader}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal Components */}
//       <HomePageDialogBox data={firstModelData} open={open} setOpen={setOpen} />
//       <HomePageDialogBox data={secondModelData} open={open1} setOpen={setOpen1} />
//       <HomePageDialogBox data={thirdModelData} open={open2} setOpen={setOpen2} />
//       <HomePageDialogBox data={fourthModelData} open={open3} setOpen={setOpen3} />
//       <HomePageRecoveryDialogBox data={firstRecoveryModelData} open={recoveryOpen} setOpen={setRecoveryOpen} />
//       <HomePageRecoveryDialogBox data={secondRecoveryModelData} open={recoveryOpen1} setOpen={setRecoveryOpen1} />
//       <HomePageRecoveryDialogBox data={thirdRecoveryModelData} open={recoveryOpen2} setOpen={setRecoveryOpen2} />
//       <HomePageRecoveryDialogBox data={fourthRecoveryModelData} open={recoveryOpen3} setOpen={setRecoveryOpen3} />
//       <HomePageAdvanceDialogBox data={firstAdvanceModelData} open={advanceOpen} setOpen={setAdvanceOpen} />
//       <HomePageAdvanceDialogBox data={secondAdvanceModelData} open={advanceOpen1} setOpen={setAdvanceOpen1} />
//       <HomePageAdvanceDialogBox data={thirdAdvanceModelData} open={advanceOpen2} setOpen={setAdvanceOpen2} />
//       <CashAtBankModel data={cashAtBankModelData} open={cashBankOpen} setOpen={setCashBankOpen} />
//       <CashAtBankModel data={cashInHandModelData} open={cashInHandOpen} setOpen={setCashInHandOpen} />
//       <ExpenseModel data={expenseModelData} open={expenseOpen} setOpen={setExpenseOpen} />
//       <PurchaseModel data={purchaseModelData} open={purchaseOpen} setOpen={setPurchaseOpen} />
//       <PaymentModel data={paymentModelData} open={paymentOpen} setOpen={setPaymentOpen} />
//       <SalaryPayableModel data={salaryPayableModelData} open={salaryPayableOpen} setOpen={setSalaryPayableOpen} />
//       <SalaryPayableModel data={drawingModelData} open={drawingeOpen} setOpen={setDrawingOpen} />
//     </div>
//   );
// };

// export default Home;


// import React, { useCallback, useContext, useEffect, useState} from "react";

// import HomePageDialogBox from "../components/Models/HomePageDialogBox";
// import { Context } from "../context/Context";
// import axios from "axios";
// import HomeSmallCard from "../components/card/HomeSmallCard";
// import HomePageRecoveryDialogBox from "../components/Models/HomePageRecoveryDialogBox";
// import HomePageAdvanceDialogBox from "../components/Models/HomePageAdvanceDialogBox";
// import CashAtBankModel from "../components/Models/CashAtBankModel";
// import ExpenseModel from "../components/Models/ExpenseModel";
// import PurchaseModel from "../components/Models/PurchaseModel";
// import PaymentModel from "../components/Models/PaymentModel";
// import SalaryPayableModel from "../components/Models/SalaryPayableModel";
// import { 
//   FiRefreshCw, 
//   FiCalendar, 
//   FiDollarSign, 
//   FiTrendingUp, 
//   FiCreditCard,
//   FiPieChart,
//   FiDatabase,
//   FiLayers,
//   FiShoppingCart,
//   FiUsers, // Added FiUsers import
//   FiUser,
//   FiHome,
//   FiGitBranch
// } from "react-icons/fi";

// const formatDateForAPI = (dateString) => {
//   const months = [
//     "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
//     "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
//   ];
//   const [year, month, day] = dateString.split("-");
//   return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
// };

// const formatDateForInput = (dateString) => {
//   const months = {
//     JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
//     JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
//   };
//   if (!dateString) return "";
//   const [day, month, year] = dateString.split("-");
//   return `${year}-${months[month]}-${day}`;
// };

// const getCurrentDate = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const dd = String(today.getDate()).padStart(2, "0");
//   return `${yyyy}-${mm}-${dd}`;
// };

// const getFirstDateOfCurrentMonth = () => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   return `${yyyy}-${mm}-01`;
// };

// const Home = () => {






//   const { theme } = useContext(Context);
//   const [collectionData, setCollectionData] = useState({});
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [firstModelData, setFirstModelData] = useState([]);
//   const [secondModelData, setSecondModelData] = useState([]);
//   const [thirdModelData, setThirdModelData] = useState([]);
//   const [fourthModelData, setFourthModelData] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [open3, setOpen3] = useState(false);

//   // Recovery states
//   const [firstRecoveryModelData, setFirstRecoveryModelData] = useState([]);
//   const [secondRecoveryModelData, setSecondRecoveryModelData] = useState([]);
//   const [thirdRecoveryModelData, setThirdRecoveryModelData] = useState([]);
//   const [fourthRecoveryModelData, setfourthRecoveryModelData] = useState([]);
//   const [recoveryOpen, setRecoveryOpen] = useState(false);
//   const [recoveryOpen1, setRecoveryOpen1] = useState(false);
//   const [recoveryOpen2, setRecoveryOpen2] = useState(false);
//   const [recoveryOpen3, setRecoveryOpen3] = useState(false);

//   // Advance states
//   const [firstAdvanceModelData, setFirstAdvanceModelData] = useState([]);
//   const [secondAdvanceModelData, setSecondAdvanceModelData] = useState([]);
//   const [thirdAdvanceModelData, setThirdAdvanceModelData] = useState([]);
//   const [advanceOpen, setAdvanceOpen] = useState(false);
//   const [advanceOpen1, setAdvanceOpen1] = useState(false);
//   const [advanceOpen2, setAdvanceOpen2] = useState(false);

//   // Other financial states
//   const [cashAtBankModelData, setCashAtBankModelData] = useState([]);
//   const [cashBankOpen, setCashBankOpen] = useState(false);
//   const [cashInHandModelData, setCashInHandModelData] = useState([]);
//   const [cashInHandOpen, setCashInHandOpen] = useState(false);
//   const [expenseModelData, setExpenseModelData] = useState([]);
//   const [expenseOpen, setExpenseOpen] = useState(false);
//   const [purchaseModelData, setPurchaseModelData] = useState([]);
//   const [purchaseOpen, setPurchaseOpen] = useState(false);
//   const [paymentModelData, setPaymentModelData] = useState([]);
//   const [paymentOpen, setPaymentOpen] = useState(false);
//   const [salaryPayableModelData, setSalaryPayableModelData] = useState([]);
//   const [salaryPayableOpen, setSalaryPayableOpen] = useState(false);
//   const [drawingModelData, setDrawingModelData] = useState([]);
//   const [drawingeOpen, setDrawingOpen] = useState(false);

//   // Unified filter state
//   // const [filters, setFilters] = useState({
//   //   sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
//   //   edate: formatDateForAPI(getCurrentDate()),
//   //   rec_company: "",
//   //   curr_date: formatDateForAPI(getCurrentDate()),
//   //   branch: "",
//   // });


//  const selectedCompany = localStorage.getItem("selectedCompany");
//   const selectedBranch = localStorage.getItem("selectedBranch");
  
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: selectedCompany || "", // Use the stored company ID
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: selectedBranch || "",
//   });


//   // Generic API fetch function
//   const fetchData = useCallback(async (url, params, setter) => {
//     try {
//       const { data } = await axios.get(url, {
//         params: {
//           sdate: filters.sdate,
//           edate: filters.edate,
//           company: filters.rec_company,
//           branch: filters.branch,
//           ...params
//         }
//       });
//       setter(data);
//       return data;
//     } catch (error) {
//       console.error(`Error fetching ${url}:`, error);
//       return null;
//     }
//   }, [filters]);    

//   // API call configurations
//   const apiConfigurations = useCallback(() => ([
//     { url: 'https://zbl.erprz.com/zbl/dashboad', params: { crr: "" }, setter: setCollectionData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "" }, setter: setFirstModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CASH" }, setter: setSecondModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CREDIT" }, setter: setThirdModelData },
//     { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "INSTALLMENT" }, setter: setFourthModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "INSTALLMENT" }, setter: setFirstRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CASH" }, setter: setSecondRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CREDIT" }, setter: setThirdRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "" }, setter: setfourthRecoveryModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "INSTALLMENT" }, setter: setFirstAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "CREDIT" }, setter: setSecondAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "" }, setter: setThirdAdvanceModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-cash-at-bank', setter: setCashAtBankModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-cash-in-hand', setter: setCashInHandModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-expense', setter: setExpenseModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-purchase', setter: setPurchaseModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-payments', setter: setPaymentModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-salary-payable', setter: setSalaryPayableModelData },
//     { url: 'https://zbl.erprz.com/zbl/db-drawing', setter: setDrawingModelData },
//   ]), []);

//   // Fetch all data
//   const fetchAllData = useCallback(async () => {
//     setLoader(true);
//     setRefreshing(true);
//     try {
//       await Promise.all(
//         apiConfigurations().map(({ url, params, setter }) => 
//           fetchData(url, params, setter)
//       ));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoader(false);
//       setRefreshing(false);
//     }
//   }, [fetchData, apiConfigurations]);



// // Fetch dropdown data
// const fetchDropdownData = useCallback(async () => {
//   try {
//     const storedCompanies = localStorage.getItem('company_list');
//     const storedBranches = localStorage.getItem('branch_list');
    
//     // console.log("Stored Companies:", storedCompanies);
//     // console.log("Stored Branches:", storedBranches);
    
//     if (storedCompanies && storedBranches) {
//       const companiesData = JSON.parse(storedCompanies);
//       const branchesData = JSON.parse(storedBranches);
      
//       // console.log("Parsed Companies:", companiesData);
//       // console.log("Parsed Branches:", branchesData);
      
//       // Check if data needs transformation (from login response format)
//       const transformedCompanies = companiesData.map(company => ({
//         COMPANY_ID: company.id || company.COMPANY_ID,
//         COMPANY_NAME: company.name || company.COMPANY_NAME
//       }));
      
//       const transformedBranches = branchesData.map(branch => ({
//         BRANCH_ID: branch.id || branch.BRANCH_ID,
//         BRANCH_NAME: branch.name || branch.BRANCH_NAME,
//         COMPANY_ID: branch.company_id || branch.COMPANY_ID
//       }));
      
//       setCompanies(transformedCompanies);
//       setBranch(transformedBranches);
      
//       if (transformedCompanies.length > 0) {
//         setFilters(prev => ({
//           ...prev,
//           rec_company: transformedCompanies[0].COMPANY_ID || "1"
//         }));
//       }
//     } 
    
//   } catch (error) {
//     console.error("Error fetching dropdown data:", error);
//   }
// }, []);


//   // Refresh data when filters change
//   useEffect(() => {
//     fetchAllData();
//   }, [filters.rec_company, filters.branch, filters.sdate, filters.edate, fetchAllData]);

//   // Initial data fetch
//   useEffect(() => {
//     fetchDropdownData();
//   }, [fetchDropdownData]);

//   // Handle filter changes
//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   // Refresh button handler
//   const handleRefresh = () => {
//     fetchAllData();
//   };

//   // Memoized number formatting
//   const formatNumberWithCommas = useCallback((number) => 
//     number ? Number(number).toLocaleString() : "0", 
//   []);

//   // Card data arrays with icons
//   const Sale = [
//     {
//       id: 1,
//       name: "Total Sale",
//       icon: <FiTrendingUp className="text-blue-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
//       open: () => setOpen(!open),
//     },
//     {
//       id: 2,
//       name: "Cash Sale",
//       icon: <FiDollarSign className="text-green-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
//       open: () => setOpen1(!open1),
//     },
//     {
//       id: 3,
//       name: "Credit Sale",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
//       open: () => setOpen2(!open2),
//     },
//     {
//       id: 4,
//       name: "Installment Sale",
//       icon: <FiLayers className="text-orange-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.sale?.INSTALLMENT_SALE),
//       open: () => setOpen3(!open3),
//     },
//   ];

//   const Recovery = [
//     {
//       id: 1,
//       name: "Installment Recovery",
//       icon: <FiLayers className="text-orange-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_RECOVERY),
//       open: () => setRecoveryOpen(!recoveryOpen),
//     },
//     {
//       id: 2,
//       name: "Cash Recovery",
//       icon: <FiDollarSign className="text-green-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.CASH_RECOVERY),
//       open: () => setRecoveryOpen1(!recoveryOpen1),
//     },
//     {
//       id: 3,
//       name: "Credit Recovery",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.CREDIT_RECOVERY),
//       open: () => setRecoveryOpen2(!recoveryOpen2),
//     },
//     {
//       id: 4,
//       name: "Installment Advance",
//       icon: <FiTrendingUp className="text-blue-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_ADVANCE),
//       open: () => setAdvanceOpen(!advanceOpen),
//     },
//     {
//       id: 5,
//       name: "Credit Advance",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.CREDIT_ADVANCE),
//       open: () => setAdvanceOpen1(!advanceOpen1),
//     },
//     {
//       id: 6,
//       name: "Total Advance",
//       icon: <FiDatabase className="text-teal-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.TOTAL_ADVANCE),
//       open: () => setAdvanceOpen2(!advanceOpen2),
//     },
//     {
//       id: 7,
//       name: "Total Recovery",
//       icon: <FiPieChart className="text-indigo-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.TOTAL_RECOVERY),
//       open: () => setRecoveryOpen3(!recoveryOpen3),
//     },
//     {
//       id: 8,
//       name: "Grand Total",
//       icon: <FiDatabase className="text-gray-600 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.recovery?.GRAND_TOTAL),
//     },
//   ];

//   const bank_expense = [
//     {
//       id: 1,
//       name: "Cash At Bank",
//       icon: <FiDatabase className="text-blue-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.CASH_AT_BANK),
//       open: () => setCashBankOpen(!cashBankOpen),
//     },
//     {
//       id: 2,
//       name: "Cash In Hand",
//       icon: <FiDollarSign className="text-green-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.CASH_IN_HAND),
//       open: () => setCashInHandOpen(!cashInHandOpen),
//     },
//     {
//       id: 3,
//       name: "Total Expense",
//       icon: <FiTrendingUp className="text-red-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_EXPENSE),
//       open: () => setExpenseOpen(!expenseOpen),
//     },
//     {
//       id: 4,
//       name: "Purchases",
//       icon: <FiShoppingCart className="text-orange-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.PURCHASES),
//       open: () => setPurchaseOpen(!purchaseOpen),
//     },
//     {
//       id: 5,
//       name: "Payments",
//       icon: <FiCreditCard className="text-purple-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.PAYMENTS),
//       open: () => setPaymentOpen(!paymentOpen),
//     },
//     {
//       id: 6,
//       name: "Salary Payable",
//       icon: <FiUsers className="text-pink-500 text-2xl" />, // Now FiUsers is imported
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.SALARY_PAYABLE),
//       open: () => setSalaryPayableOpen(!salaryPayableOpen),
//     },
//     {
//       id: 7,
//       name: "Drawing",
//       icon: <FiUser className="text-teal-500 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.DRAWING),
//       open: () => setDrawingOpen(!drawingeOpen),
//     },
//     {
//       id: 8,
//       name: "Total Cash",
//       icon: <FiDatabase className="text-gray-600 text-2xl" />,
//       saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_CASH),
//     },
//   ];


//   if (loader) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }


// //   // Loader component
// // const Loader = () => (
// //   <div className="fixed inset-0 bg-white bg-opacity-30 dark:bg-gray-900 dark:bg-opacity-40 flex items-center justify-center z-50">
// //     <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-xl">
// //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-3"></div>
// //       <p className="text-gray-700 dark:text-gray-300">Loading data...</p>
// //     </div>
// //   </div>
// // );
//   return (
//     <div className={`w-full ${theme === "dark" ? "bg-[#141b2e]" : "bg-[#f1f1f1]"} min-h-[92.2vh]`}>
//       {loader && <Loader />}
      
//       <div className={`${theme === "dark" ? "top-section" : "bg-white"} pb-10 min-h-[92vh] h-auto w-full px-4`}>
//         {/* Filter Section */}
//         <div className="mb-6 w-full py-3">
//           <div className={`w-full pb-8 px-3 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <div className="flex items-center justify-between mb-6 mt-3">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                 Dashboard Filters
//               </h2>
//               <button
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
//                   refreshing 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-blue-500 hover:bg-blue-600 text-white'
//                 }`}
//               >
//                 <FiRefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
//                 {refreshing ? 'Refreshing...' : 'Refresh Data'}
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiHome className="inline mr-2" />
//                   Company
//                 </label>
//                 <select
//                   value={filters.rec_company}
//                   onChange={(e) => handleFilterChange('rec_company', e.target.value)}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 >
//                   {companies.map((company) => (
//                     <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                       {company.COMPANY_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiGitBranch className="inline mr-2" />
//                   Branch
//                 </label>
//                 <select
//                   value={filters.branch}
//                   onChange={(e) => handleFilterChange('branch', e.target.value)}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 >
//                   <option value="">All Branches</option>
//                   {branch.map((branchItem) => (
//                     <option key={branchItem.BRANCH_ID} value={branchItem.BRANCH_ID}>
//                       {branchItem.BRANCH_NAME}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiCalendar className="inline mr-2" />
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.sdate)}
//                   onChange={(e) => handleFilterChange('sdate', formatDateForAPI(e.target.value))}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   <FiCalendar className="inline mr-2" />
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   value={formatDateForInput(filters.edate)}
//                   onChange={(e) => handleFilterChange('edate', formatDateForAPI(e.target.value))}
//                   className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cards Sections */}
//         <div className="space-y-6">
//           {/* Sales Section */}
//           <div className={`w-full pb-8 px-6 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
//                 <FiTrendingUp className="mr-3 text-blue-500" />
//                 Sales Overview
//               </h2>
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 {formatDateForInput(filters.sdate)} to {formatDateForInput(filters.edate)}
//               </span>
//             </div>
//             <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
//               {Sale.map((sale) => (
//                 <HomeSmallCard
//                   key={sale.id}
//                   open={sale.open}
//                   heading={sale.name}
//                   number={sale.saleFunction}
//                   icon={sale.icon}
//                   loading={loader}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Recovery Section */}
//           <div className={`w-full pb-8 px-6 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
//               <FiPieChart className="mr-3 text-green-500" />
//               Recovery & Advances
//             </h2>
//             <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
//               {Recovery.map((recovery) => (
//                 <HomeSmallCard
//                   key={recovery.id}
//                   open={recovery.open}
//                   heading={recovery.name}
//                   number={recovery.saleFunction}
//                   icon={recovery.icon}
//                   loading={loader}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Bank & Expense Section */}
//           <div className={`w-full pb-8 px-6 ${theme === "dark" ? "bg-[#2a3e67]" : "bg-white"} shadow-lg rounded-xl border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
//             <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
//               <FiDatabase className="mr-3 text-purple-500" />
//               Bank & Expense Management
//             </h2>
//             <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
//               {bank_expense.map((bank) => (
//                 <HomeSmallCard
//                   key={bank.id}
//                   open={bank.open}
//                   heading={bank.name}
//                   number={bank.saleFunction}
//                   icon={bank.icon}
//                   loading={loader}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal Components */}
//       <HomePageDialogBox data={firstModelData} open={open} setOpen={setOpen} />
//       <HomePageDialogBox data={secondModelData} open={open1} setOpen={setOpen1} />
//       <HomePageDialogBox data={thirdModelData} open={open2} setOpen={setOpen2} />
//       <HomePageDialogBox data={fourthModelData} open={open3} setOpen={setOpen3} /> 
//       <HomePageRecoveryDialogBox data={firstRecoveryModelData} open={recoveryOpen} setOpen={setRecoveryOpen} />
//       <HomePageRecoveryDialogBox data={secondRecoveryModelData} open={recoveryOpen1} setOpen={setRecoveryOpen1} />
//       <HomePageRecoveryDialogBox data={thirdRecoveryModelData} open={recoveryOpen2} setOpen={setRecoveryOpen2} />
//       <HomePageRecoveryDialogBox data={fourthRecoveryModelData} open={recoveryOpen3} setOpen={setRecoveryOpen3} />
//       <HomePageAdvanceDialogBox data={firstAdvanceModelData} open={advanceOpen} setOpen={setAdvanceOpen} />
//       <HomePageAdvanceDialogBox data={secondAdvanceModelData} open={advanceOpen1} setOpen={setAdvanceOpen1} />
//       <HomePageAdvanceDialogBox data={thirdAdvanceModelData} open={advanceOpen2} setOpen={setAdvanceOpen2} />
//       <CashAtBankModel data={cashAtBankModelData} open={cashBankOpen} setOpen={setCashBankOpen} />
//       <CashAtBankModel data={cashInHandModelData} open={cashInHandOpen} setOpen={setCashInHandOpen} />
//       <ExpenseModel data={expenseModelData} open={expenseOpen} setOpen={setExpenseOpen} />
//       <PurchaseModel data={purchaseModelData} open={purchaseOpen} setOpen={setPurchaseOpen} />
//       <PaymentModel data={paymentModelData} open={paymentOpen} setOpen={setPaymentOpen} />
//       <SalaryPayableModel data={salaryPayableModelData} open={salaryPayableOpen} setOpen={setSalaryPayableOpen} />
//       <SalaryPayableModel data={drawingModelData} open={drawingeOpen} setOpen={setDrawingOpen} />
//     </div>
//   );
// };

// export default Home;

import React, { useCallback, useContext, useEffect, useState } from "react";
import HomePageDialogBox from "../components/Models/HomePageDialogBox";
import { Context } from "../context/Context";
import axios from "axios";
import HomeSmallCard from "../components/card/HomeSmallCard";
import HomePageRecoveryDialogBox from "../components/Models/HomePageRecoveryDialogBox";
import HomePageAdvanceDialogBox from "../components/Models/HomePageAdvanceDialogBox";
import CashAtBankModel from "../components/Models/CashAtBankModel";
import ExpenseModel from "../components/Models/ExpenseModel";
import PurchaseModel from "../components/Models/PurchaseModel";
import PaymentModel from "../components/Models/PaymentModel";
import SalaryPayableModel from "../components/Models/SalaryPayableModel";
import { 
  FiRefreshCw, 
  FiCalendar, 
  FiDollarSign, 
  FiTrendingUp, 
  FiCreditCard,
  FiPieChart,
  FiDatabase,
  FiLayers,
  FiShoppingCart,
  FiUsers,
  FiUser,
  FiHome,
  FiGitBranch,
  FiFilter,
  FiBarChart2,
  FiActivity,
} from "react-icons/fi";

const formatDateForAPI = (dateString) => {
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  const [year, month, day] = dateString.split("-");
  return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
};

const formatDateForInput = (dateString) => {
  const months = {
    JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
    JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12",
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

const getFirstDateOfCurrentMonth = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  return `${yyyy}-${mm}-01`;
};

const Home = () => {
  const { theme } = useContext(Context);
  const [collectionData, setCollectionData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Model data states
  const [firstModelData, setFirstModelData] = useState([]);
  const [secondModelData, setSecondModelData] = useState([]);
  const [thirdModelData, setThirdModelData] = useState([]);
  const [fourthModelData, setFourthModelData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  // Recovery states
  const [firstRecoveryModelData, setFirstRecoveryModelData] = useState([]);
  const [secondRecoveryModelData, setSecondRecoveryModelData] = useState([]);
  const [thirdRecoveryModelData, setThirdRecoveryModelData] = useState([]);
  const [fourthRecoveryModelData, setfourthRecoveryModelData] = useState([]);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryOpen1, setRecoveryOpen1] = useState(false);
  const [recoveryOpen2, setRecoveryOpen2] = useState(false);
  const [recoveryOpen3, setRecoveryOpen3] = useState(false);

  // Advance states
  const [firstAdvanceModelData, setFirstAdvanceModelData] = useState([]);
  const [secondAdvanceModelData, setSecondAdvanceModelData] = useState([]);
  const [thirdAdvanceModelData, setThirdAdvanceModelData] = useState([]);
  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [advanceOpen1, setAdvanceOpen1] = useState(false);
  const [advanceOpen2, setAdvanceOpen2] = useState(false);

  // Other financial states
  const [cashAtBankModelData, setCashAtBankModelData] = useState([]);
  const [cashBankOpen, setCashBankOpen] = useState(false);
  const [cashInHandModelData, setCashInHandModelData] = useState([]);
  const [cashInHandOpen, setCashInHandOpen] = useState(false);
  const [expenseModelData, setExpenseModelData] = useState([]);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [purchaseModelData, setPurchaseModelData] = useState([]);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [paymentModelData, setPaymentModelData] = useState([]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [salaryPayableModelData, setSalaryPayableModelData] = useState([]);
  const [salaryPayableOpen, setSalaryPayableOpen] = useState(false);
  const [drawingModelData, setDrawingModelData] = useState([]);
  const [drawingeOpen, setDrawingOpen] = useState(false);

  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");
  
  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: selectedCompany || "",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: selectedBranch || "",
  });

  // Generic API fetch function
  const fetchData = useCallback(async (url, params, setter) => {
    try {
      const { data } = await axios.get(url, {
        params: {
          sdate: filters.sdate,
          edate: filters.edate,
          company: filters.rec_company,
          branch: filters.branch,
          ...params
        }
      });
      setter(data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return null;
    }
  }, [filters]);    

  // API call configurations
  const apiConfigurations = useCallback(() => ([
    { url: 'https://zbl.erprz.com/zbl/dashboad', params: { crr: "" }, setter: setCollectionData },
    { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "" }, setter: setFirstModelData },
    { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CASH" }, setter: setSecondModelData },
    { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "CREDIT" }, setter: setThirdModelData },
    { url: 'https://zbl.erprz.com/zbl/DailySale', params: { inst_type: "INSTALLMENT" }, setter: setFourthModelData },
    { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "INSTALLMENT" }, setter: setFirstRecoveryModelData },
    { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CASH" }, setter: setSecondRecoveryModelData },
    { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "CREDIT" }, setter: setThirdRecoveryModelData },
    { url: 'https://zbl.erprz.com/zbl/db-recovery', params: { inst_type: "" }, setter: setfourthRecoveryModelData },
    { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "INSTALLMENT" }, setter: setFirstAdvanceModelData },
    { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "CREDIT" }, setter: setSecondAdvanceModelData },
    { url: 'https://zbl.erprz.com/zbl/advance-receivable', params: { inst_type: "" }, setter: setThirdAdvanceModelData },
    { url: 'https://zbl.erprz.com/zbl/db-cash-at-bank', setter: setCashAtBankModelData },
    { url: 'https://zbl.erprz.com/zbl/db-cash-in-hand', setter: setCashInHandModelData },
    { url: 'https://zbl.erprz.com/zbl/db-expense', setter: setExpenseModelData },
    { url: 'https://zbl.erprz.com/zbl/db-purchase', setter: setPurchaseModelData },
    { url: 'https://zbl.erprz.com/zbl/db-payments', setter: setPaymentModelData },
    { url: 'https://zbl.erprz.com/zbl/db-salary-payable', setter: setSalaryPayableModelData },
    { url: 'https://zbl.erprz.com/zbl/db-drawing', setter: setDrawingModelData },
  ]), []);

  // Fetch all data
  const fetchAllData = useCallback(async () => {
    setLoader(true);
    setRefreshing(true);
    try {
      await Promise.all(
        apiConfigurations().map(({ url, params, setter }) => 
          fetchData(url, params, setter)
      ));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
      setRefreshing(false);
    }
  }, [fetchData, apiConfigurations]);

  // Fetch dropdown data
  const fetchDropdownData = useCallback(async () => {
    try {
      const storedCompanies = localStorage.getItem('company_list');
      const storedBranches = localStorage.getItem('branch_list');
      
      if (storedCompanies && storedBranches) {
        const companiesData = JSON.parse(storedCompanies);
        const branchesData = JSON.parse(storedBranches);
        
        const transformedCompanies = companiesData.map(company => ({
          COMPANY_ID: company.id || company.COMPANY_ID,
          COMPANY_NAME: company.name || company.COMPANY_NAME
        }));
        
        const transformedBranches = branchesData.map(branch => ({
          BRANCH_ID: branch.id || branch.BRANCH_ID,
          BRANCH_NAME: branch.name || branch.BRANCH_NAME,
          COMPANY_ID: branch.company_id || branch.COMPANY_ID
        }));
        
        setCompanies(transformedCompanies);
        setBranch(transformedBranches);
        
        if (transformedCompanies.length > 0) {
          setFilters(prev => ({
            ...prev,
            rec_company: transformedCompanies[0].COMPANY_ID || "1"
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  }, []);

  // Refresh data when filters change
  useEffect(() => {
    fetchAllData();
  }, [filters.rec_company, filters.branch, filters.sdate, filters.edate, fetchAllData]);

  // Initial data fetch
  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Refresh button handler
  const handleRefresh = () => {
    fetchAllData();
  };

  // Memoized number formatting
  const formatNumberWithCommas = useCallback((number) => 
    number ? Number(number).toLocaleString() : "0", 
  []);

  // Card data arrays with enhanced icons and colors
  const Sale = [
    {
      id: 1,
      name: "Total Sale",
      icon: <FiTrendingUp className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
      open: () => setOpen(!open),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 2,
      name: "Cash Sale",
      icon: <FiDollarSign className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
      open: () => setOpen1(!open1),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      id: 3,
      name: "Credit Sale",
      icon: <FiCreditCard className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
      open: () => setOpen2(!open2),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      id: 4,
      name: "Installment Sale",
      icon: <FiLayers className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.sale?.INSTALLMENT_SALE),
      open: () => setOpen3(!open3),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
  ];

  const Recovery = [
    {
      id: 1,
      name: "Installment Recovery",
      icon: <FiLayers className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_RECOVERY),
      open: () => setRecoveryOpen(!recoveryOpen),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      id: 2,
      name: "Cash Recovery",
      icon: <FiDollarSign className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.CASH_RECOVERY),
      open: () => setRecoveryOpen1(!recoveryOpen1),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      id: 3,
      name: "Credit Recovery",
      icon: <FiCreditCard className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.CREDIT_RECOVERY),
      open: () => setRecoveryOpen2(!recoveryOpen2),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      id: 4,
      name: "Installment Advance",
      icon: <FiTrendingUp className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.INSTALLMENT_ADVANCE),
      open: () => setAdvanceOpen(!advanceOpen),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 5,
      name: "Credit Advance",
      icon: <FiCreditCard className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.CREDIT_ADVANCE),
      open: () => setAdvanceOpen1(!advanceOpen1),
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      id: 6,
      name: "Total Advance",
      icon: <FiDatabase className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.TOTAL_ADVANCE),
      open: () => setAdvanceOpen2(!advanceOpen2),
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      id: 7,
      name: "Total Recovery",
      icon: <FiPieChart className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.TOTAL_RECOVERY),
      open: () => setRecoveryOpen3(!recoveryOpen3),
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      id: 8,
      name: "Grand Total",
      icon: <FiActivity className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.recovery?.GRAND_TOTAL),
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gray-50 dark:bg-gray-900/20"
    },
  ];

  const bank_expense = [
    {
      id: 1,
      name: "Cash At Bank",
      icon: <FiDatabase className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.CASH_AT_BANK),
      open: () => setCashBankOpen(!cashBankOpen),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 2,
      name: "Cash In Hand",
      icon: <FiDollarSign className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.CASH_IN_HAND),
      open: () => setCashInHandOpen(!cashInHandOpen),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      id: 3,
      name: "Total Expense",
      icon: <FiTrendingUp className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_EXPENSE),
      open: () => setExpenseOpen(!expenseOpen),
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      id: 4,
      name: "Purchases",
      icon: <FiShoppingCart className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.PURCHASES),
      open: () => setPurchaseOpen(!purchaseOpen),
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      id: 5,
      name: "Payments",
      icon: <FiCreditCard className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.PAYMENTS),
      open: () => setPaymentOpen(!paymentOpen),
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      id: 6,
      name: "Salary Payable",
      icon: <FiUsers className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.SALARY_PAYABLE),
      open: () => setSalaryPayableOpen(!salaryPayableOpen),
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      id: 7,
      name: "Drawing",
      icon: <FiUser className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.DRAWING),
      open: () => setDrawingOpen(!drawingeOpen),
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-900/20"
    },
    {
      id: 8,
      name: "Total Cash",
      icon: <FiUser className="text-2xl" />,
      saleFunction: formatNumberWithCommas(collectionData?.bank_expense?.TOTAL_CASH),
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
    },
  ];

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

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
                Business Dashboard
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                Comprehensive overview of your sales, recovery, and financial performance
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
                  Dashboard Filters
                </h2>
                <p className={`mt-1 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Customize your dashboard view by selecting filters
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
                  onChange={(e) => handleFilterChange('rec_company', e.target.value)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                    shadow-sm
                    ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50 hover:border-gray-500" 
                      : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500/30 hover:border-gray-400"
                    }
                  `}
                >
                  {companies.map((company) => (
                    <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                      {company.COMPANY_NAME}
                    </option>
                  ))}
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
                  onChange={(e) => handleFilterChange('branch', e.target.value)}
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
                  {branch.map((branchItem) => (
                    <option key={branchItem.BRANCH_ID} value={branchItem.BRANCH_ID}>
                      {branchItem.BRANCH_NAME}
                    </option>
                  ))}
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
                  onChange={(e) => handleFilterChange('sdate', formatDateForAPI(e.target.value))}
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
                  onChange={(e) => handleFilterChange('edate', formatDateForAPI(e.target.value))}
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

        {/* Cards Sections */}
        <div className="space-y-8">
          {/* Sales Section */}
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
                  <FiBarChart2 className="text-blue-500" />
                  Sales Overview
                </h2>
                <p className={`mt-1 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Comprehensive breakdown of your sales performance
                </p>
              </div>
              <span className={`text-sm font-medium px-4 py-2 rounded-full mt-2 lg:mt-0 ${
                theme === "dark" ? "bg-blue-900/50 text-blue-200" : "bg-blue-100 text-blue-700"
              }`}>
                {formatDateForInput(filters.sdate)} to {formatDateForInput(filters.edate)}
              </span>
            </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {Sale.map((sale) => (
                <HomeSmallCard
                  key={sale.id}
                  open={sale.open}
                  heading={sale.name}
                  number={sale.saleFunction}
                  icon={sale.icon}
                  loading={loader}
                  color={sale.color}
                  bgColor={sale.bgColor}
                />
              ))}
            </div>
          </div>

          {/* Recovery Section */}
          <div className={`
            w-full p-6 lg:p-8 rounded-2xl shadow-xl border-2 backdrop-blur-sm transition-all duration-300
            ${theme === "dark" 
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
              : "bg-white/95 border-green-100"
            }
          `}>
            <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>
              <FiPieChart className="text-green-500" />
              Recovery & Advances
            </h2>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {Recovery.map((recovery) => (
                <HomeSmallCard
                  key={recovery.id}
                  open={recovery.open}
                  heading={recovery.name}
                  number={recovery.saleFunction}
                  icon={recovery.icon}
                  loading={loader}
                  color={recovery.color}
                  bgColor={recovery.bgColor}
                />
              ))}
            </div>
          </div>

          {/* Bank & Expense Section */}
          <div className={`
            w-full p-6 lg:p-8 rounded-2xl shadow-xl border-2 backdrop-blur-sm transition-all duration-300
            ${theme === "dark" 
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
              : "bg-white/95 border-purple-100"
            }
          `}>
            <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>
              <FiDatabase className="text-purple-500" />
              Financial Management
            </h2>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {bank_expense.map((bank) => (
                <HomeSmallCard
                  key={bank.id}
                  open={bank.open}
                  heading={bank.name}
                  number={bank.saleFunction}
                  icon={bank.icon}
                  loading={loader}
                  color={bank.color}
                  bgColor={bank.bgColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <HomePageDialogBox data={firstModelData} open={open} setOpen={setOpen} />
      <HomePageDialogBox data={secondModelData} open={open1} setOpen={setOpen1} />
      <HomePageDialogBox data={thirdModelData} open={open2} setOpen={setOpen2} />
      <HomePageDialogBox data={fourthModelData} open={open3} setOpen={setOpen3} /> 
      <HomePageRecoveryDialogBox data={firstRecoveryModelData} open={recoveryOpen} setOpen={setRecoveryOpen} />
      <HomePageRecoveryDialogBox data={secondRecoveryModelData} open={recoveryOpen1} setOpen={setRecoveryOpen1} />
      <HomePageRecoveryDialogBox data={thirdRecoveryModelData} open={recoveryOpen2} setOpen={setRecoveryOpen2} />
      <HomePageRecoveryDialogBox data={fourthRecoveryModelData} open={recoveryOpen3} setOpen={setRecoveryOpen3} />
      <HomePageAdvanceDialogBox data={firstAdvanceModelData} open={advanceOpen} setOpen={setAdvanceOpen} />
      <HomePageAdvanceDialogBox data={secondAdvanceModelData} open={advanceOpen1} setOpen={setAdvanceOpen1} />
      <HomePageAdvanceDialogBox data={thirdAdvanceModelData} open={advanceOpen2} setOpen={setAdvanceOpen2} />
      <CashAtBankModel data={cashAtBankModelData} open={cashBankOpen} setOpen={setCashBankOpen} />
      <CashAtBankModel data={cashInHandModelData} open={cashInHandOpen} setOpen={setCashInHandOpen} />
      <ExpenseModel data={expenseModelData} open={expenseOpen} setOpen={setExpenseOpen} />
      <PurchaseModel data={purchaseModelData} open={purchaseOpen} setOpen={setPurchaseOpen} />
      <PaymentModel data={paymentModelData} open={paymentOpen} setOpen={setPaymentOpen} />
      <SalaryPayableModel data={salaryPayableModelData} open={salaryPayableOpen} setOpen={setSalaryPayableOpen} />
      <SalaryPayableModel data={drawingModelData} open={drawingeOpen} setOpen={setDrawingOpen} />
    </div>
  );
};

export default Home;