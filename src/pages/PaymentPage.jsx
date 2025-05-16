import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Paymenttable from "../data-table/Paymenttable";
import PaymentModal from "../models/PaymentModal";
import { useModal } from "../components/ToastProvider";

export default function PaymentPage() {
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState([]);
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
      const storedPayments = localStorage.getItem(`payments_${userEmail}`);
      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      }
    } catch (error) {
      console.error("Error loading payment data:", error);
      modal?.showModal && modal.showModal("Failed to load payment data", "error");
    } finally {
      setIsLoading(false);
    }
  }, [userEmail, navigate, modal]);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const addPayment = useCallback((newPayment) => {
    setPayments(prevPayments => {
      const updatedPayments = [...prevPayments, newPayment];
      localStorage.setItem(`payments_${userEmail}`, JSON.stringify(updatedPayments));
      return updatedPayments;
    });
    
    modal?.showModal && modal.showModal("Payment added successfully!", "success");
  }, [userEmail, modal]);

  // Memoize payments to prevent unnecessary re-renders
  const memoizedPayments = useMemo(() => payments, [payments]);

  return (
    <>
      <div className="heading">
        <h1>Payments</h1>
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
            <span>Add Payment</span>
          </div>
        </button>
      </div>

      {showModal && (
        <PaymentModal toggleModal={toggleModal} addPayment={addPayment} />
      )}

      <Paymenttable payments={memoizedPayments} isLoading={isLoading} />
      <Outlet />
    </>
  );
}
