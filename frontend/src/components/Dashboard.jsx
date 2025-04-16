// src/components/Dashboard.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Dashboard = ({ transactions, budgets }) => {
  const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate the category breakdown
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  // Prepare budget comparison data
  const budgetComparison = Object.keys(budgets).map((category) => {
    const actual = categoryTotals[category] || 0;
    const budget = budgets[category] || 0;
    return {
      category,
      actual,
      budget,
      difference: budget - actual,
      isOverBudget: actual > budget,
    };
  });

  // Most recent 5 transactions
  const recentTransactions = transactions.slice(-5);

  // Pie chart data
  const pieData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold mb-2 text-white">Dashboard</h2>

      {/* Total Expenses */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold ">Total Expenses</h3>
        <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
      </div>

      {/* Category Breakdown Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md ">
        <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
        <PieChart width={350} height={350}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Budget vs Actual Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Budget vs Actual</h3>
        <ul>
          {budgetComparison.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between p-2 border-b ${
                item.isOverBudget ? "text-red-600 font-semibold" : ""
              }`}
            >
              <span>{item.category}</span>
              <span>
                Budget: ${item.budget.toFixed(2)} | Actual: $
                {item.actual.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <ul>
          {recentTransactions.map((transaction, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
              <span className="font-bold">${transaction.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
