// src/components/Card.jsx
import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">{children}</div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="font-semibold text-lg mb-2">{children}</div>
  );
};

export const CardBody = ({ children }) => {
  return (
    <div>{children}</div>
  );
};
