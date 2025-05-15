import React from 'react';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,LabelList,ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Feb_24', target: 90, achieved: 78, recovery: 1100 },
  { month: 'Mar_24', target: 90, achieved: 81, recovery: 1100 },
  { month: 'Apr_24', target: 90, achieved: 78, recovery: 1100 },
  { month: 'May_24', target: 95, achieved: 74, recovery: 1100 },
  { month: 'Jun_24', target: 95, achieved: 73, recovery: 1200 },
  { month: 'Jul_24', target: 95, achieved: 69, recovery: 1100 },
  { month: 'Aug_24', target: 95, achieved: 67, recovery: 995 },
  { month: 'Sep_24', target: 95, achieved: 67, recovery: 933 },
  { month: 'Oct_24', target: 95, achieved: 69, recovery: 982 },
  { month: 'Nov_24', target: 90, achieved: 65, recovery: 867 },
  { month: 'Dec_24', target: 100, achieved: 66, recovery: 884 },
  { month: 'Jan_25', target: 100, achieved: 67, recovery: 871 },
  { month: 'Feb_25', target: 100, achieved: 61, recovery: 794 },
];

export default function RecoveryCharts() {
  return (
    <div className="max-w-7xl w-full mx-auto p-4 space-y-12">
      
      {/* Target vs Achieved Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Target vs Achieved (%)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Bar dataKey="target" fill="#004d40" name="Target">
              <LabelList dataKey="target" position="top" formatter={(v) => `${v}%`} />
            </Bar>
            <Bar dataKey="achieved" fill="#00bcd4" name="Achieved">
              <LabelList dataKey="achieved" position="top" formatter={(v) => `${v}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recovery Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recovery (in K)</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis unit="K" />
            <Tooltip />
            <Bar dataKey="recovery" fill="#00bcd4" name="Recovery">
              <LabelList dataKey="recovery" position="top" formatter={(v) => `${(v / 1000).toFixed(1)}M`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
