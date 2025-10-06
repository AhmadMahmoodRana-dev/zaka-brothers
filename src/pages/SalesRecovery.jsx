// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import {
//   formatDateForAPI,
//   getCurrentDate,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";
// import SaleBarchart from "../charts/SaleBarchart";
// import SalesRecoveryChart from "../charts/SalesRecoveryChart";

// const SalesRecovery = () => {
//   const { theme } = useContext(Context);
//   const [companies, setCompanies] = useState([]);
//   const [branch, setBranch] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [chartData, setChartData] = useState([]);

//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//     branch: "",
//   });


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

//  // Fetch CHART data
//   const getChartData = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/SalePerformance`,
//         {
//           params: {
//             // sdate: filters.sdate,
//             // edate: filters.edate,
//             company: filters.rec_company,
//             branch: "",
//             // crr: "",
//           },
//         }
//       );
//       setChartData(data);
//       setLoader(false);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };


//     // Format the data for Sales chart (Target vs Installment Sales)
//   const salesData = chartData.map((item) => ({
//     name: item.MONTH_LABEL,
//     Target: +(item.TARGET_AMOUNT / 1_000_000).toFixed(1),   // 13.3 (number)
//     Achieved: +(item.INSTALLMENT_AMOUNT / 1_000_000).toFixed(1)
//   ,
//   }))

//   const formatChartData1 = chartData.map((item) => ({
//   MONTH_LABEL: item.MONTH_LABEL,
//     SALE_LESS_ADVANCE_MILLION: parseFloat(item.SALE_LESS_ADVANCE_MILLION.replace("M", ""))
// }));





//   useEffect(() => {
//     fetchDropdownData();
//     getChartData()
//   }, []);

//   useEffect(() => {
//     getChartData()
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

//         <SaleBarchart  salesData={salesData} />
//         <SalesRecoveryChart chartData={formatChartData1}/>
//     </div>
//   );
// };

// export default SalesRecovery;



// import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LabelList,
// } from 'recharts';
// import axios from 'axios';

// // Enhanced currency formatter: M / K / raw
// const formatCurrency = (value) => {
//   if (value >= 1_000_000) {
//     return `${(value / 1_000_000).toFixed(1)}M`;
//   } else if (value >= 1_000) {
//     return `${(value / 1_000).toFixed(1)}K`;
//   } else {
//     return `${value}`;
//   }
// };

// const RecoveryPerformanceChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           'https://zbl.zaffarsons.com/zbl/RecoveryPerformance?company=1&branch=31'
//         );
//         console.log('API response:', res.data);
//         const formatted = res.data.map((item) => ({
//           month: item.MONTH_LABEL,
//           target: parseFloat(item.TARGET_IN_PERCENTAGE) || 0,
//           achieved: parseFloat(item.ACHIEVED_PERCENTAGE) || 0,
//           recovery: parseFloat(item.RECOVERY_AMOUNT) || 0,
//         }));
//         setData(formatted);
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-2">
//       <h2 className="text-xl font-bold text-center mb-1">
//         Military Account (ZMA) Recovery Performance{' '}
//         <span className="text-blue-600">Feb-24 to Feb-25</span>
//       </h2>

//       {/* Target vs Achieved % */}
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart
//           data={data}
//           margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis domain={[0, 100]} unit="%" />
//           <Tooltip />
//           <Legend />
//           <Bar
//             dataKey="target"
//             fill="#003b2f"
//             name="Target"
//             isAnimationActive={true}
//             animationDuration={1000}
//           >
//             <LabelList
//               dataKey="target"
//               position="top"
//               formatter={(val) => `${val}%`}
//             //  dy={-10}
//             />
//           </Bar>
//           <Bar
//             dataKey="achieved"
//             fill="#28d7e0"
//             name="Achieved"
//             isAnimationActive={true}
//             animationDuration={1000}
//           >
//             <LabelList
//               dataKey="achieved"
//               position="top"
//               formatter={(val) => `${val}%`}
//              // dy={-10}
//             />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>

//       <h3 className="text-lg font-semibold text-center mt-2 mb-2">Recovery</h3>

//       {/* Recovery Value Chart */}
//       <ResponsiveContainer width="100%" height={275}>
//         <BarChart
//           data={data}
//           margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis tickFormatter={formatCurrency} />
//           <Tooltip formatter={(value) => formatCurrency(value)} />
//           <Bar
//             dataKey="recovery"
//             fill="#28d7e0"
//             name="Recovery"
//             isAnimationActive={true}
//             animationDuration={1000}
//           >
//             <LabelList
//               dataKey="recovery"
//               position="top"
//               formatter={formatCurrency}
//              // dy={-10}
//             />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RecoveryPerformanceChart;

// import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LabelList,
// } from 'recharts';
// import axios from 'axios';

