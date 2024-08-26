import { useState } from "react";
import "./App.css";
import Barchart from "./graphs/Barchart";
import HorBarchart from "./graphs/HorBarchart";

function App() {
  return (
    <>
      <Barchart />
      <HorBarchart />
    </>
  );
}

export default App;
