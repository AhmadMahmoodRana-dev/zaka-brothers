// import React, { useContext, useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import { Context } from "../../context/Context";
// import Loader from "../Loader";

// const MainCard = ({currentMonth,lastMonth,LastDaySale,todaySale,first,second,third,four}) => {
//   const { loader,theme } = useContext(Context);
//   // State for percentage calculations
//   const [percentage, setPercentage] = useState(0);
//   const [percentage2, setPercentage2] = useState(0);
//   // Reusable function for percentage calculation
//   const calculatePercentageChange = (current, previous) => {
//     if (previous === 0) return current > 0 ? 100 : 0;
//     return ((current - previous) / previous) * 100;
//   };

//   useEffect(() => {
//     setPercentage(
//       calculatePercentageChange(currentMonth, lastMonth).toFixed(2)
//     );
//   }, [currentMonth, lastMonth]);

//   useEffect(() => {
//     setPercentage2(
//       calculatePercentageChange(todaySale, LastDaySale).toFixed(2)
//     );
//   }, [todaySale, LastDaySale]);

//   // Format numbers for better readability
//   const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num);

//   return (
//     <div className={`w-[30%] ${theme == "dark" ? "card" : "card1"} max-h-[190px] py-5 h-[170px] flex flex-wrap min-w-[325px]`}>
//       <main className="w-[60%] h-full flex flex-col gap-4">
//         {/* Current Month vs Last Month */}
//         <div className="flex justify-around">
//           <div className="leading-none w-[60%] min-h-[50px] flex flex-col items-center justify-center">
//             <h1 className={`xl:text-[.8rem] text-[.7rem] tracking-wider font-semibold pb-1 ${theme == "dark" ? "" : "text-[#1c252e]"}`}>
//               {first}
//             </h1>
//             {loader ? (
//               <Loader />
//             ) : (
//               <p className={`font-bold text-[1.3rem] ${theme == "dark" ? "" : "text-[#1c252e]"}`}>
//                 {formatNumber(currentMonth)}
//               </p>
//             )}
//           </div>
//           <div className="raise max-w-[40px] min-w-[40px] flex flex-col justify-center items-center">
//             {loader ? (
//               <Loader />
//             ) : (
//               <>
//                 {percentage >= 0 ? (
//                   <div className="bg-[#dbf6e5] w-7 h-7 rounded-full flex justify-center items-center">
//                     <FaArrowTrendUp className="text-[#00a76f]" />
//                   </div>
//                 ) : (
//                   <div className="bg-[#ffe4de] w-7 h-7 rounded-full flex justify-center items-center">
//                     <FaArrowTrendDown className="text-[red]" />
//                   </div>
//                 )}
//                 <p className={` ${theme == "dark" ? "font-semibold" : "text-[#637381]"} text-sm`}>
//                   {percentage >= 0
//                     ? `+${formatNumber(percentage)}`
//                     : formatNumber(percentage)}
//                   %
//                 </p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Today's Sale vs Last Day Sale */}
//         <div className="flex justify-around mt-3">
//           <div className="leading-none w-[60%] min-h-[50px] flex flex-col items-center justify-center">
//             <h1 className={`xl:text-[.8rem] text-[.7rem] tracking-wider font-semibold pb-1 ${theme == "dark" ? "" : "text-[#1c252e]"}`}>
//               {third}
//             </h1>
//             {loader ? (
//               <Loader />
//             ) : (
//               <p className={`font-bold text-[1.3rem] ${theme == "dark" ? "" : "text-[#1c252e]"}`}>
//                 {formatNumber(todaySale)}
//               </p>
//             )}
//           </div>
//           <div className="raise  max-w-[40px] min-w-[40px] flex flex-col justify-center items-center">
//             {loader ? (
//               <Loader />
//             ) : (
//               <>
//                 {percentage2 >= 0 ? (
//                   <div className="bg-[#dbf6e5] w-7 h-7 rounded-full flex justify-center items-center">
//                     <FaArrowTrendUp className="text-[#00a76f]" />
//                   </div>
//                 ) : (
//                   <div className="bg-[#ffe4de] w-7 h-7 rounded-full flex justify-center items-center">
//                     <FaArrowTrendDown className="text-[red]" />
//                   </div>
//                 )}
//                 <p className={` ${theme == "dark" ? "font-semibold" : "text-[#637381]"} text-sm`}>
//                   {percentage2 >= 0
//                     ? `+${formatNumber(percentage2)}`
//                     : formatNumber(percentage2)}
//                   %
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Last Month & Last Day Sale */}
//       <main className="w-[40%] h-full flex flex-col gap-4">
//         <div className="flex justify-around min-h-[53px]">
//           <div className="leading-none min-w-[90%] flex flex-col items-center justify-center">
//             <h1 className={`xl:text-[.8rem] text-[.7rem] tracking-wider font-semibold pb-1 ${theme == "dark" ? "" : "text-[#1c252e]"}`}>
//               {second}
//             </h1>
//             {loader ? (
//               <Loader />
//             ) : (
//               <p className={`font-bold text-[1.3rem] ${theme == "dark" ? "" : "text-[#1c252e]"}`}>
//                 {formatNumber(lastMonth)}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="flex gap-2 items-center justify-center mt-2">
//           <div className="leading-none min-w-[90%] min-h-[50px] flex flex-col items-center justify-center">
//             <h1 className={`xl:text-[.8rem] text-[.7rem] tracking-wider font-semibold pb-1 ${theme == "dark" ? "" : "text-[#1c252e]"}`}>{four}</h1>
//             {loader ? (
//               <Loader />
//             ) : (
//               <p className={`font-bold text-[1.3rem] ${theme == "dark" ? "" : "text-[#1c252e]"}`}>
//                 {formatNumber(LastDaySale)}
//               </p>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainCard;


