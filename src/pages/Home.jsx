// import React, { useContext, useEffect, useState } from "react";
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

//   // Fetch Collection data (Main API)
//   const getCollection = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/dashboad`,
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
//       console.log("API Response:", data); // Debugging line
//       setCollectionData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };

//   // Fetch Collection data (MODELS TABLE)
//   const getModelTable = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/DailySale`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       console.log("GET MODEL TABLE:", data); // Debugging line
//       setFirstModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getModelTable2 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/DailySale`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "CASH",
//           },
//         }
//       );
//       console.log("GET MODEL TABLE:", data); // Debugging line
//       setSecondModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getModelTable3 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/DailySale`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "CREDIT",
//           },
//         }
//       );
//       console.log("GET MODEL TABLE:", data); // Debugging line
//       setThirdModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getModelTable4 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/DailySale`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "INSTALLMENT",
//           },
//         }
//       );
//       console.log("GET MODEL TABLE:", data); // Debugging line
//       setFourthModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };

//   // ### RECOVERY ###
//   const getRecoverModel = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-recovery`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "INSTALLMENT",
//           },
//         }
//       );
//       setFirstRecoveryModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getRecoverModel1 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-recovery`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "CASH",
//           },
//         }
//       );
//       setSecondRecoveryModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getRecoverModel2 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-recovery`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "CREDIT",
//           },
//         }
//       );
//       setThirdRecoveryModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getRecoverModel3 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-recovery`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setfourthRecoveryModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };

//   // ### ADVANCE ###
//   const getAdvanceModel = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/advance-receivable`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "INSTALLMENT",
//           },
//         }
//       );
//       setFirstAdvanceModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getAdvanceModel1 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/advance-receivable`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "CREDIT",
//           },
//         }
//       );
//       setSecondAdvanceModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   const getAdvanceModel2 = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/advance-receivable`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setThirdAdvanceModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };

//   // #### CASH AT BANK ####
//   const cashAtBank = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-cash-at-bank`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setCashAtBankModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };

//   // #### CASH IN HAND ####
//   const cashInHand = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-cash-in-hand`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setCashInHandModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   // #### EXPENSE ####
//   const expense = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-expense`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setExpenseModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   // #### PURCHASE ####
//   const purchase = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-purchase`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setPurchaseModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   // #### PAYMENT ####
//   const payment = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-payments`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setPaymentModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   // #### SALARY PAYABLE ####
//   const salaryPayable = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-salary-payable`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setSalaryPayableModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };
//   // #### DRAWING ####
//   const drawing = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/db-drawing`,
//         {
//           params: {
//             sdate: filters.sdate,
//             edate: filters.edate,
//             company: filters.rec_company,
//             branch: filters.branch,
//             inst_type: "",
//           },
//         }
//       );
//       setDrawingModelData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
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

//   // Handle Filter Submission
//   useEffect(() => {
//     getCollection();
//     getModelTable();
//     getModelTable2();
//     getModelTable4();
//     getModelTable3();
//     // RECOVERY
//     getRecoverModel();
//     getRecoverModel1();
//     getRecoverModel2();
//     getRecoverModel3();
//     // ADVANCE
//     getAdvanceModel();
//     getAdvanceModel1();
//     getAdvanceModel2();
//     // CASH AT BANK
//     cashAtBank();
//     // CASH IN HAND
//     cashInHand();
//     // Expense
//     expense();
//     // Purchase
//     purchase();
//     // payment
//     payment();
//     // salaryPayable
//     salaryPayable();
//     // drawing
//     drawing();

//     fetchDropdownData();
//   }, [filters]);

//   const formatNumberWithCommas = (number) => {
//     if (!number) return "0";
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

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

const formatDateForAPI = (dateString) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [year, month, day] = dateString.split("-");
  return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
};

