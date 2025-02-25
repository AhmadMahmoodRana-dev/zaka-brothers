import React, { useContext } from "react";
import MainCard from "../components/card/MainCard";
import { Context } from "../context/Context";

const CashSale = () => {
  const { saleData } = useContext(Context);

  console.log(saleData);
  return (
    <div className="w-full min-h-[92.2vh] h-auto flex justify-center  top-section border-white">
      <div className="flex gap-5 w-full h-full justify-center items-center  flex-wrap mt-10 px-3">
        {saleData.map((card) => (
          <MainCard
            currentMonth={card.CASH_SALE}
            lastMonth={card.LAST_CASH_SALE}
            todaySale={card.CREDIT_SALE}
            LastDaySale={card.LAST_CREDIT_SALE}
          />
        ))}
      </div>
    </div>
  );
};

export default CashSale;
