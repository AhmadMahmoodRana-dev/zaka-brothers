import React, { useContext } from "react";
import MainCard from "../components/card/MainCard";
import { Context } from "../context/Context";
import SalesTable from "../components/tables/SalesTable";

const CashSale = () => {
  const { saleData } = useContext(Context);
  console.log(saleData[0]?.CASH_SALE, "currency");
  return (
    <div className="w-full min-h-[92.2vh] h-auto flex flex-col  items-center  top-section border-white">
      <div className="flex gap-5 w-full h-full justify-center items-center  flex-wrap mt-10 px-3">
        <MainCard
          first={"Cash Sales"}
          second={"Last M Sales"}
          third={"Today Sales"}
          four={"Last D Sales"}
          currentMonth={saleData[0]?.CASH_SALE}
          lastMonth={saleData[0]?.LAST_CASH_SALE}
          todaySale={saleData[0]?.LD_CASH}
          LastDaySale={saleData[0]?.LD_CASH_LAST}
        />
        <MainCard
          first={"Installment Sales"}
          second={"Last M Installment"}
          third={"Today Installment"}
          four={"Last D Installment"}
          currentMonth={saleData[0]?.INSTALLMENT_SALE}
          lastMonth={saleData[0]?.LAST_INST_SALE}
          todaySale={saleData[0]?.LD_INST}
          LastDaySale={saleData[0]?.LD_INST_LAST}
        />
        <MainCard
          first={"Credits Sales"}
          second={"Last M Credits"}
          third={"Today Credits"}
          four={"Last D Credits"}
          currentMonth={saleData[0]?.CREDIT_SALE}
          lastMonth={saleData[0]?.LAST_CREDIT_SALE}
          todaySale={saleData[0]?.LD_CREDIT}
          LastDaySale={saleData[0]?.LD_CREDIT_LAST}
        />
      </div>
      <div className="table w-[91.5%] mt-10">
        <SalesTable />
      </div>
    </div>
  );
};

export default CashSale;
