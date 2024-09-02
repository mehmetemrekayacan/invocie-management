import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Paymenttable from "../data-table/Paymenttable";

export default function PaymentPage() {
  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState("");
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
        <h1>Payments</h1>
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
            <span>Add Payments</span>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal--overlay" onClick={toggleModal}>
          <div className="model--box" onClick={(e) => e.stopPropagation()}>
            <div className="modal--content">
              <h2>Add Payment</h2>
              <form onSubmit={handleSubmit} className="model--form">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" />

                <label htmlFor="details">Payment Details</label>
                <textarea id="details" name="details"></textarea>

                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" />

                <div className="model--dropdowns">
                  <div className="model--dropdown-type">
                    <label htmlFor="payment-type">Payment Type</label>
                    <select
                      id="payment-type"
                      name="payment-type"
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="">Select payment Type</option>
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
      )}
      <Paymenttable />

      <Outlet />
    </>
  );
}
