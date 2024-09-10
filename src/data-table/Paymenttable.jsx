/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { formatStatus, formatAmount, formatType } from "../components/Utils";
import "./tables.css";

export default function Paymenttable({ payments = [] }) {
  const [filter, setFilter] = useState("All");

  const filteredPayments = payments.filter(
    (payment) => filter === "All" || formatStatus(payment.status) === filter
  );

  return (
    <div className="datatable">
      <table className="datatable--chart">
        <thead>
          <tr className="datatable--filter-header">
            <th onClick={() => setFilter("All")}>All</th>
            <th onClick={() => setFilter("Paid")}>Paid</th>
            <th onClick={() => setFilter("Unpaid")}>Unpaid</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr className="datatable--header">
            <th>DATE</th>
            <th>PAYMENT DETAILS</th>
            <th>PAYMENT TYPE</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment, index) => (
            <tr key={index} className="datatable--items">
              <td>{payment.date}</td>
              <td>{payment.paymentDetail}</td>
              <td>{formatType(payment.paymentType)}</td>
              <td>${formatAmount(payment.amount)}</td>
              <td>{formatStatus(payment.status)}</td>
              <td>{payment.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
