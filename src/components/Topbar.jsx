import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  return (
    <div className="topbar">
      <div className="topbar--logo">
        <img src="/src/assets/logo-dark.svg" alt="logo" />
        <h2>Logo Name</h2>
      </div>
      <div className="topbar--profile">
        <div className="topbar--profile-box">
          <img src="/src/assets/profile image.png" alt="profile" />
          <div
            className={`topbar--profile-title ${
              isDropdownOpen ? "topbar--dropdown-open" : ""
            }`}
            ref={dropdownRef}
            onClick={toggleDropdown}
          >
            <span>Emre Kay.</span>
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
                to="/profile/signout"
                className="topbar--dropdown-item"
                onClick={closeDropdown}
              >
                Sign out
              </Link>
            </div>
          )}
        </div>
        <div className="topbar--profile-icon">
          <img src="/src/assets/notification=dark.svg" alt="notification" />
          <div className="topbar--icon-badge"></div>
        </div>
      </div>
    </div>
  );
}
