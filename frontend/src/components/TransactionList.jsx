import React from "react";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  if (transactions.length === 0) {
    return <p className="text-gray-300">No transactions yet.</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2 text-white">Transaction List</h2>
      <ul className="space-y-2">
        {transactions.map((txn, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <div>
              <p className="font-medium">{txn.description}</p>
              <p className="text-sm text-gray-500">
                ₹{txn.amount} on {new Date(txn.date).toLocaleDateString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(index)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
