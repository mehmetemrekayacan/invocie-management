import { useState } from "react";
import "./App.css";
import Barchart from "./graphs-box/Barchart";
import HorizontalBarchart from "./graphs-box/HorizontalBarchart";
import Piechart from "./graphs-box/Piechart";

function App() {
  return (
    <>
      <HorizontalBarchart />
      <Barchart />
      <Piechart />
    </>
  );
}

export default App;
