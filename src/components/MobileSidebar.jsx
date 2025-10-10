// import { useContext, useState } from "react";
// import { IoIosArrowBack } from "react-icons/io";
// import { Context } from "../context/Context";
// import { Link } from "react-router-dom";

// const MobileSidebar = () => {
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const { isCollapsed } = useContext(Context);

//   const menuItems = [
//     { name: "Home", icon: "🏠", link: "/" },
//     {
//       name: "Dashboard",
//       icon: "👤",
//       subItems: [
//         { name: "Sale", icon: "🧑", link: "/cashsale" },
//         { name: "Collection", icon: "🔑", link: "/collection" },
//         { name: "Sales Commission Agents", icon: "💼" },
//       ],
//     },
//     {
//       name: "Products",
//       icon: "📦",
//       subItems: [
//         { name: "Categories", icon: "📂" },
//         { name: "Variations", icon: "🎨" },
//         { name: "Brands", icon: "🏷️" },
//       ],
//     },
//     // { name: "Manufacturing", icon: "🏭" },
//     // { name: "Purchases", icon: "🛒" },
//     // { name: "Sell", icon: "💰" },
//     // { name: "Stock Transfers", icon: "🚚" },
//     // { name: "Expenses", icon: "📉" },
//     // { name: "Payment Accounts", icon: "💳" },
//     // { name: "Ageing Balance Report", icon: "📊" },
//     // { name: "Reports", icon: "📄" },
//   ];


//   const toggleSubmenu = (menuName) => {
//     setOpenSubmenu(openSubmenu === menuName ? null : menuName);
//   };

//   return (
//     <div
//       className={`min-h-screen fixed h-auto bg-[#1d1f33] text-white transition-all duration-300 top-0 z-50 overflow-hidden ${
//         isCollapsed ? "w-0" : "w-[240px]"
//       }`}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center justify-between h-[60px] bg-[#f5365c] px-4">
//         {!isCollapsed && <h1 className="text-xl font-bold">ZAKA BROTHERS</h1>}
//       </div>

//       {/* Sidebar Menu */}
//       <nav className="w-full h-auto">
//         {menuItems.map((item) => (
//           <div key={item.name} className="relative group">
//             {/* Menu Button */}
//             <button
//               onClick={() =>
//                 !isCollapsed && item.subItems && toggleSubmenu(item.name)
//               }
//               className={`flex items-center px-4 py-3 w-full transition-all ${
//                 isCollapsed ? "justify-center" : "hover:bg-[#141522]"
//               } ${
//                 openSubmenu === item.name
//                   ? "bg-[#141522] border-l-2 border-l-red-500 text-white"
//                   : ""
//               }`}
//             >
//               <span className="text-xl">{item.icon}</span>
//               {!isCollapsed && (
//                 <Link to={item.link} className="ml-3 text-sm flex justify-between items-center w-full">
//                   <span>{item.name}</span>
//                   {item.subItems && (
//                     <span className="text-xs">
//                       <IoIosArrowBack
//                         size={13}
//                         className={`transition-transform ${
//                           openSubmenu === item.name ? "rotate-90" : "rotate-0"
//                         }`}
//                       />
//                     </span>
//                   )}
//                 </Link>
//               )}
//             </button>
//             {/* Floating Tooltip when Sidebar is Collapsed */}
//             {isCollapsed && (
//               <div className="absolute left-full top-0 bg-gray-800 text-white shadow-lg min-w-[200px] rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
//                 <div className="px-4 py-2 font-bold">{item.name}</div>
//                 {item.subItems &&
//                   item.subItems.map((subItem) => (
//                     <Link to={subItem.link}
//                       key={subItem.name}
//                       href="#"
//                       className="flex items-center px-4 py-2 hover:bg-[#141522] transition-colors duration-200"
//                     >
//                       <span className="mr-2 text-lg">{subItem.icon}</span>
//                       {subItem.name}
//                     </Link>
//                   ))}
//               </div>
//             )}

//             {/* Expanded Submenu when Sidebar is Open */}
//             {!isCollapsed && item.subItems && (
//               <div
//                 className={`overflow-hidden bg-[#141522] transition-[max-height] duration-600 ease-in-out ${
//                   openSubmenu === item.name ? "max-h-[500px]" : "max-h-0"
//                 }`}
//               >
//                 {item.subItems.map((subItem) => (
//                   <Link to={subItem.link}
//                     key={subItem.name}
//                     className="flex items-center p-2 rounded-lg text-sm w-full pl-4 hover:bg-[#141522] transition-colors duration-200"
//                   >
//                     <span className="mr-2 text-lg">{subItem.icon}</span>
//                     {subItem.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default MobileSidebar;