// import React, { useContext, useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import { Context } from "../../context/Context";
// import Loader from "../Loader";

// const MainCard = ({
//   currentMonth,
//   lastMonth,
//   LastDaySale,
//   todaySale,
//   first,
//   second,
//   third,
//   four
// }) => {
//   const { loader, theme } = useContext(Context);
//   const [percentage, setPercentage] = useState(0);
//   const [percentage2, setPercentage2] = useState(0);

//   // Reusable function for percentage calculation
//   const calculatePercentageChange = (current, previous) => {
//     if (previous === 0) return current > 0 ? 100 : 0;
//     return ((current - previous) / previous) * 100;
//   };

//   useEffect(() => {
//     setPercentage(calculatePercentageChange(currentMonth, lastMonth).toFixed(2));
//   }, [currentMonth, lastMonth]);

//   useEffect(() => {
//     setPercentage2(calculatePercentageChange(todaySale, LastDaySale).toFixed(2));
//   }, [todaySale, LastDaySale]);

//   // Format numbers for better readability
//   const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num);
//   const formatPercentage = (num) => Math.abs(Number(num)).toFixed(1);

//   // Card data configuration for better organization
//   const cardData = [
//     {
//       title: first,
//       value: currentMonth,
//       percentage: percentage,
//       type: "primary"
//     },
//     {
//       title: second,
//       value: lastMonth,
//       type: "secondary"
//     },
//     {
//       title: third,
//       value: todaySale,
//       percentage: percentage2,
//       type: "primary"
//     },
//     {
//       title: four,
//       value: LastDaySale,
//       type: "secondary"
//     }
//   ];

//   const getTrendIcon = (percent) => {
//     const isPositive = percent >= 0;
//     const Icon = isPositive ? FaArrowTrendUp : FaArrowTrendDown;
//     const bgColor = isPositive 
//       ? "bg-green-100 dark:bg-green-900/30" 
//       : "bg-red-100 dark:bg-red-900/30";
//     const iconColor = isPositive ? "text-green-600" : "text-red-600";

//     return (
//       <div className={`${bgColor} w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110`}>
//         <Icon className={`${iconColor} text-sm`} />
//       </div>
//     );
//   };

//   const getPercentageText = (percent, isDark) => {
//     const isPositive = percent >= 0;
//     const textColor = isPositive 
//       ? "text-green-600 dark:text-green-400" 
//       : "text-red-600 dark:text-red-400";
    
//     return (
//       <span className={`font-semibold text-xs ${textColor}`}>
//         {isPositive ? `+${formatPercentage(percent)}` : `-${formatPercentage(percent)}`}%
//       </span>
//     );
//   };

//   return (
//     <div className={`
//       w-full max-w-sm min-w-[320px] 
//       bg-white dark:bg-gray-800 
//       rounded-2xl shadow-lg hover:shadow-xl 
//       transition-all duration-300 
//       border border-gray-100 dark:border-gray-700
//       p-6
//       group
//     `}>
//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-2 gap-6 h-full">
        
