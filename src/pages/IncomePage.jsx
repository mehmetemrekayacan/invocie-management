import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Incometable from "../data-table/Incometable";

export default function IncomePage() {
  const [showModal, setShowModal] = useState(false);
  const [incomeType, setIncomeType] = useState("");
  const [status, setStatus] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Income Type:", incomeType);
    console.log("Status:", status);
    // Form gönderimi veya başka bir işlem yapılabilir
    toggleModal();
  };

  return (
    <>
      <div className="heading">
        <h1>Incomes</h1>
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
            <span>Add Incomes</span>
          </div>
        </div>
      </div>
      <Incometable />
      <Outlet />
    </>
  );
}
