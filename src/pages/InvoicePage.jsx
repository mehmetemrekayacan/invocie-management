import React from "react";
import { Outlet, Link } from "react-router-dom";
import Invoicetable from "../data-table/Invoicetable";

export default function InvoicePage() {
  return (
    <>
      <div className="heading">
        <h1>Invoices</h1>
      </div>
      <Invoicetable />

      <Outlet />
    </>
  );
}
