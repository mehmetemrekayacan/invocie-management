import React from "react";
import { Outlet, Link } from "react-router-dom";
import Invoicetable from "../data-table/Invoicetable";

export default function IncomePage() {
  return (
    <>
      <Invoicetable />

      <Outlet />
    </>
  );
}
