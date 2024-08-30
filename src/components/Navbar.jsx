import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <div className="navbar">
      <div className="navbar--title">
        <Link to="/">
          <img
            src="/src/assets/dashboard=dark.svg"
            className="dark-icon"
            alt="dark-dashboard"
          />
          <img
            src="/src/assets/dashboard=light.svg"
            className="light-icon"
            alt="light-dashboard"
          />
          <h2>Dashboard</h2>
        </Link>
      </div>
      <div className="navbar--title">
        <Link to="/income">
          <img
            src="/src/assets/income=dark.svg"
            className="dark-icon"
            alt="dark-income"
          />
          <img
            src="/src/assets/income=light.svg"
            className="light-icon"
            alt="light-income"
          />
          <h2>Income</h2>
        </Link>
      </div>
      <div className="navbar--title">
        <Link to="/invoice">
          <img
            src="/src/assets/invoice=dark.svg"
            className="dark-icon"
            alt="dark-invoice"
          />
          <img
            src="/src/assets/invoice=light.svg"
            className="light-icon"
            alt="light-invoice"
          />
          <h2>Invoice</h2>
        </Link>
      </div>
      <div
        className={`navbar--title ${
          isDropdownOpen ? "navbar--dropdown-open" : ""
        }`}
        ref={dropdownRef}
      >
        <div className="navbar--title-active" onClick={toggleDropdown}>
          <img
            src="/src/assets/expense=dark.svg"
            className="dark-icon"
            alt="dark-expense"
          />
          <img
            src="/src/assets/expense=light.svg"
            className="light-icon"
            alt="light-expense"
          />
          <h2>Expense</h2>
          <img
            className="navbar--dropdown-icon dark-icon"
            src="/src/assets/dropdown=dark.svg"
            alt="dark-sort"
          />
          <img
            className="navbar--dropdown-icon light-icon"
            src="/src/assets/dropdown=light.svg"
            alt="light-sort"
          />
        </div>
        {isDropdownOpen && (
          <div className="navbar--dropdown-menu">
            <Link
              to="/expense/payment"
              className="navbar--dropdown-item"
              onClick={closeDropdown}
            >
              Payment
            </Link>
            <Link
              to="/expense/tax"
              className="navbar--dropdown-item"
              onClick={closeDropdown}
            >
              Tax
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
