// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Context } from "../context/Context";
// import {
//   getCurrentDate,
//   formatDateForAPI,
//   formatDateForInput,
//   getFirstDayOfCurrentMonth,
// } from "../utils/TableUtils";
// import Barchart from "../charts/Barchart";
// import RecoveryCharts from "../charts/RecoveryCharts";
// const InstallmentRecoveryChart = () => {
//   const { theme } = useContext(Context);
//   const [companies, setCompanies] = useState([]);
//   const [loader, setLoader] = useState(true);
//   const [chartData, setChartData] = useState([]);


//   // Unified filter state
//   const [filters, setFilters] = useState({
//     sdate: formatDateForAPI(getFirstDayOfCurrentMonth()),
//     edate: formatDateForAPI(getCurrentDate()),
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//   });

//   // Fetch CHART data
//   const getChartData = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://zbl.zaffarsons.com/zbl/RecoveryPerformance`,
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

//   // Fetch Company List for Dropdown
//   const fetchDropdownData = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://zbl.zaffarsons.com/zbl/pre-define"
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

//  const formatChartData = chartData.map((item) => ({
//   name: item.MONTH_LABEL,
//   Target: +(item.TARGET_AMOUNT / 1_000_000).toFixed(1),   // 13.3 (number)
//   Achieved: +(item.RECOVERY_AMOUNT / 1_000_000).toFixed(1), // 10.4 (number)
// }));

//   // In Collection.js (parent component)
//   const formatChartData1 = chartData.map((item) => ({
//     MONTH_LABEL: item.MONTH_LABEL,
//     RECOVERY_IN_MILLION: parseFloat(item.RECOVERY_IN_MILLION.replace("M", "")),
//   }));

//   useEffect(() => {
//     fetchDropdownData();
//     getChartData();
//   }, []);

//   useEffect(() => {
//     getChartData();
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

//       {/* Collection Table */}
//       <Barchart collectionData={formatChartData} />
//       <RecoveryCharts chartData={formatChartData1} />
//     </div>
//   );
// };

// export default InstallmentRecoveryChart;




// import React, { useState } from "react";
// import { AgCharts } from "ag-charts-react";

// // Sample Data Function
// function getData() {
//   return [
//     {
//       quarter: "Q1'18",
//       iphone: 140,
//       mac: 16,
//       ipad: 14,
//       wearables: 12,
//       services: 20,
//     },
//     {
//       quarter: "Q2'18",
//       iphone: 124,
//       mac: 20,
//       ipad: 14,
//       wearables: 12,
//       services: 30,
//     },
//     {
//       quarter: "Q3'18",
//       iphone: 112,
//       mac: 20,
//       ipad: 18,
//       wearables: 14,
//       services: 36,
//     },
//     {
//       quarter: "Q4'18",
//       iphone: 118,
//       mac: 24,
//       ipad: 14,
//       wearables: 14,
//       services: 36,
//     },
//   ];
// }

// const ChartExample = () => {
//   const [options, setOptions] = useState({
//     title: {
//       text: "Apple's Revenue by Product Category",
//     },
//     subtitle: {
//       text: "In Billion U.S. Dollars",
//     },
//     data: getData(),
//     series: [
//       {
//         type: "bar",
//         xKey: "quarter",
//         yKey: "iphone",
//         yName: "iPhone",
//         grouped: true,
//         label: {
//           enabled: true,
//           placement: "outside",
//           formatter: ({ value }) => value.toString(),
//         },
//       },
//       {
//         type: "bar",
//         xKey: "quarter",
//         yKey: "mac",
//         yName: "Mac",
//         grouped: true,
//         label: {
//           enabled: true,
//           placement: "outside",
//           formatter: ({ value }) => value.toString(),
//         },
//       },
//       {
//         type: "bar",
//         xKey: "quarter",
//         yKey: "ipad",
//         yName: "iPad",
//         grouped: true,
//         label: {
//           enabled: true,
//           placement: "outside",
//           formatter: ({ value }) => value.toString(),
//         },
//       },
//       {
//         type: "bar",
//         xKey: "quarter",
//         yKey: "wearables",
//         yName: "Wearables",
//         grouped: true,
//         label: {
//           enabled: true,
//           placement: "outside",
//           formatter: ({ value }) => value.toString(),
//         },
//       },
//       {
//         type: "bar",
//         xKey: "quarter",
//         yKey: "services",
//         yName: "Services",
//         grouped: true,
//         label: {
//           enabled: true,
//           placement: "outside",
//           formatter: ({ value }) => value.toString(),
//         },
//       },
//     ],
//     axes: [
//       {
//         type: "category",
//         position: "bottom",
//       },
//       {
//         type: "number",
//         position: "left",
//       },
//     ],
//     legend: {
//       position: "bottom",
//     },
//   });

//   return <AgCharts options={options} />;
// };

// export default ChartExample;

