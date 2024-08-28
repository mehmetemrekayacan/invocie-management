import React from "react";
import { Outlet, Link } from "react-router-dom";
import Taxtable from "../data-table/Taxtable";

export default function TaxPage() {
  return (
    <>
      <Taxtable />

      <Outlet />
    </>
  );
}
