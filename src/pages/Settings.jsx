import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../components/ToastProvider";

export default function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const modal = useModal();

  // Load user data when component mounts
  useEffect(() => {
    setIsLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userEmail = localStorage.getItem("currentUserEmail");
      
      if (!storedUser || !userEmail) {
        modal?.showModal && modal.showModal("Please login to access settings", "error");
        navigate("/login");
        return;
      }
      
      setFormData({
        name: storedUser.name || "",
        surname: storedUser.surname || "",
        email: userEmail,
      });
    } catch (error) {
      console.error("Error loading user data:", error);
      modal?.showModal && modal.showModal("Failed to load user data", "error");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, modal]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Validate form
      if (!formData.name || !formData.surname) {
        modal?.showModal && modal.showModal("Name and surname are required", "error");
        return;
      }
      
      const userEmail = formData.email;
      
      // Get users object from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || {};
      const user = users[userEmail];
      
      if (!user) {
        modal?.showModal && modal.showModal("User not found", "error");
        return;
      }
      
      // Update user data
      users[userEmail] = {
        ...user,
        name: formData.name,
        surname: formData.surname,
      };
      
      // Update localStorage
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        surname: formData.surname,
      }));
      
      modal?.showModal && modal.showModal("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error saving profile:", error);
      modal?.showModal && modal.showModal("Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  }, [formData, modal]);

  const handleCancel = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const handlePasswordChange = useCallback(() => {
    modal?.showModal && modal.showModal("Password change functionality will be available soon", "info");
  }, [modal]);

  if (isLoading) {
    return (
      <div className="settings settings--loading">
        <div className="loading-spinner"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="settings">
      <div className="settings--header">
        <h1>Settings</h1>
        <p className="settings--subtitle">Manage your account settings and preferences</p>
      </div>
      
      <div className="settings--container">
        <div className="settings--sidebar">
          <div className="settings--sidebar-item settings--sidebar-item-active">
            Profile Settings
          </div>
          <div className="settings--sidebar-item" onClick={handlePasswordChange}>
            Security
          </div>
          <div className="settings--sidebar-item" onClick={handlePasswordChange}>
            Preferences
          </div>
          <div className="settings--sidebar-item" onClick={handlePasswordChange}>
            Notifications
          </div>
        </div>
        
        <div className="settings--content">
          <h2 className="settings--section-title">Profile Information</h2>
          
          <form onSubmit={handleSubmit} className="settings--form">
            <div className="settings--form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="settings--input"
                placeholder="Enter your name"
                disabled={isSaving}
                required
              />
            </div>
            
            <div className="settings--form-group">
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="settings--input"
                placeholder="Enter your surname"
                disabled={isSaving}
                required
              />
            </div>
            
            <div className="settings--form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="settings--input"
                placeholder="Your email"
                disabled={true}
                title="Email cannot be changed"
              />
              <small className="settings--input-help">Email cannot be changed</small>
            </div>
            
            <div className="settings--form-actions">
              <button
                type="button"
                className="settings--button settings--button-cancel"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="settings--button settings--button-save"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
          
          <div className="settings--divider"></div>
          
          <div className="settings--section">
            <h2 className="settings--section-title">Change Password</h2>
            <p className="settings--section-description">
              For security reasons, you can change your password by clicking the button below.
            </p>
            <button 
              className="settings--button settings--button-outline"
              onClick={handlePasswordChange}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 