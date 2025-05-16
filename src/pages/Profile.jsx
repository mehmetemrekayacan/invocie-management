import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../components/ToastProvider";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const modal = useModal();

  // Load user data when component mounts
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userEmail = localStorage.getItem("currentUserEmail");
      
      if (!storedUser || !userEmail) {
        navigate("/login");
        return;
      }
      
      setUser({
        ...storedUser,
        email: userEmail
      });
    } catch (error) {
      console.error("Error loading user data:", error);
      modal?.showModal && modal.showModal("Failed to load profile data", "error");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, modal]);

  const handleEdit = useCallback(() => {
    // We'll redirect to the settings page since that's where profile editing will happen
    navigate("/settings");
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    try {
      // Clear all session data
      localStorage.removeItem("user");
      localStorage.removeItem("currentUserEmail");
      localStorage.setItem("isLoggedIn", "false");
      
      // Show success message and redirect to login
      modal?.showModal && modal.showModal("Logged out successfully", "success");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      modal?.showModal && modal.showModal("An error occurred during logout", "error");
    }
  }, [navigate, modal]);

  const handleDeleteAccount = useCallback(() => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const userEmail = localStorage.getItem("currentUserEmail");
        
        // Remove user-specific data
        if (userEmail) {
          localStorage.removeItem(`income_${userEmail}`);
          localStorage.removeItem(`invoice_${userEmail}`);
          localStorage.removeItem(`payments_${userEmail}`);
          localStorage.removeItem(`tax_${userEmail}`);
          
          // Remove user from users object
          const users = JSON.parse(localStorage.getItem("users")) || {};
          if (users[userEmail]) {
            delete users[userEmail];
            localStorage.setItem("users", JSON.stringify(users));
          }
        }
        
        // Clear all session data
        localStorage.removeItem("user");
        localStorage.removeItem("currentUserEmail");
        localStorage.setItem("isLoggedIn", "false");
        
        navigate("/login");
        modal?.showModal && modal.showModal("Account deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting account:", error);
        modal?.showModal && modal.showModal("Failed to delete account", "error");
      }
    }
  }, [navigate, modal]);

  if (isLoading) {
    return (
      <div className="profile profile--loading">
        <div className="loading-spinner"></div>
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile profile--error">
        <p>Could not load profile data. Please log in again.</p>
        <button 
          onClick={() => navigate("/login")} 
          className="profile--button"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile--header">
        <h1>Profile</h1>
      </div>
      
      <div className="profile--avatar">
        <img 
          src="/assets/profile image.png" 
          alt="Profile" 
          className="profile--avatar-image"
        />
        <h2>{user.name} {user.surname}</h2>
      </div>
      
      <div className="profile--info">
        <div className="profile--info-item">
          <span className="profile--info-label">Name:</span>
          <span className="profile--info-value">{user.name}</span>
        </div>
        
        <div className="profile--info-item">
          <span className="profile--info-label">Surname:</span>
          <span className="profile--info-value">{user.surname}</span>
        </div>
        
        <div className="profile--info-item">
          <span className="profile--info-label">Email:</span>
          <span className="profile--info-value">{user.email}</span>
        </div>
      </div>
      
      <div className="profile--actions">
        <button onClick={handleEdit} className="profile--button">
          Edit Profile
        </button>
        <button onClick={handleSignOut} className="profile--button profile--button-signout">
          Sign Out
        </button>
        <button
          onClick={handleDeleteAccount}
          className="profile--button profile--button-delete"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
