import React, { useState } from "react";
import "./tables.css";

const products = [
  {
    date: "01.02.2024",
    incomeDetail: "Salary ",
    incomeType: "Bank Transfer",
    amount: 2450000000,
    status: "Receipt",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    incomeDetail: "Salary ",
    incomeType: "Bank Transfer",
    amount: 2450000,
    status: "Receipt",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    incomeDetail: "Salary ",
    incomeType: "Credit Card",
    amount: 24000,
    status: "Not Received",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    incomeDetail: "Salary ",
    incomeType: "Credit Card",
    amount: 2400,
    status: "Not Received",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    incomeDetail: "Salary ",
    incomeType: "Credit Card",
    amount: 240,
    status: "Not Received",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    incomeDetail: "Salary ",
    incomeType: "Credit Card",
    amount: 24,
    status: "Not Received",
    action: "Edit",
  },
];

export default function Incometable() {
  const [filter, setFilter] = useState("All");

  const filteredProducts = products.filter(
    (product) => filter === "All" || product.status === filter
  );

  function formatAmount(amount) {
    if (amount < 1000000) {
      return new Intl.NumberFormat("en-US").format(amount);
    } else if (amount < 1000000000) {
      return (amount / 1000000).toFixed(3).replace(".", ",") + "M";
    } else {
      return (amount / 1000000000).toFixed(3).replace(".", ",") + "B";
    }
  }

  return (
    <div className="datatable">
      <table className="datatable--chart">
        <thead>
          <tr className="datatable--filter-header">
            <th onClick={() => setFilter("All")}>All</th>
            <th onClick={() => setFilter("Receipt")}>Receipt</th>
            <th onClick={() => setFilter("Not Received")}>Not Received</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr className="datatable--header">
            <th>DATE</th>
            <th>INCOME DETAILS</th>
            <th>INCOME TYPE</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index} className="datatable--items">
              <td>{product.date}</td>
              <td>{product.incomeDetail}</td>
              <td>{product.incomeType}</td>
              <td>${formatAmount(product.amount)}</td>
              <td>{product.status}</td>
              <td>{product.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
