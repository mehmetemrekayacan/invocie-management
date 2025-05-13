import React, { useEffect, useCallback } from "react";
import "./comps.css";

export default function Modal({ message, type = "info", onClose, onConfirm }) {
  const handleEscape = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [handleEscape]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={`modal-content ${type}`}>
        <h3 id="modal-title" className="modal-title">
          {type === "success" ? "Success" : type === "error" ? "Error" : "Information"}
        </h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          {onConfirm && (
            <button 
              className="modal-button confirm"
              onClick={onConfirm}
              aria-label="Confirm action"
            >
              Confirm
            </button>
          )}
          <button 
            className="modal-button cancel"
            onClick={onClose}
            aria-label="Cancel action"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 