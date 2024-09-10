/* eslint-disable react/prop-types */
import React from "react";
import countries from "../pages/DataCountries";

export default function TaxModal({
  toggleModal,
  addTax,
  taxRate,
  setTaxRate,
  taxName,
  setTaxName,
  country,
  setCountry,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTax = {
      taxName,
      country,
      taxRate: parseInt(taxRate, 10),
      status: "Not Enabled", // Set default status
      action: "Edit", // Set default action
    };
    addTax(newTax);
    setTaxRate("");
    setTaxName("");
    setCountry("");
    toggleModal();
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setTaxRate(value);
    }
  };

  return (
    <div className="modal--overlay" onClick={toggleModal}>
      <div className="model--box" onClick={(e) => e.stopPropagation()}>
        <div className="modal--content">
          <h2>Add Tax</h2>
          <form onSubmit={handleSubmit} className="model--form">
            <label htmlFor="taxName">Tax Name</label>
            <textarea
              id="taxName"
              name="taxName"
              value={taxName}
              onChange={(e) => setTaxName(e.target.value)}
            ></textarea>

            <div className="model--dropdowns">
              <div className="model--dropdown-country">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="model--countries-dropdown"
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="model--taxrate">
                <label htmlFor="taxrate">Tax Rate (%)</label>
                <input
                  type="number"
                  id="taxrate"
                  name="taxrate"
                  value={taxRate}
                  onChange={handleInputChange}
                />
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
                Add Tax
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
