import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import TransactionChart from "./components/TransactionChart";
import Dashboard from "./components/Dashboard";
import BudgetForm from "./components/BudgetForm";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [budgets, setBudgets] = useState({});

  const handleAddTransaction = (transaction) => {
    if (editIndex !== null) {
      const updated = [...transactions];
      updated[editIndex] = transaction;
      setTransactions(updated);
      setEditIndex(null);
    } else {
      setTransactions([...transactions, transaction]);
    }
  };

  const handleDeleteTransaction = (index) => {
    const updated = [...transactions];
    updated.splice(index, 1);
    setTransactions(updated);
  };

  const handleEditTransaction = (index) => {
    setEditIndex(index);
  };

  const handleSetBudgets = (newBudgets) => {
    setBudgets(newBudgets);
  };

  return (
    <Router >
      <div className="bg-blue-950">
      <div className="max-w-3xl mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Personal Finance Visualizer
        </h1>

        {/* Navigation Links */}
        <nav className="flex justify-center gap-6 mb-6 text-blue-600">
          <Link to="/" className="rounded border bg-blue-600 text-white p-2 hover:bg-blue-400">Dashboard</Link>
          <Link to="/transactions" className="rounded border bg-blue-600 text-white p-2 hover:bg-blue-400">Set Transactions</Link>
          <Link to="/budgets" className="rounded border bg-blue-600 text-white p-2 hover:bg-blue-400">Set Budgets</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Dashboard transactions={transactions} budgets={budgets} />}
          />

          <Route
            path="/transactions"
            element={
              <>
                <TransactionForm
                  onAddTransaction={handleAddTransaction}
                  initialData={editIndex !== null ? transactions[editIndex] : null}
                />
                <TransactionList
                  transactions={transactions}
                  onDelete={handleDeleteTransaction}
                  onEdit={handleEditTransaction}
                />
                <TransactionChart transactions={transactions} />
              </>
            }
          />

          <Route
            path="/budgets"
            element={<BudgetForm onSetBudgets={handleSetBudgets} />}
          />
        </Routes>
      </div>
      </div>
    </Router>
  );
};

export default App;
