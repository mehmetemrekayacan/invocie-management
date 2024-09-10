import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Taxtable from "../data-table/Taxtable";
import TaxModal from "../models/TaxModal";

export default function TaxPage() {
  const [showModal, setShowModal] = useState(false);
  const [taxRate, setTaxRate] = useState("");
  const [taxName, setTaxName] = useState("");
  const [country, setCountry] = useState("");
  const [taxes, setTaxes] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("currentUserEmail");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addTax = (newTax) => {
    const updatedTaxes = [...taxes, newTax];
    setTaxes(updatedTaxes);
    localStorage.setItem(`tax_${userEmail}`, JSON.stringify(updatedTaxes));
  };

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }
    const storedTaxes = localStorage.getItem(`tax_${userEmail}`);
    if (storedTaxes) {
      setTaxes(JSON.parse(storedTaxes));
    }
  }, [userEmail, navigate]);

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
        <TaxModal
          toggleModal={toggleModal}
          addTax={addTax}
          taxRate={taxRate}
          setTaxRate={setTaxRate}
          taxName={taxName}
          setTaxName={setTaxName}
          country={country}
          setCountry={setCountry}
        />
      )}

      <Taxtable taxes={taxes} />
      <Outlet />
    </>
  );
}
