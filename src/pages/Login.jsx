import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import Darkmode from "../components/Darkmode";

export default function Login() {
  return (
    <>
      <Darkmode />
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
            <Link to="/dashboard">
              <button type="signin">Sign In</button>
            </Link>
            <Link to="/register">
              <p type="signin">Are you don’t have account? Create one!</p>
            </Link>
          </label>
        </form>
      </div>
    </>
  );
}
