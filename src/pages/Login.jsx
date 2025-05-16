/* eslint-disable react/no-unescaped-entities */
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
import Darkmode from "../components/Darkmode";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing again
    if (error) setError("");
  }, [error]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError("");
    
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
      const storedUser = storedUsers[formData.email];

      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUserEmail", formData.email);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: storedUser.name,
            surname: storedUser.surname,
          })
        );

        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate]);

  return (
    <>
      <Darkmode />
      <div className="login--container">
        <h1>Log In</h1>
        {error && <div className="login--error">{error}</div>}
        <form className="login--form" onSubmit={handleSubmit}>
          <label className="login--enter">
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </label>
          <label className="login--enter">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </label>
          <div className="login--sign-button">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            <Link to="/register">
              <p>Don't have an account? Create one!</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
