/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { formatStatus, formatAmount } from "../components/Utils";
import "./tables.css";

export default function Incometable({ products = [] }) {
  const [filter, setFilter] = useState("All");

  const filteredProducts = products.filter(
    (product) => filter === "All" || formatStatus(product.status) === filter
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
              <td>${formatAmount(product.amount)}</td>
              <td>{formatStatus(product.status)}</td>
              <td>{product.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
