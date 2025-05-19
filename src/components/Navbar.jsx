import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

// Define navigation items in a separate structure
const NAV_ITEMS = [
  {
    path: "/",
    icon: {
      dark: "/assets/dashboard=dark.svg",
      light: "/assets/dashboard=light.svg"
    },
    label: "Overview",
    alt: "Dashboard icon"
  },
  {
    path: "/income",
    icon: {
      dark: "/assets/income=dark.svg",
      light: "/assets/income=light.svg"
    },
    label: "Income",
    alt: "Income icon"
  },
  {
    path: "/invoice",
    icon: {
      dark: "/assets/invoice=dark.svg",
      light: "/assets/invoice=light.svg"
    },
    label: "Invoices",
    alt: "Invoice icon"
  },
  {
    path: "/expense",
    icon: {
      dark: "/assets/expense=dark.svg",
      light: "/assets/expense=light.svg"
    },
    label: "Expenses",
    alt: "Expense icon",
    dropdown: [
      { path: "/expense/payment", label: "Payments" },
      { path: "/expense/tax", label: "Taxes" }
    ]
  }
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const location = useLocation();

  // Memoize functions with useCallback
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const toggleNavbar = useCallback(() => {
    setNavbarCollapsed(prev => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }

    if (
      navbarRef.current && 
      !navbarRef.current.contains(event.target) &&
      window.innerWidth <= 768
    ) {
      setNavbarCollapsed(false);
    }
  }, [closeDropdown]);

  // Handle screen size changes
  const handleResize = useCallback(() => {
    if (window.innerWidth > 768) {
      setNavbarCollapsed(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleClickOutside, handleResize]);

  // Determine active menu item
  const activePath = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  // Function to render nav items
  const renderNavItem = useCallback((item) => {
    const isActive = activePath === item.path || 
                    (item.path === "/" && activePath === "/dashboard");
    const isDropdownItem = !!item.dropdown;
    const isMainDropdownActive = item.dropdown?.some(subItem => activePath === subItem.path);

    if (isDropdownItem) {
      return (
        <div
          key={item.path}
          className={`navbar--title ${
            isDropdownOpen ? "navbar--dropdown-open" : ""
          } ${isActive || isMainDropdownActive ? "active" : ""}`}
          ref={dropdownRef}
        >
          <button
            className="navbar--title-active"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <img
              src={item.icon.dark}
              className="dark-icon"
              alt={item.alt}
              width="20"
              height="20"
            />
            <img
              src={item.icon.light}
              className="light-icon"
              alt={item.alt}
              width="20"
              height="20"
            />
            <h2>{item.label}</h2>
            <img
              className={`navbar--dropdown-icon dark-icon ${isDropdownOpen ? "open" : ""}`}
              src="/assets/dropdown=dark.svg"
              alt=""
              width="16"
              height="16"
            />
            <img
              className={`navbar--dropdown-icon light-icon ${isDropdownOpen ? "open" : ""}`}
              src="/assets/dropdown=light.svg"
              alt=""
              width="16"
              height="16"
            />
          </button>
          {isDropdownOpen && (
            <div 
              className="navbar--dropdown-menu"
              role="menu"
            >
              {item.dropdown.map(subItem => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={`navbar--dropdown-item ${activePath === subItem.path ? 'active' : ''}`}
                  onClick={closeDropdown}
                  role="menuitem"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        key={item.path}
        className={`navbar--title ${isActive ? "active" : ""}`}
      >
        <Link to={item.path}>
          <img
            src={item.icon.dark}
            className="dark-icon"
            alt={item.alt}
            width="20"
            height="20"
          />
          <img
            src={item.icon.light}
            className="light-icon"
            alt={item.alt}
            width="20"
            height="20"
          />
          <h2>{item.label}</h2>
        </Link>
      </div>
    );
  }, [isDropdownOpen, activePath, toggleDropdown, closeDropdown]);

  return (
    <nav 
      className="navbar" 
      role="navigation"
      aria-label="Main navigation"
      ref={navbarRef}
    >
      <button 
        className="navbar--toggle" 
        onClick={toggleNavbar}
        aria-expanded={navbarCollapsed}
        aria-controls="navbar-content"
      >
        <span>Menu</span>
        <img
          src="/assets/dropdown=dark.svg"
          className={`dark-icon ${navbarCollapsed ? "open" : ""}`}
          alt=""
          width="16"
          height="16"
        />
        <img
          src="/assets/dropdown=light.svg"
          className={`light-icon ${navbarCollapsed ? "open" : ""}`}
          alt=""
          width="16"
          height="16"
        />
      </button>
    
      <div 
        id="navbar-content"
        className={`navbar--content ${navbarCollapsed ? 'navbar--content-open' : ''}`}
      >
        {NAV_ITEMS.map(renderNavItem)}
      </div>
    </nav>
  );
}
