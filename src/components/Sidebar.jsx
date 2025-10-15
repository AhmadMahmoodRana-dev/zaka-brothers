import { useContext, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaHome, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { isCollapsed, theme } = useContext(Context);
  const location = useLocation();

  const menuItems = [
    { 
      name: "Home", 
      icon: <FaHome className="text-lg" />, 
      link: "/" ,
      type:'link',
      enabled: true
    },
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard className="text-lg" />,
      subItems: [
        { name: "Sale", icon: "📊", link: "/cashsale" },
        { name: "Collection", icon: "💰", link: "/collection" },
        { name: "Stock", icon: "📦", link: "/stock" },
        { name: "Receivable", icon: "📈", link: "/receiveable" },
        { name: "Bank Position", icon: "🏦", link: "/bank-posititon" },
        { name: "Payable", icon: "📤", link: "/payable" },
        { name: "Recovery Analysis", icon: "🔍", link: "/sales-recovery" },
        { name: "Balance Summary", icon: "💼", link: "/balance-summary" },
        { name: "Installment Analysis", icon: "📅", link: "/install-recovery" },
        { name: "B2B Sales Analysis", icon: "👥", link: "/b2b-sales-analysis" },
        
      ],
    },
  ];

  const toggleSubmenu = (menuName) => {
    if (!isCollapsed) {
      setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    }
  };

  const handleHomeClick = () => {
    // If sidebar is collapsed and we're clicking on home, navigate to home
    if (isCollapsed) {
      window.location.href = "/";
    }
  };

  const isDark = theme === "dark";

  // Check if any subitem is active
  const isSubItemActive = (subItems) => {
    return subItems?.some(subItem => location.pathname === subItem.link);
  };

  return (
    <div
      className={`fixed top-0 left-0 min-h-screen z-50 transition-all duration-300 ease-in-out shadow-xl
        ${isDark 
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" 
          : "bg-gradient-to-b from-white to-gray-50 text-gray-700 border-r border-gray-200"
        }
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Header */}
      <div
        className={`flex items-center h-16 px-4 border-b transition-all duration-300
          ${isDark 
            ? "border-gray-700 bg-gray-900" 
            : "border-gray-200 bg-white"
          }
          ${isCollapsed ? "justify-center" : "justify-between"}
        `}
      >
        {!isCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">ZAKA BROTHERS</h1>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">Z</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="w-full mt-4 space-y-1">
        {menuItems.map((item) => {
          const isActiveMain = item.link && location.pathname === item.link;
          const isSubOpen = openSubmenu === item.name;
          const hasActiveSubItem = item.subItems && isSubItemActive(item.subItems);

          return (
            <div 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.name)}
            >
              {/* For items with links (like Home) - Use Link component */}
              {item.link && !item.subItems ? (
                <Link
                  to={item.link}
                  className={`flex items-center w-full px-4 py-3 transition-all duration-200 ease-in-out relative
                    ${isCollapsed ? "justify-center" : "justify-between"}
                    ${
                      isActiveMain || hasActiveSubItem
                        ? isDark
                          ? "bg-blue-900/30 text-blue-300 border-r-4 border-blue-500"
                          : "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                        : isDark
                        ? "hover:bg-gray-800/50 text-gray-300"
                        : "hover:bg-gray-100 text-gray-600"
                    }
                    ${isCollapsed && (isActiveMain || hasActiveSubItem) ? "border-r-4 border-blue-500" : ""}
                  `}
                  onClick={handleHomeClick}
                >
                  <div className="flex items-center">
                    <span className={`transition-transform duration-200 ${isActiveMain ? "scale-110" : ""}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="ml-3 text-sm font-medium">{item.name}</span>
                    )}
                  </div>
                </Link>
              ) : (
                /* For items with submenus (like Dashboard) - Use button component */
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`flex items-center w-full px-4 py-3 transition-all duration-200 ease-in-out relative
                    ${isCollapsed ? "justify-center" : "justify-between"}
                    ${
                      isActiveMain || hasActiveSubItem
                        ? isDark
                          ? "bg-blue-900/30 text-blue-300 border-r-4 border-blue-500"
                          : "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                        : isDark
                        ? "hover:bg-gray-800/50 text-gray-300"
                        : "hover:bg-gray-100 text-gray-600"
                    }
                    ${isCollapsed && (isActiveMain || hasActiveSubItem) ? "border-r-4 border-blue-500" : ""}
                  `}
                >
                  <div className="flex items-center">
                    <span className={`transition-transform duration-200 ${isActiveMain ? "scale-110" : ""}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span className="ml-3 text-sm font-medium">{item.name}</span>
                    )}
                  </div>
                  
                  {!isCollapsed && item.subItems && (
                    <FaChevronDown 
                      className={`text-xs transition-transform duration-200 ${
                        isSubOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              )}

              {/* Active indicator for collapsed state */}
              {isCollapsed && (isActiveMain || hasActiveSubItem) && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full"></div>
              )}

              {/* Tooltip for collapsed sidebar */}
              {isCollapsed && hoveredItem === item.name && (
                <div
                  className={`absolute left-full ml-2 z-50 rounded-lg shadow-2xl border
                    ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-gray-200 text-gray-800"
                    }
                    animate-in slide-in-from-left-2 duration-200
                  `}
                >
                  {/* For items with links (like Home) - Show clickable tooltip */}
                  {item.link && !item.subItems ? (
                    <Link
                      to={item.link}
                      className={`block px-4 py-3 font-semibold transition-all duration-150
                        ${
                          isActiveMain
                            ? isDark
                              ? "bg-blue-900/30 text-blue-300"
                              : "bg-blue-50 text-blue-600"
                            : isDark
                            ? "hover:bg-gray-700"
                            : "hover:bg-gray-50"
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    /* For items with submenus - Show dropdown tooltip */
                    <>
                      <div className={`px-4 py-2 font-semibold border-b ${
                        isDark ? "border-gray-700" : "border-gray-200"
                      }`}>
                        {item.name}
                      </div>
                      {item.subItems && item.subItems.map((subItem) => {
                        const isActiveSub = location.pathname === subItem.link;
                        return (
                          <Link
                            to={subItem.link}
                            key={subItem.name}
                            className={`flex items-center px-4 py-2 text-sm transition-all duration-150
                              ${
                                isActiveSub
                                  ? isDark
                                    ? "bg-blue-900/30 text-blue-300"
                                    : "bg-blue-50 text-blue-600"
                                  : isDark
                                  ? "hover:bg-gray-700"
                                  : "hover:bg-gray-50"
                              }
                            `}
                          >
                            <span className="mr-3 text-base">{subItem.icon}</span>
                            {subItem.name}
                            {isActiveSub && (
                              <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
              )}

              {/* Expanded submenu */}
              {!isCollapsed && item.subItems && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isDark ? "bg-gray-900/30" : "bg-gray-50"}
                    ${isSubOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  {item.subItems.map((subItem) => {
                    const isActiveSub = location.pathname === subItem.link;
                    return (
                      <Link
                        to={subItem.link}
                        key={subItem.name}
                        className={`flex items-center py-2.5 px-8 text-sm transition-all duration-200 group/subitem
                          ${
                            isActiveSub
                              ? isDark
                                ? "bg-blue-900/20 text-blue-300 border-r-4 border-blue-500"
                                : "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
                              : isDark
                              ? "hover:bg-gray-800/50 text-gray-400 hover:text-gray-200"
                              : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                          }
                        `}
                      >
                        <span className="mr-3 text-base transition-transform duration-200 group-hover/subitem:scale-110">
                          {subItem.icon}
                        </span>
                        <span className="font-medium">{subItem.name}</span>
                        {isActiveSub && (
                          <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
          isDark ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-white/50"
        }`}>
          <div className="text-xs text-center text-gray-500">
            v1.0.0 • © 2025 Zaka Brothers
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

// import { useContext, useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { FaHome, FaChevronRight, FaChevronDown } from "react-icons/fa";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { GiReceiveMoney } from "react-icons/gi";
// import { Link, useLocation } from "react-router-dom";
// import { Context } from "../context/Context";

// const Sidebar = () => {
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const { isCollapsed, theme } = useContext(Context);
//   const location = useLocation();

//   const menuItems = [
//     { 
//       name: "Home", 
//       icon: <FaHome className="text-lg" />, 
//       link: "/" ,
//       type:'link'
//     },
//     {
//       name: "Dashboard",
//       icon: <LuLayoutDashboard className="text-lg" />,
//       subItems: [
//         { name: "Sale", icon: "📊", link: "/cashsale" },
//         { name: "Collection", icon: "💰", link: "/collection" },
//         { name: "Stock", icon: "📦", link: "/stock" },
//         { name: "Receivable", icon: "📈", link: "/receiveable" },
//         { name: "Bank Position", icon: "🏦", link: "/bank-posititon" },
//         { name: "Payable", icon: "📤", link: "/payable" },
//         { name: "Recovery Analysis", icon: "🔍", link: "/sales-recovery" },
//         { name: "Installment Analysis", icon: "📅", link: "/install-recovery" },
//         { name: "B2B Sales Analysis", icon: "👥", link: "/b2b-sales-analysis" },
//       ],
//     },
//   ];

//   const toggleSubmenu = (menuName) => {
//     if (!isCollapsed) {
//       setOpenSubmenu(openSubmenu === menuName ? null : menuName);
//     }
//   };

//   const isDark = theme === "dark";

//   // Check if any subitem is active
//   const isSubItemActive = (subItems) => {
//     return subItems?.some(subItem => location.pathname === subItem.link);
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 min-h-screen z-50 transition-all duration-300 ease-in-out shadow-xl
//         ${isDark 
//           ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" 
//           : "bg-gradient-to-b from-white to-gray-50 text-gray-700 border-r border-gray-200"
//         }
//         ${isCollapsed ? "w-16" : "w-64"}
//       `}
//       onMouseLeave={() => setHoveredItem(null)}
//     >
//       {/* Header */}
//       <div
//         className={`flex items-center h-16 px-4 border-b transition-all duration-300
//           ${isDark 
//             ? "border-gray-700 bg-gray-900" 
//             : "border-gray-200 bg-white"
//           }
//           ${isCollapsed ? "justify-center" : "justify-between"}
//         `}
//       >
//         {!isCollapsed ? (
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-lg">Z</span>
//             </div>
//             <div>
//               <h1 className="text-lg font-bold">ZAKA BROTHERS</h1>
//               <div className="flex items-center space-x-1">
//                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
//                 <span className="text-xs text-green-400">Online</span>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
//             <span className="text-white font-bold text-lg">Z</span>
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="w-full mt-4 space-y-1">
//         {menuItems.map((item) => {
//           const isActiveMain = item.link && location.pathname === item.link;
//           const isSubOpen = openSubmenu === item.name;
//           const hasActiveSubItem = item.subItems && isSubItemActive(item.subItems);

//           return (
//             <div 
//               key={item.name} 
//               className="relative group"
//               onMouseEnter={() => setHoveredItem(item.name)}
//             >
//               {/* Main menu button */}
//               <button
//                 onClick={() => toggleSubmenu(item.name)}
//                 className={`flex items-center w-full px-4 py-3 transition-all duration-200 ease-in-out relative
//                   ${isCollapsed ? "justify-center" : "justify-between"}
//                   ${
//                     isActiveMain || hasActiveSubItem
//                       ? isDark
//                         ? "bg-blue-900/30 text-blue-300 border-r-4 border-blue-500"
//                         : "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
//                       : isDark
//                       ? "hover:bg-gray-800/50 text-gray-300"
//                       : "hover:bg-gray-100 text-gray-600"
//                   }
//                   ${isCollapsed && (isActiveMain || hasActiveSubItem) ? "border-r-4 border-blue-500" : ""}
//                 `}
//               >
//                 <div className="flex items-center">
//                   <span className={`transition-transform duration-200 ${isActiveMain ? "scale-110" : ""}`}>
//                     {item.icon}
//                   </span>
//                   {!isCollapsed && (
//                     <span className="ml-3 text-sm font-medium">{item.name}</span>
//                   )}
//                 </div>
                
//                 {!isCollapsed && item.subItems && (
//                   <FaChevronDown 
//                     className={`text-xs transition-transform duration-200 ${
//                       isSubOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 )}
//               </button>

//               {/* Active indicator for collapsed state */}
//               {isCollapsed && (isActiveMain || hasActiveSubItem) && (
//                 <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-l-full"></div>
//               )}

//               {/* Tooltip for collapsed sidebar */}
//               {isCollapsed && hoveredItem === item.name && (
//                 <div
//                   className={`absolute left-full ml-2 z-50 min-w-[180px] rounded-lg shadow-2xl border
//                     ${
//                       isDark
//                         ? "bg-gray-800 border-gray-700 text-white"
//                         : "bg-white border-gray-200 text-gray-800"
//                     }
//                     animate-in slide-in-from-left-2 duration-200
//                   `}
//                 >
//                   <div className={`px-4 py-2 font-semibold border-b ${
//                     isDark ? "border-gray-700" : "border-gray-200"
//                   }`}>
//                     {item.name}
//                   </div>
//                   {item.subItems && item.subItems.map((subItem) => {
//                     const isActiveSub = location.pathname === subItem.link;
//                     return (
//                       <Link
//                         to={subItem.link}
//                         key={subItem.name}
//                         className={`flex items-center px-4 py-2 text-sm transition-all duration-150
//                           ${
//                             isActiveSub
//                               ? isDark
//                                 ? "bg-blue-900/30 text-blue-300"
//                                 : "bg-blue-50 text-blue-600"
//                               : isDark
//                               ? "hover:bg-gray-700"
//                               : "hover:bg-gray-50"
//                           }
//                         `}
//                       >
//                         <span className="mr-3 text-base">{subItem.icon}</span>
//                         {subItem.name}
//                         {isActiveSub && (
//                           <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
//                         )}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}

//               {/* Expanded submenu */}
//               {!isCollapsed && item.subItems && (
//                 <div
//                   className={`overflow-hidden transition-all duration-300 ease-in-out
//                     ${isDark ? "bg-gray-900/30" : "bg-gray-50"}
//                     ${isSubOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
//                   `}
//                 >
//                   {item.subItems.map((subItem) => {
//                     const isActiveSub = location.pathname === subItem.link;
//                     return (
//                       <Link
//                         to={subItem.link}
//                         key={subItem.name}
//                         className={`flex items-center py-2.5 px-8 text-sm transition-all duration-200 group/subitem
//                           ${
//                             isActiveSub
//                               ? isDark
//                                 ? "bg-blue-900/20 text-blue-300 border-r-4 border-blue-500"
//                                 : "bg-blue-50 text-blue-600 border-r-4 border-blue-500"
//                               : isDark
//                               ? "hover:bg-gray-800/50 text-gray-400 hover:text-gray-200"
//                               : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
//                           }
//                         `}
//                       >
//                         <span className="mr-3 text-base transition-transform duration-200 group-hover/subitem:scale-110">
//                           {subItem.icon}
//                         </span>
//                         <span className="font-medium">{subItem.name}</span>
//                         {isActiveSub && (
//                           <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                         )}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Sidebar Footer */}
//       {!isCollapsed && (
//         <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
//           isDark ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-white/50"
//         }`}>
//           <div className="text-xs text-center text-gray-500">
//             v1.0.0 • © 2025 Zaka Brothers
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

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

// import { useContext, useState } from "react";
// import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
// import { 
//   FaHome, 
//   FaChartLine, 
//   FaMoneyBillWave, 
//   FaBoxes, 
//   FaReceipt, 
//   FaPiggyBank, 
//   FaCreditCard,
//   FaChartPie,
//   FaChartBar,
//   FaStore,
//   FaTags,
//   FaShapes,
//   FaRegStar
// } from "react-icons/fa";
// import { 
//   HiOutlineCash, 
//   HiOutlineCollection, 
//   HiOutlineTrendingUp,
//   HiOutlineShoppingCart
// } from "react-icons/hi";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Context } from "../context/Context";

// const Sidebar = () => {
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const { isCollapsed, theme } = useContext(Context);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const menuItems = [
//     { 
//       name: "Home", 
//       icon: <FaHome className="text-lg" />, 
//       link: "/" 
//     },
//     {
//       name: "Dashboard",
//       icon: <FaChartLine className="text-lg" />,
//       subItems: [
//         { name: "Sale", icon: <HiOutlineCash className="text-lg" />, link: "/cashsale" },
//         { name: "Collection", icon: <HiOutlineCollection className="text-lg" />, link: "/collection" },
//         { name: "Stock", icon: <FaBoxes className="text-lg" />, link: "/stock" },
//         { name: "Receivable", icon: <FaReceipt className="text-lg" />, link: "/receiveable" },
//         { name: "Bank Position", icon: <FaPiggyBank className="text-lg" />, link: "/bank-posititon" },
//         { name: "Payable", icon: <FaCreditCard className="text-lg" />, link: "/payable" },
//         { name: "Recovery Analysis", icon: <HiOutlineTrendingUp className="text-lg" />, link: "/sales-recovery" },
//         { name: "Installment Sales Analysis", icon: <FaChartPie className="text-lg" />, link: "/install-recovery" },
//         { name: "B2B Sales Analysis", icon: <FaChartBar className="text-lg" />, link: "/b2b-sales-analysis" },
//       ],
//     },
//   ];

//   const toggleSubmenu = (menuName) => {
//     setOpenSubmenu(openSubmenu === menuName ? null : menuName);
//   };

//   const handleHomeClick = () => {
//     navigate("/");
//   };

//   const isDark = theme === "dark";

//   return (
//     <div
//       className={`fixed top-0 left-0 min-h-screen z-50 transition-all duration-300 overflow-hidden
//         ${isDark ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" : "bg-gradient-to-b from-white to-gray-50 text-gray-700"}
//         ${isCollapsed ? "w-16" : "w-[260px]"}
//         shadow-xl
//       `}
//     >
//       {/* Header */}
//       <div
//         className={`flex items-center justify-center h-[70px] px-4 border-b
//           ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
//         `}
//       >
//         {!isCollapsed && (
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
//               ZB
//             </div>
//             <div className="flex flex-col">
//               <h1 className="text-lg font-bold">ZAKA BROTHERS</h1>
//               <div className="flex items-center gap-1 text-xs text-green-400">
//                 <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
//                 <span>Online</span>
//               </div>
//             </div>
//           </div>
//         )}
//         {isCollapsed && (
//           <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
//             ZB
//           </div>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="w-full mt-4 px-2">
//         {menuItems.map((item) => {
//           const isActiveMain = item.link && location.pathname === item.link;
//           const isSubOpen = openSubmenu === item.name;
//           const hasActiveSub = item.subItems?.some(subItem => location.pathname === subItem.link);

//           return (
//             <div key={item.name} className="relative group mb-1">
//               {/* Main menu item - Handle Home separately since it doesn't have subItems */}
//               {item.link && !item.subItems ? (
//                 <Link
//                   to={item.link}
//                   className={`flex items-center px-4 py-3 w-full transition-all duration-200 rounded-lg
//                     ${isCollapsed ? "justify-center" : ""}
//                     ${
//                       isActiveMain
//                         ? isDark
//                           ? "bg-blue-900/30 text-blue-300 border-l-4 border-l-blue-500"
//                           : "bg-blue-50 text-blue-600 border-l-4 border-l-blue-500"
//                         : isDark
//                         ? "hover:bg-gray-800/50 hover:text-white"
//                         : "hover:bg-gray-100 hover:text-gray-900"
//                     }
//                   `}
//                 >
//                   <span className={`${isActiveMain ? "text-blue-400" : "text-gray-400"} transition-colors`}>
//                     {item.icon}
//                   </span>
//                   {!isCollapsed && (
//                     <span className="ml-3 text-sm font-medium">{item.name}</span>
//                   )}
//                 </Link>
//               ) : (
//                 <>
//                   {/* Main menu button for items with submenus */}
//                   <button
//                     onClick={() => item.subItems && toggleSubmenu(item.name)}
//                     className={`flex items-center px-4 py-3 w-full transition-all duration-200 rounded-lg
//                       ${isCollapsed ? "justify-center" : "justify-between"}
//                       ${
//                         hasActiveSub
//                           ? isDark
//                             ? "bg-blue-900/30 text-blue-300 border-l-4 border-l-blue-500"
//                             : "bg-blue-50 text-blue-600 border-l-4 border-l-blue-500"
//                           : isDark
//                           ? "hover:bg-gray-800/50 hover:text-white"
//                           : "hover:bg-gray-100 hover:text-gray-900"
//                       }
//                       ${isCollapsed && hasActiveSub ? "bg-blue-900/30" : ""}
//                     `}
//                   >
//                     <div className="flex items-center">
//                       <span className={`${hasActiveSub ? "text-blue-400" : "text-gray-400"} transition-colors`}>
//                         {item.icon}
//                       </span>
//                       {!isCollapsed && (
//                         <span className="ml-3 text-sm font-medium">{item.name}</span>
//                       )}
//                     </div>
                    
//                     {!isCollapsed && item.subItems && (
//                       <IoIosArrowDown
//                         size={14}
//                         className={`transition-transform duration-200 ${
//                           isSubOpen ? "rotate-180" : "rotate-0"
//                         } ${hasActiveSub ? "text-blue-400" : "text-gray-400"}`}
//                       />
//                     )}
//                   </button>

//                   {/* Tooltip (collapsed sidebar) */}
//                   {isCollapsed && (
//                     <div
//                       className={`absolute left-full ml-2 z-50 min-w-[200px] rounded-lg py-2 shadow-2xl
//                         ${
//                           isDark
//                             ? "bg-gray-800 border border-gray-700 text-white"
//                             : "border border-gray-200 bg-white text-gray-800 shadow-xl"
//                         }
//                         opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2
//                       `}
//                     >
//                       <div className="px-4 py-2 font-semibold border-b border-gray-200/30">{item.name}</div>
//                       {item.subItems &&
//                         item.subItems.map((subItem) => {
//                           const isActiveSub = location.pathname === subItem.link;
//                           return (
//                             <Link
//                               to={subItem.link}
//                               key={subItem.name}
//                               className={`flex items-center px-4 py-3 text-sm transition-colors duration-200
//                                 ${
//                                   isActiveSub
//                                     ? isDark
//                                       ? "bg-blue-900/20 text-blue-300"
//                                       : "bg-blue-50 text-blue-600"
//                                     : isDark
//                                     ? "hover:bg-gray-700/50"
//                                     : "hover:bg-gray-50"
//                                 }
//                               `}
//                             >
//                               <span className="mr-3">{subItem.icon}</span>
//                               {subItem.name}
//                               {isActiveSub && (
//                                 <div className="ml-auto w-2 h-2 rounded-full bg-blue-500"></div>
//                               )}
//                             </Link>
//                           );
//                         })}
//                     </div>
//                   )}

//                   {/* Expanded submenu (open sidebar) */}
//                   {!isCollapsed && item.subItems && (
//                     <div
//                       className={`overflow-hidden transition-all duration-300 ease-in-out
//                         ${isDark ? "bg-gray-800/20" : "bg-gray-50/50"}
//                         ${isSubOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
//                         rounded-lg ml-4 mt-1
//                       `}
//                     >
//                       {item.subItems.map((subItem) => {
//                         const isActiveSub = location.pathname === subItem.link;
//                         return (
//                           <Link
//                             to={subItem.link}
//                             key={subItem.name}
//                             className={`flex items-center p-3 text-sm transition-all duration-200 rounded-lg mx-2 my-1
//                               ${
//                                 isActiveSub
//                                   ? isDark
//                                     ? "bg-blue-900/30 text-blue-300 shadow-lg"
//                                     : "bg-blue-100 text-blue-600 shadow-md"
//                                   : isDark
//                                   ? "hover:bg-gray-700/30 hover:text-white"
//                                   : "hover:bg-gray-100 hover:text-gray-900"
//                               }
//                             `}
//                           >
//                             <span className={`mr-3 ${isActiveSub ? "text-blue-400" : "text-gray-400"}`}>
//                               {subItem.icon}
//                             </span>
//                             {subItem.name}
//                             {isActiveSub && (
//                               <div className="ml-auto w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
//                             )}
//                           </Link>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Bottom spacer */}
//       <div className="absolute bottom-4 left-0 right-0 text-center">
//         {!isCollapsed && (
//           <p className="text-xs text-gray-500">
//             v1.0.0
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;