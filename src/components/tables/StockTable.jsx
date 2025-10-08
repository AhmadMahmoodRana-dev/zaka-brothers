// import React, { useContext} from "react";
// import { Context } from "../../context/Context";
// import {motion} from "framer-motion"
// const StockTable = ({collectionTableData}) => {
//   const { theme } = useContext(Context);

  
//   return (
//     <div
//       className={`p-4 w-[91%] ${
//         theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"
//       } border-gray-100 rounded-lg`}
//     >
//       <h1
//         className={`text-2xl font-semibold mb-2 ${
//           theme === "dark" ? "text-white" : ""
//         }`}
//       >
//         Stock
//       </h1>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh]">
//         <table className="w-full text-sm text-left">
//           <thead
//             className={`${
//               theme === "dark"
//                 ? "text-white bg-[#203c63]"
//                 : "text-gray-500 bg-[#e1e1e3]"
//             } sticky top-0`}
//           >
//             <motion.tr
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className={`${
//                 theme == "dark"
//                   ? "border-b border-gray-500 text-[#D1D5DB] bg-[#203c63]"
//                   : "border-b border-gray-200 bg-[#f4f6f8] text-[#7e868c]"
//               }`}
//             >
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Product Name
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Brand
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Quantity
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Rate
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Ammount
//               </th>
//             </motion.tr>
//           </thead>
//           <tbody>
//             {collectionTableData?.map((data) => (
//               <motion.tr
//                 key={data?.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className={`${
//                   theme == "dark"
//                     ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]"
//                     : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"
//                 }`}
//               >
//                 <th
//                   scope="row"
//                   className="px-2 py-4 font-medium  whitespace-nowrap"
//                 >
//                   {data?.PRODUCT_NAME}
//                 </th>
//                 <td className="px-2 py-4">{data?.BRAND_NAME ?? 0}</td>
//                 <td className="px-2 py-4">{data?.QTY ?? 0}</td>
//                 <td className="px-2 py-4">{data?.RATE ?? 0}</td>
//                 <td className="px-2 py-4">{data?.AMOUNT ?? 0}</td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StockTable;

// import React, { useContext} from "react";
// import { Context } from "../../context/Context";
// import {motion} from "framer-motion"

// const StockTable = ({collectionTableData}) => {
//   const { theme } = useContext(Context);

//   return (
//     <div
//       className={`p-4 w-[91%] ${
//         theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"
//       } border-gray-100 rounded-lg`}
//     >
//       <h1
//         className={`text-2xl font-semibold mb-2 ${
//           theme === "dark" ? "text-white" : ""
//         }`}
//       >
//         Stock Summary
//       </h1>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh]">
//         <table className="w-full text-sm text-left">
//           <thead
//             className={`${
//               theme === "dark"
//                 ? "text-white bg-[#203c63]"
//                 : "text-gray-500 bg-[#e1e1e3]"
//             } sticky top-0`}
//           >
//             <motion.tr
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className={`${
//                 theme == "dark"
//                   ? "border-b border-gray-500 text-[#D1D5DB] bg-[#203c63]"
//                   : "border-b border-gray-200 bg-[#f4f6f8] text-[#7e868c]"
//               }`}
//             >
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Product Name
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Brand
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Opening Qty
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 In Qty
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Out Qty
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Closing Qty
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Closing Rate
//               </th>
//               <th scope="col" className="px-1 py-3 font-semibold">
//                 Closing Amount
//               </th>
//             </motion.tr>
//           </thead>
//           <tbody>
//             {collectionTableData?.map((data, index) => (
//               <motion.tr
//                 key={data?.id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
//                 className={`${
//                   theme == "dark"
//                     ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]"
//                     : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"
//                 }`}
//               >
//                 <th
//                   scope="row"
//                   className="px-2 py-4 font-medium whitespace-nowrap"
//                 >
//                   {data?.PRODUCT_NAME || data?.product_name || 'N/A'}
//                 </th>
//                 <td className="px-2 py-4">{data?.BRAND_NAME || data?.brand_name || 'N/A'}</td>
//                 <td className="px-2 py-4 text-right">{data?.OPENING_QTY ?? data?.opening_qty ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.IN_QTY ?? data?.in_qty ?? 0}</td>
//                 <td className="px-2 py-4 text-right">{data?.OUT_QTY ?? data?.out_qty ?? 0}</td>
//                 <td className="px-2 py-4 text-right font-semibold">
//                   {data?.CLOSING_QTY ?? data?.closing_qty ?? data?.QTY ?? data?.qty ?? 0}
//                 </td>
//                 <td className="px-2 py-4 text-right">{data?.CLOSING_RATE ?? data?.closing_rate ?? data?.RATE ?? data?.rate ?? 0}</td>
//                 <td className="px-2 py-4 text-right font-semibold">
//                   {data?.CLOSING_AMOUNT ?? data?.closing_amount ?? data?.AMOUNT ?? data?.amount ?? 0}
//                 </td>
//               </motion.tr>
//             ))}
            
//             {(!collectionTableData || collectionTableData.length === 0) && (
//               <motion.tr
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className={`${
//                   theme == "dark"
//                     ? "border-b border-gray-500 text-[#D1D5DB] bg-[#203c63]"
//                     : "border-b border-gray-200 bg-white"
//                 }`}
//               >
//                 <td colSpan="8" className="px-2 py-4 text-center">
//                   No stock data available
//                 </td>
//               </motion.tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StockTable;
// import React, { useContext } from "react";
// import { Context } from "../../context/Context";
// import { motion } from "framer-motion";

