import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { date: "20 Jan 2025", allLocations: 0 },
  { date: "21 Jan 2025", allLocations: 0 },
  { date: "22 Jan 2025", allLocations: 0 },
  { date: "23 Jan 2025", allLocations: 0 },
  { date: "24 Jan 2025", allLocations: 0 },
  { date: "25 Jan 2025", allLocations: 0 },
  { date: "26 Jan 2025", allLocations: 0 },
  { date: "27 Jan 2025", allLocations: 0 },
  { date: "28 Jan 2025", allLocations: 0 },
  { date: "29 Jan 2025", allLocations: 0 },
  { date: "30 Jan 2025", allLocations: 0 },
  { date: "31 Jan 2025", allLocations: 0 },
  { date: "1 Feb 2025", allLocations: 0 },
  { date: "2 Feb 2025", allLocations: 0 },
  { date: "3 Feb 2025", allLocations: 0 },
  { date: "4 Feb 2025", allLocations: 0 },
  { date: "5 Feb 2025", allLocations: 0 },
  { date: "6 Feb 2025", allLocations: 0 },
  { date: "7 Feb 2025", allLocations: 0 },
  { date: "8 Feb 2025", allLocations: 0 },
  { date: "9 Feb 2025", allLocations: 0 },
  { date: "10 Feb 2025", allLocations: 0 },
  { date: "11 Feb 2025", allLocations: 0 },
  { date: "12 Feb 2025", allLocations: 0 },
  { date: "13 Feb 2025", allLocations: 0 },
  { date: "14 Feb 2025", allLocations: 0 },
  { date: "15 Feb 2025", allLocations: 0 },
  { date: "16 Feb 2025", allLocations: 0 },
  { date: "17 Feb 2025", allLocations: 0 },
  { date: "18 Feb 2025", allLocations: 0 },
];

const SalesChart = () => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold">Sales Last 30 Days</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: "white" }} angle={-45} textAnchor="end" height={60} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="allLocations" stroke="lightgreen" strokeWidth={2} dot={{ fill: "green", r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
