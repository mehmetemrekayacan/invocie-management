import { useState } from "react";
import "./App.css";
import Barchart from "./graphs-box/Barchart";
import HorizontalBarchart from "./graphs-box/HorizontalBarchart";
import Piechart from "./graphs-box/Piechart";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="box">
        <div className="horbar">
          <HorizontalBarchart />
        </div>
        <div className="bar">
          <Barchart />
        </div>
        <div className="pie">
          <Piechart />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
