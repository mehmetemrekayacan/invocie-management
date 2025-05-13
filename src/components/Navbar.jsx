import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleNavbar = () => {
    setNavbarCollapsed(!navbarCollapsed);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }

    // Navbar dışında bir tıklama olduğunda mobil menüyü kapat
    if (
      navbarRef.current && 
      !navbarRef.current.contains(event.target) &&
      window.innerWidth <= 768
    ) {
      setNavbarCollapsed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    
    // Ekran boyutu değiştiğinde menü durumunu resetle
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setNavbarCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="navbar" ref={navbarRef}>
      {/* Mobil için toggle butonu */}
      <div className="navbar--toggle" onClick={toggleNavbar}>
        <div className={`navbar-toggle-icon ${navbarCollapsed ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="navbar--toggle-text">Menu</span>
      </div>
    
      {/* Navbar içeriği - mobilde gizlenecek/açılacak, desktopda yatay gösterilecek */}
      <div className={`navbar--content ${navbarCollapsed ? 'navbar--content-open' : ''}`}>
        <div className="navbar--title">
          <Link to="/">
            <img
              src="/assets/dashboard=dark.svg"
              className="dark-icon"
              alt="dark-dashboard"
            />
            <img
              src="/assets/dashboard=light.svg"
              className="light-icon"
              alt="light-dashboard"
            />
            <h2>Dashboard</h2>
          </Link>
        </div>
        <div className="navbar--title">
          <Link to="/income">
            <img
              src="/assets/income=dark.svg"
              className="dark-icon"
              alt="dark-income"
            />
            <img
              src="/assets/income=light.svg"
              className="light-icon"
              alt="light-income"
            />
            <h2>Income</h2>
          </Link>
        </div>
        <div className="navbar--title">
          <Link to="/invoice">
            <img
              src="/assets/invoice=dark.svg"
              className="dark-icon"
              alt="dark-invoice"
            />
            <img
              src="/assets/invoice=light.svg"
              className="light-icon"
              alt="light-invoice"
            />
            <h2>Invoice</h2>
          </Link>
        </div>
        <div
          className={`navbar--title ${
            isDropdownOpen ? "navbar--dropdown-open" : ""
          }`}
          ref={dropdownRef}
        >
          <div className="navbar--title-active" onClick={toggleDropdown}>
            <img
              src="/assets/expense=dark.svg"
              className="dark-icon"
              alt="dark-expense"
            />
            <img
              src="/assets/expense=light.svg"
              className="light-icon"
              alt="light-expense"
            />
            <h2>Expense</h2>
            <img
              className="navbar--dropdown-icon dark-icon"
              src="/assets/dropdown=dark.svg"
              alt="dark-sort"
            />
            <img
              className="navbar--dropdown-icon light-icon"
              src="/assets/dropdown=light.svg"
              alt="light-sort"
            />
          </div>
          {isDropdownOpen && (
            <div className="navbar--dropdown-menu">
              <Link
                to="/expense/payment"
                className="navbar--dropdown-item"
                onClick={closeDropdown}
              >
                Payment
              </Link>
              <Link
                to="/expense/tax"
                className="navbar--dropdown-item"
                onClick={closeDropdown}
              >
                Tax
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
