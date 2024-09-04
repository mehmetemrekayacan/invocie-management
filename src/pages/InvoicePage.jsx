import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Invoicetable from "../data-table/Invoicetable";
import InvoiceModal from "../models/InvoiceModal";

export default function InvoicePage() {
  const [showModal, setShowModal] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("currentUserEmail");

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }
    const storedInvoices = localStorage.getItem(`invoice_${userEmail}`);
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, [userEmail, navigate]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addInvoice = (newInvoice) => {
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem(
      `invoice_${userEmail}`,
      JSON.stringify(updatedInvoices)
    );
  };

  return (
    <>
      <div className="heading">
        <h1>Invoices</h1>
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
            <span>Add Invoice</span>
          </div>
        </div>
      </div>
      {showModal && (
        <InvoiceModal toggleModal={toggleModal} addInvoice={addInvoice} />
      )}
      <Invoicetable invoices={invoices} />
      <Outlet />
    </>
  );
}
