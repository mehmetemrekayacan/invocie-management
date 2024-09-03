/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function IncomeModal({ toggleModal, addIncome }) {
  const [date, setDate] = useState("");
  const [incomeDetail, setIncomeDetail] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIncome = {
      date: new Date(date).toLocaleDateString("en-US"),
      incomeDetail,
      incomeType,
      amount: parseInt(amount, 10),
      status,
      action: "Edit",
    };

    addIncome(newIncome);
    setDate("");
    setIncomeDetail("");
    setIncomeType("");
    setAmount(0);
    setStatus("");

    toggleModal();
  };

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Income</h2>
          <form onSubmit={handleSubmit} className="model--form">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="details">Income Details</label>
            <textarea
              id="details"
              name="details"
              value={incomeDetail}
              onChange={(e) => setIncomeDetail(e.target.value)}
            ></textarea>

            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

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
  );
}
