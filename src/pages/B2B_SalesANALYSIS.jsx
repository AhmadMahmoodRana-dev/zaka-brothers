

// import React, { useEffect, useState } from 'react';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
// } from 'recharts';
// import axios from 'axios';

// // Format numbers like 1.2M, 3K
// const formatNumber = (num) => {
//   if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//   if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
//   return num;
// };

// // Get last 12 months in "MMM-YY" format
// const getLast12Months = () => {
//   const months = [];
//   const now = new Date();

//   for (let i = 0; i < 12; i++) {
//     const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     const label = d.toLocaleString('default', { month: 'short' }) + '-' + d.getFullYear().toString().slice(2);
//     months.push(label);
//   }

//   return months;
// };

// const SalesChart = () => {
//   const [data, setData] = useState([]);
//   const [company, setCompany] = useState('1');
//   const [month, setMonth] = useState(getLast12Months()[0]);

//   const companyOptions = [
//     { label: 'ZAKA BROTHERS (PVT) LTD.', value: '1' },
//     { label: 'Faisalabad Trading Company', value: '11' },
//   ];

//   const monthOptions = getLast12Months();

//   const fetchData = () => {
//     const url = `https://zbl.erprz.com/zbl/cashvscredit?company=${company}&branch=&month=${month}`;
//     axios.get(url)
//       .then(res => {
//         const transformedData = res.data.map(item => ({
//           name: item.SHORT_BRANCH_NAME,
//           credit: item.CREDIT_SALE,
//           cash: item.CASH_SALE
//         }));
//         setData(transformedData);
//       })
//       .catch(err => {
//         console.error('Error fetching sales data:', err);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [company, month]);

//   const totalCredit = data.reduce((acc, d) => acc + d.credit, 0);
//   const totalCash = data.reduce((acc, d) => acc + d.cash, 0);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-center mb-4">
//         B2B Sales Performance <span className="text-blue-600">{month}</span>
//       </h2>

//       <div className="flex justify-center gap-4 mb-4">
//         <select
//           value={company}
//           onChange={e => setCompany(e.target.value)}
//           className="border rounded px-3 py-1"
//         >
//           {companyOptions.map(opt => (
//             <option key={opt.value} value={opt.value}>{opt.label}</option>
//           ))}
//         </select>

//         <select
//           value={month}
//           onChange={e => setMonth(e.target.value)}
//           className="border rounded px-3 py-1"
//         >
//           {monthOptions.map(m => (
//             <option key={m} value={m}>{m}</option>
//           ))}
//         </select>
//       </div>

//       <div className="flex justify-around my-4">
//         <div className="bg-gray-100 p-4 rounded shadow text-center">
//           <div className="text-sm">Total Credit Sale</div>
//           <div className="text-green-800 text-2xl font-bold">{formatNumber(totalCredit)}</div>
//         </div>
//         <div className="bg-gray-100 p-4 rounded shadow text-center">
//           <div className="text-sm">Total Cash Sale</div>
//           <div className="text-yellow-600 text-2xl font-bold">{formatNumber(totalCash)}</div>
//         </div>
//       </div>

//       <h3 className="text-center font-semibold mb-4">Credit vs Cash Sale</h3>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis tickFormatter={formatNumber} />
//           <Tooltip formatter={(value) => formatNumber(value)} />
//           <Legend />
//           <Bar dataKey="credit" fill="#264d00" name="Credit Sale">
//             <LabelList dataKey="credit" content={({ x, y, value }) => (
//               value > 0 ? (
//                 <text x={x + 20} y={y - 5} fontSize={12} fill="#000" textAnchor="middle">
//                   {formatNumber(value)}
//                 </text>
//               ) : null
//             )} />
//           </Bar>
//           <Bar dataKey="cash" fill="#f1c40f" name="Cash Sale">
//             <LabelList dataKey="cash" content={({ x, y, value }) => (
//               value > 0 ? (
//                 <text x={x + 20} y={y - 5} fontSize={12} fill="#000" textAnchor="middle">
//                   {formatNumber(value)}
//                 </text>
//               ) : null
//             )} />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesChart;

import React, { useEffect, useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

// Format numbers like 1.2M, 3K
const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num;
};

// Get last 12 months in "MMM-YY" format
const getLast12Months = () => {
  const months = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('default', { month: 'short' }) + '-' + d.getFullYear().toString().slice(2);
    months.unshift(label); // Add to beginning to show most recent first
  }

  return months;
};

const SalesChart = () => {
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dropdownLoader, setDropdownLoader] = useState(true);

  // Get logged-in company and branch from localStorage
  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");

  const [filters, setFilters] = useState({
    company: selectedCompany || "1",
    branch: selectedBranch || "",
    month: getLast12Months()[getLast12Months().length - 1] // Default to most recent month
  });

  const monthOptions = getLast12Months();

  // Calculate summary statistics
  const [summaryData, setSummaryData] = useState({
    totalCredit: 0,
    totalCash: 0,
    creditPercentage: 0,
    cashPercentage: 0
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

  const fetchData = useCallback(() => {
    setLoader(true);
    const url = `https://zbl.erprz.com/zbl/cashvscredit?company=${filters.company}&branch=${filters.branch}&month=${filters.month}`;
    
    axios.get(url)
      .then(res => {
        const transformedData = res.data.map(item => ({
          name: item.SHORT_BRANCH_NAME,
          credit: Number(item.CREDIT_SALE) || 0,
          cash: Number(item.CASH_SALE) || 0
        }));
        setData(transformedData);
        
        // Calculate summary data
        const totalCredit = transformedData.reduce((acc, d) => acc + d.credit, 0);
        const totalCash = transformedData.reduce((acc, d) => acc + d.cash, 0);
        const totalSales = totalCredit + totalCash;
        
        setSummaryData({
          totalCredit,
          totalCash,
          creditPercentage: totalSales > 0 ? Math.round((totalCredit / totalSales) * 100) : 0,
          cashPercentage: totalSales > 0 ? Math.round((totalCash / totalSales) * 100) : 0
        });
      })
      .catch(err => {
        console.error('Error fetching sales data:', err);
        setData([]);
        setSummaryData({
          totalCredit: 0,
          totalCash: 0,
          creditPercentage: 0,
          cashPercentage: 0
        });
      })
      .finally(() => {
        setLoader(false);
      });
  }, [filters.company, filters.branch, filters.month]);

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

  const handleMonthChange = (e) => {
    setFilters(prev => ({
      ...prev,
      month: e.target.value
    }));
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 backdrop-blur-sm">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}: <span className="font-semibold">{formatNumber(entry.value)}</span>
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
    if (!value || value === 0) return null;
    
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        fill="#374151"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        className="drop-shadow-sm"
      >
        {formatter ? formatter(value) : formatNumber(value)}
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
            B2B Sales Performance
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <span>Period:</span>
            <span className="font-semibold text-blue-600">{filters.month}</span>
            {filters.branch && (
              <>
                <span>•</span>
                <span>Branch: {selectedBranchName}</span>
              </>
            )}
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Month Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period
            </label>
            <select
              value={filters.month}
              onChange={handleMonthChange}
              className="w-32 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer text-sm"
            >
              {monthOptions.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Company Dropdown */}
          {dropdownLoader ? (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <div className="w-64 p-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-gray-500 text-sm">Loading companies...</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <select
                value={filters.company}
                onChange={handleCompanyChange}
                className="w-64 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer text-sm"
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
              <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          {/* Branch Dropdown */}
          {dropdownLoader ? (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <div className="w-48 p-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-gray-500 text-sm">Loading branches...</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch
              </label>
              <select
                value={filters.branch}
                onChange={handleBranchChange}
                className="w-48 p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer text-sm"
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
              <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold mb-1">Total Credit Sales</p>
              <p className="text-2xl font-bold text-green-800">{formatNumber(summaryData.totalCredit)}</p>
              <p className="text-green-700 text-xs mt-1">{summaryData.creditPercentage}% of total</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-3 w-full bg-green-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${summaryData.creditPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-semibold mb-1">Total Cash Sales</p>
              <p className="text-2xl font-bold text-amber-800">{formatNumber(summaryData.totalCash)}</p>
              <p className="text-amber-700 text-xs mt-1">{summaryData.cashPercentage}% of total</p>
            </div>
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 w-full bg-amber-200 rounded-full h-2">
            <div 
              className="bg-amber-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${summaryData.cashPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-blue-800">
                {formatNumber(summaryData.totalCredit + summaryData.totalCash)}
              </p>
              <p className="text-blue-700 text-xs mt-1">Combined revenue</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 bg-blue-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${summaryData.creditPercentage}%` }}
              ></div>
            </div>
            <div className="flex-1 bg-blue-200 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full" 
                style={{ width: `${summaryData.cashPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-semibold mb-1">Branches Active</p>
              <p className="text-2xl font-bold text-purple-800">{data.length}</p>
              <p className="text-purple-700 text-xs mt-1">Reporting sales</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-purple-700 text-xs">
            {data.filter(d => d.credit > 0 || d.cash > 0).length} with sales data
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="text-center font-bold text-gray-800 text-lg mb-6">
          Credit vs Cash Sales by Branch
        </h3>

        {loader ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading sales data...</p>
              <p className="text-gray-400 text-sm">Fetching latest performance metrics</p>
            </div>
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              barGap={8}
              barCategoryGap="20%"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#f0f0f0" 
                vertical={false}
              />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tickFormatter={formatNumber}
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
                dataKey="credit" 
                name="Credit Sales" 
                fill="#059669"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              >
                <LabelList 
                  dataKey="credit" 
                  content={<CustomLabel formatter={formatNumber} />} 
                />
              </Bar>
              <Bar 
                dataKey="cash" 
                name="Cash Sales" 
                fill="#d97706"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              >
                <LabelList 
                  dataKey="cash" 
                  content={<CustomLabel formatter={formatNumber} />} 
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
              <p className="text-lg font-semibold mb-2">No sales data available</p>
              <p className="text-sm max-w-md mx-auto">
                We couldn't find any sales data for the selected company, branch, and period combination. 
                Try selecting different filters to see the sales performance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;