const formatDateForInput = (dateString) => {
  const months = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
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
  const [firstModelData, setFirstModelData] = useState([]);
  const [secondModelData, setSecondModelData] = useState([]);
  const [thirdModelData, setThirdModelData] = useState([]);
  const [fourthModelData, setFourthModelData] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  // #######################################################
  const [firstRecoveryModelData, setFirstRecoveryModelData] = useState([]);
  const [secondRecoveryModelData, setSecondRecoveryModelData] = useState([]);
  const [thirdRecoveryModelData, setThirdRecoveryModelData] = useState([]);

  const [fourthRecoveryModelData, setfourthRecoveryModelData] = useState([]);

  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryOpen1, setRecoveryOpen1] = useState(false);
  const [recoveryOpen2, setRecoveryOpen2] = useState(false);
  const [recoveryOpen3, setRecoveryOpen3] = useState(false);

  // #######################################################
  const [firstAdvanceModelData, setFirstAdvanceModelData] = useState([]);
  const [secondAdvanceModelData, setSecondAdvanceModelData] = useState([]);
  const [thirdAdvanceModelData, setThirdAdvanceModelData] = useState([]);

  const [advanceOpen, setAdvanceOpen] = useState(false);
  const [advanceOpen1, setAdvanceOpen1] = useState(false);
  const [advanceOpen2, setAdvanceOpen2] = useState(false);

  // #######################################################
  const [cashAtBankModelData, setCashAtBankModelData] = useState([]);
  const [cashBankOpen, setCashBankOpen] = useState(false);
  // #######################################################
  const [cashInHandModelData, setCashInHandModelData] = useState([]);
  const [cashInHandOpen, setCashInHandOpen] = useState(false);
  // #######################################################
  const [expenseModelData, setExpenseModelData] = useState([]);
  const [expenseOpen, setExpenseOpen] = useState(false);
  // #######################################################
  const [purchaseModelData, setPurchaseModelData] = useState([]);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  // #######################################################
  const [paymentModelData, setPaymentModelData] = useState([]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  // #######################################################
  const [salaryPayableModelData, setSalaryPayableModelData] = useState([]);
  const [salaryPayableOpen, setSalaryPayableOpen] = useState(false);
  // #######################################################
  const [drawingModelData, setDrawingModelData] = useState([]);
  const [drawingeOpen, setDrawingOpen] = useState(false);

  // Unified filter state
  const [filters, setFilters] = useState({
    sdate: formatDateForAPI(getFirstDateOfCurrentMonth()),
    edate: formatDateForAPI(getCurrentDate()),
    rec_company: "1",
    curr_date: formatDateForAPI(getCurrentDate()),
    branch: "",
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
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
    }
  }, [filters]);

  // API call configurations
  const apiConfigurations = useCallback(() => ([
    // Main dashboard
    { url: 'https://zbl.zaffarsons.com/zbl/dashboad', params: { crr: "" }, setter: setCollectionData },
    
    // Daily Sales
    { url: 'https://zbl.zaffarsons.com/zbl/DailySale', params: { inst_type: "" }, setter: setFirstModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/DailySale', params: { inst_type: "CASH" }, setter: setSecondModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/DailySale', params: { inst_type: "CREDIT" }, setter: setThirdModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/DailySale', params: { inst_type: "INSTALLMENT" }, setter: setFourthModelData },
    
    // Recovery
    { url: 'https://zbl.zaffarsons.com/zbl/db-recovery', params: { inst_type: "INSTALLMENT" }, setter: setFirstRecoveryModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-recovery', params: { inst_type: "CASH" }, setter: setSecondRecoveryModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-recovery', params: { inst_type: "CREDIT" }, setter: setThirdRecoveryModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-recovery', params: { inst_type: "" }, setter: setfourthRecoveryModelData },
    
    // Advance
    { url: 'https://zbl.zaffarsons.com/zbl/advance-receivable', params: { inst_type: "INSTALLMENT" }, setter: setFirstAdvanceModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/advance-receivable', params: { inst_type: "CREDIT" }, setter: setSecondAdvanceModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/advance-receivable', params: { inst_type: "" }, setter: setThirdAdvanceModelData },
    
    // Other endpoints
    { url: 'https://zbl.zaffarsons.com/zbl/db-cash-at-bank', setter: setCashAtBankModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-cash-in-hand', setter: setCashInHandModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-expense', setter: setExpenseModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-purchase', setter: setPurchaseModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-payments', setter: setPaymentModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-salary-payable', setter: setSalaryPayableModelData },
    { url: 'https://zbl.zaffarsons.com/zbl/db-drawing', setter: setDrawingModelData },
  ]), []);

  // Fetch all data
  const fetchAllData = useCallback(async () => {
    setLoader(true);
    try {
      await Promise.all(
        apiConfigurations().map(({ url, params, setter }) => 
          fetchData(url, params, setter)
      ));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  }, [fetchData, apiConfigurations]);

  // Fetch dropdown data
  const fetchDropdownData = useCallback(async () => {
    try {
      const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/pre-define");
      if (data?.company_list) {
        setCompanies(data.company_list);
        setBranch(data.branch_list);
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  }, []);

  // Main effect
  useEffect(() => {
    fetchAllData();
    fetchDropdownData();
  }, [fetchAllData, fetchDropdownData]);

  // Memoized number formatting
  const formatNumberWithCommas = useCallback((number) => 
    number ? Number(number).toLocaleString() : "0", 
  []);

  const Sale = [
    {
      id: 1,
      name: "Total Sale",
      saleFunction: formatNumberWithCommas(collectionData?.sale?.TOTAL_SALE),
      open: () => {
        setOpen(!open);
      },
    },
    {
      id: 2,
      name: "Cash Sale",
      saleFunction: formatNumberWithCommas(collectionData?.sale?.CASH_SALE),
      open: () => {
        setOpen1(!open1);
      },
    },
    {
      id: 3,
      name: "Credit Sale",
      saleFunction: formatNumberWithCommas(collectionData?.sale?.CREDIT_SALE),
      open: () => {
        setOpen2(!open2);
      },
    },
    {
      id: 4,
      name: "Installment Sale",
      saleFunction: formatNumberWithCommas(
        collectionData?.sale?.INSTALLMENT_SALE
      ),
      open: () => {
        setOpen3(!open3);
      },
    },
  ];
  const Recovery = [
    {
      id: 1,
      name: "Installment Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.INSTALLMENT_RECOVERY
      ),
      open: () => {
        setRecoveryOpen(!recoveryOpen);
      },
    },
    {
      id: 2,
      name: "Cash Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.CASH_RECOVERY
      ),
      open: () => {
        setRecoveryOpen1(!recoveryOpen1);
      },
    },
    {
      id: 3,
      name: "Credit Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.CREDIT_RECOVERY
      ),
      open: () => {
        setRecoveryOpen2(!recoveryOpen2);
      },
    },
    {
      id: 4,
      name: "Installment Advance",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.INSTALLMENT_ADVANCE
      ),
      open: () => {
        setAdvanceOpen(!advanceOpen);
      },
    },
    {
      id: 5,
      name: "Credit Advance",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.CREDIT_ADVANCE
      ),
      open: () => {
        setAdvanceOpen1(!advanceOpen1);
      },
    },
    {
      id: 6,
      name: "Total Advance",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.TOTAL_ADVANCE
      ),
      open: () => {
        setAdvanceOpen2(!advanceOpen2);
      },
    },
    {
      id: 7,
      name: "Total Recovery",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.TOTAL_RECOVERY
      ),
      open: () => {
        setRecoveryOpen3(!recoveryOpen3);
      },
    },
    {
      id: 8,
      name: "Grand Total",
      saleFunction: formatNumberWithCommas(
        collectionData?.recovery?.GRAND_TOTAL
      ),
    },
  ];

  const bank_expense = [
    {
      id: 1,
      name: "Cash At Bank",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.CASH_AT_BANK
      ),
      open: () => {
        setCashBankOpen(!cashBankOpen);
      },
    },
    {
      id: 2,
      name: "Cash In Hand",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.CASH_IN_HAND
      ),
      open: () => {
        setCashInHandOpen(!cashInHandOpen);
      },
    },
    {
      id: 3,
      name: "Total Expense",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.TOTAL_EXPENSE
      ),
      open: () => {
        setExpenseOpen(!expenseOpen);
      },
    },
    {
      id: 4,
      name: "Purchases",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.PURCHASES
      ),
      open: () => {
        setPurchaseOpen(!purchaseOpen);
      },
    },
    {
      id: 5,
      name: "Payments",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.PAYMENTS
      ),
      open: () => {
        setPaymentOpen(!paymentOpen);
      },
    },
    {
      id: 6,
      name: "Salary Payable",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.SALARY_PAYABLE
      ),
      open:() =>{
        setSalaryPayableOpen(!salaryPayableOpen);
      }
    },
    {
      id: 7,
      name: "Drawing",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.DRAWING
      ),
      open:() =>{
        setDrawingOpen(!drawingeOpen);
      }
    },
    {
      id: 8,
      name: "Total Cash",
      saleFunction: formatNumberWithCommas(
        collectionData?.bank_expense?.TOTAL_CASH
      ),
    },
  ];

  return (
    <div
      className={`w-full ${
        theme === "dark"
          ? "bg-[#141b2e]"
          : "bg-[#f1f1f1] border-l border-gray-200"
      } min-h-[92.2vh]`}
    >
      <div
        className={`${
          theme === "dark" ? "top-section" : "bg-white"
        } pb-10 min-h-[92vh] h-auto w-full px-4`}
      >
        {/* Filter Section */}
        <div className="mb-6 w-[100%] py-3">
          <div
            className={`w-full  pb-8 px-4 ${
              theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
            }  shadow-lg rounded-md`}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company
                </label>
                <select
                  value={filters.rec_company}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      rec_company: e.target.value,
                    }))
                  }
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
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, branch: e.target.value }))
                  }
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
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(filters.sdate)}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sdate: formatDateForAPI(e.target.value),
                    }))
                  }
                  className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(filters.edate)}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      edate: formatDateForAPI(e.target.value),
                    }))
                  }
                  className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Cards Section */}
        <div
          className={`w-full  pb-8 px-4 ${
            theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
          }  shadow-lg rounded-md`}
        >
          <h1 className="text-xl font-semibold mt-3">Sales</h1>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
            {Sale.map((sale) => (
              <HomeSmallCard
                key={sale.id}
                open={sale.open}
                heading={sale.name}
                number={sale.saleFunction}
              />
            ))}
          </div>
        </div>
        <div
          className={`w-full  pb-8 px-4 ${
            theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
          }  shadow-lg rounded-md`}
        >
          <h1 className="text-xl font-semibold mt-3">Recovery</h1>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
            {Recovery.map((recovery, i) => {
              return (
                <HomeSmallCard
                  key={i}
                  open={recovery.open}
                  heading={recovery.name}
                  number={recovery.saleFunction}
                />
              );
            })}
          </div>
        </div>
        <div
          className={`w-full  pb-8 px-4 ${
            theme == "dark" ? "bg-[#2a3e67]" : "bg-[#f1f1f1"
          }  shadow-lg rounded-md`}
        >
          <h1 className="text-xl font-semibold mt-3">Bank & Expense</h1>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-4 h-auto">
            {bank_expense.map((bank) => {
              return (
                <HomeSmallCard
                  open={bank.open}
                  heading={bank.name}
                  number={bank.saleFunction}
                />
              );
            })}
          </div>
        </div>
      </div>
      <HomePageDialogBox data={firstModelData} open={open} setOpen={setOpen} />
      <HomePageDialogBox
        data={secondModelData}
        open={open1}
        setOpen={setOpen1}
      />
      <HomePageDialogBox
        data={thirdModelData}
        open={open2}
        setOpen={setOpen2}
      />
      <HomePageDialogBox
        data={fourthModelData}
        open={open3}
        setOpen={setOpen3}
      />
      <HomePageRecoveryDialogBox
        data={firstRecoveryModelData}
        open={recoveryOpen}
        setOpen={setRecoveryOpen}
      />
      <HomePageRecoveryDialogBox
        data={secondRecoveryModelData}
        open={recoveryOpen1}
        setOpen={setRecoveryOpen1}
      />
      <HomePageRecoveryDialogBox
        data={thirdRecoveryModelData}
        open={recoveryOpen2}
        setOpen={setRecoveryOpen2}
      />
      <HomePageRecoveryDialogBox
        data={fourthRecoveryModelData}
        open={recoveryOpen3}
        setOpen={setRecoveryOpen3}
      />
      <HomePageAdvanceDialogBox
        data={firstAdvanceModelData}
        open={advanceOpen}
        setOpen={setAdvanceOpen}
      />
      <HomePageAdvanceDialogBox
        data={secondAdvanceModelData}
        open={advanceOpen1}
        setOpen={setAdvanceOpen1}
      />
      <HomePageAdvanceDialogBox
        data={thirdAdvanceModelData}
        open={advanceOpen2}
        setOpen={setAdvanceOpen2}
      />
      <CashAtBankModel
        data={cashAtBankModelData}
        open={cashBankOpen}
        setOpen={setCashBankOpen}
      />
      <CashAtBankModel
        data={cashInHandModelData}
        open={cashInHandOpen}
        setOpen={setCashInHandOpen}
      />
      <ExpenseModel
        data={expenseModelData}
        open={expenseOpen}
        setOpen={setExpenseOpen}
      />
      <PurchaseModel
        data={purchaseModelData}
        open={purchaseOpen}
        setOpen={setPurchaseOpen}
      />
      <PaymentModel
        data={paymentModelData}
        open={paymentOpen}
        setOpen={setPaymentOpen}
      />
      <SalaryPayableModel
        data={salaryPayableModelData}
        open={salaryPayableOpen}
        setOpen={setSalaryPayableOpen}
      />
      <SalaryPayableModel
        data={drawingModelData}
        open={drawingeOpen}
        setOpen={setDrawingOpen}
      />
      
    </div>
  );
};

export default Home;
