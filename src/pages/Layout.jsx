import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MobileSidebar from "../components/MobileSidebar"
const Layout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen h-auto bg-[#1d1f33]">
    <div className="md:block hidden">
      <Sidebar />
    </div>
    <div className="md:hidden block">
      <MobileSidebar />
    </div>
      <div className="w-full min-h-screen h-auto border-l border-white">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
