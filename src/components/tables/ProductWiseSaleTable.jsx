import React from "react";
import ReusableTable from "./ReusableTable";

const ProductWiseSaleTable = () => {
  const columns = [
    { header: "PRODUCT", key: "PRODUCT" },
    { header: "TOTAL SALE", key: "TOTAL_SALE" },
    { header: "INSTALLMENT", key: "INSTALLMENT" },
    { header: "CREDIT", key: "CREDIT" },
    { header: "CASH", key: "CASH" },
  ];
  

  const filtersConfig = {
    company: "1", 
    branch: "", 
    sdate: "2025-03-01",
    edate: "2025-03-31",
  };

  return (
    <div className="w-full justify-center flex">
      <ReusableTable
        apiUrl="https://zbl.zaffarsons.com/zbl/product_sale"
        title="Product Sale Data"
        columns={columns}
        defaultFilters={filtersConfig}
      />
    </div>
  );
};

export default ProductWiseSaleTable;
