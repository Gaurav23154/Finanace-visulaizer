import React, { useState } from "react";

const categories = [
  "Food", "Transport", "Entertainment", "Utilities", "Shopping", "Health", "Other"
];

const TransactionForm = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: check if fields are empty or if amount is not a valid number
    if (!amount || !date || !description) {
      return alert("Please fill all fields");
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return alert("Amount must be a valid number greater than 0");
    }

    const newTransaction = {
      id: Date.now(),  // Unique ID for each transaction
      amount: parseFloat(amount),
      date,
      description,
      category,
    };

    onAddTransaction(newTransaction);

    // Reset form after submission
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("Other");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl shadow-md bg-white">
      <div>
        <label htmlFor="amount" className="block font-medium">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
          min="0"
        />
      </div>
      <div>
        <label htmlFor="date" className="block font-medium">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="description" className="block font-medium">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="category" className="block font-medium">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
