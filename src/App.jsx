import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="App">
      {!isLoginPage && <Topbar />}
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/expense/tax" element={<TaxPage />} />
        <Route path="/expense/payment" element={<PaymentPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
    <>
      <div className="heading">
        <h1>Dashboard</h1>
      </div>
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