// import { useContext, useState } from "react";
// import { IoIosArrowBack } from "react-icons/io";
// import { FaHome } from "react-icons/fa";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { Link, useLocation } from "react-router-dom";
// import { Context } from "../context/Context";

// const MobileSidebar = () => {
//   const [openSubmenu, setOpenSubmenu] = useState(null);
//   const { isCollapsed, theme } = useContext(Context);
//   const location = useLocation();

//   const isDark = theme === "dark";

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
//         { name: "B2B Sales Analysis", icon: <LuLayoutDashboard />, link: "/b2b-sales-analysis" },
//       ],
//     },
//     // Add more items if needed
//   ];

//   const toggleSubmenu = (menuName) => {
//     setOpenSubmenu(openSubmenu === menuName ? null : menuName);
//   };

//   return (
//     <div
//       className={`fixed top-0 z-50 min-h-screen h-auto overflow-hidden transition-all duration-300 ${
//         isDark ? "bg-[#1d1f33] text-white" : "bg-white text-[#1c252e]"
//       } ${isCollapsed ? "w-0" : "w-[240px]"}`}
//     >
//       {/* Header */}
//       <div
//         className={`flex items-center justify-between h-[60px] px-4 ${
//           isDark ? "bg-[#1d1f33] text-white" : "bg-[#f5365c] text-white"
//         }`}
//       >
//         {!isCollapsed && <h1 className="text-xl font-bold">ZAKA BROTHERS</h1>}
//       </div>

//       {/* Menu */}
//       <nav className="w-full h-auto">
//         {menuItems.map((item) => {
//           const isSubOpen = openSubmenu === item.name;
//           const isActiveMain = item.link && location.pathname === item.link;

//           return (
//             <div key={item.name} className="relative group">
//               <button
//                 onClick={() =>
//                   !isCollapsed && item.subItems && toggleSubmenu(item.name)
//                 }
//                 className={`flex items-center px-4 py-3 w-full transition-all ${
//                   isCollapsed ? "justify-center" : "hover:bg-[#141522]"
//                 } ${
//                   isActiveMain || isSubOpen
//                     ? "bg-[#141522] text-white border-l-2 border-l-red-500"
//                     : ""
//                 }`}
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

//               {/* Tooltip if sidebar is collapsed */}
//               {isCollapsed && (
//                 <div
//                   className={`absolute left-full top-0 z-10 min-w-[200px] rounded-md py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ${
//                     isDark
//                       ? "bg-gray-800 text-white"
//                       : "border border-gray-200 bg-white text-[#1c252e]"
//                   }`}
//                 >
//                   <div className="px-4 py-2 font-bold">{item.name}</div>
//                   {item.subItems &&
//                     item.subItems.map((subItem) => (
//                       <Link
//                         key={subItem.name}
//                         to={subItem.link}
//                         className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
//                           isDark ? "hover:bg-[#141522]" : "hover:bg-[#efeeef]"
//                         }`}
//                       >
//                         <span className="mr-2 text-lg">{subItem.icon}</span>
//                         {subItem.name}
//                       </Link>
//                     ))}
//                 </div>
//               )}

//               {/* Expanded submenu */}
//               {!isCollapsed && item.subItems && (
//                 <div
//                   className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
//                     isDark ? "bg-[#141522]" : ""
//                   } ${isSubOpen ? "max-h-[500px]" : "max-h-0"}`}
//                 >
//                   {item.subItems.map((subItem) => {
//                     const isActiveSub = location.pathname === subItem.link;
//                     return (
//                       <Link
//                         key={subItem.name}
//                         to={subItem.link}
//                         className={`flex items-center p-2 text-sm pl-4 w-full transition-colors duration-200 ${
//                           isActiveSub
//                             ? isDark
//                               ? "bg-[#141522] text-white border-l-2 border-l-green-500"
//                               : "bg-[#ebf8f4] text-[#13ad7a] border-l-2 border-l-green-500"
//                             : isDark
//                             ? "hover:bg-[#1a1c2d]"
//                             : "hover:bg-[#f6f7f8]"
//                         }`}
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

