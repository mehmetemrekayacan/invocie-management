import React, { useState } from "react";
import "./tables.css";

const products = [
  {
    date: "01.02.2024",
    client: "Enes Ataly",
    billed: "847",
    status: "Income",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    client: "Elextric Bill",
    billed: "457",
    status: "Expense",
    action: "Edit",
  },
];

export default function Invoicetable() {
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
            <th onClick={() => setFilter("Income")}>Income</th>
            <th onClick={() => setFilter("Expense")}>Expense</th>
            <th></th>
            <th></th>
          </tr>
          <tr className="datatable--header">
            <th>DATE</th>
            <th>CLIENT</th>
            <th>BILLED</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index} className="datatable--items">
              <td>{product.date}</td>
              <td>{product.client}</td>
              <td>$ {product.billed}</td>
              <td>{product.status}</td>
              <td>{product.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