//         {/* Left Column - Primary Metrics */}
//         <div className="flex flex-col gap-6">
//           {cardData.filter(item => item.type === "primary").map((item, index) => (
//             <div key={index} className="space-y-3">
//               {/* Title */}
//               <h3 className={`
//                 text-xs font-medium uppercase tracking-wider 
//                 text-gray-500 dark:text-gray-400
//                 transition-colors duration-200
//               `}>
//                 {item.title}
//               </h3>
              
//               {/* Value and Trend */}
//               <div className="flex items-end justify-between">
//                 <div className="flex items-baseline gap-2">
//                   {loader ? (
//                     <Loader />
//                   ) : (
//                     <>
//                       <span className={`
//                         text-2xl font-bold 
//                         text-gray-900 dark:text-white
//                         transition-colors duration-200
//                       `}>
//                         {formatNumber(item.value)}
//                       </span>
//                     </>
//                   )}
//                 </div>
                
//                 {/* Percentage Indicator */}
//                 {loader ? (
//                   <Loader size="small" />
//                 ) : (
//                   <div className="flex flex-col items-end gap-1">
//                     {getTrendIcon(item.percentage)}
//                     {getPercentageText(item.percentage, theme === "dark")}
//                   </div>
//                 )}
//               </div>
              
//               {/* Progress Bar */}
//               {!loader && (
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
//                   <div 
//                     className={`
//                       h-full rounded-full transition-all duration-1000 ease-out
//                       ${item.percentage >= 0 
//                         ? 'bg-green-500 dark:bg-green-400' 
//                         : 'bg-red-500 dark:bg-red-400'
//                       }
//                     `}
//                     style={{
//                       width: `${Math.min(Math.abs(item.percentage) + 10, 100)}%`
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Right Column - Secondary Metrics */}
//         <div className="flex flex-col gap-6">
//           {cardData.filter(item => item.type === "secondary").map((item, index) => (
//             <div key={index} className="space-y-3">
//               {/* Title */}
//               <h3 className={`
//                 text-xs font-medium uppercase tracking-wider 
//                 text-gray-500 dark:text-gray-400
//                 transition-colors duration-200
//               `}>
//                 {item.title}
//               </h3>
              
//               {/* Value */}
//               <div className="flex items-center h-8">
//                 {loader ? (
//                   <Loader />
//                 ) : (
//                   <span className={`
//                     text-2xl font-bold 
//                     text-gray-900 dark:text-white
//                     transition-colors duration-200
//                   `}>
//                     {formatNumber(item.value)}
//                   </span>
//                 )}
//               </div>
              
//               {/* Comparison Badge */}
//               {!loader && (
//                 <div className={`
//                   inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//                   bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300
//                   transition-colors duration-200
//                 `}>
//                   Comparison
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Summary */}
//       {!loader && (
//         <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
//           <div className="flex justify-between items-center text-xs">
//             <span className="text-gray-500 dark:text-gray-400">Overall Performance</span>
//             <div className="flex items-center gap-1">
//               <div className={`
//                 w-2 h-2 rounded-full 
//                 ${(percentage + percentage2) / 2 >= 0 
//                   ? 'bg-green-500' 
//                   : 'bg-red-500'
//                 }
//               `} />
//               <span className={`
//                 font-medium
//                 ${(percentage + percentage2) / 2 >= 0 
//                   ? 'text-green-600 dark:text-green-400' 
//                   : 'text-red-600 dark:text-red-400'
//                 }
//               `}>
//                 {((percentage + percentage2) / 2 >= 0 ? '+' : '') + 
//                  ((percentage + percentage2) / 2).toFixed(1)}% avg
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainCard;
// import React, { useContext, useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import { Context } from "../../context/Context";
// import Loader from "../Loader";

// const MainCard = ({
//   currentMonth,
//   lastMonth,
//   LastDaySale,
//   todaySale,
//   first,
//   second,
//   third,
//   four
// }) => {
//   const { loader, theme } = useContext(Context);
//   const [percentage, setPercentage] = useState(0);
//   const [percentage2, setPercentage2] = useState(0);

//   // Reusable function for percentage calculation with safe handling
//   const calculatePercentageChange = (current, previous) => {
//     const currentNum = Number(current) || 0;
//     const previousNum = Number(previous) || 0;
    
//     if (previousNum === 0) return currentNum > 0 ? 100 : 0;
//     return ((currentNum - previousNum) / previousNum) * 100;
//   };

//   useEffect(() => {
//     const calculatedPercentage = calculatePercentageChange(currentMonth, lastMonth);
//     setPercentage(isNaN(calculatedPercentage) ? 0 : calculatedPercentage);
//   }, [currentMonth, lastMonth]);