// const StockTable = ({ collectionTableData }) => {
//   const { theme } = useContext(Context);

//   // Calculate totals for summary
//   const totals = collectionTableData?.reduce((acc, data) => ({
//     opening_qty: (acc.opening_qty || 0) + (data?.OPENING_QTY || data?.opening_qty || 0),
//     in_qty: (acc.in_qty || 0) + (data?.IN_QTY || data?.in_qty || 0),
//     out_qty: (acc.out_qty || 0) + (data?.OUT_QTY || data?.out_qty || 0),
//     closing_qty: (acc.closing_qty || 0) + (data?.CLOSING_QTY || data?.closing_qty || data?.QTY || data?.qty || 0),
//     closing_amount: (acc.closing_amount || 0) + (data?.CLOSING_AMOUNT || data?.closing_amount || data?.AMOUNT || data?.amount || 0)
//   }), {});

//   // Calculate brand-wise summary
//   const brandSummary = collectionTableData?.reduce((acc, data) => {
//     const brandName = data?.BRAND_NAME || data?.brand_name || 'Uncategorized';
    
//     if (!acc[brandName]) {
//       acc[brandName] = {
//         brand: brandName,
//         product_count: 0,
//         opening_qty: 0,
//         in_qty: 0,
//         out_qty: 0,
//         closing_qty: 0,
//         closing_amount: 0
//       };
//     }
    
//     acc[brandName].product_count += 1;
//     acc[brandName].opening_qty += (data?.OPENING_QTY || data?.opening_qty || 0);
//     acc[brandName].in_qty += (data?.IN_QTY || data?.in_qty || 0);
//     acc[brandName].out_qty += (data?.OUT_QTY || data?.out_qty || 0);
//     acc[brandName].closing_qty += (data?.CLOSING_QTY || data?.closing_qty || data?.QTY || data?.qty || 0);
//     acc[brandName].closing_amount += (data?.CLOSING_AMOUNT || data?.closing_amount || data?.AMOUNT || data?.amount || 0);
    
//     return acc;
//   }, {});

//   const brandSummaryArray = brandSummary ? Object.values(brandSummary) : [];

//   // Format numbers with commas (remove decimals)
//   const formatNumber = (num) => {
//     return new Intl.NumberFormat('en-US', {
//       maximumFractionDigits: 0
//     }).format(num || 0);
//   };

//   // Format currency (round to whole numbers)
//   const formatCurrency = (num) => {
//     return new Intl.NumberFormat('en-US', {
//       maximumFractionDigits: 0
//     }).format(Math.round(num || 0));
//   };

//   // Summary cards data
//   const summaryCards = [
//     { 
//       label: "Total Products", 
//       value: collectionTableData?.length || 0, 
//       color: "blue",
//       icon: "📦",
//       format: "number"
//     },
//     { 
//       label: "Opening Stock", 
//       value: totals?.opening_qty || 0, 
//       color: "purple",
//       icon: "📊",
//       format: "number"
//     },
//     { 
//       label: "Total In", 
//       value: totals?.in_qty || 0, 
//       color: "green",
//       icon: "⬇️",
//       format: "number"
//     },
//     { 
//       label: "Total Out", 
//       value: totals?.out_qty || 0, 
//       color: "orange",
//       icon: "⬆️",
//       format: "number"
//     },
//     { 
//       label: "Closing Stock", 
//       value: totals?.closing_qty || 0, 
//       color: "teal",
//       icon: "📈",
//       format: "number"
//     },
//     { 
//       label: "Stock Value", 
//       value: totals?.closing_amount || 0, 
//       color: "indigo",
//       icon: "💰",
//       format: "currency"
//     }
//   ];

//   const getColorClasses = (color, isDark) => {
//     const colorMap = {
//       blue: {
//         bg: isDark ? "bg-blue-900/30" : "bg-blue-50",
//         text: isDark ? "text-blue-300" : "text-blue-700",
//         border: isDark ? "border-blue-700" : "border-blue-200",
//         value: isDark ? "text-blue-400" : "text-blue-600"
//       },
//       green: {
//         bg: isDark ? "bg-green-900/30" : "bg-green-50",
//         text: isDark ? "text-green-300" : "text-green-700",
//         border: isDark ? "border-green-700" : "border-green-200",
//         value: isDark ? "text-green-400" : "text-green-600"
//       },
//       orange: {
//         bg: isDark ? "bg-orange-900/30" : "bg-orange-50",
//         text: isDark ? "text-orange-300" : "text-orange-700",
//         border: isDark ? "border-orange-700" : "border-orange-200",
//         value: isDark ? "text-orange-400" : "text-orange-600"
//       },
//       teal: {
//         bg: isDark ? "bg-teal-900/30" : "bg-teal-50",
//         text: isDark ? "text-teal-300" : "text-teal-700",
//         border: isDark ? "border-teal-700" : "border-teal-200",
//         value: isDark ? "text-teal-400" : "text-teal-600"
//       },
//       purple: {
//         bg: isDark ? "bg-purple-900/30" : "bg-purple-50",
//         text: isDark ? "text-purple-300" : "text-purple-700",
//         border: isDark ? "border-purple-700" : "border-purple-200",
//         value: isDark ? "text-purple-400" : "text-purple-600"
//       },
//       indigo: {
//         bg: isDark ? "bg-indigo-900/30" : "bg-indigo-50",
//         text: isDark ? "text-indigo-300" : "text-indigo-700",
//         border: isDark ? "border-indigo-700" : "border-indigo-200",
//         value: isDark ? "text-indigo-400" : "text-indigo-600"
//       },
//       red: {
//         bg: isDark ? "bg-red-900/30" : "bg-red-50",
//         text: isDark ? "text-red-300" : "text-red-700",
//         border: isDark ? "border-red-700" : "border-red-200",
//         value: isDark ? "text-red-400" : "text-red-600"
//       },
//       yellow: {
//         bg: isDark ? "bg-yellow-900/30" : "bg-yellow-50",
//         text: isDark ? "text-yellow-300" : "text-yellow-700",
//         border: isDark ? "border-yellow-700" : "border-yellow-200",
//         value: isDark ? "text-yellow-400" : "text-yellow-600"
//       },
//       pink: {
//         bg: isDark ? "bg-pink-900/30" : "bg-pink-50",
//         text: isDark ? "text-pink-300" : "text-pink-700",
//         border: isDark ? "border-pink-700" : "border-pink-200",
//         value: isDark ? "text-pink-400" : "text-pink-600"
//       }
//     };
//     return colorMap[color] || colorMap.blue;
//   };

