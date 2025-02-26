import React, { useContext, useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { Context } from "../../context/Context";
import Loader from "../Loader";

const MainCard = ({
  currentMonth,
  lastMonth,
  LastDaySale,
  todaySale,
  first,
  second,
  third,
  four,
}) => {
  const { loader } = useContext(Context);

  // State for percentage calculations
  const [percentage, setPercentage] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  // Reusable function for percentage calculation
  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  useEffect(() => {
    setPercentage(
      calculatePercentageChange(currentMonth, lastMonth).toFixed(2)
    );
  }, [currentMonth, lastMonth]);

  useEffect(() => {
    setPercentage2(
      calculatePercentageChange(todaySale, LastDaySale).toFixed(2)
    );
  }, [todaySale, LastDaySale]);

  // Format numbers for better readability
  const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num);

  return (
    <div className="w-[30%] card max-h-[190px] py-5 h-[170px] flex flex-wrap min-w-[305px]">
      <main className="w-[60%] h-full flex flex-col gap-4">
        {/* Current Month vs Last Month */}
        <div className="flex justify-around">
          <div className="leading-none w-[60%] min-h-[50px]">
            <h1 className="xl:text-sm text-[.7rem] font-normal pb-1">
              {first}
            </h1>
            {loader ? (
              <Loader />
            ) : (
              <p className="font-bold text-[1.3rem] text-right">
                {formatNumber(currentMonth)}
              </p>
            )}
          </div>
          <div className="raise max-w-[40px] min-w-[40px] flex flex-col justify-center items-center">
            {loader ? (
              <Loader />
            ) : (
              <>
                {percentage >= 0 ? (
                  <div className="bg-[#dbf6e5] w-7 h-7 rounded-full flex justify-center items-center">
                    <FaArrowTrendUp className="text-[#00a76f]" />
                  </div>
                ) : (
                  <div className="bg-[#ffe4de] w-7 h-7 rounded-full flex justify-center items-center">
                    <FaArrowTrendDown className="text-[red]" />
                  </div>
                )}
                <p className="font-semibold text-sm">
                  {percentage >= 0
                    ? `+${formatNumber(percentage)}`
                    : formatNumber(percentage)}
                  %
                </p>
              </>
            )}
          </div>
        </div>

        {/* Today's Sale vs Last Day Sale */}
        <div className="flex justify-around mt-3">
          <div className="leading-none w-[60%] min-h-[50px]">
            <h1 className="xl:text-sm text-[.7rem] font-normal pb-1">
              {third}
            </h1>
            {loader ? (
              <Loader />
            ) : (
              <p className="font-bold text-[1.3rem] text-right">
                {formatNumber(todaySale)}
              </p>
            )}
          </div>
          <div className="raise  max-w-[40px] min-w-[40px] flex flex-col justify-center items-center">
            {loader ? (
              <Loader />
            ) : (
              <>
                {percentage2 >= 0 ? (
                  <div className="bg-[#dbf6e5] w-7 h-7 rounded-full flex justify-center items-center">
                    <FaArrowTrendUp className="text-[#00a76f]" />
                  </div>
                ) : (
                  <div className="bg-[#ffe4de] w-7 h-7 rounded-full flex justify-center items-center">
                    <FaArrowTrendDown className="text-[red]" />
                  </div>
                )}
                <p className="font-semibold text-sm">
                  {percentage2 >= 0
                    ? `+${formatNumber(percentage2)}`
                    : formatNumber(percentage2)}
                  %
                </p>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Last Month & Last Day Sale */}
      <main className="w-[40%] h-full flex flex-col gap-4">
        <div className="flex justify-around min-h-[53px]">
          <div className="leading-none min-w-[90%]">
            <h1 className="xl:text-sm text-[.7rem] font-normal pb-1">
              {second}
            </h1>
            {loader ? (
              <Loader />
            ) : (
              <p className="font-bold text-[1.3rem] text-right">
                {formatNumber(lastMonth)}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center justify-center mt-2">
          <div className="leading-none min-w-[90%] min-h-[50px]">
            <h1 className="xl:text-sm text-[.7rem] font-normal pb-1">{four}</h1>
            {loader ? (
              <Loader />
            ) : (
              <p className="font-bold text-[1.3rem] text-right">
                {formatNumber(LastDaySale)}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainCard;
