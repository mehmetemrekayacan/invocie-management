/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { formatStatus, formatAmount } from "../components/Utils";
import "./tables.css";

export default function Invoicetable({ invoices = [] }) {
  const [filter, setFilter] = useState("All");

  const filteredInvoices = invoices.filter(
    (invoice) => filter === "All" || formatStatus(invoice.status) === filter
  );

  return (
    <div className="datatable">
      <table className="datatable--chart">
        <thead>
          <tr className="datatable--filter-header">
            <th onClick={() => setFilter("All")}>All</th>
            <th onClick={() => setFilter("Receipt")}>Receipt</th>
            <th onClick={() => setFilter("Given")}>Given</th>
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
              <td>{formatStatus(invoice.status)}</td>
              <td>{invoice.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
