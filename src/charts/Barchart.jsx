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
          data={collectionData}
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
            dataKey="Target"
            fill={theme === "dark" ? "#F59E0B" : "#FBBF24"}
            name="Target"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="Achieved"
            fill={theme === "dark" ? "#10B981" : "#059669"}
            name="Achieved"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
