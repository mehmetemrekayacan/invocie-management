import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Incometable from "../data-table/Incometable";

export default function IncomePage() {
  const [showModal, setShowModal] = useState(false);
  const [incomeType, setIncomeType] = useState("");
  const [status, setStatus] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleModal();
  };

  return (
    <>
      <div className="heading">
        <h1>Income</h1>
        <div className="add-button" onClick={toggleModal}>
          <div>
            <img
              src="/src/assets/add=dark.svg"
              className="dark-icon"
              alt="dark-add"
            />
            <img
              src="/src/assets/add=light.svg"
              className="light-icon"
              alt="light-add"
            />
            <span>Add Incomes</span>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal--overlay" onClick={toggleModal}>
          <div className="model--box" onClick={(e) => e.stopPropagation()}>
            <div className="modal--content">
              <h2>Add Income</h2>
              <form onSubmit={handleSubmit} className="model--form">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" />

                <label htmlFor="details">Income Details</label>
                <textarea id="details" name="details"></textarea>

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" />

                <div className="model--dropdowns">
                  <div className="model--dropdown-type">
                    <label htmlFor="income-type">Income Type</label>
                    <select
                      id="income-type"
                      name="income-type"
                      value={incomeType}
                      onChange={(e) => setIncomeType(e.target.value)}
                    >
                      <option value="">Select Income Type</option>
                      <option value="creditcard">Credit Card</option>
                      <option value="cash">Cash</option>
                      <option value="banktransfer">Bank Transfer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="model--dropdown-status">
                    <label htmlFor="income-status">Status</label>
                    <select
                      id="income-status"
                      name="income-status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status Type</option>
                      <option value="receipt">Receipt</option>
                      <option value="notreceived">Not Received</option>
                    </select>
                  </div>
                </div>

                <div className="model--buttons">
                  <button
                    type="button"
                    className="model--close-button"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="model--add-button">
                    Add Income
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Incometable />
      <Outlet />
    </>
  );
}
