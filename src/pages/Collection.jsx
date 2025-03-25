import React, { useContext } from "react";
import { Context } from "../context/Context";
import MainCard from "../components/card/MainCard";
import CollectionTable from "../components/tables/CollectionTable";

const Collection = () => {
  const { collectionData, theme } = useContext(Context);
  console.log(collectionData.installment_recovery);
  return (
    <div
      className={`w-full min-h-[92.2vh] h-auto flex flex-col  items-center ${
        theme == "dark" ? "top-section" : "bg-white"
      }  border-white`}
    >
      <div className="flex gap-5 w-full h-full justify-center items-center  flex-wrap mt-10 px-3">
        <MainCard
          first={"Cash Recovery"}
          second={"Last M Recovery"}
          third={"Today Recovery"}
          four={"Last D Recovery"}
          currentMonth={collectionData?.credit_cash_recovery?.CASH_RECOVERY}
          lastMonth={collectionData?.credit_cash_recovery?.LAST_CASH_RECOVERY}
          todaySale={collectionData?.credit_cash_recovery?.CREDIT_RECOVERY}
          LastDaySale={
            collectionData?.credit_cash_recovery?.LAST_CREDIT_RECOVERY
          }
        />
        <MainCard
          first={"Cash Recovery"}
          second={"Last M Recovery"}
          third={"Today Recovery"}
          four={"Last D Recovery"}
          currentMonth={collectionData?.credit_cash_recovery?.LD_CASH_COLL}
          lastMonth={collectionData?.credit_cash_recovery?.LD_CASH_COLL_LAST}
          todaySale={collectionData?.credit_cash_recovery?.LD_CR}
          LastDaySale={collectionData?.credit_cash_recovery?.LD_CR_LAST}
        />
        <MainCard
          first={"Cash Recovery"}
          second={"Last M Recovery"}
          third={"Today Recovery"}
          four={"Last D Recovery"}
          currentMonth={collectionData?.installment_recovery?.COLLECTION}
          lastMonth={collectionData?.installment_recovery?.LAST_COLLECTION}
          todaySale={collectionData?.installment_recovery?.NET_RECOVERY}
          LastDaySale={collectionData?.installment_recovery?.LAST_NET_RECOVERY}
        />
      </div>
      <div className="collection_table w-full justify-center flex mt-5">
        <CollectionTable />
      </div>
    </div>
  );
};

export default Collection;
