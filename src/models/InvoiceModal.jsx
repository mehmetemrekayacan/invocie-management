/* eslint-disable react/prop-types */
import React, { useState, useCallback, memo } from "react";
import "./models.css";

const InvoiceModal = memo(({ toggleModal, addInvoice }) => {
  const [formData, setFormData] = useState({
    date: "",
    client: "",
    amount: "",
    status: ""
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Form validation
    const requiredFields = ['date', 'client', 'amount', 'status'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Lütfen tüm alanları doldurun.`);
      return;
    }

    const newInvoice = {
      date: new Date(formData.date).toLocaleDateString("en-US"),
      client: formData.client,
      billed: parseInt(formData.amount, 10),
      status: formData.status,
      action: "Edit",
    };

    addInvoice(newInvoice);
    toggleModal();
  }, [formData, addInvoice, toggleModal]);

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Invoice</h2>
          <form onSubmit={handleSubmit} className="model--form">
            <div className="model--form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="model--input"
              />
            </div>

            <div className="model--form-group">
              <label htmlFor="client">Client</label>
              <textarea
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="model--textarea"
                placeholder="Enter client details"
              ></textarea>
            </div>

            <div className="model--form-group">
              <label htmlFor="amount">Billed Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="model--input"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            <div className="model--form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="model--select"
              >
                <option value="">Select Status Type</option>
                <option value="receipt">Receipt</option>
                <option value="given">Given</option>
              </select>
            </div>

            <div className="model--buttons">
              <button
                type="button"
                className="model--close-button"
                onClick={toggleModal}
              >
                Cancel
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
});

export default InvoiceModal;
