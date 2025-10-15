import React, { useContext, useState, useEffect } from "react";
//import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import { 
  FaBuilding, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaExchangeAlt, 
  FaArrowUp, 
  FaArrowDown,
  FaBalanceScale,
  FaSync,
  FaDatabase
} from "react-icons/fa";

const BalanceSummary = () => {
  //const { theme } = useContext(Context);
  const [activeBalanceData, setActiveBalanceData] = useState([]);
  const [inactiveBalanceData, setInactiveBalanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        const activeResponse = await fetch('/zbl/active_balance?COMPANY=1&branch=03&edate=16-Oct-25');
        const inactiveResponse = await fetch('/zbl/inactive_balance?COMPANY=1&branch=03&edate=16-Oct-25');
        
        const activeData = await activeResponse.json();
        const inactiveData = await inactiveResponse.json();
        
        setActiveBalanceData(activeData);
        setInactiveBalanceData(inactiveData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data
        setActiveBalanceData(mockActiveData);
        setInactiveBalanceData(mockInactiveData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Filter data based on selected branch
  const filteredActiveData = selectedBranch === "all" 
    ? activeBalanceData 
    : activeBalanceData.filter(item => item.BRANCH_NAME === selectedBranch);

  const filteredInactiveData = selectedBranch === "all" 
    ? inactiveBalanceData 
    : inactiveBalanceData.filter(item => item.BRANCH_NAME === selectedBranch);

  // Get unique branches for filter
  const allBranches = [...new Set([
    ...activeBalanceData.map(item => item.BRANCH_NAME),
    ...inactiveBalanceData.map(item => item.BRANCH_NAME)
  ])];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 rounded-full animate-spin mx-auto ${
            theme === "dark" ? "border-blue-500 border-t-transparent" : "border-blue-600 border-t-transparent"
          }`}></div>
          <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Loading balance data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
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
                Overview of active and inactive account balances across branches
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === "dark" 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-300 text-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="all">All Branches</option>
                {allBranches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
              
              <button
                onClick={() => window.location.reload()}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  theme === "dark" 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <FaSync className="text-sm" />
                Refresh Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
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
              </div>
              <div className={`p-3 rounded-xl ${
                theme === "dark" ? "bg-blue-800/50" : "bg-blue-200"
              }`}>
                <FaBalanceScale className={`text-2xl ${theme === "dark" ? "text-blue-300" : "text-blue-600"}`} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Active Balance Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
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
                  {filteredActiveData.length} Branches
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
                  {filteredActiveData.map((item, index) => {
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

          {/* Inactive Balance Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
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
                  {filteredInactiveData.length} Branches
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
                  {filteredInactiveData.map((item, index) => {
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

        {/* Empty States */}
        {(filteredActiveData.length === 0 || filteredInactiveData.length === 0) && (
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
              {selectedBranch !== "all" 
                ? `No balance records found for the selected branch`
                : `No balance records available for the current period`
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Mock data for demonstration
const mockActiveData = [
  { BRANCH_NAME: "Head Office ZBL", L_MONTH_BALANCE: 6207500, C_MONTH_BALANCE: 6207500 },
  { BRANCH_NAME: "Ariyan Pind", L_MONTH_BALANCE: 3126127, C_MONTH_BALANCE: 3126127 },
  { BRANCH_NAME: "SSC", L_MONTH_BALANCE: 2817600, C_MONTH_BALANCE: 2817600 },
  { BRANCH_NAME: "Bilal Center", L_MONTH_BALANCE: 2340824, C_MONTH_BALANCE: 2340824 },
  { BRANCH_NAME: "Nashter Colony", L_MONTH_BALANCE: 2028501, C_MONTH_BALANCE: 2028501 },
];

const mockInactiveData = [
  { BRANCH_NAME: "Head Office ZBL", L_MONTH_BALANCE: 6207500, C_MONTH_BALANCE: 6207500 },
  { BRANCH_NAME: "Ariyan Pind", L_MONCH_BALANCE: 3126127, C_MONTH_BALANCE: 3126127 },
  { BRANCH_NAME: "SSC", L_MONTH_BALANCE: 2817600, C_MONTH_BALANCE: 2817600 },
  { BRANCH_NAME: "Bilal Center", L_MONTH_BALANCE: 2340824, C_MONTH_BALANCE: 2340824 },
  { BRANCH_NAME: "Nashter Colony", L_MONTH_BALANCE: 2028501, C_MONTH_BALANCE: 2028501 },
];

export default BalanceSummary;