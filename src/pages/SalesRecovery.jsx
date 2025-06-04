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


import React, { useEffect, useState } from 'react';
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
  const [company, setCompany] = useState('1');
  const [branch, setBranch] = useState(' ');
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');

  const companies = [
    
    { label: 'ZAKA BROTHERS (PVT) LTD.', value: '1' },
    { label: 'Faisalabad Trading Company', value: '11' },
    // Add more if needed
  ];

const branches = [
  { label: 'ALL', value: '' },
  { label: 'FSD Ghulam Abad', value: '21' },
  { label: 'FSD Jaranwala Road', value: '20' },
  { label: 'Manga Mandi', value: '04' },
  { label: 'Miltary Accounts/GT', value: '02' },
  { label: 'Ravi Rayan', value: '18' },
  { label: 'Rising Star', value: '31' },
  { label: 'SHAHKAM', value: '36' },
  { label: 'Sharaq Pur', value: '07' },
  { label: 'SSC', value: '37' },
  { label: 'Sunder Sharif', value: '03' },
];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://zbl.zaffarsons.com/zbl/RecoveryPerformance?company=${company}&branch=${branch}`
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
      }
    };

    fetchData();
  }, [company, branch]);

  //const currentCompany = companies.find((c) => c.value === company)?.label || '';
  const currentBranch = branches.find((b) => b.value === branch)?.label || '';

  return (
    <div className="p-4 space-y-4">
      {/* Dropdown Controls */}
      
 <div className="flex justify-start space-x-4 mb-2">
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {companies.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {branches.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
         <h2 className="text-xl font-bold text-center">
       
     
        {currentBranch} Recovery Performance{' '}
        <span className="text-blue-600">
          {startMonth && endMonth ? `${startMonth} to ${endMonth}` : ''}
        </span>
      </h2>
      </div>

      {/* Chart Title with Dynamic Period */}
     

      {/* Target vs Achieved % Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip />
          <Legend />
          <Bar dataKey="target" fill="#003b2f" name="Target" isAnimationActive animationDuration={1000}>
            <LabelList dataKey="target" position="top" formatter={(val) => `${val}%`} />
          </Bar>
          <Bar dataKey="achieved" fill="#28d7e0" name="Achieved" isAnimationActive animationDuration={1000}>
            <LabelList dataKey="achieved" position="top" formatter={(val) => `${val}%`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Recovery Chart */}
      <h3 className="text-lg font-semibold text-center mt-2 mb-2">Recovery</h3>

      <ResponsiveContainer width="100%" height={275}>
        <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="recovery" fill="#28d7e0" name="Recovery" isAnimationActive animationDuration={1000}>
            <LabelList dataKey="recovery" position="top" formatter={formatCurrency} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecoveryPerformanceChart;
