import React, { useContext } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { Context } from "../context/Context";
import SalesChart from "../charts/SalesChart";
const Home = () => {
  const { isCollapsed,user } = useContext(Context);
  return (
    <div className="w-full bg-[#141b2e] h-[92vh]">
      <div className="top-section pb-10 min-h-[92vh] h-auto w-full  px-4">
        <h1 className="text-white font-semibold text-2xl pt-3">
          Welcome {user?.user?.user} !
        </h1>
        <div className="filter_container grid grid-cols-3 gap-8 mt-8">
          <select className="bg-gray-800 py-2 outline-none rounded-md text-gray-400 px-2">
            <option className="hover:bg-black" value="1">
              Option 1
            </option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <select className="bg-gray-800 py-2 outline-none rounded-md text-gray-400 px-2">
            <option className="hover:bg-black" value="1">
              Option 1
            </option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
          <select className="bg-gray-800 py-2 outline-none rounded-md text-gray-400 px-2">
            <option className="hover:bg-black" value="1">
              Option 1
            </option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
        </div>

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
    </div>
  );
};

export default Home;