//   useEffect(() => {
//     const calculatedPercentage2 = calculatePercentageChange(todaySale, LastDaySale);
//     setPercentage2(isNaN(calculatedPercentage2) ? 0 : calculatedPercentage2);
//   }, [todaySale, LastDaySale]);

//   // Format numbers for better readability with safe handling
//   const formatNumber = (num) => {
//     const number = Number(num) || 0;
//     return new Intl.NumberFormat("en-US").format(number);
//   };

//   const formatPercentage = (num) => {
//     const number = Number(num) || 0;
//     return Math.abs(number).toFixed(1);
//   };

//   // Safe average calculation for bottom summary
//   const calculateSafeAverage = () => {
//     const percent1 = Number(percentage) || 0;
//     const percent2 = Number(percentage2) || 0;
//     const average = (percent1 + percent2) / 2;
//     return isNaN(average) ? 0 : average;
//   };

//   // Card data configuration for better organization
//   const cardData = [
//     {
//       title: first,
//       value: currentMonth,
//       percentage: percentage,
//       type: "primary"
//     },
//     {
//       title: second,
//       value: lastMonth,
//       type: "secondary"
//     },
//     {
//       title: third,
//       value: todaySale,
//       percentage: percentage2,
//       type: "primary"
//     },
//     {
//       title: four,
//       value: LastDaySale,
//       type: "secondary"
//     }
//   ];

//   const getTrendIcon = (percent) => {
//     const percentNum = Number(percent) || 0;
//     const isPositive = percentNum >= 0;
//     const Icon = isPositive ? FaArrowTrendUp : FaArrowTrendDown;
//     const bgColor = isPositive 
//       ? "bg-green-100 dark:bg-green-900/30" 
//       : "bg-red-100 dark:bg-red-900/30";
//     const iconColor = isPositive ? "text-green-600" : "text-red-600";

//     return (
//       <div className={`${bgColor} w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300 hover:scale-110`}>
//         <Icon className={`${iconColor} text-sm`} />
//       </div>
//     );
//   };

//   const getPercentageText = (percent, isDark) => {
//     const percentNum = Number(percent) || 0;
//     const isPositive = percentNum >= 0;
//     const textColor = isPositive 
//       ? "text-green-600 dark:text-green-400" 
//       : "text-red-600 dark:text-red-400";
    
//     return (
//       <span className={`font-semibold text-xs ${textColor}`}>
//         {isPositive ? `+${formatPercentage(percentNum)}` : `-${formatPercentage(percentNum)}`}%
//       </span>
//     );
//   };

//   const getProgressWidth = (percent) => {
//     const percentNum = Math.abs(Number(percent) || 0);
//     return Math.min(percentNum + 10, 100);
//   };

//   const averagePerformance = calculateSafeAverage();
//   const isOverallPositive = averagePerformance >= 0;

//   return (
//     <div className={`
//       w-full max-w-sm min-w-[320px] 
//       bg-white dark:bg-gray-800 
//       rounded-2xl shadow-lg hover:shadow-xl 
//       transition-all duration-300 
//       border border-gray-100 dark:border-gray-700
//       p-6
//       group
//     `}>
//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-2 gap-6 h-full">
        
//         {/* Left Column - Primary Metrics */}
//         <div className="flex flex-col gap-6">
//           {cardData.filter(item => item.type === "primary").map((item, index) => (
//             <div key={index} className="space-y-3">
//               {/* Title */}
//               <h3 className={`
//                 text-xs font-medium uppercase tracking-wider 
//                 text-gray-500 dark:text-gray-400
//                 transition-colors duration-200
//               `}>
//                 {item.title}
//               </h3>
              
//               {/* Value and Trend */}
//               <div className="flex items-end justify-between">
//                 <div className="flex items-baseline gap-2">
//                   {loader ? (
//                     <Loader />
//                   ) : (
//                     <>
//                       <span className={`
//                         text-2xl font-bold 
//                         text-gray-900 dark:text-white
//                         transition-colors duration-200
//                       `}>
//                         {formatNumber(item.value)}
//                       </span>
//                     </>
//                   )}
//                 </div>
                
//                 {/* Percentage Indicator */}
//                 {loader ? (
//                   <Loader size="small" />
//                 ) : (
//                   <div className="flex flex-col items-end gap-1">
//                     {getTrendIcon(item.percentage)}
//                     {getPercentageText(item.percentage, theme === "dark")}
//                   </div>
//                 )}
//               </div>
              
