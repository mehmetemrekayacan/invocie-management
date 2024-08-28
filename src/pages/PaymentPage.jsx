import React from "react";
import { Outlet, Link } from "react-router-dom";
import Paymenttable from "../data-table/Paymenttable";

export default function PaymentPage() {
  return (
    <>
      <Paymenttable />

      <Outlet />
    </>
  );
}