// // Format values to M/K
// const formatCurrency = (value) => {
//   if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
//   if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
//   return `${value}`;
// };

// const RecoveryPerformanceChart = () => {
//   const [data, setData] = useState([]);
//   const [company, setCompany] = useState('1');
//   const [branch, setBranch] = useState('31');

//   const companies = [
//     { label: 'Company 1', value: '1' },
//     { label: 'Company 2', value: '2' },
//     // Add more if needed
//   ];

//   const branches = [
//     { label: 'Branch 31', value: '31' },
//     { label: 'Branch 32', value: '32' },
//     // Add more if needed
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`https://zbl.zaffarsons.com/zbl/RecoveryPerformance?company=${company}&branch=${branch}`);
//         const formatted = res.data.map(item => ({
//           month: item.MONTH_LABEL,
//           target: parseFloat(item.TARGET_IN_PERCENTAGE) || 0,
//           achieved: parseFloat(item.ACHIEVED_PERCENTAGE) || 0,
//           recovery: parseFloat(item.RECOVERY_AMOUNT) || 0,
//         }));
//         setData(formatted);
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, [company, branch]);

//   return (
//     <div className="p-4 space-y-4">
//       {/* Dropdown Controls */}
//       <div className="flex justify-start space-x-4 mb-2">
//         <div>
//           {/* <label className="block text-sm font-medium mb-1">Company</label> */}
//           <select
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             className="border px-2 py-1 rounded w-75"
//           >
//             {companies.map((c) => (
//               <option key={c.value} value={c.value}>{c.label}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           {/* <label className="block text-sm font-medium mb-1">Branch</label> */}
//           <select
//             value={branch}
//             onChange={(e) => setBranch(e.target.value)}
//             className="border px-2 py-1 rounded w-50"
//           >
//             {branches.map((b) => (
//               <option key={b.value} value={b.value}>{b.label}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Chart Title */}
//       <h2 className="text-xl font-bold text-center">
//         Military Account (ZMA) Recovery Performance <span className="text-blue-600">Feb-24 to Feb-25</span>
//       </h2>

//       {/* Target vs Achieved % Chart */}
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis domain={[0, 100]} unit="%" />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="target" fill="#003b2f" name="Target" isAnimationActive animationDuration={1000}>
//             <LabelList dataKey="target" position="top" formatter={(val) => `${val}%`} />
//           </Bar>
//           <Bar dataKey="achieved" fill="#28d7e0" name="Achieved" isAnimationActive animationDuration={1000}>
//             <LabelList dataKey="achieved" position="top" formatter={(val) => `${val}%`} />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>

//       {/* Recovery Chart */}
//       <h3 className="text-lg font-semibold text-center mt-2 mb-2">Recovery</h3>

//       <ResponsiveContainer width="100%" height={275}>
//         <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis tickFormatter={formatCurrency} />
//           <Tooltip formatter={(value) => formatCurrency(value)} />
//           <Bar dataKey="recovery" fill="#28d7e0" name="Recovery" isAnimationActive animationDuration={1000}>
//             <LabelList dataKey="recovery" position="top" formatter={formatCurrency} />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RecoveryPerformanceChart;


// import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LabelList,
// } from 'recharts';
// import axios from 'axios';

// // Format values to M/K
// const formatCurrency = (value) => {
//   if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
//   if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
//   return `${value}`;
// };

// const RecoveryPerformanceChart = () => {
//   const [data, setData] = useState([]);
//   const [company, setCompany] = useState('1');
//   const [branch, setBranch] = useState(' ');
//   const [startMonth, setStartMonth] = useState('');
//   const [endMonth, setEndMonth] = useState('');

//   const companies = [
    
//     { label: 'ZAKA BROTHERS (PVT) LTD.', value: '1' },
//     { label: 'Faisalabad Trading Company', value: '11' },
//     // Add more if needed
//   ];

// const branches = [
//   { label: 'ALL', value: '' },
//   { label: 'FSD Ghulam Abad', value: '21' },
//   { label: 'FSD Jaranwala Road', value: '20' },
//   { label: 'Manga Mandi', value: '04' },
//   { label: 'Miltary Accounts/GT', value: '02' },
//   { label: 'Ravi Rayan', value: '18' },
//   { label: 'Rising Star', value: '31' },
//   { label: 'SHAHKAM', value: '36' },
//   { label: 'Sharaq Pur', value: '07' },
//   { label: 'SSC', value: '37' },
//   { label: 'Sunder Sharif', value: '03' },
// ];


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `https://zbl.erprz.com/zbl/RecoveryPerformance?company=${company}&branch=${branch}`
//         );

//         const formatted = res.data.map((item) => ({
//           month: item.MONTH_LABEL,
//           target: parseFloat(item.TARGET_IN_PERCENTAGE) || 0,
//           achieved: parseFloat(item.ACHIEVED_PERCENTAGE) || 0,
//           recovery: parseFloat(item.RECOVERY_AMOUNT) || 0,
//         }));

