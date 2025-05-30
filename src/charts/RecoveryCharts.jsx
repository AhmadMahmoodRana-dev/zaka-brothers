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

export default function RecoveryCharts({ chartData }) {
  const { theme } = useContext(Context);
  console.log(chartData,"CHART DATA")
  return (
     <div className="w-[91%] h-[400px] my-10">
      <h2
        className={`text-xl font-semibold mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-700"
        }`}
      >
        Recovery In Millions
      </h2>
      <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="MONTH_LABEL" />
        <YAxis label={{ value: "Recovery (in Million)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="RECOVERY_IN_MILLION" fill="#8884d8" name="Recovery (M)" />
      </BarChart>
    </ResponsiveContainer>
    </div>
     
  );
}
