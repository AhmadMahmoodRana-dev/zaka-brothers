// import React, { useContext } from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { FaBell } from "react-icons/fa";
// import { Context } from "../context/Context";

// const Navbar = () => {
//   const { isCollapsed, setIsCollapsed, user, theme, toggleTheme, logout } =
//     useContext(Context);
//   return (
//     <div
//       className={`${
//         isCollapsed
//           ? "xl:w-[95.8%] lg:w-[94%] md:w-[91.6%] w-[100%]"
//           : "sm:w-[84.3%] xl:w-[84.3%] lg:w-[76.5%] md:w-[70.6%] w-[100%]"
//       } z-50 fixed h-[60px] border-b bg-white border-b-gray-200 ${
//         theme === "dark" ? "navbar" : ""
//       } flex justify-between items-center`}
//     >
//       <button
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className={`${
//           theme === "dark" ? "hover:bg-red-400" : ""
//         } h-full md:w-[4%] w-[20%] flex justify-center items-center`}
//       >
//         <RxHamburgerMenu
//           color={theme === "dark" ? "white" : "gray"}
//           className="text-2xl"
//         />
//       </button>

//       <div className="items gap-6 items-center pr-6 flex-wrap md:flex hidden">
//         <h1
//           className={`${
//             theme === "dark" ? "text-white" : "text-gray-600"
//           } font-semibold`}
//         >
//           {new Date().toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}{" "}
//         </h1>
//         <FaBell color={theme === "dark" ? "white" : "gray"} />
//         <h1
//           className={`${
//             theme === "dark" ? "text-white" : "text-gray-600"
//           } font-semibold`}
//         >
//           {user?.user?.user}
//         </h1>

//         <button
//           onClick={toggleTheme}
//           className={`p-2 rounded-full ${
//             theme === "dark" ? "bg-gray-700" : "hover:bg-[#ededed]"
//           }`}
//           aria-label="Toggle theme"
//         >
//           {theme === "dark" ? "🌙" : "☀"}
//         </button>

//         {/* 🚪 Logout Button */}
//         <button
//           onClick={() => logout()}
//           className={`p-2 px-4 rounded-md font-medium text-sm ${
//             theme === "dark"
//               ? "bg-red-600 text-white"
//               : "bg-red-100 text-red-600 hover:bg-red-200"
//           }`}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { 
  FaBell, 
  FaSun, 
  FaMoon, 
  FaSignOutAlt, 
  FaUserCircle,
  FaCog
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Context } from "../context/Context";

const Navbar = () => {
  const { isCollapsed, setIsCollapsed, user, theme, toggleTheme, logout } =
    useContext(Context);

  return (
    <div
      className={`${
        isCollapsed
          ? "xl:w-[calc(100%-4rem)] lg:w-[calc(100%-4rem)] md:w-[calc(100%-4rem)] w-full"
          : "xl:w-[calc(100%-260px)] lg:w-[calc(100%-260px)] md:w-[calc(100%-260px)] w-full"
      } z-40 fixed h-16 transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gray-900 border-b border-gray-700" 
          : "bg-white border-b border-gray-200 shadow-sm"
      } flex justify-between items-center px-4`}
    >
      {/* Left Section */}
      <div className="flex items-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme === "dark" 
              ? "hover:bg-gray-800 text-white" 
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <RxHamburgerMenu className="text-xl" />
        </button>

        {/* <div className="ml-4 md:block hidden">
          <h1 className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Welcome back,
          </h1>
          <h2 className={`font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}>
            {user?.user?.user || "User"}
          </h2>
        </div> */}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className={`hidden md:flex items-center px-3 py-1 rounded-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        }`}>
          <span className={`text-sm font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            {new Date().toLocaleDateString("en-US", {
              weekday: 'short',
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-200 ${
            theme === "dark" 
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-400" 
              : "bg-gray-100 hover:bg-gray-200 text-orange-500"
          }`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <FaSun className="text-lg" />
          ) : (
            <FaMoon className="text-lg" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            className={`p-2 rounded-full transition-colors duration-200 relative ${
              theme === "dark" 
                ? "hover:bg-gray-800 text-white" 
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <IoMdNotificationsOutline className="text-xl" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Settings */}
        <button
          className={`p-2 rounded-full transition-colors duration-200 ${
            theme === "dark" 
              ? "hover:bg-gray-800 text-white" 
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <FaCog className="text-lg" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative group">
          <button
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 ${
              theme === "dark" 
                ? "hover:bg-gray-800" 
                : "hover:bg-gray-100"
            }`}
          >
            <FaUserCircle className={`text-2xl ${
              theme === "dark" ? "text-blue-400" : "text-blue-500"
            }`} />
            <span className={`hidden lg:block font-medium ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}>
              {user?.user?.user || "Admin"}
            </span>
          </button>

          {/* Dropdown Menu */}
          <div className={`absolute right-0 top-12 w-48 py-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
            theme === "dark" 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200"
          }`}>
            <div className="px-4 py-2 border-b border-gray-200/30">
              <p className={`text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                {user?.user?.user }
              </p>
              <p className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
                Admin
              </p>
            </div>
            
            <button
              onClick={logout}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200 ${
                theme === "dark" 
                  ? "hover:bg-red-900/30 text-red-400" 
                  : "hover:bg-red-50 text-red-600"
              }`}
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;