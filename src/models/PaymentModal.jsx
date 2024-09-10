/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function PaymentModal({ toggleModal, addPayment }) {
  const [date, setDate] = useState("");
  const [paymentDetail, setPaymentDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPayment = {
      date: new Date(date).toLocaleDateString("en-US"),
      paymentDetail,
      paymentType,
      amount: parseFloat(amount),
      status,
      action: "Edit",
    };

    addPayment(newPayment);
    setDate("");
    setPaymentDetail("");
    setAmount("");
    setPaymentType("");
    setStatus("");

    toggleModal();
  };

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Payment</h2>
          <form onSubmit={handleSubmit} className="model--form">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="details">Payment Details</label>
            <textarea
              id="details"
              name="details"
              value={paymentDetail}
              onChange={(e) => setPaymentDetail(e.target.value)}
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
                <label htmlFor="payment-type">Payment Type</label>
                <select
                  id="payment-type"
                  name="payment-type"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option value="">Select Payment Type</option>
                  <option value="creditcard">Credit Card</option>
                  <option value="cash">Cash</option>
                  <option value="banktransfer">Bank Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="model--dropdown-status">
                <label htmlFor="payment-status">Status</label>
                <select
                  id="payment-status"
                  name="payment-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status Type</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
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
                Add Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
