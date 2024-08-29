import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";

export default function Login() {
  return (
    <div className="login--container">
      <h1>Log In</h1>
      <form className="login--form">
        <label className="login--enter">
          <p>E-Mail</p>
          <input type="text" />
        </label>
        <label className="login--enter">
          <p>Password</p>
          <input type="password" />
        </label>
        <label className="login--sign-button">
          <Link to="/">
            <button type="submit">Sign In</button>
          </Link>
          <Link to="/">
            <p type="submit">Are you don’t have account? Create one!</p>
          </Link>
        </label>
      </form>
    </div>
  );
}