//               {/* Progress Bar */}
//               {!loader && (
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
//                   <div 
//                     className={`
//                       h-full rounded-full transition-all duration-1000 ease-out
//                       ${Number(item.percentage) >= 0 
//                         ? 'bg-green-500 dark:bg-green-400' 
//                         : 'bg-red-500 dark:bg-red-400'
//                       }
//                     `}
//                     style={{
//                       width: `${getProgressWidth(item.percentage)}%`
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Right Column - Secondary Metrics */}
//         <div className="flex flex-col gap-6">
//           {cardData.filter(item => item.type === "secondary").map((item, index) => (
//             <div key={index} className="space-y-3">
//               {/* Title */}
//               <h3 className={`
//                 text-xs font-medium uppercase tracking-wider 
//                 text-gray-500 dark:text-gray-400
//                 transition-colors duration-200
//               `}>
//                 {item.title}
//               </h3>
              
//               {/* Value */}
//               <div className="flex items-center h-8">
//                 {loader ? (
//                   <Loader />
//                 ) : (
//                   <span className={`
//                     text-2xl font-bold 
//                     text-gray-900 dark:text-white
//                     transition-colors duration-200
//                   `}>
//                     {formatNumber(item.value)}
//                   </span>
//                 )}
//               </div>
              
//               {/* Comparison Badge */}
//               {!loader && (
//                 <div className={`
//                   inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//                   bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300
//                   transition-colors duration-200
//                 `}>
//                   Comparison
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Summary */}
//       {!loader && (
//         <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
//           <div className="flex justify-between items-center text-xs">
//             <span className="text-gray-500 dark:text-gray-400">Overall Performance</span>
//             <div className="flex items-center gap-1">
//               <div className={`
//                 w-2 h-2 rounded-full 
//                 ${isOverallPositive 
//                   ? 'bg-green-500' 
//                   : 'bg-red-500'
//                 }
//               `} />
//               <span className={`
//                 font-medium
//                 ${isOverallPositive 
//                   ? 'text-green-600 dark:text-green-400' 
//                   : 'text-red-600 dark:text-red-400'
//                 }
//               `}>
//                 {(isOverallPositive ? '+' : '') + formatPercentage(averagePerformance)}% avg
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainCard;


// import React, { useContext, useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import { Context } from "../../context/Context";
// import Loader from "../Loader";

// const MainCard = ({
//   currentMonth,
//   lastMonth,
//   LastDaySale,
//   todaySale,
//   first,
//   second,
//   third,
//   four
// }) => {
//   const { loader, theme } = useContext(Context);
//   const [percentage, setPercentage] = useState(0);
//   const [percentage2, setPercentage2] = useState(0);

//   // Reusable function for percentage calculation with safe handling
//   const calculatePercentageChange = (current, previous) => {
//     const currentNum = Number(current) || 0;
//     const previousNum = Number(previous) || 0;
    
//     if (previousNum === 0) return currentNum > 0 ? 100 : 0;
//     return ((currentNum - previousNum) / previousNum) * 100;
//   };

//   useEffect(() => {
//     const calculatedPercentage = calculatePercentageChange(currentMonth, lastMonth);
//     setPercentage(isNaN(calculatedPercentage) ? 0 : calculatedPercentage);
//   }, [currentMonth, lastMonth]);

//   useEffect(() => {
//     const calculatedPercentage2 = calculatePercentageChange(todaySale, LastDaySale);
//     setPercentage2(isNaN(calculatedPercentage2) ? 0 : calculatedPercentage2);
//   }, [todaySale, LastDaySale]);

//   // Format numbers for better readability with safe handling
//   const formatNumber = (num) => {
//     const number = Number(num) || 0;
//     return new Intl.NumberFormat("en-US").format(number);
//   };

//   const formatPercentage = (num) => {
//     const number = Number(num) || 0;
//     return Math.abs(number).toFixed(1);
//   };

//   // Safe average calculation for bottom summary
//   const calculateSafeAverage = () => {
//     const percent1 = Number(percentage) || 0;
//     const percent2 = Number(percentage2) || 0;
//     const average = (percent1 + percent2) / 2;
//     return isNaN(average) ? 0 : average;
//   };

//   // Card data configuration for better organization
//   const cardData = [
//     {
//       title: first,
//       value: currentMonth,
//       percentage: percentage,
//       type: "primary"
//     },
//     {
//       title: second,
//       value: lastMonth,
//       type: "secondary"
//     },
//     {
//       title: third,
//       value: todaySale,
//       percentage: percentage2,
//       type: "primary"
//     },
//     {
//       title: four,
//       value: LastDaySale,
//       type: "secondary"
//     }
//   ];