//         setData(formatted);

//         if (formatted.length > 0) {
//           setStartMonth(formatted[0].month);
//           setEndMonth(formatted[formatted.length - 1].month);
//         }
//       } catch (err) {
//         console.error('Failed to fetch data:', err);
//       }
//     };

//     fetchData();
//   }, [company, branch]);

//   //const currentCompany = companies.find((c) => c.value === company)?.label || '';
//   const currentBranch = branches.find((b) => b.value === branch)?.label || '';

//   return (
//     <div className="p-4 space-y-4">
//       {/* Dropdown Controls */}
      
//  <div className="flex justify-start space-x-4 mb-2">
//         <select
//           value={company}
//           onChange={(e) => setCompany(e.target.value)}
//           className="border px-2 py-1 rounded"
//         >
//           {companies.map((c) => (
//             <option key={c.value} value={c.value}>
//               {c.label}
//             </option>
//           ))}
//         </select>

//         <select
//           value={branch}
//           onChange={(e) => setBranch(e.target.value)}
//           className="border px-2 py-1 rounded"
//         >
//           {branches.map((b) => (
//             <option key={b.value} value={b.value}>
//               {b.label}
//             </option>
//           ))}
//         </select>
//          <h2 className="text-xl font-bold text-center">
       
     
//         {currentBranch} Recovery Performance{' '}
//         <span className="text-blue-600">
//           {startMonth && endMonth ? `${startMonth} to ${endMonth}` : ''}
//         </span>
//       </h2>
//       </div>

//       {/* Chart Title with Dynamic Period */}
     

//       {/* Target vs Achieved % Chart */}
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis domain={[0, 100]} unit="%" />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="target" fill="#003b2f" name="Target" isAnimationActive animationDuration={1000}>
//             <LabelList dataKey="target" position="top" formatter={(val) => `${val}%`} />
//           </Bar>
//           <Bar dataKey="achieved" fill="#28d7e0" name="Achieved" isAnimationActive animationDuration={1000}>
//             <LabelList dataKey="achieved" position="top" formatter={(val) => `${val}%`} />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>

//       {/* Recovery Chart */}
//       <h3 className="text-lg font-semibold text-center mt-2 mb-2">Recovery</h3>

//       <ResponsiveContainer width="100%" height={275}>
//         <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis tickFormatter={formatCurrency} />
//           <Tooltip formatter={(value) => formatCurrency(value)} />
//           <Bar dataKey="recovery" fill="#28d7e0" name="Recovery" isAnimationActive animationDuration={1000}>
//             <LabelList dataKey="recovery" position="top" formatter={formatCurrency} />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RecoveryPerformanceChart;

import React, { useEffect, useState, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import axios from 'axios';

// Format values to M/K
const formatCurrency = (value) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
};