//   // Brand color mapping for consistent colors
//   const getBrandColor = (index) => {
//     const colors = ['blue', 'green', 'purple', 'orange', 'teal', 'indigo', 'red', 'yellow', 'pink'];
//     return colors[index % colors.length];
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`p-6 w-full ${
//         theme === "dark" 
//           ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-gray-700" 
//           : "bg-white shadow-xl border-gray-200"
//       } border rounded-2xl backdrop-blur-sm`}
//     >
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//         <div>
//           <h1 className={`text-2xl font-bold ${
//             theme === "dark" ? "text-white" : "text-gray-800"
//           }`}>
//             Stock Summary
//           </h1>
//           <p className={`mt-1 text-sm ${
//             theme === "dark" ? "text-gray-400" : "text-gray-600"
//           }`}>
//             Comprehensive overview of inventory levels and stock movements
//           </p>
//         </div>
        
//         {/* Summary Stats */}
//         {totals && collectionTableData?.length > 0 && (
//           <div className={`flex items-center gap-4 mt-3 sm:mt-0 px-4 py-2 rounded-xl ${
//             theme === "dark" ? "bg-gray-700" : "bg-blue-50"
//           }`}>
//             <div className="text-center">
//               <div className={`text-xs font-medium ${
//                 theme === "dark" ? "text-gray-400" : "text-gray-600"
//               }`}>
//                 Total Value
//               </div>
//               <div className={`text-lg font-bold ${
//                 theme === "dark" ? "text-green-400" : "text-green-600"
//               }`}>
//                 PKR {formatCurrency(totals.closing_amount)}
//               </div>
//             </div>
//             <div className="w-px h-8 bg-gray-400 opacity-40"></div>
//             <div className="text-center">
//               <div className={`text-xs font-medium ${
//                 theme === "dark" ? "text-gray-400" : "text-gray-600"
//               }`}>
//                 Products
//               </div>
//               <div className={`text-lg font-bold ${
//                 theme === "dark" ? "text-blue-400" : "text-blue-600"
//               }`}>
//                 {collectionTableData.length}
//               </div>
//             </div>
//             <div className="w-px h-8 bg-gray-400 opacity-40"></div>
//             <div className="text-center">
//               <div className={`text-xs font-medium ${
//                 theme === "dark" ? "text-gray-400" : "text-gray-600"
//               }`}>
//                 Brands
//               </div>
//               <div className={`text-lg font-bold ${
//                 theme === "dark" ? "text-purple-400" : "text-purple-600"
//               }`}>
//                 {brandSummaryArray.length}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Brand Summary Section */}
//       {brandSummaryArray.length > 0 && (
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4, delay: 0.1 }}
//           className="mb-6"
//         >
//           <h3 className={`text-lg font-semibold mb-4 ${
//             theme === "dark" ? "text-gray-300" : "text-gray-700"
//           }`}>
//             Brand-wise Summary
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {brandSummaryArray.map((brand, index) => {
//               const color = getBrandColor(index);
//               const colors = getColorClasses(color, theme === "dark");
//               return (
//                 <motion.div
//                   key={brand.brand}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                   className={`p-4 rounded-xl border-2 ${colors.bg} ${colors.border} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <h4 className={`font-bold text-sm ${colors.text} truncate`}>
//                       {brand.brand}
//                     </h4>
//                     <span className={`text-xs px-2 py-1 rounded-full ${colors.value} bg-opacity-20`}>
//                       {brand.product_count} {brand.product_count === 1 ? 'item' : 'items'}
//                     </span>
//                   </div>
                  
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center">
//                       <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Stock:</span>
//                       <span className={`text-sm font-mono font-bold ${colors.value}`}>
//                         {formatNumber(brand.closing_qty)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Value:</span>
//                       <span className={`text-sm font-mono font-bold ${colors.value}`}>
//                         PKR {formatCurrency(brand.closing_amount)}
//                       </span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-600/30">
//                       <div className="text-center">
//                         <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>In</div>
//                         <div className={`text-xs font-mono font-semibold ${getColorClasses('green', theme === "dark").value}`}>
//                           {formatNumber(brand.in_qty)}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Out</div>
//                         <div className={`text-xs font-mono font-semibold ${getColorClasses('orange', theme === "dark").value}`}>
//                           {formatNumber(brand.out_qty)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       )}

//       {/* Summary Cards Section */}
//       {totals && collectionTableData?.length > 0 && (
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4, delay: 0.2 }}
//           className="mb-6"
//         >
//           <h3 className={`text-lg font-semibold mb-4 ${
//             theme === "dark" ? "text-gray-300" : "text-gray-700"
//           }`}>
//             Inventory Overview
//           </h3>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//             {summaryCards.map((card, index) => {
//               const colors = getColorClasses(card.color, theme === "dark");
//               return (
//                 <motion.div
//                   key={card.label}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                   className={`p-3 rounded-xl border-2 ${colors.bg} ${colors.border} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm">{card.icon}</span>
//                     <span className={`text-xs font-medium ${colors.text}`}>
//                       {card.label}
//                     </span>
//                   </div>
//                   <div className={`text-sm font-bold font-mono ${colors.value}`}>
//                     {card.format === 'currency' ? `PKR ${formatCurrency(card.value)}` : formatNumber(card.value)}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       )}

//       {/* Table Container */}
//       <div className={`relative overflow-hidden rounded-2xl border-2 ${
//         theme === "dark" 
//           ? "border-gray-700 bg-gray-800/50" 
//           : "border-gray-200 bg-white"
//       } shadow-2xl`}>
//         <div className="overflow-x-auto max-h-[65vh] custom-scrollbar">
//           <table className="w-full text-[13px] font-medium">
//             {/* Table Header */}
//             <thead className={`sticky top-0 ${
//               theme === "dark" 
//                 ? "bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 text-white" 
//                 : "bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-gray-800 border-b-2 border-gray-300"
//             } shadow-2xl backdrop-blur-sm`}>
//               <motion.tr
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="border-b-0"
//               >
//                 <th scope="col" className="px-6 py-5 font-bold text-left uppercase tracking-wider text-xs">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-2 h-2 bg-blue-400 rounded-full`}></div>
//                     <span>Product Name</span>
//                   </div>
//                 </th>
//                 <th scope="col" className="px-4 py-5 font-bold text-left uppercase tracking-wider text-xs">
//                   Brand
//                 </th>
//                 <th scope="col" className="px-4 py-5 font-bold text-right uppercase tracking-wider text-xs">
//                   Opening Qty
//                 </th>
//                 <th scope="col" className="px-4 py-5 font-bold text-right uppercase tracking-wider text-xs">
//                   In Qty
//                 </th>
//                 <th scope="col" className="px-4 py-5 font-bold text-right uppercase tracking-wider text-xs">
//                   Out Qty
//                 </th>
//                 <th scope="col" className="px-4 py-5 font-bold text-right uppercase tracking-wider text-xs">
//                   Closing Qty
//                 </th>
//                 <th scope="col" className="px-4 py-5 font-bold text-right uppercase tracking-wider text-xs">
//                   Closing Rate
//                 </th>
//                 <th scope="col" className="px-6 py-5 font-bold text-right uppercase tracking-wider text-xs">
//                   <div className="flex items-center justify-end gap-3">
//                     <span>Closing Amount</span>
//                     <div className={`w-2 h-2 bg-green-400 rounded-full`}></div>
//                   </div>
//                 </th>
//               </motion.tr>
//             </thead>

//             {/* Table Body */}
//             <tbody className="divide-y divide-gray-200/50">
//               {collectionTableData?.map((data, index) => (
//                 <motion.tr
//                   key={data?.id || index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.015 }}
//                   className={`group transition-all duration-300 ease-out ${
//                     theme === "dark"
//                       ? `hover:bg-gray-700/80 ${
//                           index % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/20'
//                         }`
//                       : `hover:bg-blue-50/80 ${
//                           index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
//                         }`
//                   } hover:shadow-lg hover:scale-[1.001] border-b border-gray-200/30`}
//                 >
//                   {/* Product Name */}
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className={`font-semibold transition-all duration-300 ${
//                       theme === "dark" 
//                         ? "text-gray-200 group-hover:text-white group-hover:font-bold" 
//                         : "text-gray-800 group-hover:text-blue-900 group-hover:font-bold"
//                     }`}>
//                       {data?.PRODUCT_NAME || data?.product_name || 'N/A'}
//                     </div>
//                   </td>

//                   {/* Brand */}
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     <div className={`text-sm ${
//                       theme === "dark" ? "text-gray-400" : "text-gray-600"
//                     }`}>
//                       {data?.BRAND_NAME || data?.brand_name || 'N/A'}
//                     </div>
//                   </td>

//                   {/* Opening Qty */}
//                   <td className="px-4 py-4 text-right">
//                     <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
//                       theme === "dark" 
//                         ? "text-blue-400 bg-blue-900/20" 
//                         : "text-blue-600 bg-blue-50"
//                     } group-hover:scale-105 group-hover:shadow-sm`}>
//                       {formatNumber(data?.OPENING_QTY ?? data?.opening_qty ?? 0)}
//                     </div>
//                   </td>

//                   {/* In Qty */}
//                   <td className="px-4 py-4 text-right">
//                     <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
//                       theme === "dark" 
//                         ? "text-green-400 bg-green-900/20" 
//                         : "text-green-600 bg-green-50"
//                     } group-hover:scale-105 group-hover:shadow-sm`}>
//                       {formatNumber(data?.IN_QTY ?? data?.in_qty ?? 0)}
//                     </div>
//                   </td>

//                   {/* Out Qty */}
//                   <td className="px-4 py-4 text-right">
//                     <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
//                       theme === "dark" 
//                         ? "text-orange-400 bg-orange-900/20" 
//                         : "text-orange-600 bg-orange-50"
//                     } group-hover:scale-105 group-hover:shadow-sm`}>
//                       {formatNumber(data?.OUT_QTY ?? data?.out_qty ?? 0)}
//                     </div>
//                   </td>

//                   {/* Closing Qty */}
//                   <td className="px-4 py-4 text-right">
//                     <div className={`font-mono text-sm font-bold px-3 py-1 rounded-lg transition-all duration-300 ${
//                       (data?.CLOSING_QTY ?? data?.closing_qty ?? data?.QTY ?? data?.qty ?? 0) <= 0 
//                         ? theme === "dark" 
//                           ? "text-red-400 bg-red-900/30 border border-red-800" 
//                           : "text-red-600 bg-red-100 border border-red-200"
//                         : theme === "dark" 
//                           ? "text-teal-400 bg-teal-900/20" 
//                           : "text-teal-600 bg-teal-50"
//                     } group-hover:scale-105 group-hover:shadow-sm`}>
//                       {formatNumber(data?.CLOSING_QTY ?? data?.closing_qty ?? data?.QTY ?? data?.qty ?? 0)}
//                     </div>
//                   </td>

//                   {/* Closing Rate */}
//                   <td className="px-4 py-4 text-right">
//                     <div className={`font-mono text-sm font-medium px-3 py-1 rounded-lg transition-all duration-300 ${
//                       theme === "dark" 
//                         ? "text-purple-400 bg-purple-900/20" 
//                         : "text-purple-600 bg-purple-50"
//                     } group-hover:scale-105 group-hover:shadow-sm`}>
//                       PKR {formatCurrency(data?.CLOSING_RATE ?? data?.closing_rate ?? data?.RATE ?? data?.rate ?? 0)}
//                     </div>
//                   </td>

//                   {/* Closing Amount */}
//                   <td className="px-6 py-4 text-right">
//                     <div className={`font-mono text-sm font-bold px-3 py-2 rounded-xl transition-all duration-300 ${
//                       theme === "dark" 
//                         ? "text-green-400 bg-green-900/30 border border-green-800" 
//                         : "text-green-700 bg-green-100 border border-green-200"
//                     } group-hover:scale-110 group-hover:shadow-md`}>
//                       PKR {formatCurrency(data?.CLOSING_AMOUNT ?? data?.closing_amount ?? data?.AMOUNT ?? data?.amount ?? 0)}
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
              
//               {/* Empty State */}
//               {(!collectionTableData || collectionTableData.length === 0) && (
//                 <motion.tr
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <td colSpan="8" className="px-6 py-20 text-center">
//                     <div className="flex flex-col items-center justify-center">
//                       <div className={`w-20 h-20 rounded-2xl mb-4 flex items-center justify-center ${
//                         theme === "dark" 
//                           ? "bg-gray-700/50 text-gray-500 border border-gray-600" 
//                           : "bg-gray-100 text-gray-400 border border-gray-300"
//                       }`}>
//                         <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
//                         </svg>
//                       </div>
//                       <h3 className={`text-lg font-semibold mb-2 ${
//                         theme === "dark" ? "text-gray-300" : "text-gray-700"
//                       }`}>
//                         No stock data available
//                       </h3>
//                       <p className={`text-sm max-w-md ${
//                         theme === "dark" ? "text-gray-500" : "text-gray-500"
//                       }`}>
//                         There are no stock records to display for the selected period.
//                       </p>
//                     </div>
//                   </td>
//                 </motion.tr>
//               )}
//             </tbody>

//             {/* Totals Footer */}
//             {totals && collectionTableData?.length > 0 && (
//               <tfoot>
//                 <motion.tr
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`${
//                     theme === "dark"
//                       ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-t-2 border-gray-600"
//                       : "bg-gradient-to-r from-slate-100 via-gray-50 to-slate-100 text-gray-800 border-t-2 border-gray-300"
//                   } font-bold sticky bottom-0 shadow-2xl`}
//                 >
//                   <td className="px-6 py-5 whitespace-nowrap" colSpan="2">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-3 h-3 rounded-full ${
//                         theme === "dark" ? "bg-yellow-400" : "bg-yellow-500"
//                       }`}></div>
//                       <span className="text-sm uppercase tracking-wide">GRAND TOTAL</span>
//                       <span className={`text-xs font-normal px-3 py-1 rounded-full ${
//                         theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-blue-200 text-blue-700"
//                       }`}>
//                         {collectionTableData.length} {collectionTableData.length === 1 ? 'product' : 'products'}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-5 text-right">
//                     <div className={`font-mono text-sm font-bold px-3 py-2 rounded-lg ${
//                       theme === "dark" 
//                         ? "text-blue-400 bg-blue-900/30" 
//                         : "text-blue-700 bg-blue-100"
//                     }`}>
//                       {formatNumber(totals.opening_qty)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-5 text-right">
//                     <div className={`font-mono text-sm font-bold px-3 py-2 rounded-lg ${
//                       theme === "dark" 
//                         ? "text-green-400 bg-green-900/30" 
//                         : "text-green-700 bg-green-100"
//                     }`}>
//                       {formatNumber(totals.in_qty)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-5 text-right">
//                     <div className={`font-mono text-sm font-bold px-3 py-2 rounded-lg ${
//                       theme === "dark" 
//                         ? "text-orange-400 bg-orange-900/30" 
//                         : "text-orange-700 bg-orange-100"
//                     }`}>
//                       {formatNumber(totals.out_qty)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-5 text-right">
//                     <div className={`font-mono text-sm font-bold px-3 py-2 rounded-lg ${
//                       theme === "dark" 
//                         ? "text-teal-400 bg-teal-900/30" 
//                         : "text-teal-700 bg-teal-100"
//                     }`}>
//                       {formatNumber(totals.closing_qty)}
//                     </div>
//                   </td>
//                   <td className="px-4 py-5 text-right">
//                     <div className={`font-mono text-sm font-medium px-3 py-2 rounded-lg ${
//                       theme === "dark" 
//                         ? "text-purple-400 bg-purple-900/20" 
//                         : "text-purple-600 bg-purple-50"
//                     }`}>
//                       -
//                     </div>
//                   </td>
//                   <td className="px-6 py-5 text-right">
//                     <div className={`font-mono text-lg font-extrabold px-4 py-3 rounded-xl border-2 ${
//                       theme === "dark" 
//                         ? "text-green-400 bg-green-900/40 border-green-700" 
//                         : "text-green-800 bg-green-100 border-green-300"
//                     }`}>
//                       PKR {formatCurrency(totals.closing_amount)}
//                     </div>
//                   </td>
//                 </motion.tr>
//               </tfoot>
//             )}
//           </table>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: ${theme === 'dark' ? '#1f2937' : '#f8fafc'};
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: ${theme === 'dark' ? '#4b5563' : '#cbd5e1'};
//           border-radius: 4px;
//           border: 2px solid ${theme === 'dark' ? '#1f2937' : '#f8fafc'};
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: ${theme === 'dark' ? '#6b7280' : '#94a3b8'};
//         }
//       `}</style>
//     </motion.div>
//   );
// };

