import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Shopping",
  "Health",
  "Other",
];

const BudgetForm = ({ onSetBudgets }) => {
  const [budgets, setBudgets] = useState(
    categories.reduce((acc, category) => {
      acc[category] = "";
      return acc;
    }, {})
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for any empty or invalid fields
    for (let category of categories) {
      const value = budgets[category];
      if (value === "" || parseFloat(value) < 0) {
        toast.error(`Please fill a valid budget for "${category}"`);
        return;
      }
    }

    const parsedBudgets = Object.fromEntries(
      Object.entries(budgets).map(([category, value]) => [
        category,
        parseFloat(value),
      ])
    );

    onSetBudgets(parsedBudgets);
    toast.success("Budgets have been set successfully!");
  };

  const handleBudgetChange = (category, value) => {
    setBudgets((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded-xl shadow-md bg-white"
      >
        <h3 className="text-xl font-bold">Set Monthly Budgets</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-4">
            <label htmlFor={category} className="w-32">
              {category}
            </label>
            <input
              id={category}
              type="number"
              value={budgets[category]}
              onChange={(e) => handleBudgetChange(category, e.target.value)}
              className="p-2 border rounded-md"
              placeholder="Enter Budget"
              min="0"
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Set Budgets
        </button>
      </form>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default BudgetForm;
