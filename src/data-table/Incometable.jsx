import React, { useState } from "react";
import "./tables.css";

const products = [
  {
    date: "01.02.2024",
    incomeDetail: "Salary ",
    incomeType: "Bank Transfer",
    amount: 245000,
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
];

export default function Incometable() {
  const [filter, setFilter] = useState("All");

  const filteredProducts = products.filter(
    (product) => filter === "All" || product.status === filter
  );

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
              <td>$ {product.amount}</td>
              <td>{product.status}</td>
              <td>{product.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
