import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Invoicetable from "../data-table/Invoicetable";
import InvoiceModal from "../models/InvoiceModal";
import { useModal } from "../components/ToastProvider";

export default function InvoicePage() {
  const [showModal, setShowModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
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
      const storedInvoices = localStorage.getItem(`invoice_${userEmail}`);
      if (storedInvoices) {
        setInvoices(JSON.parse(storedInvoices));
      }
    } catch (error) {
      console.error("Error loading invoice data:", error);
      modal?.showModal && modal.showModal("Failed to load invoice data", "error");
    } finally {
      setIsLoading(false);
    }
  }, [userEmail, navigate, modal]);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const addInvoice = useCallback((newInvoice) => {
    setInvoices(prevInvoices => {
      const updatedInvoices = [...prevInvoices, newInvoice];
      localStorage.setItem(`invoice_${userEmail}`, JSON.stringify(updatedInvoices));
      return updatedInvoices;
    });
    
    modal?.showModal && modal.showModal("Invoice added successfully!", "success");
  }, [userEmail, modal]);

  // Memoize invoices to prevent unnecessary re-renders
  const memoizedInvoices = useMemo(() => invoices, [invoices]);

  return (
    <>
      <div className="heading">
        <h1>Invoices</h1>
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
            <span>Add Invoice</span>
          </div>
        </button>
      </div>
      
      {showModal && (
        <InvoiceModal toggleModal={toggleModal} addInvoice={addInvoice} />
      )}
      
      <Invoicetable invoices={memoizedInvoices} isLoading={isLoading} />
      <Outlet />
    </>
  );
}
