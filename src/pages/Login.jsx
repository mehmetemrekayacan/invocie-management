/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
import Darkmode from "../components/Darkmode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
    const storedUser = storedUsers[email];

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      // Set user as logged in
      localStorage.setItem("isLoggedIn", "true");
      // Store the current user's email
      localStorage.setItem("currentUserEmail", email);
      // Optionally store user details
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: storedUser.name,
          surname: storedUser.surname,
        })
      );

      navigate("/dashboard");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <Darkmode />
      <div className="login--container">
        <h1>Log In</h1>
        <form className="login--form" onSubmit={handleSubmit}>
          <label className="login--enter">
            <p>E-Mail</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="login--enter">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="login--sign-button">
            <button type="submit">Sign In</button>
            <Link to="/register">
              <p>Don't have an account? Create one!</p>
            </Link>
          </label>
        </form>
      </div>
    </>
  );
}
