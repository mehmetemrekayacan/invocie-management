import React from "react";
import "./comps.css";

export default function Darkmode() {
  const switchTheme = (e) => {
    if (e.target.checked) {
      document.querySelector("body").setAttribute("data-theme", "light");
    } else {
      document.querySelector("body").setAttribute("data-theme", "dark");
    }
  };
  return (
    <div className="darkmode--container">
      <label className="switch">
        <input type="checkbox" onChange={switchTheme}></input>
        <span className="slider round"></span>
      </label>
    </div>
  );
}
