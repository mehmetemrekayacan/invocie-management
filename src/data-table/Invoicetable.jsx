/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./tables.css";

export default function Invoicetable({ invoices = [] }) {
  // Default to an empty array
  const [filter, setFilter] = useState("All");

  const filteredInvoices = invoices.filter(
    (invoice) => filter === "All" || invoice.status === filter
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
          {filteredInvoices.map((invoice, index) => (
            <tr key={index} className="datatable--items">
              <td>{invoice.date}</td>
              <td>{invoice.client}</td>
              <td>${formatAmount(invoice.billed)}</td>
              <td>{invoice.status}</td>
              <td>{invoice.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
