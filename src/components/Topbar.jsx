import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../components/Darkmode";
import { useModal } from "../components/ToastProvider";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const dropdownRef = useRef(null);
  const darkModeRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const modal = useModal();

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
    if (!str) return '';
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

  // Saat güncellemesi için
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  // Check login status whenever the component renders or route changes
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    
    setIsLoggedIn(loggedInStatus === "true");
    if (user) {
      setUserName(user.name || '');
      setUserSurname(user.surname || '');
    } else {
      setUserName('');
      setUserSurname('');
    }
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    try {
      // Clear all session data
      localStorage.removeItem("user");
      localStorage.removeItem("currentUserEmail");
      localStorage.setItem("isLoggedIn", "false");
      
      setIsLoggedIn(false);
      setUserName('');
      setUserSurname('');
      
      // Show success message and redirect to login
      modal?.showModal && modal.showModal("Logged out successfully", "success");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      modal?.showModal && modal.showModal("An error occurred during logout", "error");
    }
  }, [navigate, modal]);

  // useMemo ile hesaplamaları optimize ediyoruz
  const displayName = useMemo(() => {
    return `${truncateString(userName, 8)} ${truncateString(userSurname, 8)}`;
  }, [userName, userSurname, truncateString]);

  // Zamanı formatlama
  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  }, [currentTime]);

  // Tarihi formatlama
  const formattedDate = useMemo(() => {
    return currentTime.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  }, [currentTime]);

  return (
    <div className="topbar" role="banner">
      <div className="topbar--logo">
        <img
          src="/assets/luxury/logo-dark.svg"
          alt="Finverso Logo"
          className="dark-icon"
          width="40"
          height="40"
        />
        <img
          src="/assets/luxury/logo-light.svg"
          alt="Finverso Logo"
          className="light-icon"
          width="40"
          height="40"
        />
        <h2>Finverso</h2>
      </div>

      {/* Orta kısım: saat ve tarih */}
      <div className="topbar--datetime">
        <div className="topbar--time">{formattedTime}</div>
        <div className="topbar--date">{formattedDate}</div>
      </div>

      <div className="topbar--right-section">
        <div className="topbar--notifications">
          <button className="topbar--icon-button" aria-label="Bildirimler">
            <img 
              src="/assets/notification=dark.svg" 
              alt="Bildirimler" 
              className="dark-icon"
              width="24"
              height="24"
            />
            <img 
              src="/assets/notification=light.svg" 
              alt="Bildirimler" 
              className="light-icon"
              width="24"
              height="24"
            />
            <span className="topbar--icon-badge"></span>
          </button>
        </div>
      
        <div className="topbar--profile-box">
          {isLoggedIn ? (
            <>
              <img 
                src="/assets/profile image.png" 
                alt="Profil resmi" 
                width="36"
                height="36"
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
                  className={`topbar--dropdown-icon dark-icon ${isDropdownOpen ? "open" : ""}`}
                  src="/assets/dropdown=dark.svg"
                  alt=""
                  width="16"
                  height="16"
                />
                <img
                  className={`topbar--dropdown-icon light-icon ${isDropdownOpen ? "open" : ""}`}
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
                    <i className="dropdown-icon profile-icon"></i>
                    Profil
                  </Link>
                  <Link
                    to="/settings"
                    className="topbar--dropdown-item"
                    onClick={closeDropdown}
                    role="menuitem"
                  >
                    <i className="dropdown-icon settings-icon"></i>
                    Ayarlar
                  </Link>
                  <div
                    className="topbar--dropdown-item-darkmode"
                    ref={darkModeRef}
                  >
                    <Darkmode />
                  </div>
                  <button
                    className="topbar--dropdown-item"
                    onClick={() => {
                      closeDropdown();
                      handleSignOut();
                    }}
                    role="menuitem"
                  >
                    <i className="dropdown-icon logout-icon"></i>
                    Çıkış Yap
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="topbar--sign-box">
              <span className="topbar--sign-title">Giriş Yap</span>
              </Link>
          )}
        </div>
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
        className={`topbar--mobile-menu ${mobileMenuOpen ? 'mobile-open' : ''}`} 
        ref={mobileMenuRef}
        role="navigation"
        aria-label="Ana menü"
      >
        {isLoggedIn ? (
          <div className="topbar--mobile-profile">
            <img 
              src="/assets/profile image.png" 
              alt="Profil resmi" 
              width="36"
              height="36"
            />
            <div className="topbar--mobile-user">
              <span>{displayName}</span>
            </div>
          </div>
        ) : (
          <Link to="/login" className="topbar--mobile-login">
            Giriş Yap
          </Link>
        )}
        
        <div className="topbar--mobile-links">
          <Link to="/profile" className="topbar--mobile-link">
            <i className="dropdown-icon profile-icon"></i>
            Profil
          </Link>
          <Link to="/settings" className="topbar--mobile-link">
            <i className="dropdown-icon settings-icon"></i>
            Ayarlar
          </Link>
          <div className="topbar--mobile-darkmode">
            <Darkmode />
          </div>
          {isLoggedIn && (
            <button 
              className="topbar--mobile-link" 
              onClick={handleSignOut}
            >
              <i className="dropdown-icon logout-icon"></i>
              Çıkış Yap
          </button>
        )}
        </div>
      </nav>
    </div>
  );
}
