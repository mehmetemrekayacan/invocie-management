import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, lazy, Suspense, memo } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import { ModalProvider } from "./components/ToastProvider";

// Lazy load components for better performance
const Barchart = lazy(() => import("./graphs-box/Barchart"));
const HorizontalBarchart = lazy(() => import("./graphs-box/HorizontalBarchart"));
const Piechart = lazy(() => import("./graphs-box/Piechart"));
const IncomePage = lazy(() => import("./pages/IncomePage"));
const InvoicePage = lazy(() => import("./pages/InvoicePage"));
const TaxPage = lazy(() => import("./pages/TaxPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

// Loading component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// Protected route component
const ProtectedRoute = memo(({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
});

function App() {
  return (
    <ModalProvider>
      <Router>
        <Main />
      </Router>
    </ModalProvider>
  );
}

const Main = memo(() => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Prevent horizontal scrollbar and apply page transitions
  useEffect(() => {
    // Prevent horizontal scrollbar
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    // Add page transition effect
    document.body.classList.add('page-transition');
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
      document.body.classList.remove('page-transition');
    };
  }, [location.pathname]);

  return (
    <div className="App">
      {!isLoginPage && <Topbar />}
      {!isLoginPage && <Navbar />}
      <Suspense fallback={<LoadingFallback />}>
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/income" 
              element={
                <ProtectedRoute>
                  <IncomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoice" 
              element={
                <ProtectedRoute>
                  <InvoicePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/expense/tax" 
              element={
                <ProtectedRoute>
                  <TaxPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/expense/payment" 
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </Suspense>
      {!isLoginPage && (
        <div className="app--footer">
          <Footer />
        </div>
      )}
    </div>
  );
});

const Home = memo(() => {
  return (
    <>
      <div className="heading">
        <h1>Finansal Genel Bakış</h1>
        <button className="dashboard-action-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Yeni İşlem
        </button>
      </div>
      
      {/* Panel - sadece horizontal bar chart */}
      <div className="panel">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Aylık Özet</h3>
          </div>
          <div className="chart-content">
            <Suspense fallback={<div className="chart-loading">Grafik yükleniyor...</div>}>
          <HorizontalBarchart />
        </Suspense>
          </div>
        </div>
      </div>
      
      {/* Charts grid container */}
      <div className="box">
        <div className="bar">
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Gelir Dağılımı</h3>
            </div>
            <div className="chart-content">
              <Suspense fallback={<div className="chart-loading">Grafik yükleniyor...</div>}>
            <Barchart />
          </Suspense>
            </div>
          </div>
        </div>
        <div className="pie">
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">Harcama Kategorileri</h3>
            </div>
            <div className="chart-content">
              <Suspense fallback={<div className="chart-loading">Grafik yükleniyor...</div>}>
            <Piechart />
          </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default App;
