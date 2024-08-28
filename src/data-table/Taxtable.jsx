import React, { useState } from "react";
import "./tables.css";

const products = [
  {
    taxname: "Sales Tax",
    country: "Turkey",
    taxrate: 40,
    status: "Enabled",
    action: "Edit",
  },
  {
    taxname: "Sales Tax",
    country: "Turkey",
    taxrate: 40,
    status: "Not Enabled",
    action: "Edit",
  },
];

export default function Taxtable() {
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
            <th onClick={() => setFilter("Enable")}>Enable</th>
            <th onClick={() => setFilter("Not Enabled")}>Not Enabled</th>
            <th></th>
            <th></th>
          </tr>
          <tr className="datatable--header">
            <th>TAX NAME</th>
            <th>COUNTRY</th>
            <th>TAX RATE (%)</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index} className="datatable--items">
              <td>{product.taxname}</td>
              <td>{product.country}</td>
              <td>{product.taxrate}</td>
              <td>{product.status}</td>
              <td>{product.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
