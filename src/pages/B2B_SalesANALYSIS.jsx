

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import axios from 'axios';

// Format numbers like 1.2M, 3K
const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num;
};

// Get last 12 months in "MMM-YY" format
const getLast12Months = () => {
  const months = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('default', { month: 'short' }) + '-' + d.getFullYear().toString().slice(2);
    months.push(label);
  }

  return months;
};

const SalesChart = () => {
  const [data, setData] = useState([]);
  const [company, setCompany] = useState('1');
  const [month, setMonth] = useState(getLast12Months()[0]);

  const companyOptions = [
    { label: 'ZAKA BROTHERS (PVT) LTD.', value: '1' },
    { label: 'Faisalabad Trading Company', value: '11' },
  ];

  const monthOptions = getLast12Months();

  const fetchData = () => {
    const url = `https://zbl.erprz.com/zbl/cashvscredit?company=${company}&branch=&month=${month}`;
    axios.get(url)
      .then(res => {
        const transformedData = res.data.map(item => ({
          name: item.SHORT_BRANCH_NAME,
          credit: item.CREDIT_SALE,
          cash: item.CASH_SALE
        }));
        setData(transformedData);
      })
      .catch(err => {
        console.error('Error fetching sales data:', err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [company, month]);

  const totalCredit = data.reduce((acc, d) => acc + d.credit, 0);
  const totalCash = data.reduce((acc, d) => acc + d.cash, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        B2B Sales Performance <span className="text-blue-600">{month}</span>
      </h2>

      <div className="flex justify-center gap-4 mb-4">
        <select
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {companyOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <select
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {monthOptions.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-around my-4">
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <div className="text-sm">Total Credit Sale</div>
          <div className="text-green-800 text-2xl font-bold">{formatNumber(totalCredit)}</div>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow text-center">
          <div className="text-sm">Total Cash Sale</div>
          <div className="text-yellow-600 text-2xl font-bold">{formatNumber(totalCash)}</div>
        </div>
      </div>

      <h3 className="text-center font-semibold mb-4">Credit vs Cash Sale</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip formatter={(value) => formatNumber(value)} />
          <Legend />
          <Bar dataKey="credit" fill="#264d00" name="Credit Sale">
            <LabelList dataKey="credit" content={({ x, y, value }) => (
              value > 0 ? (
                <text x={x + 20} y={y - 5} fontSize={12} fill="#000" textAnchor="middle">
                  {formatNumber(value)}
                </text>
              ) : null
            )} />
          </Bar>
          <Bar dataKey="cash" fill="#f1c40f" name="Cash Sale">
            <LabelList dataKey="cash" content={({ x, y, value }) => (
              value > 0 ? (
                <text x={x + 20} y={y - 5} fontSize={12} fill="#000" textAnchor="middle">
                  {formatNumber(value)}
                </text>
              ) : null
            )} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;

