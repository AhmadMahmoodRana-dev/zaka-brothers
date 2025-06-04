import { useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiReceiveMoney } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { isCollapsed, theme } = useContext(Context);
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <FaHome />, link: "/" },
    {
      name: "Dashboard",
      icon: <LuLayoutDashboard />,
      subItems: [
        { name: "Sale", icon: <LuLayoutDashboard />, link: "/cashsale" },
        { name: "Collection", icon: <LuLayoutDashboard />, link: "/collection" },
        { name: "Stock", icon: <LuLayoutDashboard />, link: "/stock" },
        { name: "Receivable", icon: <LuLayoutDashboard />, link: "/receiveable" },
        { name: "Bank Position", icon: <LuLayoutDashboard />, link: "/bank-posititon" },
        { name: "Payable", icon: <LuLayoutDashboard />, link: "/payable" },
        { name: "Recovery Analysis", icon: <LuLayoutDashboard />, link: "/sales-recovery" },
        { name: "Installment Sales Analysis", icon: <LuLayoutDashboard />, link: "/install-recovery" },
        { name: "B2B Sales Analysis ", icon: <LuLayoutDashboard />, link: "/b2b-sales-analysis" },
      ],
    },
    // {
    //   name: "Products",
    //   icon: <GiReceiveMoney />,
    //   subItems: [
    //     { name: "Categories", icon: <LuLayoutDashboard />, link: "/categories" },
    //     { name: "Variations", icon: <LuLayoutDashboard />, link: "/variations" },
    //     { name: "Brands", icon: <LuLayoutDashboard />, link: "/brands" },
    //   ],
    // },
  ];

  const toggleSubmenu = (menuName) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`fixed top-0 left-0 min-h-screen z-50 transition-all duration-300
        ${isDark ? "bg-[#1d1f33] text-white" : "bg-white text-[#637381] font-semibold"}
        ${isCollapsed ? "w-16" : "w-[240px]"}
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between h-[60px] px-4
          ${isDark ? "bg-[#1d1f33] text-white" : "bg-white text-black border-b border-gray-300"}
        `}
      >
        {!isCollapsed && (
          <h1 className="text-xl font-bold flex justify-center items-center gap-8">
            ZAKA BROTHERS <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="w-full">
        {menuItems.map((item) => {
          const isActiveMain = item.link && location.pathname === item.link;
          const isSubOpen = openSubmenu === item.name;

          return (
            <div key={item.name} className="relative group">
              {/* Main menu button */}
              <button
                onClick={() =>
                  !isCollapsed && item.subItems && toggleSubmenu(item.name)
                }
                className={`flex items-center px-4 py-3 w-full transition-all
                  ${isCollapsed ? "justify-center" : ""}
                  ${
                    isActiveMain
                      ? isDark
                        ? "bg-[#141522] text-white border-l-2 border-l-green-500"
                        : "bg-[#ebf8f4] text-[#13ad7a] border-l-2 border-l-green-500"
                      : isDark
                      ? "hover:bg-[#141522]"
                      : "hover:bg-[#f6f7f8]"
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && (
                  <Link
                    to={item.link || "#"}
                    className="ml-3 text-sm flex justify-between items-center w-full"
                  >
                    <span>{item.name}</span>
                    {item.subItems && (
                      <IoIosArrowBack
                        size={13}
                        className={`transition-transform ${
                          isSubOpen ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    )}
                  </Link>
                )}
              </button>

              {/* Tooltip (collapsed sidebar) */}
              {isCollapsed && (
                <div
                  className={`absolute left-full z-10 top-0 min-w-[200px] rounded-md py-2 shadow-lg
                    ${
                      isDark
                        ? "bg-gray-800 text-white"
                        : "border border-gray-200 bg-white text-[#1c252e]"
                    }
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300
                  `}
                >
                  <div className="px-4 py-2 font-bold">{item.name}</div>
                  {item.subItems &&
                    item.subItems.map((subItem) => (
                      <Link
                        to={subItem.link}
                        key={subItem.name}
                        className={`flex items-center px-4 py-2 text-sm transition-colors duration-200
                          ${isDark ? "hover:bg-[#141522]" : "hover:bg-[#efeeef]"}
                        `}
                      >
                        <span className="mr-2 text-lg">{subItem.icon}</span>
                        {subItem.name}
                      </Link>
                    ))}
                </div>
              )}

              {/* Expanded submenu (open sidebar) */}
              {!isCollapsed && item.subItems && (
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out
                    ${isDark ? "bg-[#141522]" : ""}
                    ${isSubOpen ? "max-h-[500px]" : "max-h-0"}
                  `}
                >
                  {item.subItems.map((subItem) => {
                    const isActiveSub = location.pathname === subItem.link;
                    return (
                      <Link
                        to={subItem.link}
                        key={subItem.name}
                        className={`flex items-center p-2 text-sm pl-4 w-full  transition-colors duration-100
                          ${
                            isActiveSub
                              ? isDark
                                ? "bg-[#141522] text-white border-l-2 border-l-green-500"
                                : "bg-[#ebf8f4] text-[#13ad7a] border-l-2 border-l-green-500"
                              : isDark
                              ? "hover:bg-[#141522]"
                              : "hover:bg-[#f7f6f8]"
                          }
                        `}
                      >
                        <span className="mr-2 text-lg">{subItem.icon}</span>
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
