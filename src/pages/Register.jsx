import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";
import Darkmode from "../components/Darkmode";

export default function Register() {
  return (
    <>
      <Darkmode />
      <div className="register--container">
        <h1>Register</h1>
        <form className="register--form">
          <label className="register--enter">
            <p>Name</p>
            <input type="text" />
          </label>
          <label className="register--enter">
            <p>Surname</p>
            <input type="text" />
          </label>
          <label className="register--enter">
            <p>E-Mail</p>
            <input type="text" />
          </label>
          <label className="register--enter">
            <p>Password</p>
            <input type="password" />
          </label>
          <label className="register--enter">
            <p>Password Again</p>
            <input type="password" />
          </label>
          <label className="register--sign-button">
            <Link to="/">
              <button type="signup">Sign Up</button>
            </Link>
          </label>
        </form>
      </div>
    </>
  );
}
