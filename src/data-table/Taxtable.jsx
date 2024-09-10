/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./tables.css";

export default function Taxtable({ taxes = [] }) {
  const [filter, setFilter] = useState("All");

  const filteredTaxes = taxes.filter(
    (tax) => filter === "All" || tax.status === filter
  );

  return (
    <div className="datatable">
      <table className="datatable--chart">
        <thead>
          <tr className="datatable--filter-header">
            <th onClick={() => setFilter("All")}>All</th>
            <th onClick={() => setFilter("Enabled")}>Enabled</th>
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
          {filteredTaxes.map((tax, index) => (
            <tr key={index} className="datatable--items">
              <td>{tax.taxName}</td>
              <td>{tax.country}</td>
              <td>{tax.taxRate}</td>
              <td>{tax.status}</td>
              <td>{tax.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
