import { useState } from "react";
import "./App.css";
import Barchart from "./graphs-box/Barchart";
import HorizontalBarchart from "./graphs-box/HorizontalBarchart";

function App() {
  return (
    <>
      <HorizontalBarchart />
      <Barchart />
    </>
  );
}

export default App;
