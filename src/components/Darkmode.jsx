import React, { useState, useEffect } from "react";
import "./comps.css";

export default function Darkmode() {
  // Theme state
  const [isDark, setIsDark] = useState(false);

  // Theme change detection and local storage saving
  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <div className="darkmode--container">
      <label className="switch" htmlFor="darkmode-toggle">
        <input
          type="checkbox"
          id="darkmode-toggle"
          checked={isDark}
          onChange={toggleTheme}
          aria-label="Dark mode toggle"
        />
        <span className="slider"></span>
      </label>
      <span className="darkmode-label">
        {isDark ? "Dark Theme" : "Light Theme"}
      </span>
    </div>
  );
}
