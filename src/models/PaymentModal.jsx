/* eslint-disable react/prop-types */
import React, { useState, useCallback, memo } from "react";
import "./models.css";

const PaymentModal = memo(({ toggleModal, addPayment }) => {
  const [formData, setFormData] = useState({
    date: "",
    paymentDetail: "",
    amount: "",
    paymentType: "",
    status: ""
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Form validation
    const requiredFields = ['date', 'paymentDetail', 'amount', 'paymentType', 'status'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Lütfen tüm alanları doldurun.`);
      return;
    }

    const newPayment = {
      date: new Date(formData.date).toLocaleDateString("en-US"),
      paymentDetail: formData.paymentDetail,
      paymentType: formData.paymentType,
      amount: parseFloat(formData.amount),
      status: formData.status,
      action: "Edit",
    };

    addPayment(newPayment);
    toggleModal();
  }, [formData, addPayment, toggleModal]);

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Payment</h2>
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
              <label htmlFor="paymentDetail">Payment Details</label>
              <textarea
                id="paymentDetail"
                name="paymentDetail"
                value={formData.paymentDetail}
                onChange={handleChange}
                className="model--textarea"
                placeholder="Enter payment details"
              ></textarea>
            </div>

            <div className="model--form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="model--input"
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>

            <div className="model--form-grid">
              <div className="model--form-group">
                <label htmlFor="paymentType">Payment Type</label>
                <select
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleChange}
                  className="model--select"
                >
                  <option value="">Select Payment Type</option>
                  <option value="creditcard">Credit Card</option>
                  <option value="cash">Cash</option>
                  <option value="banktransfer">Bank Transfer</option>
                  <option value="other">Other</option>
                </select>
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
                Cancel
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
});

export default PaymentModal;
