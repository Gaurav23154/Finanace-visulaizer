import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format, parseISO } from "date-fns";

const TransactionChart = ({ transactions }) => {
  const monthlyTotals = {};

  transactions.forEach((tx) => {
    const date = parseISO(tx.date);
    const key = format(date, "yyyy-MM"); // e.g., "2025-04"
    monthlyTotals[key] = (monthlyTotals[key] || 0) + Number(tx.amount);
  });

  const chartData = Object.entries(monthlyTotals).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-white">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
