// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// import { Context } from "../../context/Context";

// const CollectionTable = () => {
//   const { theme } = useContext(Context);
//   const [collectionTableData, setCollectionTableData] = useState([]);
//   const [companies, setCompanies] = useState([]);

//   const formatDateForAPI = (dateString) => {
//     const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
//     const [year, month, day] = dateString.split("-");
//     return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
//   };

//   const formatDateForInput = (dateString) => {
//     const months = {
//       JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
//       JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12"
//     };
//     if (!dateString) return "";
//     const [day, month, year] = dateString.split("-");
//     return `${year}-${months[month]}-${day}`;
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const yyyy = today.getFullYear();
//     const mm = String(today.getMonth() + 1).padStart(2, "0");
//     const dd = String(today.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   const [filters, setFilters] = useState({
//     sdate: "01-MAR-2025",
//     edate: "31-MAR-2025",
//     rec_company: "1",
//     curr_date: formatDateForAPI(getCurrentDate()),
//   });

//   const getCollectionTableData = async () => {
//     try {
//       const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/recovery", { params: filters });
//       setCollectionTableData(data);
//     } catch (error) {
//       console.error("Error fetching collection data:", error);
//     }
//   };

//   const fetchDropdownData = async () => {
//     try {
//       const { data } = await axios.get("https://zbl.zaffarsons.com/zbl/pre-define");
//       if (Array.isArray(data?.company_list)) {
//         setCompanies(data?.company_list);
//       } else {
//         console.error("Invalid company list format:", data?.company_list);
//       }
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//     }
//   };

//   useEffect(() => {
//     getCollectionTableData();
//     fetchDropdownData();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     getCollectionTableData();
//   };

//   const calculatePercentageChange = (current, previous) => {
//     if (previous === 0) return current > 0 ? 100 : 0;
//     return ((current - previous) / previous) * 100;
//   };

//   const formatNumber = (num) =>
//     new Intl.NumberFormat("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(num);

//   const renderPercentageChange = (current, previous) => {
//     const change = calculatePercentageChange(current, previous);
//     const isPositive = change >= 0;

//     return (
//       <td className={`px-2 py-4 flex items-center gap-2 ${isPositive ? "text-[#00a76f]" : "text-red-600"}`}>
//         {isPositive ? <FaArrowUp /> : <FaArrowDown />}
//         <p>{formatNumber(change)}%</p>
//       </td>
//     );
//   };

//   return (
//     <div className={`p-4 w-[91%] ${theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"} border-gray-200 rounded-lg`}>
//       <h1 className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : ""}`}>Collection Data</h1>

//       {/* Filters Section */}
//       <form onSubmit={handleSubmit} className="mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Company</label>
//             <select
//               value={filters.rec_company}
//               onChange={(e) => setFilters({ ...filters, rec_company: e.target.value })}
//               className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//             >
//               {companies.map((company) => (
//                 <option key={company.COMPANY_ID} value={company.COMPANY_ID}>
//                   {company.COMPANY_NAME}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Start Date</label>
//             <input
//               type="date"
//               value={formatDateForInput(filters.sdate)}
//               onChange={(e) => setFilters({ ...filters, sdate: formatDateForAPI(e.target.value) })}
//               className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">End Date</label>
//             <input
//               type="date"
//               value={formatDateForInput(filters.edate)}
//               onChange={(e) => setFilters({ ...filters, edate: formatDateForAPI(e.target.value) })}
//               className="w-full p-2 rounded border focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>
//         <button type="submit" className="mt-4 px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors">
//           Apply Filters
//         </button>
//       </form>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh] min-w-0">
//         <table className="w-full text-sm text-left rtl:text-right">
//           <thead className={`text-xs uppercase ${theme === "dark" ? "text-white bg-[#203c63]" : "text-gray-500 bg-[#e1e1e3]"} sticky top-0 z-10`}>
//             <tr>
//               {["BRANCH NAME", "RECEIVABLE", "Collection", "L.m Coll", "Coll.Per", "L.d Coll", "Recovery", "Achieved", "Client", "Covered", "L.m Covered", "Coverage"].map((header) => (
//                 <th key={header} scope="col" className="px-2 py-3">{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {collectionTableData.map((data) => (
//               <tr key={data?.id} className={`${theme === "dark" ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]" : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"}`}>
//                 <th scope="row" className="px-2 py-4 font-medium whitespace-nowrap">{data?.BRANCH_NAME}</th>
//                 <td className="px-2 py-4">{data?.RECEIVEABLE}</td>
//                 <td className="px-2 py-4">{data?.COLLECTION}</td>
//                 <td className="px-2 py-4">{data?.LM_COLLECTION}</td>
//                 {renderPercentageChange(data?.COLLECTION, data?.LM_COLLECTION)}
//                 <td className="px-2 py-4">{data?.LD_COLL}</td>
//                 <td className="px-2 py-4">{data?.RECORY}</td>
//                 <td className="px-2 py-4">{data?.ACHIEVED}</td>
//                 <td className="px-2 py-4">{data?.CLIENTS}</td>
//                 <td className="px-2 py-4">{data?.COVERED}</td>
//                 {renderPercentageChange(data?.COVERED, data?.LM_COVERED)}
//                 <td className="px-2 py-4">{data?.COVERAGE}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CollectionTable;


