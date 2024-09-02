import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Invoicetable from "../data-table/Invoicetable";

export default function InvoicePage() {
  const [showModal, setShowModal] = useState(false);
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
        <h1>Invoices</h1>
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
            <span>Add Invoice</span>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal--overlay" onClick={toggleModal}>
          <div className="model--box" onClick={(e) => e.stopPropagation()}>
            <div className="modal--content">
              <h2>Add Invoice</h2>
              <form onSubmit={handleSubmit} className="model--form">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" />

                <label htmlFor="details">Client</label>
                <textarea type="" id="details" name="details"></textarea>

                <label htmlFor="amount">Billed Amount</label>
                <input type="number" id="amount" name="amount" />

                <div className="model--dropdowns">
                  <div className="model--dropdown-status">
                    <label htmlFor="invoice-status">Status</label>
                    <select
                      id="invoice-status"
                      name="invoice-status"
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
                    Add Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Invoicetable />

      <Outlet />
    </>
  );
}
