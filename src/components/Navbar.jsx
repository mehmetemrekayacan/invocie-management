import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar--title">
        <Link to="/">
          <img src="/src/assets/dashboard=dark.svg" alt="dashboard" />
          <h2>Dashboard</h2>
        </Link>
      </div>
      <div className="navbar--title">
        <Link to="/income">
          <img src="/src/assets/income=dark.svg" alt="income" />
          <h2>Income</h2>
        </Link>
      </div>
      <div className="navbar--title">
        <Link to="/income">
          <img src="/src/assets/invoice=dark.svg" alt="invoice" />
          <h2>Invoice</h2>
        </Link>
      </div>
      <div className="navbar--title">
        <img src="/src/assets/expense=dark.svg" alt="expense" />
        <div className="navbar--title-active">
          <h2>Expense</h2>
          <img src="/src/assets/dropdown=dark.svg" alt="sort" />
        </div>
      </div>
    </div>
  );
}
