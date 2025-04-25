import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Context } from "../context/Context";

const Barchart = ({ collectionData }) => {
    const { theme } = useContext(Context);
  
  const chartData = [
    {
      name: "Cash Sales",
      Current: collectionData[0]?.CASH_SALE,
      Last: collectionData[0]?.LAST_CASH_SALE,
    },
    {
      name: "Installment",
      Current: collectionData[0]?.INSTALLMENT_SALE,
      Last: collectionData[0]?.LAST_INST_SALE,
    },
    {
      name: "Credit",
      Current: collectionData[0]?.CREDIT_SALE,
      Last: collectionData[0]?.LAST_CREDIT_SALE,
    },
  ];
  return (
    <div className="w-[91%] h-[400px] my-10">
      <h2
        className={`text-xl font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-700"
        }`}
      >
        Sales Comparison Chart
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme === "dark" ? "#4B5563" : "#E5E7EB"}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: theme === "dark" ? "#FFF" : "#374151" }}
            stroke={theme === "dark" ? "#6B7280" : "#374151"}
          />
          <YAxis
            tick={{ fill: theme === "dark" ? "#FFF" : "#374151" }}
            stroke={theme === "dark" ? "#6B7280" : "#374151"}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1F2937" : "#FFF",
              borderColor: theme === "dark" ? "#374151" : "#E5E7EB",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            itemStyle={{ color: theme === "dark" ? "#FFF" : "#374151" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={(value) => (
              <span style={{ color: theme === "dark" ? "#FFF" : "#374151" }}>
                {value}
              </span>
            )}
          />
          <Bar
            dataKey="Current"
            fill={theme === "dark" ? "#3B82F6" : "#2563EB"}
            name="Current Month"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Last"
            fill={theme === "dark" ? "#10B981" : "#059669"}
            name="Last Month"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
