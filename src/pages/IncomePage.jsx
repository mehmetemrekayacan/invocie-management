import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Incometable from "../data-table/Incometable";
import IncomeModal from "../models/IncomeModal";

export default function IncomePage() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("incomeProducts");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addIncome = (newIncome) => {
    const updatedProducts = [...products, newIncome];
    setProducts(updatedProducts);
    localStorage.setItem("incomeProducts", JSON.stringify(updatedProducts));
  };

  return (
    <>
      <div className="heading">
        <h1>Income</h1>
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
      {showModal && (
        <IncomeModal toggleModal={toggleModal} addIncome={addIncome} />
      )}
      <Incometable products={products} />
      <Outlet />
    </>
  );
}
