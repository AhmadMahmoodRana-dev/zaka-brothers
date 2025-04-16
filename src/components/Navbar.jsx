import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBell } from "react-icons/fa";
import { Context } from "../context/Context";
const Navbar = () => {
  const { isCollapsed, setIsCollapsed, user, theme, toggleTheme } = useContext(Context);
  
  return (
    <div className={`${isCollapsed ? "xl:w-[95.8%] lg:w-[94%] md:w-[91.6%] w-[100%]" : "sm:w-[84.3%] xl:w-[84.3%] lg:w-[76.5%] md:w-[70.6%] w-[100%]" } z-50 fixed h-[60px] border-b bg-white border-b-gray-200 ${theme == "dark" ? "navbar" : ""} flex justify-between items-center`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`${theme == "dark" ? "hover:bg-red-400" : ""} h-full w-[4%] flex justify-center items-center`}
      >
        {isCollapsed ? (
          <RxHamburgerMenu color={`${theme == "dark" ? 'white' : 'gray'}`} className="text-2xl"/>
        ) : (
          <RxHamburgerMenu color={`${theme == "dark" ? 'white' : 'gray'}`} className="text-2xl"/>
        )}
      </button>
      <div className="items  gap-6  items-center pr-6 flex-wrap md:flex hidden">
        
        <h1 className={`${theme == "dark" ? "text-white" : "text-gray-600" } font-semibold`}>16-02-2025</h1>
        <FaBell color={`${theme == "dark" ? 'white' : 'gray'}`} />
        <h1 className={`${theme == "dark" ? "text-white" : "text-gray-600" } font-semibold`}>{user?.user?.user}</h1>
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme == "dark" ? "bg-gray-700" : "hover:bg-[#ededed]"} `}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
