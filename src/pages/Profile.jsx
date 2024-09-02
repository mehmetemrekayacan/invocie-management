import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleEdit = () => {
    navigate("/profile/edit");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem("user");
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    }
  };

  return (
    <div className="profile">
      <div className="profile--header">
        <h1>Profile</h1>
      </div>
      <div className="profile--info">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Surname:</strong> {user.surname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="profile--actions">
        <button onClick={handleEdit} className="profile--button">
          Edit
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
