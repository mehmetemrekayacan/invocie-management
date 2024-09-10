/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./tables.css";

export default function Paymenttable({ payments = [] }) {
  const [filter, setFilter] = useState("All");

  const filteredPayments = payments.filter(
    (payment) => filter === "All" || payment.status === filter
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
              <td>{payment.paymentType}</td>
              <td>${formatAmount(payment.amount)}</td>
              <td>{payment.status}</td>
              <td>{payment.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
