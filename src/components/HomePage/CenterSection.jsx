import React, { useContext } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { Context } from "../../context/Context";

const CenterSection = () => {
 
 const  {isCollapsed} = useContext(Context)
    return (
    <div className="w-full h-[100px] px-4 flex flex-col justify-center mt-3">
      {/* ### CARDS ### */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-3 mt-8 h-auto">
        <div className="tilt-box-wrap min-h-[90px]">
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <div className="tilt-box rounded-sm bg-gray-800 flex items-center gap-4 px-4">
            <div
              className={`circle3 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[25%] h-[70%]"
              }  bg-blue-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Total Sales
              </h1>
              <h1 className="text-gray-300 font-semibold text-xl">₨ 0.00</h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <div className="tilt-box rounded-sm bg-gray-800 flex items-center gap-4 px-4">
            <div
              className={`circle2 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[25%] h-[70%]"
              }  bg-red-800 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Total Sales
              </h1>
              <h1 className="text-gray-300 font-semibold text-xl">₨ 0.00</h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <div className="tilt-box rounded-sm bg-gray-800 flex items-center gap-4 px-4">
            <div
              className={`circle4 ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[25%] h-[70%]"
              }  bg-gray-700 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Total Sales
              </h1>
              <h1 className="text-gray-300 font-semibold text-xl">₨ 0.00</h1>
            </div>
          </div>
        </div>
        <div className="tilt-box-wrap min-h-[90px]">
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <span className="t-over"></span>
          <div className="tilt-box rounded-sm bg-gray-800 flex items-center gap-4 px-4">
            <div
              className={`circle ${
                isCollapsed ? "w-[23%] h-[80%]" : "w-[25%] h-[70%]"
              }  bg-yellow-400 rounded-full flex justify-center items-center`}
            >
              <FaCartArrowDown size={24} />
            </div>
            <div className="content">
              <h1 className="text-gray-500 uppercase font-semibold">
                Total Sales
              </h1>
              <h1 className="text-gray-300 font-semibold text-xl">₨ 0.00</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterSection;
