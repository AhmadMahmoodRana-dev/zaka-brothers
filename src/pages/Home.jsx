import React, { useContext, useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { Context } from "../context/Context";
import axios from "axios";

const Home = () => {
  const { isCollapsed, user, theme } = useContext(Context);
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [option, setOption] = useState([]);

  // FILTERS DATA
  const filters_Data = async () => {
    try {
      const { data } = await axios.get(
        `https://zbl.zaffarsons.com/zbl/pre-define`
      );
      setOption(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    filters_Data();
  }, []);
  return (
    <div
      className={`w-full ${
        theme === "dark" ? "bg-[#141b2e]" : "bg-white border-l border-gray-200"
      } h-[92.2vh]`}
    >
      <div
        className={`${
          theme === "dark" ? "top-section" : "bg-white"
        } pb-10 min-h-[92vh] h-auto w-full px-4`}
      >
        <h1 className="text-white font-semibold text-2xl pt-3">
          Welcome {user?.user?.user} !
        </h1>

        {/* Filter Section */}
        <div className="filter_container grid grid-cols-5 gap-4 mt-8">
          <select
            className={`${
              theme === "dark"
                ? "bg-gray-800 text-gray-400"
                : "border border-gray-300 text-black"
            } py-2 outline-none rounded-md px-2`}
          >
            {option?.company_list?.map((company) => (
              <option value={company.COMPANY_ID}>{company.COMPANY_NAME}</option>
            ))}
          </select>
          <select
            className={`${
              theme === "dark"
                ? "bg-gray-800 text-gray-400"
                : "border border-gray-300 text-black"
            } py-2 outline-none rounded-md px-2`}
          >
            {option?.branch_list?.map((company) => (
              <option value={company.BRANCH_ID}>{company.BRANCH_NAME}</option>
            ))}
          </select>
          {/* From Date */}
          <input
            type="date"
            className={`${
              theme === "dark"
                ? "bg-gray-800 text-gray-400"
                : "border border-gray-300 text-black"
            } py-2 outline-none rounded-md px-2`}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          {/* To Date */}
          <input
            type="date"
            className={`${
              theme === "dark"
                ? "bg-gray-800 text-gray-400"
                : "border border-gray-300 text-black"
            } py-2 outline-none rounded-md px-2`}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          {/* Current Date (Default Today) */}
          <input
            type="date"
            className={`${
              theme === "dark"
                ? "bg-gray-800 text-gray-400"
                : "border border-gray-300 text-black"
            } py-2 outline-none rounded-md px-2`}
            value={today}
            readOnly
          />
        </div>

        {/* Cards Section */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-8 h-auto">
          {data.map((_, ind) => (
            <div key={ind} className="tilt-box-wrap min-h-[90px]">
              <span className="t-over"></span>
              <span className="t-over"></span>
              <span className="t-over"></span>
              <span className="t-over"></span>
              <span className="t-over"></span>
              <div
                className={`tilt-box rounded-sm ${
                  theme === "dark" ? "bg-gray-800" : "border-gray-200 border"
                } flex items-center gap-4 px-4`}
              >
                <div
                  className={`circle3 ${
                    isCollapsed ? "w-[23%] h-[80%]" : "w-[24%] h-[70%]"
                  } bg-blue-400 rounded-full flex justify-center items-center`}
                >
                  <FaCartArrowDown size={24} />
                </div>
                <div className="content">
                  <h1 className="text-gray-500 uppercase font-semibold">
                    Total Sales
                  </h1>
                  <h1 className="text-gray-300 font-semibold text-xl">
                    ₨ 0.00
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
