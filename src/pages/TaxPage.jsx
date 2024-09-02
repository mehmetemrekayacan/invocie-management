import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Taxtable from "../data-table/Taxtable";
import countries from "./DataCountries";

export default function TaxPage() {
  const [showModal, setShowModal] = useState(false);
  const [taxRate, setTaxRate] = useState("");
  const [status, setStatus] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <>
      <div className="heading">
        <h1>Taxes</h1>
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
            <span>Add Tax</span>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal--overlay" onClick={toggleModal}>
          <div className="model--box" onClick={(e) => e.stopPropagation()}>
            <div className="modal--content">
              <h2>Add Tax</h2>
              <form onSubmit={handleSubmit} className="model--form">
                <label htmlFor="details">Tax Name</label>
                <textarea id="details" name="details"></textarea>

                <div className="model--dropdowns">
                  <div className="model--dropdown-status">
                    <label htmlFor="tax-status">Country</label>
                    <select
                      id="tax-status"
                      name="tax-status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
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
      )}
      <Taxtable />

      <Outlet />
    </>
  );
}