//   const getTrendIcon = (percent) => {
//     const percentNum = Number(percent) || 0;
//     const isPositive = percentNum >= 0;
//     const Icon = isPositive ? FaArrowTrendUp : FaArrowTrendDown;
//     const bgColor = isPositive 
//       ? "bg-green-100 dark:bg-green-900/30" 
//       : "bg-red-100 dark:bg-red-900/30";
//     const iconColor = isPositive ? "text-green-600" : "text-red-600";

//     return (
//       <div className={`${bgColor} w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300`}>
//         <Icon className={`${iconColor} text-sm`} />
//       </div>
//     );
//   };

//   const getPercentageText = (percent, isDark) => {
//     const percentNum = Number(percent) || 0;
//     const isPositive = percentNum >= 0;
//     const textColor = isPositive 
//       ? "text-green-600 dark:text-green-400" 
//       : "text-red-600 dark:text-red-400";
    
//     return (
//       <span className={`font-semibold text-xs ${textColor}`}>
//         {isPositive ? `+${formatPercentage(percentNum)}` : `-${formatPercentage(percentNum)}`}%
//       </span>
//     );
//   };

//   const getProgressWidth = (percent) => {
//     const percentNum = Math.abs(Number(percent) || 0);
//     return Math.min(percentNum + 10, 100);
//   };

//   const averagePerformance = calculateSafeAverage();
//   const isOverallPositive = averagePerformance >= 0;

//   return (
//     <div className={`
//       w-full max-w-sm min-w-[320px] 
//       bg-white dark:bg-gray-800 
//       rounded-2xl shadow-lg hover:shadow-xl 
//       transition-all duration-300 
//       border border-gray-100 dark:border-gray-700
//       p-6
//       group
//       flex flex-col
//     `}>
//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-2 gap-6 h-full flex-1">
        
//         {/* Left Column - Primary Metrics */}
//         <div className="flex flex-col gap-6">
//           {cardData.filter(item => item.type === "primary").map((item, index) => (
//             <div key={index} className="space-y-3">
//               {/* Title */}
//               <h3 className={`
//                 text-xs font-medium uppercase tracking-wider 
//                 text-gray-500 dark:text-gray-400
//                 transition-colors duration-200
//               `}>
//                 {item.title}
//               </h3>
              
//               {/* Value and Trend */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   {loader ? (
//                     <Loader />
//                   ) : (
//                     <span className={`
//                       text-2xl font-bold 
//                       text-gray-900 dark:text-white
//                       transition-colors duration-200
//                       min-h-[32px] flex items-center
//                     `}>
//                       {formatNumber(item.value)}
//                     </span>
//                   )}
//                 </div>
                
//                 {/* Percentage Indicator */}
//                 {loader ? (
//                   <div className="w-12 flex justify-end">
//                     <Loader size="small" />
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-end gap-1 w-12">
//                     {getTrendIcon(item.percentage)}
//                     {getPercentageText(item.percentage, theme === "dark")}
//                   </div>
//                 )}
//               </div>
              
//               {/* Progress Bar */}
//               {!loader && (
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
//                   <div 
//                     className={`
//                       h-full rounded-full transition-all duration-1000 ease-out
//                       ${Number(item.percentage) >= 0 
//                         ? 'bg-green-500 dark:bg-green-400' 
//                         : 'bg-red-500 dark:bg-red-400'
//                       }
//                     `}
//                     style={{
//                       width: `${getProgressWidth(item.percentage)}%`
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Right Column - Secondary Metrics */}
//         <div className="flex flex-col gap-6">
//           {cardData.filter(item => item.type === "secondary").map((item, index) => (
//             <div key={index} className="space-y-3">
//               {/* Title */}
//               <h3 className={`
//                 text-xs font-medium uppercase tracking-wider 
//                 text-gray-500 dark:text-gray-400
//                 transition-colors duration-200
//               `}>
//                 {item.title}
//               </h3>
              
//               {/* Value - Properly aligned */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   {loader ? (
//                     <Loader />
//                   ) : (
//                     <span className={`
//                       text-2xl font-bold 
//                       text-gray-900 dark:text-white
//                       transition-colors duration-200
//                       min-h-[32px] flex items-center
//                     `}>
//                       {formatNumber(item.value)}
//                     </span>
//                   )}
//                 </div>
                
//                 {/* Empty space to match left column alignment */}
//                 <div className="w-12 flex justify-end">
//                   {!loader && (
//                     <div className="flex flex-col items-end gap-1 w-12 opacity-0">
//                       <div className="w-8 h-8 rounded-full"></div>
//                       <span className="text-xs font-semibold">0%</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* Empty progress bar for alignment */}
//               {!loader && (
//                 <div className="w-full bg-transparent rounded-full h-1.5">
//                   {/* Invisible progress bar to maintain spacing */}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Summary */}
//       {!loader && (
//         <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs">
//             <span className="text-gray-500 dark:text-gray-400 font-medium">Overall Performance</span>
//             <div className="flex items-center gap-2">
//               <div className={`
//                 w-2 h-2 rounded-full flex-shrink-0
//                 ${isOverallPositive 
//                   ? 'bg-green-500' 
//                   : 'bg-red-500'
//                 }
//               `} />
//               <span className={`
//                 font-semibold
//                 ${isOverallPositive 
//                   ? 'text-green-600 dark:text-green-400' 
//                   : 'text-red-600 dark:text-red-400'
//                 }
//               `}>
//                 {(isOverallPositive ? '+' : '') + formatPercentage(averagePerformance)}% avg
//               </span>
//             </div>
//           </div>
          
//           {/* Performance Indicator Bar */}
//           <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
//             <div 
//               className={`
//                 h-full rounded-full transition-all duration-1000 ease-out
//                 ${isOverallPositive 
//                   ? 'bg-gradient-to-r from-green-400 to-green-600' 
//                   : 'bg-gradient-to-r from-red-400 to-red-600'
//                 }
//               `}
//               style={{
//                 width: `${Math.min(Math.abs(averagePerformance) + 20, 100)}%`
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainCard;

