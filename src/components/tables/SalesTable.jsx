import React from "react";

const SalesTable = () => {
  const tableData = [
    {
      id: 1,
      productName: "Apple MacBook Pro 17",
      color: "Silver",
      category: "Electronics",
      price: "$1,200",
      action: "Edit",
    },
    {
      id: 2,
      productName: "Samsung Galaxy S21 Ultra",
      color: "Black",
      category: "Electronics",
      price: "$800",
      action: "Edit",
    },
    {
      id: 3,
      productName: "Nike Air Max 270",
      color: "White",
      category: "Clothing",
      price: "$1,000",
      action: "Edit",
    },
    {
      id: 4,
      productName: "Adidas Yeezy Boost 390",
      color: "Black",
      category: "Clothing",
      price: "$1,500",
      action: "Edit",
    },
    {
      id: 5,
      productName: "H&M Crewneck Sweatshirt",
      color: "White",
      category: "Clothing",
      price: "$50",
      action: "Edit",
    },
  ];

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-[#2E2F46] dark:bg-[#2E2F46] dark:text-white">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product name
            </th>
            <th scope="col" class="px-6 py-3">
              Color
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => {
            return (
              <tr
                key={data?.id}
                class="odd:bg-[#2E2F46] odd:dark:bg-[#2E2F46] even:bg-[#2E2F46] even:dark:bg-[#2E2F46] border-b dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data?.productName}
                </th>
                <td class="px-6 py-4">{data?.color}</td>
                <td class="px-6 py-4">{data?.category}</td>
                <td class="px-6 py-4">{data?.price}</td>
                <td class="px-6 py-4">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {data?.action}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