// export default StockTable;

import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

const StockTable = ({ collectionTableData }) => {
  const { theme } = useContext(Context);

  // Calculate totals for summary
  const totals = collectionTableData?.reduce((acc, data) => ({
    opening_qty: (acc.opening_qty || 0) + (data?.OPENING_QTY || data?.opening_qty || 0),
    in_qty: (acc.in_qty || 0) + (data?.IN_QTY || data?.in_qty || 0),
    out_qty: (acc.out_qty || 0) + (data?.OUT_QTY || data?.out_qty || 0),
    closing_qty: (acc.closing_qty || 0) + (data?.CLOSING_QTY || data?.closing_qty || data?.QTY || data?.qty || 0),
    closing_amount: (acc.closing_amount || 0) + (data?.CLOSING_AMOUNT || data?.closing_amount || data?.AMOUNT || data?.amount || 0)
  }), {});

  // Calculate brand-wise summary and sort by closing quantity (descending)
  const brandSummary = collectionTableData?.reduce((acc, data) => {
    const brandName = data?.BRAND_NAME || data?.brand_name || 'Uncategorized';
    
    if (!acc[brandName]) {
      acc[brandName] = {
        brand: brandName,
        product_count: 0,
        opening_qty: 0,
        in_qty: 0,
        out_qty: 0,
        closing_qty: 0,
        closing_amount: 0
      };
    }
    
    acc[brandName].product_count += 1;
    acc[brandName].opening_qty += (data?.OPENING_QTY || data?.opening_qty || 0);
    acc[brandName].in_qty += (data?.IN_QTY || data?.in_qty || 0);
    acc[brandName].out_qty += (data?.OUT_QTY || data?.out_qty || 0);
    acc[brandName].closing_qty += (data?.CLOSING_QTY || data?.closing_qty || data?.QTY || data?.qty || 0);
    acc[brandName].closing_amount += (data?.CLOSING_AMOUNT || data?.closing_amount || data?.AMOUNT || data?.amount || 0);
    
    return acc;
  }, {});

  const brandSummaryArray = brandSummary ? Object.values(brandSummary).sort((a, b) => b.closing_qty - a.closing_qty) : [];

  // Format numbers with commas (remove decimals)
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  // Format currency (round to whole numbers)
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0
    }).format(Math.round(num || 0));
  };

  // Summary cards data
  const summaryCards = [
    { 
      label: "Total Products", 
      value: collectionTableData?.length || 0, 
      color: "blue",
      icon: "📦",
      format: "number"
    },
    { 
      label: "Opening Stock", 
      value: totals?.opening_qty || 0, 
      color: "purple",
      icon: "📊",
      format: "number"
    },
    { 
      label: "Total In", 
      value: totals?.in_qty || 0, 
      color: "green",
      icon: "⬇️",
      format: "number"
    },
    { 
      label: "Total Out", 
      value: totals?.out_qty || 0, 
      color: "orange",
      icon: "⬆️",
      format: "number"
    },
    { 
      label: "Closing Stock", 
      value: totals?.closing_qty || 0, 
      color: "teal",
      icon: "📈",
      format: "number"
    },
    { 
      label: "Stock Value", 
      value: totals?.closing_amount || 0, 
      color: "indigo",
      icon: "💰",
      format: "currency"
    }
  ];

  const getColorClasses = (color, isDark) => {
    const colorMap = {
      blue: {
        bg: isDark ? "bg-blue-900/30" : "bg-blue-50",
        text: isDark ? "text-blue-300" : "text-blue-700",
        border: isDark ? "border-blue-700" : "border-blue-200",
        value: isDark ? "text-blue-400" : "text-blue-600"
      },
      green: {
        bg: isDark ? "bg-green-900/30" : "bg-green-50",
        text: isDark ? "text-green-300" : "text-green-700",
        border: isDark ? "border-green-700" : "border-green-200",
        value: isDark ? "text-green-400" : "text-green-600"
      },
      orange: {
        bg: isDark ? "bg-orange-900/30" : "bg-orange-50",
        text: isDark ? "text-orange-300" : "text-orange-700",
        border: isDark ? "border-orange-700" : "border-orange-200",
        value: isDark ? "text-orange-400" : "text-orange-600"
      },
      teal: {
        bg: isDark ? "bg-teal-900/30" : "bg-teal-50",
        text: isDark ? "text-teal-300" : "text-teal-700",
        border: isDark ? "border-teal-700" : "border-teal-200",
        value: isDark ? "text-teal-400" : "text-teal-600"
      },
      purple: {
        bg: isDark ? "bg-purple-900/30" : "bg-purple-50",
        text: isDark ? "text-purple-300" : "text-purple-700",
        border: isDark ? "border-purple-700" : "border-purple-200",
        value: isDark ? "text-purple-400" : "text-purple-600"
      },
      indigo: {
        bg: isDark ? "bg-indigo-900/30" : "bg-indigo-50",
        text: isDark ? "text-indigo-300" : "text-indigo-700",
        border: isDark ? "border-indigo-700" : "border-indigo-200",
        value: isDark ? "text-indigo-400" : "text-indigo-600"
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 w-full ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-gray-700" 
          : "bg-white shadow-xl border-gray-200"
      } border rounded-2xl backdrop-blur-sm`}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>
            Stock Summary
          </h1>
          <p className={`mt-1 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Comprehensive overview of inventory levels and stock movements
          </p>
        </div>
        
        {/* Summary Stats */}
        {totals && collectionTableData?.length > 0 && (
          <div className={`flex items-center gap-4 mt-3 sm:mt-0 px-4 py-2 rounded-xl ${
            theme === "dark" ? "bg-gray-700" : "bg-blue-50"
          }`}>
            <div className="text-center">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Total Value
              </div>
              <div className={`text-lg font-bold ${
                theme === "dark" ? "text-green-400" : "text-green-600"
              }`}>
                PKR {formatCurrency(totals.closing_amount)}
              </div>
            </div>
            <div className="w-px h-8 bg-gray-400 opacity-40"></div>
            <div className="text-center">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Products
              </div>
              <div className={`text-lg font-bold ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}>
                {collectionTableData.length}
              </div>
            </div>
            <div className="w-px h-8 bg-gray-400 opacity-40"></div>
            <div className="text-center">
              <div className={`text-xs font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Brands
              </div>
              <div className={`text-lg font-bold ${
                theme === "dark" ? "text-purple-400" : "text-purple-600"
              }`}>
                {brandSummaryArray.length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Brand Summary Section - Simple Table Format */}
      {brandSummaryArray.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Brand-wise Summary (Sorted by Quantity)
          </h3>
          <div className={`rounded-lg border ${
            theme === "dark" ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-white"
          } overflow-hidden`}>
            <table className="w-full text-sm">
              <thead className={`${
                theme === "dark" 
                  ? "bg-gray-700 text-gray-300" 
                  : "bg-gray-100 text-gray-700"
              }`}>
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Brand Name</th>
                  <th className="px-4 py-3 text-right font-semibold">Products</th>
                  <th className="px-4 py-3 text-right font-semibold">Opening Qty</th>
                  <th className="px-4 py-3 text-right font-semibold">In Qty</th>
                  <th className="px-4 py-3 text-right font-semibold">Out Qty</th>
                  <th className="px-4 py-3 text-right font-semibold">Closing Qty</th>
                  <th className="px-4 py-3 text-right font-semibold">Stock Value</th>
                </tr>
              </thead>
              <tbody>
                {brandSummaryArray.map((brand, index) => (
                  <motion.tr
                    key={brand.brand}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    className={`${
                      theme === "dark"
                        ? `border-b border-gray-700 hover:bg-gray-700/80 ${
                            index % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/20'
                          }`
                        : `border-b border-gray-200 hover:bg-gray-50 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`
                    } transition-colors duration-200`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {brand.brand}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${
                        theme === "dark" ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
                      }`}>
                        {brand.product_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {formatNumber(brand.opening_qty)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                        {formatNumber(brand.in_qty)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span className={theme === "dark" ? "text-orange-400" : "text-orange-600"}>
                        {formatNumber(brand.out_qty)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold">
                      <span className={brand.closing_qty <= 0 
                        ? theme === "dark" ? "text-red-400" : "text-red-600" 
                        : theme === "dark" ? "text-teal-400" : "text-teal-600"
                      }>
                        {formatNumber(brand.closing_qty)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold">
                      <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                        PKR {formatCurrency(brand.closing_amount)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Summary Cards Section */}
      {totals && collectionTableData?.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <h3 className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            Inventory Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {summaryCards.map((card, index) => {
              const colors = getColorClasses(card.color, theme === "dark");
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-3 rounded-xl border-2 ${colors.bg} ${colors.border} transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{card.icon}</span>
                    <span className={`text-xs font-medium ${colors.text}`}>
                      {card.label}
                    </span>
                  </div>
                  <div className={`text-sm font-bold font-mono ${colors.value}`}>
                    {card.format === 'currency' ? `PKR ${formatCurrency(card.value)}` : formatNumber(card.value)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Main Table Container */}
      <div className={`relative overflow-hidden rounded-2xl border-2 ${
        theme === "dark" 
          ? "border-gray-700 bg-gray-800/50" 
          : "border-gray-200 bg-white"
      } shadow-2xl`}>
        <div className="overflow-x-auto max-h-[65vh] custom-scrollbar">
          <table className="w-full text-sm">
            {/* Table Header */}
            <thead className={`sticky top-0 ${
              theme === "dark" 
                ? "bg-gray-700 text-white" 
                : "bg-gray-100 text-gray-800 border-b-2 border-gray-300"
            }`}>
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Product Name</th>
                <th className="px-4 py-3 text-left font-semibold">Brand</th>
                <th className="px-4 py-3 text-right font-semibold">Opening Qty</th>
                <th className="px-4 py-3 text-right font-semibold">In Qty</th>
                <th className="px-4 py-3 text-right font-semibold">Out Qty</th>
                <th className="px-4 py-3 text-right font-semibold">Closing Qty</th>
                <th className="px-4 py-3 text-right font-semibold">Closing Rate</th>
                <th className="px-4 py-3 text-right font-semibold">Closing Amount</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {collectionTableData?.map((data, index) => (
                <motion.tr
                  key={data?.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.015 }}
                  className={`${
                    theme === "dark"
                      ? `border-b border-gray-700 hover:bg-gray-700/80 ${
                          index % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/20'
                        }`
                      : `border-b border-gray-200 hover:bg-gray-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`
                  } transition-colors duration-200`}
                >
                  {/* Product Name */}
                  <td className="px-4 py-3 font-medium">
                    {data?.PRODUCT_NAME || data?.product_name || 'N/A'}
                  </td>

                  {/* Brand */}
                  <td className="px-4 py-3">
                    <span className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {data?.BRAND_NAME || data?.brand_name || 'N/A'}
                    </span>
                  </td>

                  {/* Opening Qty */}
                  <td className="px-4 py-3 text-right font-mono">
                    {formatNumber(data?.OPENING_QTY ?? data?.opening_qty ?? 0)}
                  </td>

                  {/* In Qty */}
                  <td className="px-4 py-3 text-right font-mono">
                    <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                      {formatNumber(data?.IN_QTY ?? data?.in_qty ?? 0)}
                    </span>
                  </td>

                  {/* Out Qty */}
                  <td className="px-4 py-3 text-right font-mono">
                    <span className={theme === "dark" ? "text-orange-400" : "text-orange-600"}>
                      {formatNumber(data?.OUT_QTY ?? data?.out_qty ?? 0)}
                    </span>
                  </td>

                  {/* Closing Qty */}
                  <td className="px-4 py-3 text-right font-mono font-bold">
                    <span className={(data?.CLOSING_QTY ?? data?.closing_qty ?? data?.QTY ?? data?.qty ?? 0) <= 0 
                      ? theme === "dark" ? "text-red-400" : "text-red-600" 
                      : theme === "dark" ? "text-teal-400" : "text-teal-600"
                    }>
                      {formatNumber(data?.CLOSING_QTY ?? data?.closing_qty ?? data?.QTY ?? data?.qty ?? 0)}
                    </span>
                  </td>

                  {/* Closing Rate */}
                  <td className="px-4 py-3 text-right font-mono">
                    <span className={theme === "dark" ? "text-purple-400" : "text-purple-600"}>
                      PKR {formatCurrency(data?.CLOSING_RATE ?? data?.closing_rate ?? data?.RATE ?? data?.rate ?? 0)}
                    </span>
                  </td>

                  {/* Closing Amount */}
                  <td className="px-4 py-3 text-right font-mono font-bold">
                    <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                      PKR {formatCurrency(data?.CLOSING_AMOUNT ?? data?.closing_amount ?? data?.AMOUNT ?? data?.amount ?? 0)}
                    </span>
                  </td>
                </motion.tr>
              ))}
              
              {/* Empty State */}
              {(!collectionTableData || collectionTableData.length === 0) && (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <td colSpan="8" className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center ${
                        theme === "dark" 
                          ? "bg-gray-700/50 text-gray-500 border border-gray-600" 
                          : "bg-gray-100 text-gray-400 border border-gray-300"
                      }`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        No stock data available
                      </h3>
                      <p className={`text-sm max-w-md ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}>
                        There are no stock records to display for the selected period.
                      </p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>

            {/* Totals Footer */}
            {totals && collectionTableData?.length > 0 && (
              <tfoot>
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    theme === "dark"
                      ? "bg-gray-700 text-white border-t-2 border-gray-600"
                      : "bg-gray-100 text-gray-800 border-t-2 border-gray-300"
                  } font-bold`}
                >
                  <td className="px-4 py-4 font-semibold" colSpan="2">
                    GRAND TOTAL ({collectionTableData.length} {collectionTableData.length === 1 ? 'product' : 'products'})
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    {formatNumber(totals.opening_qty)}
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                      {formatNumber(totals.in_qty)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    <span className={theme === "dark" ? "text-orange-400" : "text-orange-600"}>
                      {formatNumber(totals.out_qty)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    <span className={theme === "dark" ? "text-teal-400" : "text-teal-600"}>
                      {formatNumber(totals.closing_qty)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    -
                  </td>
                  <td className="px-4 py-4 text-right font-mono">
                    <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                      PKR {formatCurrency(totals.closing_amount)}
                    </span>
                  </td>
                </motion.tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1f2937' : '#f8fafc'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#4b5563' : '#cbd5e1'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'dark' ? '#6b7280' : '#94a3b8'};
        }
      `}</style>
    </motion.div>
  );
};

export default StockTable;