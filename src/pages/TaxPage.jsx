import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Taxtable from "../data-table/Taxtable";
import TaxModal from "../models/TaxModal";
import { useModal } from "../components/ToastProvider";

export default function TaxPage() {
  const [showModal, setShowModal] = useState(false);
  const [taxes, setTaxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("currentUserEmail");
  const modal = useModal();

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const addTax = useCallback((newTax) => {
    setTaxes(prevTaxes => {
      const updatedTaxes = [...prevTaxes, newTax];
      localStorage.setItem(`tax_${userEmail}`, JSON.stringify(updatedTaxes));
      return updatedTaxes;
    });
    
    modal.showModal("Tax record added successfully!", "success");
  }, [userEmail, modal]);

  // Load taxes from localStorage
  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }
    
    setIsLoading(true);
    try {
      const storedTaxes = localStorage.getItem(`tax_${userEmail}`);
      if (storedTaxes) {
        setTaxes(JSON.parse(storedTaxes));
      }
    } catch (error) {
      console.error("Error loading tax data:", error);
      modal.showModal("Failed to load tax records", "error");
    } finally {
      setIsLoading(false);
    }
  }, [userEmail, navigate, modal]);

  // Memoize taxes to prevent unnecessary re-renders
  const memoizedTaxes = useMemo(() => taxes, [taxes]);

  return (
    <>
      <div className="heading">
        <h1>Taxes</h1>
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
            <span>Add Tax</span>
          </div>
        </button>
      </div>

      {showModal && (
        <TaxModal
          toggleModal={toggleModal}
          addTax={addTax}
        />
      )}

      <Taxtable taxes={memoizedTaxes} isLoading={isLoading} />
      <Outlet />
    </>
  );
}
