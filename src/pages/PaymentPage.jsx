import React from "react";
import { Outlet, Link } from "react-router-dom";
import Paymenttable from "../data-table/Paymenttable";

export default function PaymentPage() {
  return (
    <>
      <div className="heading">
        <h1>Payments</h1>
      </div>
      <Paymenttable />

      <Outlet />
    </>
  );
}