// export default MobileSidebar;


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
  FaTimes,
  FaBars
} from "react-icons/fa";
import { 
  HiOutlineCash, 
  HiOutlineCollection, 
  HiOutlineTrendingUp 
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/Context";

const MobileSidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setIsCollapsed } = useContext(Context);
  const location = useLocation();

  const isDark = theme === "dark";

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
      { name: "Sale", icon: "📊", link: "/cashsale" },
        { name: "Collection", icon: "💰", link: "/collection" },
        { name: "Stock", icon: "📦", link: "/stock" },
        { name: "Receivable", icon: "📈", link: "/receiveable" },
        { name: "Bank Position", icon: "🏦", link: "/bank-posititon" },
        { name: "Payable", icon: "📤", link: "/payable" },
        { name: "Recovery Analysis", icon: "🔍", link: "/sales-recovery" },
        { name: "Installment Analysis", icon: "📅", link: "/install-recovery" },
        { name: "B2B Sales Analysis", icon: "👥", link: "/b2b-sales-analysis" },
      ],
    },
  ];

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const closeSidebar = () => {
    setIsMobileOpen(false);
    setIsCollapsed(true);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`fixed top-4 left-4 z-60 p-2 rounded-lg md:hidden ${
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800 shadow-md"
        }`}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 min-h-screen w-72 transform transition-transform duration-300 ease-in-out md:hidden ${
          isDark ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white" : "bg-white text-gray-800 shadow-xl"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between h-16 px-4 border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
              ZB
            </div>
            <h1 className="text-lg font-bold">ZAKA BROTHERS</h1>
          </div>
          <button
            onClick={closeSidebar}
            className={`p-2 rounded-lg ${
              isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="w-full mt-4 px-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((item) => {
            const isActiveMain = item.link && location.pathname === item.link;
            const isSubOpen = openSubmenu === item.name;
            const hasActiveSub = item.subItems?.some(subItem => location.pathname === subItem.link);

            return (
              <div key={item.name} className="mb-1">
                {/* Main menu button */}
                {item.link ? (
                  <Link
                    to={item.link}
                    onClick={closeSidebar}
                    className={`flex items-center px-4 py-3 w-full rounded-lg transition-all duration-200 ${
                      isActiveMain
                        ? isDark
                          ? "bg-blue-900/30 text-blue-300 border-l-4 border-l-blue-500"
                          : "bg-blue-50 text-blue-600 border-l-4 border-l-blue-500"
                        : isDark
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className={`${isActiveMain ? "text-blue-400" : "text-gray-400"}`}>
                      {item.icon}
                    </span>
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between px-4 py-3 w-full rounded-lg transition-all duration-200 ${
                      hasActiveSub
                        ? isDark
                          ? "bg-blue-900/30 text-blue-300 border-l-4 border-l-blue-500"
                          : "bg-blue-50 text-blue-600 border-l-4 border-l-blue-500"
                        : isDark
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`${hasActiveSub ? "text-blue-400" : "text-gray-400"}`}>
                        {item.icon}
                      </span>
                      <span className="ml-3 text-sm font-medium">{item.name}</span>
                    </div>
                    <IoIosArrowDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isSubOpen ? "rotate-180" : "rotate-0"
                      } ${hasActiveSub ? "text-blue-400" : "text-gray-400"}`}
                    />
                  </button>
                )}

                {/* Submenu Items */}
                {item.subItems && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isDark ? "bg-gray-800/20" : "bg-gray-50/50"
                    } ${isSubOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} rounded-lg ml-4`}
                  >
                    {item.subItems.map((subItem) => {
                      const isActiveSub = location.pathname === subItem.link;
                      return (
                        <Link
                          key={subItem.name}
                          to={subItem.link}
                          onClick={closeSidebar}
                          className={`flex items-center p-3 text-sm transition-all duration-200 rounded-lg mx-2 my-1 ${
                            isActiveSub
                              ? isDark
                                ? "bg-blue-900/30 text-blue-300"
                                : "bg-blue-100 text-blue-600"
                              : isDark
                              ? "hover:bg-gray-700/30"
                              : "hover:bg-gray-100"
                          }`}
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
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <p className={`text-xs text-center ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}>
            v1.0.0 • Zaka Brothers
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;