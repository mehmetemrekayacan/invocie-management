import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Incometable from "../data-table/Incometable";
import IncomeModal from "../models/IncomeModal";
import { useModal } from "../components/ToastProvider";

export default function IncomePage() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("currentUserEmail");
  const modal = useModal();

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    try {
      const storedProducts = localStorage.getItem(`income_${userEmail}`);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error("Error loading income data:", error);
      modal?.showModal && modal.showModal("Failed to load income data", "error");
    } finally {
      setIsLoading(false);
    }
  }, [userEmail, navigate, modal]);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const addIncome = useCallback((newIncome) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, newIncome];
      localStorage.setItem(`income_${userEmail}`, JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    
    modal?.showModal && modal.showModal("Income added successfully!", "success");
  }, [userEmail, modal]);

  // Memoize products to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => products, [products]);

  return (
    <>
      <div className="heading">
        <h1>Income</h1>
        <button className="add-button" onClick={toggleModal}>
          <div>
            <img
              src="/assets/add=dark.svg"
              className="dark-icon"
              alt="dark-add"
            />
            <img
              src="/assets/add=light.svg"
              className="light-icon"
              alt="light-add"
            />
            <span>Add Income</span>
          </div>
        </button>
      </div>
      
      {showModal && (
        <IncomeModal toggleModal={toggleModal} addIncome={addIncome} />
      )}
      
      <Incometable products={memoizedProducts} isLoading={isLoading} />
      <Outlet />
    </>
  );
}
