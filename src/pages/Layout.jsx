import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MobileSidebar from "../components/MobileSidebar";
import { Context } from "../context/Context";
const Layout = ({ children }) => {
  const { theme, isCollapsed } = useContext(Context);
  return (
    <div
      className={`flex w-full min-h-screen h-auto ${
        theme == "dark" ? "bg-[#1d1f33]" : "bg-white"
      }`}
    >
      <div className="md:block hidden">
        <Sidebar />
      </div>
      <div className="md:hidden block">
        <MobileSidebar />
      </div>
      <div
        className={`w-full ${
          isCollapsed ? "md:ml-[64px]" : "md:ml-[240px]"
        }  min-h-screen h-auto ${
          theme == "dark" ? "border-l border-white" : "border-l border-gray-300"
        } `}
      >
        <Navbar />
        <div className="mt-15">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
