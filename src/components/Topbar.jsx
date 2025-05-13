import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../components/Darkmode";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const darkModeRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  // useCallback ile fonksiyonları memoize ediyoruz
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const truncateString = useCallback((str, maxLength) => {
    return str.length > maxLength ? `${str.slice(0, maxLength)}.` : str;
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      darkModeRef.current &&
      !darkModeRef.current.contains(event.target)
    ) {
      closeDropdown();
    }

    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      closeMobileMenu();
    }
  }, [closeDropdown, closeMobileMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    
    setIsLoggedIn(loggedInStatus === "true");
    if (user) {
      setUserName(user.name);
      setUserSurname(user.surname);
    }
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/dashboard");
  }, [navigate]);

  // useMemo ile hesaplamaları optimize ediyoruz
  const displayName = useMemo(() => {
    return `${truncateString(userName, 8)} ${truncateString(userSurname, 8)}`;
  }, [userName, userSurname, truncateString]);

  return (
    <div className="topbar" role="banner">
      <div className="topbar--logo">
        <img
          src="/assets/logo-dark.svg"
          alt="Invoicify Logo"
          className="dark-icon"
          width="24"
          height="24"
        />
        <img
          src="/assets/logo-light.svg"
          alt="Invoicify Logo"
          className="light-icon"
          width="24"
          height="24"
        />
        <h2>Invoicify</h2>
      </div>

      <button 
        className="topbar--hamburger" 
        onClick={toggleMobileMenu}
        aria-label="Menüyü aç/kapat"
        aria-expanded={mobileMenuOpen}
      >
        <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <nav 
        className={`topbar--profile ${mobileMenuOpen ? 'mobile-open' : ''}`} 
        ref={mobileMenuRef}
        role="navigation"
        aria-label="Ana menü"
      >
        <div className="topbar--profile-box">
          {isLoggedIn ? (
            <>
              <img 
                src="/assets/profile image.png" 
                alt="Profil resmi" 
                width="24"
                height="24"
              />
              <button
                className="topbar--profile-title"
                ref={dropdownRef}
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span>{displayName}</span>
                <img
                  className="topbar--dropdown-icon dark-icon"
                  src="/assets/dropdown=dark.svg"
                  alt=""
                  width="16"
                  height="16"
                />
                <img
                  className="topbar--dropdown-icon light-icon"
                  src="/assets/dropdown=light.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </button>

              {isDropdownOpen && (
                <div 
                  className="topbar--dropdown-menu"
                  role="menu"
                >
                  <Link
                    to="/profile"
                    className="topbar--dropdown-item"
                    onClick={closeDropdown}
                    role="menuitem"
                  >
                    Profil
                  </Link>
                  <Link
                    to="/settings"
                    className="topbar--dropdown-item"
                    onClick={closeDropdown}
                    role="menuitem"
                  >
                    Ayarlar
                  </Link>
                  <div
                    className="topbar--dropdown-item-darkmode"
                    ref={darkModeRef}
                    role="menuitem"
                  >
                    <Darkmode />
                  </div>
                  <button
                    className="topbar--dropdown-item"
                    onClick={handleSignOut}
                    role="menuitem"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="topbar--sign-box">
              <Link to="/login" className="topbar--sign-title">
                Giriş Yap
              </Link>
              <Link to="/register" className="topbar--sign-title">
                Kayıt Ol
              </Link>
              <div className="topbar--item-darkmode">
                <Darkmode />
              </div>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <button 
            className="topbar--profile-icon"
            aria-label="Bildirimler"
          >
            <img
              src="/assets/notification=dark.svg"
              className="dark-icon"
              alt=""
              width="16"
              height="16"
            />
            <img
              src="/assets/notification=light.svg"
              className="light-icon"
              alt=""
              width="16"
              height="16"
            />
            <div className="topbar--icon-badge" aria-hidden="true"></div>
          </button>
        )}
      </nav>
    </div>
  );
}