const RecoveryPerformanceChart = () => {
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dropdownLoader, setDropdownLoader] = useState(true);
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  // Get logged-in company and branch from localStorage
  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");

  const [filters, setFilters] = useState({
    company: selectedCompany || "1",
    branch: selectedBranch || "",
  });

  // Fetch Company and Branch List for Dropdown
  const fetchDropdownData = useCallback(async () => {
    try {
      setDropdownLoader(true);
      const storedCompanies = localStorage.getItem('company_list');
      const storedBranches = localStorage.getItem('branch_list');
      
      if (storedCompanies && storedBranches) {
        const companiesData = JSON.parse(storedCompanies);
        const branchesData = JSON.parse(storedBranches);
        
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
              company: selectedCompany,
              branch: selectedBranch || ""
            }));
          } else {
            // Fallback to first company if logged-in company not found
            setFilters(prev => ({
              ...prev,
              company: transformedCompanies[0].COMPANY_ID || "1"
            }));
          }
        }
      } else {
        // Fallback to API if localStorage is empty
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
                  company: selectedCompany,
                  branch: selectedBranch || ""
                }));
              } else {
                // Fallback to first company if logged-in company not found
                setFilters(prev => ({
                  ...prev,
                  company: apiCompanies[0].COMPANY_ID 
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
    } finally {
      setDropdownLoader(false);
    }
  }, [selectedCompany, selectedBranch]);

  const fetchData = useCallback(async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `https://zbl.erprz.com/zbl/RecoveryPerformance?company=${filters.company}&branch=${filters.branch}`
      );

      const formatted = res.data.map((item) => ({
        month: item.MONTH_LABEL,
        target: parseFloat(item.TARGET_IN_PERCENTAGE) || 0,
        achieved: parseFloat(item.ACHIEVED_PERCENTAGE) || 0,
        recovery: parseFloat(item.RECOVERY_AMOUNT) || 0,
      }));

      setData(formatted);

      if (formatted.length > 0) {
        setStartMonth(formatted[0].month);
        setEndMonth(formatted[formatted.length - 1].month);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setData([]);
    } finally {
      setLoader(false);
    }
  }, [filters.company, filters.branch]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  useEffect(() => {
    if (filters.company) {
      fetchData();
    }
  }, [fetchData, filters.company]);

  // Filter branches based on selected company
  const filteredBranches = branch.filter(
    (br) => br.COMPANY_ID === filters.company
  );

  const handleCompanyChange = (e) => {
    setFilters(prev => ({
      ...prev,
      company: e.target.value,
      branch: ""
    }));
  };

  const handleBranchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      branch: e.target.value
    }));
  };

  // Get selected branch name for display
  const currentBranch = filteredBranches.find(b => b.BRANCH_ID === filters.branch)?.BRANCH_NAME || 'All Branches';

  // Calculate totals for summary cards
  const totalTarget = data.reduce((sum, item) => sum + item.target, 0) / data.length || 0;
  const totalAchieved = data.reduce((sum, item) => sum + item.achieved, 0) / data.length || 0;
  const totalRecovery = data.reduce((sum, item) => sum + item.recovery, 0);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              Recovery Performance
            </h1>
            <p className="text-gray-600 mt-1">
              {currentBranch} • {startMonth && endMonth ? `${startMonth} to ${endMonth}` : 'Select period'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
            {/* Company Dropdown */}
            {dropdownLoader ? (
              <div className="border-2 border-gray-200 px-4 py-2 rounded-xl bg-gray-50 flex items-center justify-center w-full sm:w-64">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-gray-500 text-sm">Loading companies...</span>
              </div>
            ) : (
              <div className="relative w-full sm:w-64">
                <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                <select
                  value={filters.company}
                  onChange={handleCompanyChange}
                  className="w-full border-2 border-gray-200 px-4 py-2 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer"
                >
                  {companies.length > 0 ? (
                    companies.map((company) => (
                      <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                        {company.COMPANY_NAME}
                      </option>
                    ))
                  ) : (
                    <option value="1">ZAKA BROTHERS (PVT) LTD.</option>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Branch Dropdown */}
            {dropdownLoader ? (
              <div className="border-2 border-gray-200 px-4 py-2 rounded-xl bg-gray-50 flex items-center justify-center w-full sm:w-48">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-gray-500 text-sm">Loading branches...</span>
              </div>
            ) : (
              <div className="relative w-full sm:w-48">
                <label className="block text-xs font-medium text-gray-700 mb-1">Branch</label>
                <select
                  value={filters.branch}
                  onChange={handleBranchChange}
                  className="w-full border-2 border-gray-200 px-4 py-2 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none cursor-pointer"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Avg. Target</p>
                <p className="text-2xl font-bold text-green-900 mt-1">{totalTarget.toFixed(1)}%</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Avg. Achieved</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{totalAchieved.toFixed(1)}%</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-xl border border-cyan-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-800">Total Recovery</p>
                <p className="text-2xl font-bold text-cyan-900 mt-1">{formatCurrency(totalRecovery)}</p>
              </div>
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {loader ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading recovery performance data...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
        </div>
      ) : data.length > 0 ? (
        <div className="space-y-8">
          {/* Target vs Achieved Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Target vs Achieved (%)</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#003b2f] rounded-full mr-2"></div>
                  <span className="text-gray-600">Target</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#28d7e0] rounded-full mr-2"></div>
                  <span className="text-gray-600">Achieved</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  unit="%" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar 
                  dataKey="target" 
                  fill="#003b2f" 
                  name="Target" 
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList 
                    dataKey="target" 
                    position="top" 
                    formatter={(val) => `${val}%`}
                    style={{ fill: '#374151', fontSize: '12px', fontWeight: '600' }}
                  />
                </Bar>
                <Bar 
                  dataKey="achieved" 
                  fill="#28d7e0" 
                  name="Achieved" 
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList 
                    dataKey="achieved" 
                    position="top" 
                    formatter={(val) => `${val}%`}
                    style={{ fill: '#374151', fontSize: '12px', fontWeight: '600' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recovery Amount Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recovery Amount</h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#28d7e0] rounded-full mr-2"></div>
                <span className="text-gray-600 text-sm">Recovery Amount</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tickFormatter={formatCurrency} 
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Recovery']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="recovery" 
                  fill="#28d7e0" 
                  name="Recovery" 
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList 
                    dataKey="recovery" 
                    position="top" 
                    formatter={formatCurrency}
                    style={{ fill: '#374151', fontSize: '12px', fontWeight: '600' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
          <p className="text-gray-500 text-center max-w-md">
            No recovery performance data found for the selected company and branch combination.
            Try selecting different filters to see the data.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecoveryPerformanceChart;