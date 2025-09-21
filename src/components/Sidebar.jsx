// import { useContext, useState } from "react";
// import { IoIosArrowBack } from "react-icons/io";
// import { FaHome } from "react-icons/fa";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { GiReceiveMoney } from "react-icons/gi";
// import { Link, useLocation } from "react-router-dom";
// import { Context } from "../context/Context";

// const Sidebar = () => {
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const { isCollapsed, theme } = useContext(Context);
//   const location = useLocation();

//   const menuItems = [
//     { name: "Home", icon: <FaHome />, link: "/" },
//     {
//       name: "Dashboard",
//       icon: <LuLayoutDashboard />,
//       subItems: [
//         { name: "Sale", icon: <LuLayoutDashboard />, link: "/cashsale" },
//         { name: "Collection", icon: <LuLayoutDashboard />, link: "/collection" },
//         { name: "Stock", icon: <LuLayoutDashboard />, link: "/stock" },
//         { name: "Receivable", icon: <LuLayoutDashboard />, link: "/receiveable" },
//         { name: "Bank Position", icon: <LuLayoutDashboard />, link: "/bank-posititon" },
//         { name: "Payable", icon: <LuLayoutDashboard />, link: "/payable" },
//         { name: "Recovery Analysis", icon: <LuLayoutDashboard />, link: "/sales-recovery" },
//         { name: "Installment Sales Analysis", icon: <LuLayoutDashboard />, link: "/install-recovery" },
//         { name: "B2B Sales Analysis ", icon: <LuLayoutDashboard />, link: "/b2b-sales-analysis" },
//       ],
//     },
//     // {
//     //   name: "Products",
//     //   icon: <GiReceiveMoney />,
//     //   subItems: [
//     //     { name: "Categories", icon: <LuLayoutDashboard />, link: "/categories" },
//     //     { name: "Variations", icon: <LuLayoutDashboard />, link: "/variations" },
//     //     { name: "Brands", icon: <LuLayoutDashboard />, link: "/brands" },
//     //   ],
//     // },
//   ];

//   const toggleSubmenu = (menuName) => {
//     setOpenSubmenu(openSubmenu === menuName ? null : menuName);
//   };

//   const isDark = theme === "dark";

//   return (
//     <div
//       className={`fixed top-0 left-0 min-h-screen z-50 transition-all duration-300
//         ${isDark ? "bg-[#1d1f33] text-white" : "bg-white text-[#637381] font-semibold"}
//         ${isCollapsed ? "w-16" : "w-[240px]"}
//       `}
//     >
//       {/* Header */}
//       <div
//         className={`flex items-center justify-between h-[60px] px-4
//           ${isDark ? "bg-[#1d1f33] text-white" : "bg-white text-black border-b border-gray-300"}
//         `}
//       >
//         {!isCollapsed && (
//           <h1 className="text-xl font-bold flex justify-center items-center gap-8">
//             ZAKA BROTHERS <div className="w-2 h-2 rounded-full bg-green-400"></div>
//           </h1>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="w-full">
//         {menuItems.map((item) => {
//           const isActiveMain = item.link && location.pathname === item.link;
//           const isSubOpen = openSubmenu === item.name;

//           return (
//             <div key={item.name} className="relative group">
//               {/* Main menu button */}
//               <button
//                 onClick={() =>
//                   !isCollapsed && item.subItems && toggleSubmenu(item.name)
//                 }
//                 className={`flex items-center px-4 py-3 w-full transition-all
//                   ${isCollapsed ? "justify-center" : ""}
//                   ${
//                     isActiveMain
//                       ? isDark
//                         ? "bg-[#141522] text-white border-l-2 border-l-green-500"
//                         : "bg-[#ebf8f4] text-[#13ad7a] border-l-2 border-l-green-500"
//                       : isDark
//                       ? "hover:bg-[#141522]"
//                       : "hover:bg-[#f6f7f8]"
//                   }
//                 `}
//               >
//                 <span className="text-xl">{item.icon}</span>
//                 {!isCollapsed && (
//                   <Link
//                     to={item.link || "#"}
//                     className="ml-3 text-sm flex justify-between items-center w-full"
//                   >
//                     <span>{item.name}</span>
//                     {item.subItems && (
//                       <IoIosArrowBack
//                         size={13}
//                         className={`transition-transform ${
//                           isSubOpen ? "rotate-90" : "rotate-0"
//                         }`}
//                       />
//                     )}
//                   </Link>
//                 )}
//               </button>

//               {/* Tooltip (collapsed sidebar) */}
//               {isCollapsed && (
//                 <div
//                   className={`absolute left-full z-10 top-0 min-w-[200px] rounded-md py-2 shadow-lg
//                     ${
//                       isDark
//                         ? "bg-gray-800 text-white"
//                         : "border border-gray-200 bg-white text-[#1c252e]"
//                     }
//                     opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300
//                   `}
//                 >
//                   <div className="px-4 py-2 font-bold">{item.name}</div>
//                   {item.subItems &&
//                     item.subItems.map((subItem) => (
//                       <Link
//                         to={subItem.link}
//                         key={subItem.name}
//                         className={`flex items-center px-4 py-2 text-sm transition-colors duration-200
//                           ${isDark ? "hover:bg-[#141522]" : "hover:bg-[#efeeef]"}
//                         `}
//                       >
//                         <span className="mr-2 text-lg">{subItem.icon}</span>
//                         {subItem.name}
//                       </Link>
//                     ))}
//                 </div>
//               )}

//               {/* Expanded submenu (open sidebar) */}
//               {!isCollapsed && item.subItems && (
//                 <div
//                   className={`overflow-hidden transition-[max-height] duration-500 ease-in-out
//                     ${isDark ? "bg-[#141522]" : ""}
//                     ${isSubOpen ? "max-h-[500px]" : "max-h-0"}
//                   `}
//                 >
//                   {item.subItems.map((subItem) => {
//                     const isActiveSub = location.pathname === subItem.link;
//                     return (
//                       <Link
//                         to={subItem.link}
//                         key={subItem.name}
//                         className={`flex items-center p-2 text-sm pl-4 w-full  transition-colors duration-100
//                           ${
//                             isActiveSub
//                               ? isDark
//                                 ? "bg-[#141522] text-white border-l-2 border-l-green-500"
//                                 : "bg-[#ebf8f4] text-[#13ad7a] border-l-2 border-l-green-500"
//                               : isDark
//                               ? "hover:bg-[#141522]"
//                               : "hover:bg-[#f7f6f8]"
//                           }
//                         `}
//                       >
//                         <span className="mr-2 text-lg">{subItem.icon}</span>
//                         {subItem.name}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { 
  FaHome, 
  FaChartLine, 
  FaMoneyBillWave, 
  FaBoxes, 
  FaReceipt, 
  FaPiggyBank, 
  FaCreditCard,
  FaChartPie,
  FaChartBar,
  FaStore,
  FaTags,
  FaShapes,
  FaRegStar
} from "react-icons/fa";
import { 
  HiOutlineCash, 
  HiOutlineCollection, 
  HiOutlineTrendingUp,
  HiOutlineShoppingCart
} from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { isCollapsed, theme } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      name: "Home", 
      icon: <FaHome className="text-lg" />, 
      link: "/" 
    },
    {
      name: "Dashboard",
      icon: <FaChartLine className="text-lg" />,
      subItems: [
        { name: "Sale", icon: <HiOutlineCash className="text-lg" />, link: "/cashsale" },
        { name: "Collection", icon: <HiOutlineCollection className="text-lg" />, link: "/collection" },
        { name: "Stock", icon: <FaBoxes className="text-lg" />, link: "/stock" },
        { name: "Receivable", icon: <FaReceipt className="text-lg" />, link: "/receiveable" },
        { name: "Bank Position", icon: <FaPiggyBank className="text-lg" />, link: "/bank-posititon" },
        { name: "Payable", icon: <FaCreditCard className="text-lg" />, link: "/payable" },
        { name: "Recovery Analysis", icon: <HiOutlineTrendingUp className="text-lg" />, link: "/sales-recovery" },
        { name: "Installment Sales Analysis", icon: <FaChartPie className="text-lg" />, link: "/install-recovery" },
        { name: "B2B Sales Analysis", icon: <FaChartBar className="text-lg" />, link: "/b2b-sales-analysis" },
      ],
    },
  ];

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed top-0 left-0 min-h-screen z-50 transition-all duration-300 overflow-hidden
        ${isDark ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" : "bg-gradient-to-b from-white to-gray-50 text-gray-700"}
        ${isCollapsed ? "w-16" : "w-[260px]"}
        shadow-xl
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-center h-[70px] px-4 border-b
          ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
        `}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              ZB
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">ZAKA BROTHERS</h1>
              <div className="flex items-center gap-1 text-xs text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            ZB
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="w-full mt-4 px-2">
        {menuItems.map((item) => {
          const isActiveMain = item.link && location.pathname === item.link;
          const isSubOpen = openSubmenu === item.name;
          const hasActiveSub = item.subItems?.some(subItem => location.pathname === subItem.link);

          return (
            <div key={item.name} className="relative group mb-1">
              {/* Main menu item - Handle Home separately since it doesn't have subItems */}
              {item.link && !item.subItems ? (
                <Link
                  to={item.link}
                  className={`flex items-center px-4 py-3 w-full transition-all duration-200 rounded-lg
                    ${isCollapsed ? "justify-center" : ""}
                    ${
                      isActiveMain
                        ? isDark
                          ? "bg-blue-900/30 text-blue-300 border-l-4 border-l-blue-500"
                          : "bg-blue-50 text-blue-600 border-l-4 border-l-blue-500"
                        : isDark
                        ? "hover:bg-gray-800/50 hover:text-white"
                        : "hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <span className={`${isActiveMain ? "text-blue-400" : "text-gray-400"} transition-colors`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              ) : (
                <>
                  {/* Main menu button for items with submenus */}
                  <button
                    onClick={() => item.subItems && toggleSubmenu(item.name)}
                    className={`flex items-center px-4 py-3 w-full transition-all duration-200 rounded-lg
                      ${isCollapsed ? "justify-center" : "justify-between"}
                      ${
                        hasActiveSub
                          ? isDark
                            ? "bg-blue-900/30 text-blue-300 border-l-4 border-l-blue-500"
                            : "bg-blue-50 text-blue-600 border-l-4 border-l-blue-500"
                          : isDark
                          ? "hover:bg-gray-800/50 hover:text-white"
                          : "hover:bg-gray-100 hover:text-gray-900"
                      }
                      ${isCollapsed && hasActiveSub ? "bg-blue-900/30" : ""}
                    `}
                  >
                    <div className="flex items-center">
                      <span className={`${hasActiveSub ? "text-blue-400" : "text-gray-400"} transition-colors`}>
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <span className="ml-3 text-sm font-medium">{item.name}</span>
                      )}
                    </div>
                    
                    {!isCollapsed && item.subItems && (
                      <IoIosArrowDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isSubOpen ? "rotate-180" : "rotate-0"
                        } ${hasActiveSub ? "text-blue-400" : "text-gray-400"}`}
                      />
                    )}
                  </button>

                  {/* Tooltip (collapsed sidebar) */}
                  {isCollapsed && (
                    <div
                      className={`absolute left-full ml-2 z-50 min-w-[200px] rounded-lg py-2 shadow-2xl
                        ${
                          isDark
                            ? "bg-gray-800 border border-gray-700 text-white"
                            : "border border-gray-200 bg-white text-gray-800 shadow-xl"
                        }
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2
                      `}
                    >
                      <div className="px-4 py-2 font-semibold border-b border-gray-200/30">{item.name}</div>
                      {item.subItems &&
                        item.subItems.map((subItem) => {
                          const isActiveSub = location.pathname === subItem.link;
                          return (
                            <Link
                              to={subItem.link}
                              key={subItem.name}
                              className={`flex items-center px-4 py-3 text-sm transition-colors duration-200
                                ${
                                  isActiveSub
                                    ? isDark
                                      ? "bg-blue-900/20 text-blue-300"
                                      : "bg-blue-50 text-blue-600"
                                    : isDark
                                    ? "hover:bg-gray-700/50"
                                    : "hover:bg-gray-50"
                                }
                              `}
                            >
                              <span className="mr-3">{subItem.icon}</span>
                              {subItem.name}
                              {isActiveSub && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
                              )}
                            </Link>
                          );
                        })}
                    </div>
                  )}

                  {/* Expanded submenu (open sidebar) */}
                  {!isCollapsed && item.subItems && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${isDark ? "bg-gray-800/20" : "bg-gray-50/50"}
                        ${isSubOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                        rounded-lg ml-4 mt-1
                      `}
                    >
                      {item.subItems.map((subItem) => {
                        const isActiveSub = location.pathname === subItem.link;
                        return (
                          <Link
                            to={subItem.link}
                            key={subItem.name}
                            className={`flex items-center p-3 text-sm transition-all duration-200 rounded-lg mx-2 my-1
                              ${
                                isActiveSub
                                  ? isDark
                                    ? "bg-blue-900/30 text-blue-300 shadow-lg"
                                    : "bg-blue-100 text-blue-600 shadow-md"
                                  : isDark
                                  ? "hover:bg-gray-700/30 hover:text-white"
                                  : "hover:bg-gray-100 hover:text-gray-900"
                              }
                            `}
                          >
                            <span className={`mr-3 ${isActiveSub ? "text-blue-400" : "text-gray-400"}`}>
                              {subItem.icon}
                            </span>
                            {subItem.name}
                            {isActiveSub && (
                              <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom spacer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        {!isCollapsed && (
          <p className="text-xs text-gray-500">
            v1.0.0
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;