import React, { useContext, useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { Context } from "../../context/Context";
import Loader from "../Loader";

const MainCard = ({
  currentMonth,
  lastMonth,
  LastDaySale,
  todaySale,
  first,
  second,
  third,
  four
}) => {
  const { loader, theme } = useContext(Context);
  const [percentage, setPercentage] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  // Reusable function for percentage calculation with safe handling
  const calculatePercentageChange = (current, previous) => {
    const currentNum = Number(current) || 0;
    const previousNum = Number(previous) || 0;
    
    if (previousNum === 0) return currentNum > 0 ? 100 : 0;
    return ((currentNum - previousNum) / previousNum) * 100;
  };

  useEffect(() => {
    const calculatedPercentage = calculatePercentageChange(currentMonth, lastMonth);
    setPercentage(isNaN(calculatedPercentage) ? 0 : calculatedPercentage);
  }, [currentMonth, lastMonth]);

  useEffect(() => {
    const calculatedPercentage2 = calculatePercentageChange(todaySale, LastDaySale);
    setPercentage2(isNaN(calculatedPercentage2) ? 0 : calculatedPercentage2);
  }, [todaySale, LastDaySale]);

  // Format numbers for better readability with safe handling
  const formatNumber = (num) => {
    const number = Number(num) || 0;
    return new Intl.NumberFormat("en-US").format(number);
  };

  const formatPercentage = (num) => {
    const number = Number(num) || 0;
    return Math.abs(number).toFixed(1);
  };

  // Safe average calculation for bottom summary
  const calculateSafeAverage = () => {
    const percent1 = Number(percentage) || 0;
    const percent2 = Number(percentage2) || 0;
    const average = (percent1 + percent2) / 2;
    return isNaN(average) ? 0 : average;
  };

  // Card data configuration for better organization
  const cardData = [
    {
      title: first,
      value: currentMonth,
      percentage: percentage,
      type: "primary"
    },
    {
      title: second,
      value: lastMonth,
      type: "secondary"
    },
    {
      title: third,
      value: todaySale,
      percentage: percentage2,
      type: "primary"
    },
    {
      title: four,
      value: LastDaySale,
      type: "secondary"
    }
  ];

  const getTrendIcon = (percent) => {
    const percentNum = Number(percent) || 0;
    const isPositive = percentNum >= 0;
    const Icon = isPositive ? FaArrowTrendUp : FaArrowTrendDown;
    const bgColor = isPositive 
      ? "bg-green-100 dark:bg-green-900/30" 
      : "bg-red-100 dark:bg-red-900/30";
    const iconColor = isPositive ? "text-green-600" : "text-red-600";

    return (
      <div className={`${bgColor} w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300`}>
        <Icon className={`${iconColor} text-sm`} />
      </div>
    );
  };

  const getPercentageText = (percent, isDark) => {
    const percentNum = Number(percent) || 0;
    const isPositive = percentNum >= 0;
    const textColor = isPositive 
      ? "text-green-600 dark:text-green-400" 
      : "text-red-600 dark:text-red-400";
    
    return (
      <span className={`font-semibold text-xs ${textColor}`}>
        {isPositive ? `+${formatPercentage(percentNum)}` : `-${formatPercentage(percentNum)}`}%
      </span>
    );
  };

  const getProgressWidth = (percent) => {
    const percentNum = Math.abs(Number(percent) || 0);
    return Math.min(percentNum + 10, 100);
  };

  const averagePerformance = calculateSafeAverage();
  const isOverallPositive = averagePerformance >= 0;

  return (
    <div className={`
      w-full max-w-sm min-w-[320px] 
      bg-white dark:bg-gray-800 
      rounded-2xl shadow-lg hover:shadow-xl 
      transition-all duration-300 
      border border-gray-100 dark:border-gray-700
      p-6
      group
      flex flex-col
    `}>
      {/* Main Grid Layout */}
      <div className="grid grid-cols-2 gap-6 h-full flex-1">
        
        {/* Left Column - Primary Metrics */}
        <div className="flex flex-col gap-6">
          {cardData.filter(item => item.type === "primary").map((item, index) => (
            <div key={index} className="space-y-3">
              {/* Title */}
              <h3 className={`
                text-xs font-medium uppercase tracking-wider 
                text-gray-500 dark:text-gray-400
                transition-colors duration-200
              `}>
                {item.title}
              </h3>
              
              {/* Value and Trend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {loader ? (
                    <Loader />
                  ) : (
                    <span className={`
                      text-2xl font-bold 
                      text-gray-900 dark:text-white
                      transition-colors duration-200
                      min-h-[32px] flex items-center
                    `}>
                      {formatNumber(item.value)}
                    </span>
                  )}
                </div>
                
                {/* Percentage Indicator */}
                {loader ? (
                  <div className="w-12 flex justify-end">
                    <Loader size="small" />
                  </div>
                ) : (
                  <div className="flex flex-col items-end gap-1 w-12">
                    {getTrendIcon(item.percentage)}
                    {getPercentageText(item.percentage, theme === "dark")}
                  </div>
                )}
              </div>
              
              {/* Full Width Progress Bar */}
              {!loader && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`
                      h-full rounded-full transition-all duration-1000 ease-out
                      ${Number(item.percentage) >= 0 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : 'bg-gradient-to-r from-red-400 to-red-600'
                      }
                    `}
                    style={{
                      width: `${getProgressWidth(item.percentage)}%`
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column - Secondary Metrics */}
        <div className="flex flex-col gap-6">
          {cardData.filter(item => item.type === "secondary").map((item, index) => (
            <div key={index} className="space-y-3">
              {/* Title */}
              <h3 className={`
                text-xs font-medium uppercase tracking-wider 
                text-gray-500 dark:text-gray-400
                transition-colors duration-200
              `}>
                {item.title}
              </h3>
              
              {/* Value - Properly aligned */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {loader ? (
                    <Loader />
                  ) : (
                    <span className={`
                      text-2xl font-bold 
                      text-gray-900 dark:text-white
                      transition-colors duration-200
                      min-h-[32px] flex items-center
                    `}>
                      {formatNumber(item.value)}
                    </span>
                  )}
                </div>
                
                {/* Empty space to match left column alignment */}
                <div className="w-12 flex justify-end">
                  {!loader && (
                    <div className="flex flex-col items-end gap-1 w-12 opacity-0">
                      <div className="w-8 h-8 rounded-full"></div>
                      <span className="text-xs font-semibold">0%</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Full Width Empty Progress Bar for alignment */}
              {!loader && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 opacity-30">
                  {/* Full width empty progress bar to maintain consistent spacing */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary */}
      {!loader && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs mb-3">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Overall Performance</span>
            <div className="flex items-center gap-2">
              <div className={`
                w-2 h-2 rounded-full flex-shrink-0
                ${isOverallPositive 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
                }
              `} />
              <span className={`
                font-semibold
                ${isOverallPositive 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
                }
              `}>
                {(isOverallPositive ? '+' : '') + formatPercentage(averagePerformance)}% avg
              </span>
            </div>
          </div>
          
          {/* Full Width Performance Indicator Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className={`
                h-full rounded-full transition-all duration-1000 ease-out
                ${isOverallPositive 
                  ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
                }
              `}
              style={{
                width: `${Math.min(Math.abs(averagePerformance) + 20, 100)}%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCard;