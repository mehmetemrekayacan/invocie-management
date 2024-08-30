import React from "react";
import { Outlet, Link } from "react-router-dom";
import Incometable from "../data-table/Incometable";

export default function IncomePage() {
  return (
    <>
      <div className="heading">
        <h1>Incomes</h1>
      </div>
      <Incometable />

      <Outlet />
    </>
  );
}
