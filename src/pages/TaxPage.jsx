import React from "react";
import { Outlet, Link } from "react-router-dom";
import Taxtable from "../data-table/Taxtable";

export default function TaxPage() {
  return (
    <>
      <div className="heading">
        <h1>Taxes</h1>
      </div>
      <Taxtable />

      <Outlet />
    </>
  );
}
