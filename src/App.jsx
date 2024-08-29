import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Barchart from "./graphs-box/Barchart";
import HorizontalBarchart from "./graphs-box/HorizontalBarchart";
import Piechart from "./graphs-box/Piechart";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import IncomePage from "./pages/IncomePage";
import InvoicePage from "./pages/InvoicePage";
import TaxPage from "./pages/TaxPage";
import PaymentPage from "./pages/PaymentPage";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="App">
      {!isLoginPage && <Topbar />}
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/expense/tax" element={<TaxPage />} />
        <Route path="/expense/payment" element={<PaymentPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!isLoginPage && (
        <div className="app--footer">
          <Footer />
        </div>
      )}
    </div>
  );
}

function Home() {
  return (
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
  );
}

export default App;
