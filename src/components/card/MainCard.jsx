import React, { useContext, useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { Context } from "../../context/Context";
import Loader from "../Loader";
const MainCard = ({ currentMonth, lastMonth, LastDaySale, todaySale }) => {
  const [percentage, setPercentage] = useState(0);
  const { loader } = useContext(Context);

  const calculatePercentageChange = (currentMonth, lastMonth) => {
    if (lastMonth === 0) {
      setPercentage(currentMonth > 0 ? 100 : 0);
      return;
    }

    const change = ((currentMonth - lastMonth) / lastMonth) * 100;
    setPercentage(change.toFixed(2));
  };

  useEffect(() => {
    calculatePercentageChange(currentMonth, lastMonth);
  }, [currentMonth, lastMonth]);

  // FORMAT DATA
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className=" min-w-[300px] bg-white  w-[29%] card h-auto min-h-[150px] rounded-lg  py-5 flex items-center ">
      <main className="w-[60%]">
        <div className="flex justify-around">
          <div className="leading-none">
            <h1 className=" text-sm font-normal  w-24">Cash Sale</h1>
            <p className="font-bold min-w-[110px] max-w-[110px] text-2xl ">
              {formatNumber(currentMonth)}
            </p>
          </div>
          <div className="raise  flex flex-col justify-center items-center">
            {loader ? (
              <Loader />
            ) : (
              <>
                {percentage >= 0 ? (
                  <>
                    <div className="bg-[#dbf6e5] w-7 h-7 rounded-full flex justify-center items-center">
                      <FaArrowTrendUp className="text-[#00a76f]" />
                    </div>
                    <p className="font-semibold text-sm ">
                      +{formatNumber(percentage)}%
                    </p>
                  </>
                ) : (
                  <>
                    <div className="bg-[#dbf6e5] w-7 h-7 rounded-full flex justify-center items-center">
                      <FaArrowTrendDown className="text-[red]" />
                    </div>
                    <p className="font-semibold text-sm ">
                      -{formatNumber(percentage)}%
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex justify-around mt-3">
          <div className="leading-none">
            <h1 className=" text-sm font-normal  w-24">Today Sale</h1>
            <p className="font-bold  text-2xl min-w-[110px] max-w-[110px] ">
              {formatNumber(todaySale)}
            </p>
          </div>
          <div className="raise flex flex-col justify-center items-center">
            <div className="bg-[#ffe4de] w-7 h-7 rounded-full flex justify-center items-center">
              <FaArrowTrendDown className="text-red-600" />
            </div>
            <p className="font-semibold text-sm ">-5.40%</p>
          </div>
        </div>
      </main>

      {/* <Divider /> */}

      <main className="w-[40%]">
        <div className="flex gap-2 items-center justify-center">
          <div className="leading-none min-w-[90%]">
            <h1 className=" text-sm font-normal  w-24">Last M Sale</h1>
            <p className="font-bold  text-2xl ">{formatNumber(lastMonth)}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center mt-2">
          <div className="leading-none min-w-[90%]">
            <h1 className=" text-sm font-normal  w-24">Last D Sale</h1>
            <p className="font-bold  text-2xl ">{formatNumber(LastDaySale)}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainCard;
