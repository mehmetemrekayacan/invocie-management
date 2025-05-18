/* eslint-disable react/prop-types */
import React, { useState, useCallback, memo } from "react";
import "./models.css";

const IncomeModal = memo(({ toggleModal, addIncome }) => {
  const [formData, setFormData] = useState({
    date: "",
    incomeDetail: "",
    incomeType: "",
    otherIncomeType: "",
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
    const requiredFields = ['date', 'incomeDetail', 'incomeType', 'amount', 'status'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Lütfen tüm alanları doldurun.`);
      return;
    }

    // Other seçeneği için özel kontrol
    if (formData.incomeType === "7" && !formData.otherIncomeType) {
      alert(`Lütfen diğer gelir tipini belirtin.`);
      return;
    }

    const newIncome = {
      date: new Date(formData.date).toLocaleDateString("en-US"),
      incomeDetail: formData.incomeDetail,
      incomeType: formData.incomeType === "7" ? formData.otherIncomeType : formData.incomeType,
      amount: parseInt(formData.amount, 10),
      status: formData.status,
      action: "Edit",
    };

    addIncome(newIncome);
    toggleModal();
  }, [formData, addIncome, toggleModal]);

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Income</h2>
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
              <label htmlFor="incomeDetail">Income Details</label>
              <textarea
                id="incomeDetail"
                name="incomeDetail"
                value={formData.incomeDetail}
                onChange={handleChange}
                className="model--textarea"
                placeholder="Enter income details"
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
              />
            </div>

            <div className="model--form-grid">
              <div className="model--form-group">
                <label htmlFor="incomeType">Income Type</label>
                <select
                  id="incomeType"
                  name="incomeType"
                  value={formData.incomeType}
                  onChange={handleChange}
                  className="model--select"
                >
                  <option value="">Select Income Type</option>
                  <option value="1">Sale</option>
                  <option value="2">Service</option>
                  <option value="3">Investment</option>
                  <option value="4">Rental</option>
                  <option value="5">Commission</option>
                  <option value="6">Royalty</option>
                  <option value="7">Other</option>
                </select>
              </div>

              {formData.incomeType === "7" && (
                <div className="model--form-group">
                  <label htmlFor="otherIncomeType">Specify Other Income Type</label>
                  <input
                    type="text"
                    id="otherIncomeType"
                    name="otherIncomeType"
                    value={formData.otherIncomeType}
                    onChange={handleChange}
                    className="model--input"
                    placeholder="Enter other income type"
                  />
                </div>
              )}

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
                Cancel
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
});

export default IncomeModal;
