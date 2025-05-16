import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./pages.css";
import Darkmode from "../components/Darkmode";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
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
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        setIsLoading(false);
        return;
      }

      const user = { 
        name: formData.name, 
        surname: formData.surname, 
        email: formData.email, 
        password: formData.password 
      };

      const existingUsers = JSON.parse(localStorage.getItem("users")) || {};
      
      // Check if email already exists
      if (existingUsers[formData.email]) {
        setError("Email already registered. Please use a different email.");
        setIsLoading(false);
        return;
      }

      existingUsers[formData.email] = user;

      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem(`income_${formData.email}`, JSON.stringify([]));
      localStorage.setItem(`invoice_${formData.email}`, JSON.stringify([]));
      localStorage.setItem(`payments_${formData.email}`, JSON.stringify([]));
      localStorage.setItem(`tax_${formData.email}`, JSON.stringify([]));
      localStorage.setItem("currentUserEmail", formData.email);

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate]);

  return (
    <>
      <Darkmode />
      <div className="register--container">
        <h1>Register</h1>
        {error && <div className="register--error">{error}</div>}
        <form className="register--form" onSubmit={handleSubmit}>
          <label className="register--enter">
            <p>Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              disabled={isLoading}
            />
          </label>
          <label className="register--enter">
            <p>Surname</p>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Enter your surname"
              required
              disabled={isLoading}
            />
          </label>
          <label className="register--enter">
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
          <label className="register--enter">
            <p>Password</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              disabled={isLoading}
              minLength="6"
            />
          </label>
          <label className="register--enter">
            <p>Confirm Password</p>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
              minLength="6"
            />
          </label>
          <div className="register--sign-button">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
            <Link to="/login">
              <p>Already have an account? Sign in!</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