// import React, { useEffect, useState } from "react";
// import { AgCharts } from "ag-charts-react";
// import "./CreditVsCashChart.css";

// const CreditVsCashChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     fetch("http://zbl.zaffarsons.com/zbl/cashvscredit?company=1&branch=&month=May-25")
//       .then((res) => res.json())
//       .then((data) => {
//         const transformed = data.map((item) => ({
//           branch: item.SHORT_BRANCH_NAME,
//           credit: item.CREDIT_SALE,
//           cash: item.CASH_SALE,
//         }));
//         setChartData(transformed);
//       })
//       .catch((error) => {
//         console.error("Error fetching chart data:", error);
//       });
//   }, []);

//   const formatValue = (value) => {
//     if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
//     if (value >= 1_000) return `${Math.round(value / 1000)}K`;
//     return value.toString();
//   };

//   const options = {
//     title: {
//       text: "B2B Sales Performance - May 2025",
//       fontSize: 18,
//     },
//     subtitle: {
//       text: "Credit vs Cash Sale",
//     },
//     data: chartData,
//     series: [
//       {
//         type: "bar",
//         xKey: "branch",
//         yKey: "credit",
//         yName: "Credit Sale",
//         grouped: true,
//         fill: "#2e7d32",
//         label: {
//           enabled: true,
//           placement: "outside",
//           formatter: ({ value }) => formatValue(value),
//         },
//       },
//       {
//         type: "bar",
//         xKey: "branch",
//         yKey: "cash",
//         yName: "Cash Sale",
//         grouped: true,
//         fill: "#fbc02d",
//         label: {
//           enabled: true,
//           placement: "outside",
//           formatter: ({ value }) => formatValue(value),
//         },
//       },
//     ],
//     axes: [
//       {
//         type: "category",
//         position: "bottom",
//         title: {
//           text: "Branches",
//         },
//       },
//       {
//         type: "number",
//         position: "left",
//         title: {
//           text: "Sale Amount",
//         },
//         min: 0,
//         max: 20000000, // 20 million
//         tick: {
//           interval: 1000000, // 1M steps
//         },
//         label: {
//           formatter: ({ value }) => `${value / 1_000_000}M`,
//         },
//       },
//     ],
//     legend: {
//       position: "top",
//     },
//   };

//   return (
//     <div className="chart-container">
//       <AgCharts options={options} />
//     </div>
//   );
// };

// export default CreditVsCashChart;

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const InstallmentSaleChart = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState("1");
  const [branch, setBranch] = useState(" ");


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


  const fetchData = (company, branch) => {
    axios
      .get(`https://zbl.zaffarsons.com/zbl/SalePerformance?company=${company}&branch=${branch}`)
      .then((res) => {
        const formatted = res.data.map((item) => ({
          month: item.MONTH_LABEL,
          target: Number(item.TARGET_AMOUNT),
          actual: Number(item.SALE_LESS_ADVANCE),
        }));
        setData(formatted);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData(company, branch);
  }, [company, branch]);

  const formatToKMB = (num) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
  };

  return (
    <div className="w-full h-[600px] bg-gray-50 p-4 rounded-xl shadow">
      {/* Title and dropdowns in one row */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        

        <div className="flex gap-4">
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-2 border rounded w-65"
          >
            <option value="1">ZAKA BROTHERS (PVT) LTD.</option>
            <option value="11">Faisalabad Trading Company</option>
            {/* Add more companies as needed */}
          </select>

         <select
  value={branch}
  onChange={(e) => setBranch(e.target.value)}
  className="p-2 border rounded w-50"
>
  {branches.map((b) => (
    <option key={b.value} value={b.value}>
      {b.label}
    </option>
  ))}
</select>

        </div>
        <h2 className="text-2xl font-bold text-center w-full md:w-auto mb-4 md:mb-0 mr-75">
  Installment Sale Performance{branch && ` - ${branches.find(b => b.value === branch)?.label || ''}`}
</h2>
        {/* <h2 className="text-2xl font-bold text-center w-full md:w-auto mb-4 md:mb-0 mr-130">
          Installment Sale Performance
        </h2> */}
      </div>

      {/* <p className="text-center text-blue-500 text-lg mb-4">Performance Overview</p> */}
<p className="text-center text-blue-500 text-lg mb-4">
  {data.length > 0
    ? `Performance Overview (${data[0].month} to ${data[data.length - 1].month})`
    : "Performance Overview"}
</p>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
          barGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatToKMB} />
          <Tooltip formatter={(value) => formatToKMB(value)} />
          <Legend />
          <Bar dataKey="target" name="Target Amount" fill="#013220">
            <LabelList dataKey="target" position="top" formatter={formatToKMB} />
          </Bar>
          <Bar dataKey="actual" name="Installment Amount" fill="#ffc107">
            <LabelList dataKey="actual" position="top" formatter={formatToKMB} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InstallmentSaleChart;
