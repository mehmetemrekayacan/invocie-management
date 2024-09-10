import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Paymenttable from "../data-table/Paymenttable";
import PaymentModal from "../models/PaymentModal";

export default function PaymentPage() {
  const [showModal, setShowModal] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [status, setStatus] = useState("");

  const userEmail = localStorage.getItem("currentUserEmail");

  useEffect(() => {
    if (!userEmail) {
      // Handle redirect if userEmail is not available
      return;
    }
    const storedPayments = localStorage.getItem(`payments_${userEmail}`);
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    }
  }, [userEmail]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addPayment = (newPayment) => {
    const updatedPayments = [...payments, newPayment];
    setPayments(updatedPayments);
    localStorage.setItem(
      `payments_${userEmail}`,
      JSON.stringify(updatedPayments)
    );
  };

  return (
    <>
      <div className="heading">
        <h1>Payments</h1>
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
            <span>Add Payment</span>
          </div>
        </div>
      </div>

      {showModal && (
        <PaymentModal toggleModal={toggleModal} addPayment={addPayment} />
      )}

      <Paymenttable payments={payments} />
      <Outlet />
    </>
  );
}
