import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBell } from "react-icons/fa";
import { Context } from "../context/Context";
const Navbar = () => {
  const { isCollapsed, setIsCollapsed, user, theme, toggleTheme } = useContext(Context);
  
  return (
    <div className={`w-full h-[60px] border-b border-b-gray-200 ${theme == "dark" ? "navbar" : ""} flex justify-between items-center`}>
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
          className="p-1 rounded-full bg-gray-200 dark:bg-gray-700"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
