import React from "react";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar--logo">
        <img src="/src/assets/logo.svg" alt="logo" />
        <h2>Logo Name</h2>
      </div>
      <div className="topbar--profile">
        <div className="topbar--profile-box">
          <img src="/src/assets/profile image.png" alt="profile" />
          <div className="topbar--profile-title">
            <span>Emre Kay.</span>
            <img src="/src/assets/Property 1=dark-4.svg" alt="sort" />
          </div>
        </div>
        <div className="topbar--profile-icon">
          <img src="/src/assets/Property 1=dark-3.svg" alt="notification" />
        </div>
      </div>
    </div>
  );
}