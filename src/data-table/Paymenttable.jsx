import React, { useState } from "react";
import "./tables.css";

const products = [
  {
    date: "01.02.2024",
    paymentDetail: "Salary ",
    paymentType: "Bank Transfer",
    amount: 2450000000,
    status: "Paid",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    paymentDetail: "Salary ",
    paymentType: "Bank Transfer",
    amount: 2450000,
    status: "Paid",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    paymentDetail: "Salary ",
    paymentType: "Credit Card",
    amount: 24000,
    status: "Unpaid",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    paymentDetail: "Salary ",
    paymentType: "Credit Card",
    amount: 2400,
    status: "Unpaid",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    paymentDetail: "Salary ",
    paymentType: "Credit Card",
    amount: 240,
    status: "Unpaid",
    action: "Edit",
  },
  {
    date: "01.02.2024",
    paymentDetail: "Salary ",
    paymentType: "Credit Card",
    amount: 24,
    status: "Unpaid",
    action: "Edit",
  },
];

export default function Paymenttable() {
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
          {filteredProducts.map((product, index) => (
            <tr key={index} className="datatable--items">
              <td>{product.date}</td>
              <td>{product.paymentDetail}</td>
              <td>{product.paymentType}</td>
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
