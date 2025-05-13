import React, { useEffect, useCallback, useRef } from "react";
import "./comps.css";

export default function Darkmode() {
  // Tema tercihini localStorage'da saklayacağız
  const THEME_KEY = "preferred-theme";
  const checkboxRef = useRef(null);

  // Tema değişikliğini yöneten fonksiyon
  const switchTheme = useCallback((isLight) => {
    const theme = isLight ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // Sistem teması değişikliğini dinlemek için
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
      if (mediaQuery.matches !== isLight) {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      }
    }
  }, []);

  // Sistem teması değişikliğini dinleyen fonksiyon
  const handleSystemThemeChange = useCallback((e) => {
    const isLight = e.matches;
    switchTheme(isLight);
    if (checkboxRef.current) {
      checkboxRef.current.checked = isLight;
    }
  }, [switchTheme]);

  // Checkbox değişikliğini yöneten fonksiyon
  const handleThemeChange = useCallback((e) => {
    switchTheme(e.target.checked);
  }, [switchTheme]);

  // Bileşen yüklendiğinde tema tercihini kontrol et
  useEffect(() => {
    // Önce localStorage'dan tema tercihini kontrol et
    const savedTheme = localStorage.getItem(THEME_KEY);
    
    if (savedTheme) {
      // Kaydedilmiş tema tercihi varsa onu kullan
      const isLight = savedTheme === "light";
      switchTheme(isLight);
      if (checkboxRef.current) {
        checkboxRef.current.checked = isLight;
      }
    } else if (window.matchMedia) {
      // Kaydedilmiş tercih yoksa sistem temasını kullan
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
      const isLight = mediaQuery.matches;
      
      switchTheme(isLight);
      if (checkboxRef.current) {
        checkboxRef.current.checked = isLight;
      }
      
      // Sistem teması değişikliğini dinle
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    }

    // Cleanup
    return () => {
      if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: light)")
          .removeEventListener("change", handleSystemThemeChange);
      }
    };
  }, [switchTheme, handleSystemThemeChange]);

  return (
    <div className="darkmode--container" role="switch" aria-label="Toggle theme">
      <label className="switch">
        <input
          ref={checkboxRef}
          type="checkbox"
          onChange={handleThemeChange}
          aria-label="Toggle theme"
        />
        <span className="slider round" aria-hidden="true"></span>
      </label>
      <span className="darkmode-label" aria-hidden="true">
        {checkboxRef.current?.checked ? "Light Theme" : "Dark Theme"}
      </span>
    </div>
  );
}