import React, { useContext } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Context } from "../../context/Context";

const CollectionTable = ({ collectionTableData }) => {
  const { theme } = useContext(Context);

  const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatNumber = (num) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  const renderPercentageChange = (current, previous) => {
    const change = calculatePercentageChange(current, previous);
    const isPositive = change >= 0;

    return (
      <td className={`px-2 py-4 flex items-center gap-2 ${isPositive ? "text-[#00a76f]" : "text-red-600"}`}>
        {isPositive ? <FaArrowUp /> : <FaArrowDown />}
        <p>{formatNumber(change)}%</p>
      </td>
    );
  };

  return (
    <div className={`p-4 w-[91%] ${theme === "dark" ? "bg-[transparent] shadow-2xl border" : "border"} border-gray-200 rounded-lg`}>
      <h1 className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : ""}`}>Collection Data</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[50vh] min-w-0">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className={`text-xs uppercase ${theme === "dark" ? "text-white bg-[#203c63]" : "text-gray-500 bg-[#e1e1e3]"} sticky top-0 z-10`}>
            <tr>
              {["BRANCH NAME", "RECEIVABLE", "Collection", "L.m Coll", "Coll.Per", "L.d Coll", "Recovery", "Achieved", "Client", "Covered", "L.m Covered", "Coverage"].map((header) => (
                <th key={header} scope="col" className="px-2 py-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collectionTableData.map((data) => (
              <tr key={data?.id} className={`${theme === "dark" ? "border-b border-gray-500 text-[#D1D5DB] odd:bg-[#203c63] even:bg-[#3d406f]" : "border-b border-gray-200 odd:bg-white even:bg-[#f4f6f8]"}`}>
                <th scope="row" className="px-2 py-4 font-medium whitespace-nowrap">{data?.BRANCH_NAME}</th>
                <td className="px-2 py-4">{data?.RECEIVEABLE}</td>
                <td className="px-2 py-4">{data?.COLLECTION}</td>
                <td className="px-2 py-4">{data?.LM_COLLECTION}</td>
                {renderPercentageChange(data?.COLLECTION, data?.LM_COLLECTION)}
                <td className="px-2 py-4">{data?.LD_COLL}</td>
                <td className="px-2 py-4">{data?.RECORY}</td>
                <td className="px-2 py-4">{data?.ACHIEVED}</td>
                <td className="px-2 py-4">{data?.CLIENTS}</td>
                <td className="px-2 py-4">{data?.COVERED}</td>
                {renderPercentageChange(data?.COVERED, data?.LM_COVERED)}
                <td className="px-2 py-4">{data?.COVERAGE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionTable;
