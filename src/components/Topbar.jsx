import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Darkmode from "../components/Darkmode";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? `${str.slice(0, maxLength)}.` : str;
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTimeout(() => {
        closeDropdown();
      }, 0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserName(user.name);
        setUserSurname(user.surname);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/dashboard");
  };

  return (
    <div className="topbar">
      <div className="topbar--logo">
        <img
          src="/src/assets/logo-dark.svg"
          alt="dark-logo"
          className="dark-icon"
        />
        <img
          src="/src/assets/logo-light.svg"
          alt="light-logo"
          className="light-icon"
        />
        <h2>Invoicify</h2>
      </div>
      <div className="topbar--profile">
        <div className="topbar--profile-box">
          {isLoggedIn ? (
            <>
              <img src="/src/assets/profile image.png" alt="profile" />
              <div
                className={`topbar--profile-title ${
                  isDropdownOpen ? "topbar--dropdown-open" : ""
                }`}
                ref={dropdownRef}
                onClick={toggleDropdown}
              >
                <span>
                  {truncateString(userName, 8)} {truncateString(userSurname, 8)}
                </span>
                <img
                  className="topbar--dropdown-icon"
                  src="/src/assets/dropdown=dark.svg"
                  alt="sort"
                />
              </div>
              {isDropdownOpen && (
                <div className="topbar--dropdown-menu">
                  <Link
                    to="/profile/profile"
                    className="topbar--dropdown-item"
                    onClick={closeDropdown}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/profile/settings"
                    className="topbar--dropdown-item"
                    onClick={closeDropdown}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/profile/darklight"
                    className="topbar--dropdown-item"
                    onClick={closeDropdown}
                  >
                    Dark/Light
                  </Link>
                  <Link
                    className="topbar--dropdown-item"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="topbar--sign-box">
              <Link to="/login" className="topbar--sign-title">
                Sign In
              </Link>
              <Link to="/register" className="topbar--sign-title">
                Sign up
              </Link>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <div className="topbar--profile-icon">
            <img src="/src/assets/notification=dark.svg" alt="notification" />
            <div className="topbar--icon-badge"></div>
          </div>
        )}
      </div>
      <div className="topbar--darkmode">
        <Darkmode />
      </div>
    </div>
  );
}
