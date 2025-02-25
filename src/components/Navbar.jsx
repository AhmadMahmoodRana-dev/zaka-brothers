import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsCalculatorFill } from "react-icons/bs";
import { MdOutlineWindow } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { Context } from "../context/Context";
const Navbar = () => {
  const { isCollapsed, setIsCollapsed } = useContext(Context);
  return (
    <div className="w-full h-[60px] border-b border-b-gray-500 navbar flex justify-between items-center">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hover:bg-red-400 h-full w-[4%] flex justify-center items-center"
      >
        {isCollapsed ? (
          <RxHamburgerMenu color="white" className="text-2xl"/>
        ) : (
          <RxHamburgerMenu color="white" className="text-2xl"/>
        )}
      </button>
      <div className="items  gap-6  items-center pr-6 flex-wrap md:flex hidden">
        <button className="logo bg-green-500 px-2 py-1 rounded-md text-white font-bold cursor-pointer">
          <IoIosAddCircleOutline size={20} />
        </button>
        <button className="logo bg-green-500 px-2 py-1 rounded-md text-white font-bold">
          <BsCalculatorFill size={20} />
        </button>
        <button className="logo bg-green-500 px-2 py-1 rounded-md flex justify-center items-center text-white font-bold gap-2 text-sm">
          <MdOutlineWindow size={20} /> <h1>POS</h1>
        </button>
        <button className="logo bg-green-500 px-2 py-1 rounded-md text-white font-bold">
          <BsCash size={20} />
        </button>
        <h1 className="text-white font-semibold">16-02-2025</h1>
        <FaBell color="white" />
        <h1 className="text-white font-semibold">Ali Raza</h1>
      </div>
    </div>
  );
};

export default Navbar;
