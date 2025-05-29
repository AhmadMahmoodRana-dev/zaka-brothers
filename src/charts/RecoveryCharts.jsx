import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

export default function RecoveryCharts({ chartData }) {
  return (
    <div className="w-[91%] h-[400px] my-10">
      {/* Recovery Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recovery (in Millions)</h2>
        {chartData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
               <CartesianGrid
            strokeDasharray="3 3"
            stroke={"#E5E7EB"}
          />
          <XAxis
            dataKey="name"
            tick={{ fill:"#374151" }}
            stroke={"#374151"}
          />
          <YAxis
            tick={{ fill:"#374151" }}
            stroke={"#374151"}
          />
          <Tooltip
            contentStyle={{
              backgroundColor:"#FFF",
              borderColor:"#E5E7EB",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            itemStyle={{ color:"#374151" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={(value) => (
              <span style={{ color:"#374151" }}>
                {value}
              </span>
            )}
          />

              <Bar
                dataKey="Recovery_In_Millions"
                fill="red"
                name="Recovery_In_Millions"
                            radius={[4, 4, 0, 0]}

              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}
