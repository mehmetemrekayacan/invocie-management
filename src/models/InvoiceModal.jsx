/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function InvoiceModal({ toggleModal, addInvoice }) {
  const [date, setDate] = useState("");
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInvoice = {
      date: new Date(date).toLocaleDateString("en-US"),
      client,
      billed: parseInt(amount, 10),
      status,
      action: "Edit",
    };

    addInvoice(newInvoice);
    setDate("");
    setClient("");
    setAmount(0);
    setStatus("");

    toggleModal();
  };

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Invoice</h2>
          <form onSubmit={handleSubmit} className="model--form">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="client">Client</label>
            <textarea
              id="client"
              name="client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            ></textarea>

            <label htmlFor="amount">Billed Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

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
                  <option value="given">Given</option>
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
  );
}
