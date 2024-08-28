import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Barchart from "./graphs-box/Barchart";
import HorizontalBarchart from "./graphs-box/HorizontalBarchart";
import Piechart from "./graphs-box/Piechart";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Incometable from "./data-table/Incometable";
import IncomePage from "./pages/IncomePage";
import InvoicePage from "./pages/InvoicePage";
// import TaxPage from "./pages/TaxPage";
// import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <Topbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function Home() {
  return (
    <>
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
    </>
  );
}

export default App;
