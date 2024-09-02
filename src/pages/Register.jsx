import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
import Darkmode from "../components/Darkmode";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ name, surname, email, password })
    );

    navigate("/login");
  };

  return (
    <>
      <Darkmode />
      <div className="register--container">
        <h1>Register</h1>
        <form className="register--form" onSubmit={handleSubmit}>
          <label className="register--enter">
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="register--enter">
            <p>Surname</p>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </label>
          <label className="register--enter">
            <p>E-Mail</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="register--enter">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="register--enter">
            <p>Password Again</p>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <label className="register--sign-button">
            <button type="submit">Sign Up</button>
          </label>
        </form>
      </div>
    </>
  );
}
