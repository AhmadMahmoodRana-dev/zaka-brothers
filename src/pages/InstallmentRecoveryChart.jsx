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

import React, { useEffect, useState, useCallback } from "react";
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
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dropdownLoader, setDropdownLoader] = useState(true);
  const [summaryData, setSummaryData] = useState({
    avgTarget: 0,
    avgAchieved: 0,
    totalRecovery: 0
  });

  // Get logged-in company and branch from localStorage
  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");

  const [filters, setFilters] = useState({
    company: selectedCompany || "1",
    branch: selectedBranch || "",
  });

  // Calculate summary statistics
  const calculateSummary = useCallback((chartData) => {
    if (!chartData || chartData.length === 0) {
      return { avgTarget: 0, avgAchieved: 0, totalRecovery: 0 };
    }

    const totalTarget = chartData.reduce((sum, item) => sum + (item.target || 0), 0);
    const totalActual = chartData.reduce((sum, item) => sum + (item.actual || 0), 0);
    const avgTargetPercent = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;
    const avgAchievedPercent = Math.min(avgTargetPercent, 100); // Cap at 100%
    const totalRecovery = totalActual;

    return {
      avgTarget: Math.round(avgTargetPercent),
      avgAchieved: Math.round(avgAchievedPercent),
      totalRecovery: totalRecovery
    };
  }, []);

  // Fetch Company and Branch List for Dropdown
  const fetchDropdownData = useCallback(async () => {
    try {
      setDropdownLoader(true);
      const storedCompanies = localStorage.getItem('company_list');
      const storedBranches = localStorage.getItem('branch_list');
      
      if (storedCompanies && storedBranches) {
        const companiesData = JSON.parse(storedCompanies);
        const branchesData = JSON.parse(storedBranches);
        
        let transformedCompanies = [];
        let transformedBranches = [];
        
        if (Array.isArray(companiesData)) {
          transformedCompanies = companiesData.map(company => ({
            COMPANY_ID: company.id?.toString() || company.COMPANY_ID?.toString(),
            COMPANY_NAME: company.name || company.COMPANY_NAME
          }));
        } else if (companiesData.company_list) {
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
          transformedBranches = branchesData.branch_list.map(branchItem => ({
            BRANCH_ID: branchItem.BRANCH_ID?.toString(),
            BRANCH_NAME: branchItem.BRANCH_NAME,
            COMPANY_ID: branchItem.COMPANY_ID?.toString()
          }));
        }
        
        setCompanies(transformedCompanies);
        setBranch(transformedBranches);
        
        if (transformedCompanies.length > 0) {
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
            setFilters(prev => ({
              ...prev,
              company: transformedCompanies[0].COMPANY_ID || "1"
            }));
          }
        }
      } else {
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
            
            localStorage.setItem('company_list', JSON.stringify(apiCompanies));
            localStorage.setItem('branch_list', JSON.stringify(apiBranches));
            
            if (apiCompanies.length > 0) {
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

  const fetchData = useCallback((company, branch) => {
    setLoader(true);
    axios
      .get(`https://zbl.erprz.com/zbl/SalePerformance?company=${company}&branch=${branch}`)
      .then((res) => {
        const formatted = res.data.map((item) => ({
          month: item.MONTH_LABEL,
          target: Number(item.TARGET_AMOUNT),
          actual: Number(item.SALE_LESS_ADVANCE),
        }));
        setData(formatted);
        setSummaryData(calculateSummary(formatted));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([]);
        setSummaryData({ avgTarget: 0, avgAchieved: 0, totalRecovery: 0 });
      })
      .finally(() => {
        setLoader(false);
      });
  }, [calculateSummary]);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  useEffect(() => {
    if (filters.company) {
      fetchData(filters.company, filters.branch);
    }
  }, [filters, fetchData]);

  // Filter branches based on selected company
  const filteredBranches = branch.filter(
    (br) => br.COMPANY_ID === filters.company
  );

  const formatToKMB = (num) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num;
  };

  const handleCompanyChange = (e) => {
    setFilters({
      company: e.target.value,
      branch: ""
    });
  };

  const handleBranchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      branch: e.target.value
    }));
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{formatToKMB(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom label component for bars
  const CustomLabel = (props) => {
    const { x, y, width, value, formatter } = props;
    if (!value) return null;
    
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        fill="#374151"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
      >
        {formatter ? formatter(value) : formatToKMB(value)}
      </text>
    );
  };

  // Get selected branch name for display
  const selectedBranchName = filteredBranches.find(b => b.BRANCH_ID === filters.branch)?.BRANCH_NAME || 'All Branches';

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Installment Sale Performance
          </h1>
          <p className="text-gray-600">
            {filters.branch ? `Branch: ${selectedBranchName}` : "All Branches Overview"}
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {dropdownLoader ? (
            <>
              <div className="w-64 p-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-gray-500 text-sm">Loading companies...</span>
              </div>
              <div className="w-48 p-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-gray-500 text-sm">Loading branches...</span>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <select
                  value={filters.company}
                  onChange={handleCompanyChange}
                  className="w-64 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-3 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Branch
                </label>
                <select
                  value={filters.branch}
                  onChange={handleBranchChange}
                  className="w-48 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
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
                <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-3 text-gray-700">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold mb-1">Average Target %</p>
              <p className="text-3xl font-bold text-green-800">{summaryData.avgTarget}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 w-full bg-green-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(summaryData.avgTarget, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold mb-1">Average Achieved %</p>
              <p className="text-3xl font-bold text-blue-800">{summaryData.avgAchieved}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-4 w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(summaryData.avgAchieved, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl border border-cyan-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-600 text-sm font-semibold mb-1">Total Recovery Amount</p>
              <p className="text-3xl font-bold text-cyan-800">{formatToKMB(summaryData.totalRecovery)}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <p className="text-cyan-700 text-xs mt-2">Cumulative installment recovery</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <p className="text-center text-blue-600 text-lg font-semibold mb-6">
          {data.length > 0
            ? `Performance Overview (${data[0].month} to ${data[data.length - 1].month})`
            : "Performance Overview"}
        </p>

        {loader ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading chart data...</p>
              <p className="text-gray-400 text-sm">Please wait while we fetch the latest performance data</p>
            </div>
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              barGap={8}
              barCategoryGap="20%"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#f0f0f0" 
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tickFormatter={formatToKMB}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                height={36}
                iconSize={12}
                iconType="circle"
                wrapperStyle={{
                  paddingBottom: '20px',
                  fontSize: '14px'
                }}
              />
              <Bar 
                dataKey="target" 
                name="Target Amount" 
                fill="#059669"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              >
                <LabelList 
                  dataKey="target" 
                  content={<CustomLabel formatter={formatToKMB} />} 
                />
              </Bar>
              <Bar 
                dataKey="actual" 
                name="Installment Amount" 
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              >
                <LabelList 
                  dataKey="actual" 
                  content={<CustomLabel formatter={formatToKMB} />} 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-center text-gray-500">
              <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-semibold mb-2">No data available</p>
              <p className="text-sm max-w-md mx-auto">
                We couldn't find any performance data for the selected company and branch combination. 
                Try selecting different filters to see the chart data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallmentSaleChart;