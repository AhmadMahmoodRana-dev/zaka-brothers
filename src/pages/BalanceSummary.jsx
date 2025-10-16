import React, { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../context/Context";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  FaBuilding, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaExchangeAlt, 
  FaArrowUp, 
  FaArrowDown,
  FaBalanceScale,
  FaSync,
  FaDatabase,
  FaCalendarAlt,
  FaFilter,
  FaHome,
  FaCodeBranch
} from "react-icons/fa";

const BalanceSummary = () => {
  const { theme } = useContext(Context);
  const [activeBalanceData, setActiveBalanceData] = useState([]);
  const [inactiveBalanceData, setInactiveBalanceData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dropdownLoading, setDropdownLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [branch, setBranch] = useState([]);
  
  // Get logged-in company and branch from localStorage
  const selectedCompany = localStorage.getItem("selectedCompany");
  const selectedBranch = localStorage.getItem("selectedBranch");

  // Filters state
  const [filters, setFilters] = useState({
    company: selectedCompany || "1",
    branch: selectedBranch || "",
    edate: new Date().toISOString().split('T')[0]
  });

  // Format date for API (DD-MMM-YY)
  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Get current date
  const getCurrentDate = () => {
    return new Date();
  };

  // Get first day of current month
  const getFirstDayOfCurrentMonth = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  // Fetch Company and Branch List for Dropdown
  const fetchDropdownData = useCallback(async () => {
    setDropdownLoading(true);
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
            BRANCH_CODE: branchItem.id?.toString() || branchItem.BRANCH_ID?.toString() || branchItem.BRANCH_CODE?.toString(),
            BRANCH_NAME: branchItem.name || branchItem.BRANCH_NAME,
            COMPANY_ID: branchItem.company_id?.toString() || branchItem.COMPANY_ID?.toString()
          }));
        } else if (branchesData.branch_list) {
          // Handle nested structure
          transformedBranches = branchesData.branch_list.map(branchItem => ({
            BRANCH_CODE: branchItem.BRANCH_ID?.toString() || branchItem.BRANCH_CODE?.toString(),
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
              BRANCH_CODE: branchItem.BRANCH_ID?.toString() || branchItem.BRANCH_CODE?.toString(),
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
          } else {
            console.error("Invalid company list format:", data);
          }
        } catch (apiError) {
          console.error("Error fetching dropdown data from API:", apiError);
        }
      }
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    } finally {
      setDropdownLoading(false);
    }
  }, [selectedCompany, selectedBranch]);

  // Fetch balance data
  const fetchBalanceData = async () => {
    setDataLoading(true);
    try {
      // Format date for API (DD-MMM-YY)
      const formattedDate = formatDateForAPI(filters.edate);
      
      console.log("Fetching balance data with filters:", {
        company: filters.company,
        branch: filters.branch,
        edate: formattedDate
      });

      // Active balance API call
      const activeResponse = await axios.get(`https://zbl.erprz.com/zbl/active_balance`, {
        params: {
          COMPANY: filters.company,
          branch: filters.branch,
          edate: formattedDate
        }
      });
      
      // Inactive balance API call
      const inactiveResponse = await axios.get(`https://zbl.erprz.com/zbl/inactive_balance`, {
        params: {
          COMPANY: filters.company,
          branch: filters.branch,
          edate: formattedDate
        }
      });
      
      console.log("Active Balance Response:", activeResponse.data);
      console.log("Inactive Balance Response:", inactiveResponse.data);
      
      // Process the data
      const processedActiveData = processBalanceData(activeResponse.data);
      const processedInactiveData = processBalanceData(inactiveResponse.data);
      
      setActiveBalanceData(processedActiveData);
      setInactiveBalanceData(processedInactiveData);
      
    } catch (error) {
      console.error('Error fetching balance data:', error);
      // Fallback to mock data
      setActiveBalanceData(getMockActiveData());
      setInactiveBalanceData(getMockInactiveData());
    } finally {
      setDataLoading(false);
    }
  };

  // Process API response data to ensure consistent structure
  const processBalanceData = (data) => {
    if (!data) return [];
    
    // If data is an array, return it directly
    if (Array.isArray(data)) {
      return data.map(item => ({
        BRANCH_NAME: item.BRANCH_NAME || item.branch_name || 'Unknown Branch',
        L_MONTH_BALANCE: parseFloat(item.L_MONTH_BALANCE || item.last_month_balance || 0),
        C_MONTH_BALANCE: parseFloat(item.C_MONTH_BALANCE || item.current_month_balance || 0)
      }));
    }
    
    // If data is an object, convert to array
    if (typeof data === 'object') {
      return Object.keys(data).map(key => ({
        BRANCH_NAME: key,
        L_MONTH_BALANCE: parseFloat(data[key].L_MONTH_BALANCE || data[key].last_month_balance || 0),
        C_MONTH_BALANCE: parseFloat(data[key].C_MONTH_BALANCE || data[key].current_month_balance || 0)
      }));
    }
    
    return [];
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Filter branches based on selected company
  const filteredBranches = branch.filter(
    (br) => br.COMPANY_ID === filters.company
  );

  console.log("Available Branches:", branch);
  console.log("Filtered Branches:", filteredBranches);
  console.log("Selected Company:", filters.company);
  console.log("Selected Branch:", filters.branch);

  // Fetch all data
  const fetchAllData = useCallback(() => {
    if (filters.company && !dropdownLoading) {
      fetchBalanceData();
    }
  }, [filters.company, filters.branch, filters.edate, dropdownLoading]);

  // Initialize dropdown data
  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  // Refresh data when filters change
  useEffect(() => {
    if (filters.company && !dropdownLoading) {
      fetchAllData();
    }
  }, [fetchAllData]);

  // Calculate totals
  const activeTotal = activeBalanceData.reduce((sum, item) => sum + (item.C_MONTH_BALANCE || 0), 0);
  const inactiveTotal = inactiveBalanceData.reduce((sum, item) => sum + (item.C_MONTH_BALANCE || 0), 0);
  const overallTotal = activeTotal + inactiveTotal;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Calculate percentage change
  const calculatePercentageChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Balance Summary
            </h1>
            <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Overview of active and inactive account balances
            </p>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Filter Section - All in One Row */}
      <div className="mb-8">
        <div className={`
          w-full p-6 lg:p-8 rounded-2xl shadow-xl border-2 backdrop-blur-sm transition-all duration-300
          ${theme === "dark" 
            ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
            : "bg-white/95 border-blue-100"
          }
        `}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Company Select */}
            <div className="flex-1 space-y-3">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-blue-300" : "text-blue-700"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <FaHome className="text-blue-500" />
                  Company
                </div>
              </label>
              <select
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
                disabled={dropdownLoading}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  shadow-sm
                  ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/50 hover:border-gray-500" 
                    : "bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500/30 hover:border-gray-400"
                  }
                  ${dropdownLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {dropdownLoading ? (
                  <option value="">Loading companies...</option>
                ) : (
                  companies.map(company => (
                    <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
                      {company.COMPANY_NAME}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Branch Select */}
            <div className="flex-1 space-y-3">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-purple-300" : "text-purple-700"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <FaCodeBranch className="text-purple-500" />
                  Branch
                </div>
              </label>
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                disabled={dropdownLoading}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  shadow-sm
                  ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500/50 hover:border-gray-500" 
                    : "bg-white border-gray-300 text-gray-800 focus:border-purple-500 focus:ring-purple-500/30 hover:border-gray-400"
                  }
                  ${dropdownLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {dropdownLoading ? (
                  <option value="">Loading branches...</option>
                ) : (
                  <>
                    <option value="">All Branches</option>
                    {filteredBranches.map(branch => (
                      <option key={branch.BRANCH_CODE} value={branch.BRANCH_CODE}>
                        {branch.BRANCH_NAME}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            {/* As of Date */}
            <div className="flex-1 space-y-3">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-green-300" : "text-green-700"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt className="text-green-500" />
                  As of Date
                </div>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters.edate}
                  onChange={(e) => handleFilterChange('edate', e.target.value)}
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
            </div>

            {/* Refresh Button */}
            <div className="flex-1 space-y-3">
              <label className={`block text-sm font-semibold transition-colors ${
                theme === "dark" ? "text-orange-300" : "text-orange-700"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <FaSync className="text-orange-500" />
                  Actions
                </div>
              </label>
              <button
                onClick={fetchBalanceData}
                disabled={dataLoading || dropdownLoading}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-opacity-50
                  shadow-sm flex items-center justify-center gap-3 font-semibold
                  ${(dataLoading || dropdownLoading)
                    ? 'bg-gray-400 border-gray-400 text-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:scale-105'
                  }
                `}
              >
                <FaSync className={`text-lg ${dataLoading ? 'animate-spin' : ''}`} />
                {dataLoading ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
          </div>

          {/* Selected Filters Display
          <div className={`mt-6 p-4 rounded-xl border ${
            theme === "dark" ? "bg-gray-700/50 border-gray-600" : "bg-blue-50 border-blue-200"
            }`}>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FaFilter className={theme === "dark" ? "text-blue-400" : "text-blue-600"} />
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Active Filters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-2 rounded-lg font-medium ${
                  theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                }`}>
                  Company: {companies.find(c => c.COMPANY_ID === filters.company)?.COMPANY_NAME || 'Loading...'}
                </span>
                <span className={`px-3 py-2 rounded-lg font-medium ${
                  theme === "dark" ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"
                }`}>
                  Branch: {filters.branch ? 
                    (filteredBranches.find(b => b.BRANCH_CODE === filters.branch)?.BRANCH_NAME || filters.branch) 
                    : "All Branches"}
                </span>
                <span className={`px-3 py-2 rounded-lg font-medium ${
                  theme === "dark" ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-700"
                }`}>
                  Date: {new Date(filters.edate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Data Loading State */}
      {dataLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mb-8 p-8 rounded-2xl text-center ${
            theme === "dark" ? "bg-gray-800/50" : "bg-white"
          }`}
        >
          <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto ${
            theme === "dark" ? "border-blue-500 border-t-transparent" : "border-blue-600 border-t-transparent"
          }`}></div>
          <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Loading balance data...
          </p>
        </motion.div>
      )}

      {/* Data Content - Only show when not loading */}
      {!dataLoading && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-2xl shadow-lg border ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-blue-300" : "text-blue-600"}`}>
                    Total Balance
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {formatCurrency(overallTotal)}
                  </p>
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                    {companies.find(c => c.COMPANY_ID === filters.company)?.COMPANY_NAME}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === "dark" ? "bg-blue-800/50" : "bg-blue-200"
                }`}>
                  <FaBalanceScale className={`text-2xl ${theme === "dark" ? "text-blue-300" : "text-blue-600"}`} />
                </div>
              </div>
            </motion.div>

            {/* Active Balance Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-2xl shadow-lg border ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700" 
                  : "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
                    Active Balance
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {formatCurrency(activeTotal)}
                  </p>
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                    {((activeTotal / overallTotal) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === "dark" ? "bg-green-800/50" : "bg-green-200"
                }`}>
                  <FaChartLine className={`text-2xl ${theme === "dark" ? "text-green-300" : "text-green-600"}`} />
                </div>
              </div>
            </motion.div>

            {/* Inactive Balance Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-2xl shadow-lg border ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700" 
                  : "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${theme === "dark" ? "text-orange-300" : "text-orange-600"}`}>
                    Inactive Balance
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {formatCurrency(inactiveTotal)}
                  </p>
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}>
                    {((inactiveTotal / overallTotal) * 100).toFixed(1)}% of total
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${
                  theme === "dark" ? "bg-orange-800/50" : "bg-orange-200"
                }`}>
                  <FaDatabase className={`text-2xl ${theme === "dark" ? "text-orange-300" : "text-orange-600"}`} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Data Tables */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Active Balance Table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-2xl shadow-lg border overflow-hidden ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
                  : "bg-white border-gray-200"
              }`}
            >
              <div className={`p-6 border-b ${
                theme === "dark" ? "border-gray-600 bg-gray-800/50" : "border-gray-200 bg-gray-50"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
                    }`}>
                      <FaChartLine className="text-lg" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Active Balance Summary
                      </h2>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Current month active account balances
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                  }`}>
                    {activeBalanceData.length} Records
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`sticky top-0 ${
                    theme === "dark" 
                      ? "bg-gray-700 text-gray-300" 
                      : "bg-gray-50 text-gray-700"
                  }`}>
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-sm">Branch</th>
                      <th className="px-4 py-3 text-right font-semibold text-sm">Last Month</th>
                      <th className="px-4 py-3 text-right font-semibold text-sm">Current Month</th>
                      <th className="px-4 py-3 text-right font-semibold text-sm">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {activeBalanceData.map((item, index) => {
                      const change = calculatePercentageChange(item.C_MONTH_BALANCE, item.L_MONTH_BALANCE);
                      const isPositive = change >= 0;
                      
                      return (
                        <motion.tr
                          key={`active-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group transition-colors ${
                            theme === "dark" 
                              ? "hover:bg-gray-700/50" 
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
                              }`}>
                                <FaBuilding className={`text-sm ${
                                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                                }`} />
                              </div>
                              <span className={`font-medium ${
                                theme === "dark" ? "text-white" : "text-gray-900"
                              }`}>
                                {item.BRANCH_NAME}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-mono ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {formatCurrency(item.L_MONTH_BALANCE)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-mono font-semibold ${
                              theme === "dark" ? "text-green-400" : "text-green-600"
                            }`}>
                              {formatCurrency(item.C_MONTH_BALANCE)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className={`flex items-center justify-end gap-1 ${
                              isPositive 
                                ? theme === "dark" ? "text-green-400" : "text-green-600"
                                : theme === "dark" ? "text-red-400" : "text-red-600"
                            }`}>
                              {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                              <span className="font-mono text-sm font-semibold">
                                {Math.abs(change).toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Inactive Balance Table */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={`rounded-2xl shadow-lg border overflow-hidden ${
                theme === "dark" 
                  ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600" 
                  : "bg-white border-gray-200"
              }`}
            >
              <div className={`p-6 border-b ${
                theme === "dark" ? "border-gray-600 bg-gray-800/50" : "border-gray-200 bg-gray-50"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      theme === "dark" ? "bg-orange-900/30 text-orange-400" : "bg-orange-100 text-orange-600"
                    }`}>
                      <FaDatabase className="text-lg" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Inactive Balance Summary
                      </h2>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        Current month inactive account balances
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === "dark" ? "bg-orange-900/30 text-orange-400" : "bg-orange-100 text-orange-700"
                  }`}>
                    {inactiveBalanceData.length} Records
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`sticky top-0 ${
                    theme === "dark" 
                      ? "bg-gray-700 text-gray-300" 
                      : "bg-gray-50 text-gray-700"
                  }`}>
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-sm">Branch</th>
                      <th className="px-4 py-3 text-right font-semibold text-sm">Last Month</th>
                      <th className="px-4 py-3 text-right font-semibold text-sm">Current Month</th>
                      <th className="px-4 py-3 text-right font-semibold text-sm">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {inactiveBalanceData.map((item, index) => {
                      const change = calculatePercentageChange(item.C_MONTH_BALANCE, item.L_MONTH_BALANCE);
                      const isPositive = change >= 0;
                      
                      return (
                        <motion.tr
                          key={`inactive-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`group transition-colors ${
                            theme === "dark" 
                              ? "hover:bg-gray-700/50" 
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
                              }`}>
                                <FaBuilding className={`text-sm ${
                                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                                }`} />
                              </div>
                              <span className={`font-medium ${
                                theme === "dark" ? "text-white" : "text-gray-900"
                              }`}>
                                {item.BRANCH_NAME}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-mono ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {formatCurrency(item.L_MONTH_BALANCE)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`font-mono font-semibold ${
                              theme === "dark" ? "text-orange-400" : "text-orange-600"
                            }`}>
                              {formatCurrency(item.C_MONTH_BALANCE)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className={`flex items-center justify-end gap-1 ${
                              isPositive 
                                ? theme === "dark" ? "text-green-400" : "text-green-600"
                                : theme === "dark" ? "text-red-400" : "text-red-600"
                            }`}>
                              {isPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                              <span className="font-mono text-sm font-semibold">
                                {Math.abs(change).toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Empty State */}
          {activeBalanceData.length === 0 && inactiveBalanceData.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-8 p-8 rounded-2xl text-center ${
                theme === "dark" ? "bg-gray-800/50" : "bg-white"
              }`}
            >
              <FaDatabase className={`mx-auto text-4xl ${
                theme === "dark" ? "text-gray-600" : "text-gray-400"
              }`} />
              <h3 className={`mt-4 text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                No balance data available
              </h3>
              <p className={`mt-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                No balance records found for the selected filters
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

// Mock data functions
const getMockActiveData = () => [
  { BRANCH_NAME: "Head Office ZBL", L_MONTH_BALANCE: 6207500, C_MONTH_BALANCE: 6500000 },
  { BRANCH_NAME: "Ariyan Pind", L_MONTH_BALANCE: 3126127, C_MONTH_BALANCE: 3200000 },
  { BRANCH_NAME: "SSC", L_MONTH_BALANCE: 2817600, C_MONTH_BALANCE: 2900000 },
  { BRANCH_NAME: "Bilal Center", L_MONTH_BALANCE: 2340824, C_MONTH_BALANCE: 2400000 },
  { BRANCH_NAME: "Nashter Colony", L_MONTH_BALANCE: 2028501, C_MONTH_BALANCE: 2100000 },
];

const getMockInactiveData = () => [
  { BRANCH_NAME: "Head Office ZBL", L_MONTH_BALANCE: 1207500, C_MONTH_BALANCE: 1250000 },
  { BRANCH_NAME: "Ariyan Pind", L_MONTH_BALANCE: 826127, C_MONTH_BALANCE: 800000 },
  { BRANCH_NAME: "SSC", L_MONTH_BALANCE: 717600, C_MONTH_BALANCE: 700000 },
  { BRANCH_NAME: "Bilal Center", L_MONTH_BALANCE: 640824, C_MONTH_BALANCE: 650000 },
  { BRANCH_NAME: "Nashter Colony", L_MONTH_BALANCE: 528501, C_MONTH_BALANCE: 550000 },
];

export default BalanceSummary;