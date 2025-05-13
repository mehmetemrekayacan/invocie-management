/* eslint-disable react/prop-types */
import React, { useState, useCallback, memo } from "react";
import countries from "../pages/DataCountries";
import "./models.css";

const TaxModal = memo(({ toggleModal, addTax }) => {
  const [formData, setFormData] = useState({
    taxName: "",
    country: "",
    taxRate: "",
    taxDetail: "", // New field for tax details
    amount: "", // New field for tax amount
    date: new Date().toISOString().split('T')[0], // Default to today
    status: 1, // Default to "Paid" status
    taxType: "Income Tax" // Default tax type
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (name === "taxRate") {
      // Limit to 3 characters and 0-100 range
      const parsedValue = value === "" ? "" : Math.min(100, Math.max(0, parseInt(value) || 0));
      setFormData(prev => ({ ...prev, [name]: String(parsedValue).slice(0, 3) }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Form validation
    const requiredFields = ['taxName', 'country', 'taxRate', 'date', 'taxDetail', 'amount', 'status', 'taxType'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    const newTax = {
      id: Date.now().toString(),
      date: new Date(formData.date).toLocaleDateString("en-US"),
      taxDetail: formData.taxDetail,
      taxType: formData.taxType,
      taxName: formData.taxName,
      country: formData.country,
      taxRate: parseInt(formData.taxRate, 10),
      amount: parseFloat(formData.amount),
      status: formData.status
    };
    
    addTax(newTax);
    toggleModal();
  }, [formData, addTax, toggleModal]);

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Tax</h2>
          <form onSubmit={handleSubmit} className="model--form">
            <div className="model--form-grid">
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
                <label htmlFor="taxName">Tax Name</label>
                <input
                  type="text"
                  id="taxName"
                  name="taxName"
                  value={formData.taxName}
                  onChange={handleChange}
                  className="model--input"
                  placeholder="Enter tax name"
                />
              </div>
            </div>
            
            <div className="model--form-group">
              <label htmlFor="taxDetail">Tax Details</label>
              <textarea
                id="taxDetail"
                name="taxDetail"
                value={formData.taxDetail}
                onChange={handleChange}
                className="model--textarea"
                placeholder="Enter tax details"
              ></textarea>
            </div>
            
            <div className="model--form-grid">
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
              
              <div className="model--form-group">
                <label htmlFor="taxRate">Tax Rate (%)</label>
                <input
                  type="number"
                  id="taxRate"
                  name="taxRate"
                  value={formData.taxRate}
                  onChange={handleChange}
                  className="model--input"
                  placeholder="Enter tax rate"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="model--form-grid">
              <div className="model--form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="model--select"
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="model--form-group">
                <label htmlFor="taxType">Tax Type</label>
                <select
                  id="taxType"
                  name="taxType"
                  value={formData.taxType}
                  onChange={handleChange}
                  className="model--select"
                >
                  <option value="Income Tax">Income Tax</option>
                  <option value="VAT">VAT</option>
                  <option value="Corporate Tax">Corporate Tax</option>
                  <option value="Other">Other</option>
                </select>
              </div>
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
                <option value={1}>Paid</option>
                <option value={2}>Unpaid</option>
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
                Add Tax
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default TaxModal;
